#!/usr/bin/env python3
"""Generate narration for one film, then write its timeline and captions.

  python3 tools/voice.py quote                 # scratch voice (Piper, offline)
  python3 tools/voice.py quote --eleven        # Joseph's cloned voice via ElevenLabs

ElevenLabs needs ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID in the environment.
Each line is generated separately so the edit can be timed to the voice; swapping
voices regenerates the timeline and the whole film reflows on the next render.
"""
import json, os, subprocess, sys, urllib.request, wave
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FPS = 30
PIPER_MODEL = os.environ.get("PIPER_MODEL", str(ROOT / "tools/piper/alan.onnx"))


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "csv=p=0", str(path)], capture_output=True, text=True, check=True)
    return float(out.stdout.strip())


def piper(text, out):
    tmp = out.with_suffix(".raw.wav")
    subprocess.run([sys.executable, "-m", "piper", "-m", PIPER_MODEL, "-f", str(tmp),
                    "--length-scale", "1.04", "--sentence-silence", "0.25"],
                   input=text, text=True, check=True, capture_output=True)
    trim_and_normalise(tmp, out)
    tmp.unlink()


def eleven(text, out, prev_text, next_text):
    key, voice = os.environ["ELEVENLABS_API_KEY"], os.environ["ELEVENLABS_VOICE_ID"]
    body = json.dumps({
        "text": text, "model_id": os.environ.get("ELEVENLABS_MODEL", "eleven_multilingual_v2"),
        "previous_text": prev_text, "next_text": next_text,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.85, "style": 0.15, "use_speaker_boost": True},
    }).encode()
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_192",
        data=body, headers={"xi-api-key": key, "Content-Type": "application/json"})
    tmp = out.with_suffix(".mp3")
    tmp.write_bytes(urllib.request.urlopen(req, timeout=120).read())
    trim_and_normalise(tmp, out)
    tmp.unlink()


def trim_and_normalise(src, out):
    # Trim leading/trailing silence so timings are exact, then level to broadcast loudness.
    af = ("silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.02,"
          "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,"
          "loudnorm=I=-16:TP=-1.5:LRA=7")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-af", af,
                    "-ar", "48000", "-ac", "1", str(out)], check=True)


def vtt_time(t):
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h):02d}:{int(m):02d}:{s:06.3f}"


def main():
    film = sys.argv[1]
    use_eleven = "--eleven" in sys.argv
    script = json.loads((ROOT / f"films/{film}/script.json").read_text())
    vo_dir = ROOT / f"public/vo/{film}"
    vo_dir.mkdir(parents=True, exist_ok=True)

    lines = [l for s in script["scenes"] for l in s["lines"]]
    for i, line in enumerate(lines):
        out = vo_dir / f"{line['id']}.wav"
        if use_eleven:
            prev_text = lines[i - 1]["say"] if i else ""
            next_text = lines[i + 1]["say"] if i + 1 < len(lines) else ""
            eleven(line["say"], out, prev_text, next_text)
        else:
            piper(line.get("tts", line["say"]), out)
        print(f"{line['id']}: {duration(out):.2f}s")

    t = 0.0
    timeline = {"id": film, "fps": FPS, "voice": "elevenlabs" if use_eleven else "scratch", "scenes": []}
    cues = []
    for scene in script["scenes"]:
        start = t
        t += scene.get("leadIn", 0)
        items = []
        for line in scene["lines"]:
            d = duration(vo_dir / f"{line['id']}.wav")
            items.append({"id": line["id"], "say": line["say"], "start": round(t, 3), "dur": round(d, 3),
                          "src": f"vo/{film}/{line['id']}.wav"})
            cues.append((t, t + d, line["say"]))
            t += d + line.get("pauseAfter", 0.3)
        t += scene.get("tail", 0)
        timeline["scenes"].append({"id": scene["id"], "start": round(start, 3), "end": round(t, 3), "lines": items})
    timeline["duration"] = round(t, 3)
    timeline["frames"] = int(round(t * FPS))

    (ROOT / f"src/films/{film}").mkdir(parents=True, exist_ok=True)
    (ROOT / f"src/films/{film}/timeline.json").write_text(json.dumps(timeline, indent=1))
    vtt = ["WEBVTT", ""]
    for a, b, text in cues:
        vtt += [f"{vtt_time(a)} --> {vtt_time(b)}", text, ""]
    (ROOT / f"films/{film}/{film}.vtt").write_text("\n".join(vtt))
    print(f"total {t:.2f}s, {timeline['frames']} frames")


if __name__ == "__main__":
    main()

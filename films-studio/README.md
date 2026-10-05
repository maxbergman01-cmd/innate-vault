# Innate case study films

Remotion project that builds the one-per-industry case study films (60-90s, problem → build → result → final shot).

## Layout
- `films/<id>/script.json`: the narration, line by line, grouped into scenes. Edit words here.
- `tools/voice.py <id>`: generates each line, then writes `src/films/<id>/timeline.json` and `films/<id>/<id>.vtt`. The edit is timed from the voice, so a new voice reflows the whole film.
- `tools/score_<id>.py`: generated music bed and sound design, keyed to the same timeline.
- `src/films/<id>/`: the scenes (React/SVG). `src/components/`: shared pieces (illustrated figure, footage shots, chips).
- `public/footage/`: source footage being recut. `public/vo/`, `public/audio/`: generated audio.

## Build a film
```
npm install
python3 tools/voice.py quote            # scratch voice (Piper, offline). Add --eleven for Joseph's voice
python3 tools/score_quote.py
npx remotion render src/index.ts quote out/quote.mp4 --codec=h264 --crf=18
```
`remotion.config.ts` points at the container's headless Chromium; change it if rendering elsewhere.

## Joseph's voice
Needs `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID` in the environment (set in the cloud environment settings, never in the repo). The voice ID comes from cloning Joseph's voice in ElevenLabs from the Innate podcast audio (Professional clone recommended; Joseph completes the short verification step himself). Then run `voice.py <id> --eleven`, re-run the score script and re-render.

## Scratch voice model
`tools/piper/` is not committed (63MB). Download once:
```
curl -L -o tools/piper/alan.onnx https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_GB/alan/medium/en_GB-alan-medium.onnx
curl -L -o tools/piper/alan.onnx.json https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_GB/alan/medium/en_GB-alan-medium.onnx.json
pip install piper-tts numpy scipy
```

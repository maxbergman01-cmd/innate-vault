#!/usr/bin/env python3
"""Music bed and sound design for the Drawing-to-Quote film, synthesised from the timeline.

Placeholder-quality but deliberate: a tense minor drone under the problem, a warm pulse
under the build, a lift into the payoff and a resolve at the close. Swap for a licensed or
ElevenLabs Music track later without touching the edit.
"""
import json
from pathlib import Path
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile

ROOT = Path(__file__).resolve().parent.parent
SR = 48000
tl = json.loads((ROOT / "src/films/quote/timeline.json").read_text())
N = int(tl["duration"] * SR) + SR
rng = np.random.default_rng(7)
S = {s["id"]: s for s in tl["scenes"]}
L = {l["id"]: l for s in tl["scenes"] for l in s["lines"]}


def note(n):  # MIDI to Hz
    return 440.0 * 2 ** ((n - 69) / 12)


def lp(x, hz, order=2):
    return sosfilt(butter(order, hz, "low", fs=SR, output="sos"), x)


def bp(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], "band", fs=SR, output="sos"), x)


def env(n, a, r):
    e = np.ones(n)
    ai, ri = int(a * SR), int(r * SR)
    e[:ai] = np.linspace(0, 1, ai) ** 2
    if ri:
        e[-ri:] *= np.linspace(1, 0, ri) ** 2
    return e


def pad(notes, dur, bright=900):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for m in notes:
        for det in (-0.07, 0.0, 0.06):
            f = note(m + det)
            ph = rng.random()
            saw = 2 * ((t * f + ph) % 1) - 1
            out += saw * 0.18
    out = lp(out, bright)
    return out * env(n, min(2.0, dur * 0.4), min(2.0, dur * 0.4))


def pluck(m, dur=1.6, amp=0.22):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = note(m)
    x = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) + 0.12 * np.sin(6 * np.pi * f * t))
    return lp(x * np.exp(-t * 3.2) * amp, 3500)


def add(buf, x, at, gain=1.0):
    i = int(at * SR)
    j = min(len(buf), i + len(x))
    if j > i:
        buf[i:j] += x[: j - i] * gain


def reverb(x, secs=2.6, mix=0.35):
    n = int(secs * SR)
    ir = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 3.2)
    ir = lp(ir, 5000)
    wet = fftconvolve(x, ir)[: len(x)]
    wet *= np.max(np.abs(x)) / (np.max(np.abs(wet)) + 1e-9)
    return x * (1 - mix) + wet * mix


music = np.zeros(N)
p, b, r, c = S["problem"], S["build"], S["result"], S["close"]

# Problem: A minor drone with a slow-rising filter, unresolved.
add(music, pad([45, 52, 59, 60], p["end"] - p["start"] + 1.5, bright=650), p["start"], 0.9)

# Build: F - C - G - Am, plucked eighth-note arpeggio at 96 bpm over a soft pad.
prog = [[41, 53, 57, 60, 64], [36, 48, 55, 60, 64], [43, 50, 55, 59, 62], [45, 52, 57, 60, 64]]
bar = 60 / 96 * 4
t0, k = b["start"] - 0.4, 0
while t0 < b["end"]:
    ch = prog[k % 4]
    add(music, pad(ch[:3], bar + 1.2, bright=1100), t0, 0.55)
    for step in range(8):
        add(music, pluck(ch[1 + (step % 4)] + 12, 1.2, 0.16), t0 + step * bar / 8, 0.9 if step % 2 == 0 else 0.6)
    t0 += bar
    k += 1

# Result: lift F - G - C, brighter, with the arpeggio continuing.
lift = [[41, 53, 57, 60, 65], [43, 55, 59, 62, 67], [48, 55, 60, 64, 67]]
seg = (r["end"] - r["start"]) / 3
for i, ch in enumerate(lift):
    st = r["start"] + i * seg
    add(music, pad(ch, seg + 1.4, bright=1600), st, 0.75)
    for step in range(int(seg / (bar / 8))):
        add(music, pluck(ch[1 + (step % 4)] + 12, 1.2, 0.15), st + step * bar / 8, 0.8)

# Close: C add9 resolve, long tail.
add(music, pad([48, 55, 62, 64, 67], c["end"] - c["start"] + 2, bright=1400), c["start"], 0.8)
add(music, pluck(72, 4.0, 0.2), c["start"] + 0.2)
add(music, pluck(79, 4.0, 0.12), c["start"] + 0.5)

music = reverb(music)

# Duck the bed under every spoken line.
duck = np.ones(N)
for l in L.values():
    a, z = int((l["start"] - 0.15) * SR), int((l["start"] + l["dur"] + 0.25) * SR)
    duck[a:z] = 0.45
duck = lp(duck, 4)  # smooth gain changes
music *= duck

sfx = np.zeros(N)


def paper(at, g=0.5):
    n = int(0.09 * SR)
    x = bp(rng.standard_normal(n), 1800, 7000) * np.exp(-np.arange(n) / SR * 45)
    add(sfx, x, at, g)


def tick(at, g=0.25):
    n = int(0.03 * SR)
    t = np.arange(n) / SR
    x = (np.sin(2 * np.pi * 2900 * t) * 0.6 + np.sin(2 * np.pi * 1200 * t)) * np.exp(-t * 260)
    add(sfx, x, at, g)


def whoosh(at, dur=0.9, g=0.35):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    out = np.zeros(n)
    for i, (lo, hi) in enumerate([(300, 900), (600, 2200), (1200, 5000)]):
        out += bp(x, lo, hi) * np.sin(np.linspace(0, np.pi, n)) ** (2 + i)
    add(sfx, out, at, g)


def hit(at, g=0.9):
    n = int(1.6 * SR)
    t = np.arange(n) / SR
    f = 46 + 40 * np.exp(-t * 14)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.4)
    x += lp(rng.standard_normal(n), 400) * np.exp(-t * 9) * 0.3
    add(sfx, x, at, g)


def chime(at, g=0.35):
    n = int(2.5 * SR)
    t = np.arange(n) / SR
    x = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t * d) for f, a, d in [(1046.5, 1, 2.2), (1568, 0.5, 3), (2093, 0.25, 4)])
    add(sfx, x, at, g)


def click(at, g=0.18):
    n = int(0.05 * SR)
    t = np.arange(n) / SR
    add(sfx, lp(rng.standard_normal(n), 3000) * np.exp(-t * 120), at, g)


# Problem: 27 sheets pinned, clock ticking, push into the plan, the loss lands.
for i in range(27):
    paper(p["start"] + 0.25 + i * 0.085 + 0.18, 0.35 + 0.15 * rng.random())
for k in range(int((p["end"] - p["start"]) * 2)):
    tick(p["start"] + 0.2 + k * 0.5, 0.12 if k % 2 else 0.16)
zoom = L["p2"]["start"] - 0.1
whoosh(zoom + 0.1, 1.1, 0.4)
tick(L["p3"]["start"], 0.25)
hit(L["p4"]["start"] + 0.05, 0.85)

# Build: soft whoosh into the turn, a click on each cut.
whoosh(L["b1"]["start"] - 0.5, 1.0, 0.3)
for lid in ["b3", "b5", "b6", "b7", "b8"]:
    click(L[lid]["start"], 0.16)

# Result: riser into the count, chime when the number lands.
riser_n = int(1.6 * SR)
riser = bp(rng.standard_normal(riser_n), 800, 6000) * np.linspace(0, 1, riser_n) ** 3
add(sfx, riser, r["start"] - 1.0, 0.22)
chime(L["r1"]["start"] + 3.4, 0.4)
chime(c["start"] + 0.2, 0.15)

sfx = reverb(sfx, 1.4, 0.18)


def write(name, x, peak):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    st = np.stack([x, x], axis=1).astype(np.float32)
    wavfile.write(ROOT / f"public/audio/{name}", SR, st)


write("quote-music.wav", music, 0.22)
write("quote-sfx.wav", sfx, 0.5)
print("ok", tl["duration"])

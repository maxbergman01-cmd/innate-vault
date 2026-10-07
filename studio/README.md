# Case-study films (Remotion)

Source for the four 75s flagship films in `site/films/v4/`.

- `src/films/*.tsx` one file per film: shot list, animated product scenes, stats. `*.lines.json` holds VO line timings.
- `src/kit/` shared pieces: graded footage (`Clip`), stat overlay, lockup, end card, subtitles, motion helpers.
- `public/audio/<film>.mp3` final mix (Joseph's cloned voice over an ElevenLabs music bed, ducked).
- `scripts/` the approved scripts and case-study titles.

## Stock footage
Clips are free Mixkit stock (not the client). They are not committed. Download into `public/clips/<id>.mp4`:
`https://assets.mixkit.co/videos/<id>/<id>-1080.mp4` (use `-720.mp4` if 1080 is unavailable).
IDs: 241 3653 4547 4872 4876 5434 5595 6241 13126 23718 24217 24344 34213 39838 39839 39841 42653 42656 42664 45923 46755 48503

## Regenerate voice and mix
```
export ELEVENLABS_API_KEY=...            # never commit the key
XI=$ELEVENLABS_API_KEY VOICE=<voice id> python3 tools/vo.py <workdir>   # reads <workdir>/pack2/*.md, writes <workdir>/audio/<film>/
tools/mix.sh <workdir>/audio             # needs <film>-music.mp3 beds alongside
python3 tools/vtt.py src/films/<film>.lines.json ../site/films/v4/<film>.vtt
```

## Render
```
npm ci
npx remotion render src/index.ts film-fact-find-writer out/fact-find-writer.mp4 --concurrency=4 --crf=20
```
`remotion.config.ts` points at a sandbox Chromium path; delete that line to use Remotion's own browser.
Compositions: film-fact-find-writer, film-client-intelligence, film-enquiry, film-proposal.

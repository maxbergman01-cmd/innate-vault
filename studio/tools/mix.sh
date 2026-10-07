#!/bin/bash
# Mix VO over the music bed: music ducks under the voice, fades in/out, web loudness.
cd "$1"; for f in fact-find-writer client-intelligence enquiry proposal; do
ffmpeg -y -v error -i $f/$f-vo-full.mp3 -i $f/$f-music.mp3 -filter_complex "[0]asplit=2[vo][sc];[1]volume=0.55,afade=t=in:d=1.5,afade=t=out:st=72:d=3[m];[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=80:release=600[md];[vo][md]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5[o]" -map "[o]" -t 75 -ar 48000 -b:a 192k $f/$f-mix.mp3
done

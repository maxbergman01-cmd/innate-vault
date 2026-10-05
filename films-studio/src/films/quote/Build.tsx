import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop, Chip, Eyebrow, lerp} from '../../components/Primitives';
import {FootageShot, Shot} from '../../components/Footage';
import {C, FONT, easeOut} from '../../theme';

const SRC = 'footage/dq-v3.mp4';
const FPS = 30;

type L = {b1: number; b2: number; b3: number; b4: number; b5: number; b6: number; b7: number; b8: number; end: number};

export const Build: React.FC<{l: L}> = ({l}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const x = 0.33; // crossfade overlap

  // Each shot is cut to the line it illustrates. Source times map to the existing film.
  const shots: (Shot & {chips: {label: string; detail?: string; a: number; b: number}[]})[] = [
    {from: 64.4, to: 69.6, at: l.b1 + 2.4, dur: l.b3 - (l.b1 + 2.4) + x,
      chips: [{label: '3 of 27 pages', detail: 'found automatically', a: 0.8, b: -0.4}]},
    {from: 70.4, to: 82.2, at: l.b3, dur: l.b5 - l.b3 + x,
      chips: [{label: 'Every figure beside its source', a: 0.4, b: 4.6}, {label: '12.17 → 13.00', detail: 'estimator corrects', a: l.b4 - l.b3 + 4.7, b: -0.3}]},
    {from: 88.0, to: 94.0, at: l.b5, dur: l.b6 - l.b5 + x,
      chips: [{label: 'Quantities and price recalculate', a: 0.5, b: -0.4}]},
    {from: 96.0, to: 102.8, at: l.b6, dur: l.b7 - l.b6 + x,
      chips: [{label: 'Missing input', detail: 'no price until it is filled', a: 0.5, b: -0.4}]},
    {from: 111.3, to: 115.3, at: l.b7, dur: l.b8 - l.b7 + x,
      chips: [{label: 'Rate band', detail: "the estimator's call", a: 0.4, b: -0.4}]},
    {from: 120.6, to: 126.6, at: l.b8, dur: l.end - l.b8,
      chips: [{label: 'Every line traced to page 6', a: 0.6, b: -0.2}]},
  ];

  const lock = easeOut((t - l.b1 + 0.1) / 0.7);
  const lockOut = easeOut((t - (l.b1 + 2.1)) / 0.5);

  return (
    <AbsoluteFill>
      <Backdrop />
      {shots.map((s, i) => (
        <Sequence key={i} from={Math.round(s.at * FPS)} durationInFrames={Math.round(s.dur * FPS)}>
          <FootageShot src={SRC} shot={s} />
          {s.chips.map((c, k) => (
            <Chip key={k} at={c.a} out={c.b < 0 ? s.dur + c.b : c.b} label={c.label} detail={c.detail} />
          ))}
        </Sequence>
      ))}
      {/* the turn of the story: we built this */}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: lock * (1 - lockOut)}}>
        <div style={{textAlign: 'center', transform: `translateY(${(1 - lock) * 20 - lockOut * 30}px)`}}>
          <Eyebrow>Built by Innate</Eyebrow>
          <div style={{fontFamily: FONT, fontWeight: 600, fontSize: 120, color: C.white, letterSpacing: '-0.035em', marginTop: 22}}>Drawing-to-Quote Engine</div>
          <div style={{height: 3, background: C.mint, margin: '34px auto 0', width: lerp(t, l.b1 + 0.3, l.b1 + 1.4, 0, 420)}} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

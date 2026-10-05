import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop, Eyebrow, lerp} from '../../components/Primitives';
import {DeskLamp, Estimator} from '../../components/Estimator';
import {C, FONT, easeInOut, easeOut} from '../../theme';

const House: React.FC<{on: number}> = ({on}) => (
  <svg width="54" height="46" viewBox="0 0 54 46">
    <path d="M4 22 L27 4 L50 22 V42 H4 Z" fill={on > 0 ? `rgba(120,230,182,${0.16 + on * 0.5})` : 'rgba(255,255,255,.04)'}
      stroke={on > 0 ? C.mint : 'rgba(255,255,255,.18)'} strokeWidth="2.4" strokeLinejoin="round" />
    <rect x="21" y="27" width="12" height="15" fill={on > 0 ? C.ink : 'rgba(255,255,255,.08)'} />
  </svg>
);

// Payoff: the same estimator, now sitting back, and the number the opening cost them.
export const Result: React.FC<{r1: number}> = ({r1}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const enter = easeOut(t / 0.8);
  const countP = easeInOut((t - (r1 + 1.2)) / 2.2);
  const value = Math.round(6294 * countP);
  const tail = easeOut((t - (r1 + 6.2)) / 0.7);

  return (
    <AbsoluteFill>
      <Backdrop tint="#17483d" />
      <div style={{position: 'absolute', left: 60, top: 190, width: 760, height: 570, opacity: enter, transform: `translateX(${(1 - enter) * -40}px)`}}>
        <svg viewBox="130 150 680 450" width="760" height="503">
          <ellipse cx="460" cy="562" rx="300" ry="9" fill="rgba(0,0,0,.35)" />
          <rect x="488" y="350" width="110" height="5" rx="1" fill="#f2eee3" />
          <DeskLamp glow={1} />
          <Estimator pose="calm" breathe={t * 1.2} />
        </svg>
      </div>
      <div style={{position: 'absolute', left: 900, top: 210, width: 940}}>
        <Eyebrow style={{opacity: enter}}>Every 40-plot phase</Eyebrow>
        <div style={{fontFamily: FONT, fontWeight: 600, fontSize: 250, lineHeight: 1, color: C.mint, letterSpacing: '-0.05em', marginTop: 16, fontVariantNumeric: 'tabular-nums', opacity: lerp(t, r1 + 0.9, r1 + 1.4, 0, 1)}}>
          £{value.toLocaleString('en-GB')}
        </div>
        <div style={{fontFamily: FONT, fontSize: 48, color: C.white, fontWeight: 500, marginTop: 12, opacity: lerp(t, r1 + 3.2, r1 + 3.8, 0, 1)}}>no longer given away</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(10, 54px)', gap: '14px 22px', marginTop: 54}}>
          {Array.from({length: 40}).map((_, i) => (
            <House key={i} on={easeOut((t - (r1 + 1.2) - i * 0.052) / 0.25)} />
          ))}
        </div>
        <div style={{fontFamily: FONT, fontSize: 34, color: C.muted, marginTop: 44, opacity: tail, transform: `translateY(${(1 - tail) * 12}px)`}}>Every figure traced back to the drawing.</div>
      </div>
    </AbsoluteFill>
  );
};

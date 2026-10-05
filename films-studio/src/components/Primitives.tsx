import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, EYEBROW, FONT, easeOut} from '../theme';

export const Backdrop: React.FC<{tint?: string; children?: React.ReactNode}> = ({tint = C.forest, children}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(120% 90% at 70% 110%, ${tint} 0%, ${C.ink2} 55%, ${C.ink} 100%)`,
    }}
  >
    {children}
    {/* fine grain so flat gradients don't band */}
    <AbsoluteFill style={{opacity: 0.06, mixBlendMode: 'overlay', backgroundImage:
      'url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/></svg>")'}} />
  </AbsoluteFill>
);

// Fade/slide in at `at` seconds, optional fade out at `out` seconds (scene-relative).
export const useReveal = (at: number, dur = 0.6, out?: number, outDur = 0.4) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const inP = easeOut((t - at) / dur);
  const outP = out === undefined ? 0 : easeOut((t - out) / outDur);
  return {p: inP, opacity: inP * (1 - outP), t};
};

export const Eyebrow: React.FC<{children: React.ReactNode; color?: string; style?: React.CSSProperties}> = ({children, color = C.mint, style}) => (
  <div style={{fontFamily: EYEBROW, fontWeight: 600, fontSize: 22, letterSpacing: '0.18em', textTransform: 'uppercase', color, ...style}}>{children}</div>
);

export const Chip: React.FC<{at: number; out: number; label: string; detail?: string}> = ({at, out, label, detail}) => {
  const {p, opacity} = useReveal(at, 0.5, out, 0.35);
  return (
    <div style={{
      position: 'absolute', left: 96, bottom: 86, opacity,
      transform: `translateY(${(1 - p) * 18}px)`,
      display: 'flex', alignItems: 'center', gap: 18,
      background: 'rgba(11,20,17,.82)', border: '1px solid rgba(120,230,182,.28)',
      borderRadius: 999, padding: '16px 30px 16px 22px', backdropFilter: 'blur(8px)',
      boxShadow: '0 20px 60px rgba(0,0,0,.35)',
    }}>
      <div style={{width: 12, height: 12, borderRadius: 6, background: C.mint, boxShadow: `0 0 18px ${C.mint}`}} />
      <div style={{fontFamily: FONT, fontSize: 32, fontWeight: 600, color: C.white, letterSpacing: '-0.01em'}}>{label}</div>
      {detail && <div style={{fontFamily: FONT, fontSize: 28, color: C.muted}}>{detail}</div>}
    </div>
  );
};

export const lerp = (t: number, a: number, b: number, from: number, to: number) =>
  interpolate(t, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

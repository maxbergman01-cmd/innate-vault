import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const FPS = 30;
export const s = (sec: number) => Math.round(sec * FPS);

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const out = Easing.bezier(0.16, 1, 0.3, 1);

// 0..1 progress between two times (seconds, relative to the current Sequence).
export const useP = (from: number, dur = 0.6, ease = out) => {
  const f = useCurrentFrame();
  return interpolate(f, [s(from), s(from + dur)], [0, 1], {...clamp, easing: ease});
};
export const useSpring = (from: number, damping = 18) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - s(from), fps, config: {damping, mass: 0.9, stiffness: 120}});
};
export const lerp = (p: number, a: number, b: number) => a + (b - a) * p;

// Element that rises and fades in at `at` seconds.
export const Rise: React.FC<{at: number; y?: number; dur?: number; style?: React.CSSProperties; children: React.ReactNode; blur?: boolean}> = ({at, y = 28, dur = 0.7, style, children, blur = true}) => {
  const p = useP(at, dur);
  return <div style={{opacity: p, transform: `translateY(${(1 - p) * y}px)`, filter: blur && p < 1 ? `blur(${(1 - p) * 8}px)` : undefined, ...style}}>{children}</div>;
};

// Number that counts from a to b.
export const Count: React.FC<{at: number; dur?: number; from?: number; to: number; fmt?: (n: number) => string}> = ({at, dur = 1.2, from = 0, to, fmt = (n) => String(Math.round(n))}) => {
  const p = useP(at, dur, Easing.bezier(0.22, 1, 0.36, 1));
  return <>{fmt(lerp(p, from, to))}</>;
};

// Text typed on at characters-per-second, with a caret while typing.
export const Typed: React.FC<{at: number; cps?: number; text: string; caret?: string}> = ({at, cps = 45, text, caret = '#78e6b6'}) => {
  const f = useCurrentFrame();
  const n = Math.max(0, Math.floor(((f - s(at)) / FPS) * cps));
  const shown = text.slice(0, n);
  const typing = n > 0 && n < text.length;
  return <span style={{whiteSpace: 'pre-wrap'}}>{shown}{typing && <span style={{display: 'inline-block', width: 3, height: '1em', background: caret, verticalAlign: '-0.12em', marginLeft: 2}} />}</span>;
};

// Fake cursor that glides to a point and clicks.
export const Cursor: React.FC<{path: [number, number, number][]; click?: number[]}> = ({path, click = []}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  let x = path[0][1], y = path[0][2];
  for (let i = 1; i < path.length; i++) {
    const [t1, x1, y1] = path[i];
    const [t0, x0, y0] = path[i - 1];
    if (t >= t0) {
      const p = interpolate(t, [t0, t1], [0, 1], {...clamp, easing: Easing.bezier(0.45, 0, 0.2, 1)});
      x = lerp(p, x0, x1); y = lerp(p, y0, y1);
    }
  }
  const press = click.some((c) => t >= c && t < c + 0.18);
  const ring = click.map((c) => interpolate(t, [c, c + 0.5], [0, 1], clamp)).find((r) => r > 0 && r < 1) ?? 0;
  const last = Math.max(path[path.length - 1][0], ...click);
  const vis = interpolate(t, [path[0][0], path[0][0] + 0.3], [0, 1], clamp) * interpolate(t, [last + 0.7, last + 1.1], [1, 0], clamp);
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: vis, pointerEvents: 'none', zIndex: 50}}>
      {ring > 0 && <div style={{position: 'absolute', left: -30, top: -30, width: 60, height: 60, borderRadius: 30, border: '3px solid rgba(120,230,182,.9)', transform: `scale(${0.3 + ring})`, opacity: 1 - ring}} />}
      <svg width="34" height="34" viewBox="0 0 24 24" style={{transform: `scale(${press ? 0.85 : 1})`, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.5))'}}>
        <path d="M4 2l15 11-7 1-3 7z" fill="#fff" stroke="#111" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

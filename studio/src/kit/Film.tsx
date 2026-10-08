import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, F, fontFaces} from '../theme';
import {FPS, Rise, s, useP} from './motion';

const GRAIN = 'url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27220%27 height=%27220%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%273%27 stitchTiles=%27stitch%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/></svg>")';

// Real footage, one consistent grade, slow Ken Burns. `from` is the in-point in seconds.
export const Clip: React.FC<{src: string; from?: number; pos?: string; kb?: [number, number]; pan?: [number, number]; blur?: number; dim?: number; rate?: number}> = ({src, from = 0, pos = 'center', kb = [1.04, 1.12], pan = [0, 0], blur = 0, dim = 0, rate = 1}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const p = f / Math.max(1, durationInFrames);
  const sc = kb[0] + (kb[1] - kb[0]) * p;
  const tx = pan[0] + (pan[1] - pan[0]) * p;
  return (
    <AbsoluteFill style={{background: C.ink, overflow: 'hidden'}}>
      <OffthreadVideo src={staticFile(`clips/${src}.mp4`)} startFrom={s(from)} muted playbackRate={rate}
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${sc + (blur ? 0.06 : 0)}) translateX(${tx}%)`,
          filter: `saturate(.8) contrast(1.06) brightness(${blur ? 0.42 : 0.9}) ${blur ? `blur(${blur}px)` : ''}`}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(13,34,28,.22), rgba(13,30,25,.36))', mixBlendMode: 'multiply'}} />
      {dim > 0 && <AbsoluteFill style={{background: `rgba(10,14,12,${dim})`}} />}
    </AbsoluteFill>
  );
};

export const SideWash: React.FC<{side?: 'left' | 'right'; strength?: number}> = ({side = 'right', strength = 0.8}) => (
  <AbsoluteFill style={{background: `linear-gradient(${side === 'right' ? '270deg' : '90deg'}, rgba(10,14,12,${strength}) 0%, rgba(10,14,12,${strength * 0.7}) 38%, transparent 72%)`}} />
);
export const BottomWash: React.FC = () => <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(8,11,10,.7) 0%, transparent 26%)'}} />;

export const Eyebrow: React.FC<{children: React.ReactNode; color?: string; style?: React.CSSProperties}> = ({children, color = C.mint, style}) => (
  <div style={{fontFamily: F.eyebrow, fontWeight: 600, fontSize: 21, letterSpacing: '0.22em', textTransform: 'uppercase', color, display: 'flex', alignItems: 'center', gap: 14, ...style}}>
    <span style={{width: 30, height: 2, background: color, display: 'inline-block'}} />{children}
  </div>
);

// The big number over footage. Eyebrow, number, line and an optional assumption, staggered in.
export const Stat: React.FC<{at?: number; eyebrow: string; big: React.ReactNode; line: React.ReactNode; note?: string; side?: 'left' | 'right'; top?: number; color?: string; size?: number}> = ({at = 0.2, eyebrow, big, line, note, side = 'right', top = 290, color = C.white, size = 250}) => {
  const p = useP(at + 0.15, 0.9);
  return (
    <div style={{position: 'absolute', [side]: 120, top, width: 860}}>
      <Rise at={at}><Eyebrow>{eyebrow}</Eyebrow></Rise>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: size, lineHeight: 0.9, letterSpacing: '-0.06em', color, marginTop: 24, textShadow: '0 20px 60px rgba(0,0,0,.45)', opacity: p, transform: `scale(${0.92 + 0.08 * p})`, transformOrigin: side === 'right' ? 'left bottom' : 'left bottom', filter: p < 1 ? `blur(${(1 - p) * 14}px)` : undefined}}>{big}</div>
      <Rise at={at + 0.55}><div style={{fontFamily: F.sans, fontSize: 52, fontWeight: 500, letterSpacing: '-0.02em', color: C.white, marginTop: 18, lineHeight: 1.12, textShadow: '0 10px 40px rgba(0,0,0,.5)'}}>{line}</div></Rise>
      {note && <Rise at={at + 0.9}><div style={{fontFamily: F.sans, fontSize: 24, color: 'rgba(255,254,250,.62)', marginTop: 22}}>{note}</div></Rise>}
    </div>
  );
};

// "So we built ..." lockup over defocused footage.
export const Lockup: React.FC<{name: string; sub: string; size?: number}> = ({name, sub, size = 132}) => {
  const w = useP(0.35, 0.9);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <Rise at={0.05}><div style={{fontFamily: F.eyebrow, fontWeight: 600, fontSize: 22, letterSpacing: '.3em', color: C.mint}}>{sub.toUpperCase()}</div></Rise>
      <Rise at={0.15} y={36}><div style={{fontFamily: F.display, fontWeight: 600, fontSize: size, letterSpacing: '-0.05em', color: C.white, marginTop: 18, lineHeight: 1}}>{name}</div></Rise>
      <div style={{width: 340 * w, height: 4, borderRadius: 2, background: C.mint, marginTop: 34}} />
    </AbsoluteFill>
  );
};

// Footage behind product UI: defocused, dark, with a soft green light.
export const UIStage: React.FC<{clip: string; from?: number; pos?: string; children: React.ReactNode}> = ({clip, from = 0, pos, children}) => (
  <AbsoluteFill>
    <Clip src={clip} from={from} pos={pos} blur={22} kb={[1.06, 1.1]} />
    <AbsoluteFill style={{background: `radial-gradient(60% 70% at 65% 25%, ${C.forest}aa 0%, transparent 70%)`}} />
    {children}
  </AbsoluteFill>
);

// Small heading used inside product scenes.
export const SceneTitle: React.FC<{at?: number; eyebrow: string; title: React.ReactNode; left?: number; top?: number; width?: number}> = ({at = 0.1, eyebrow, title, left = 110, top = 96, width = 760}) => (
  <div style={{position: 'absolute', left, top, width}}>
    <Rise at={at}><Eyebrow>{eyebrow}</Eyebrow></Rise>
    <Rise at={at + 0.15}><div style={{fontFamily: F.display, fontWeight: 600, fontSize: 60, letterSpacing: '-0.035em', color: C.white, marginTop: 14, lineHeight: 1.06}}>{title}</div></Rise>
  </div>
);

export const EndCard: React.FC<{clip: string; from?: number; tagline: React.ReactNode; product: string; tryIt?: boolean}> = ({clip, from = 0, tagline, product, tryIt}) => (
  <AbsoluteFill>
    <Clip src={clip} from={from} blur={26} kb={[1.1, 1.14]} dim={0.35} />
    <AbsoluteFill style={{background: `radial-gradient(55% 60% at 50% 45%, ${C.forest}cc 0%, transparent 72%)`}} />
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <Rise at={0.2} y={40}><div style={{fontFamily: F.display, fontWeight: 600, fontSize: 104, letterSpacing: '-0.045em', color: C.white, lineHeight: 1.04, maxWidth: 1500}}>{tagline}</div></Rise>
      <Rise at={1.1}><div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 56}}>
        <Img src={staticFile('img/logo-mark-white.png')} style={{height: 44}} />
        <div style={{fontFamily: F.eyebrow, fontWeight: 700, fontSize: 22, letterSpacing: '.3em', color: C.white}}>INNATE</div>
        <div style={{width: 1, height: 34, background: 'rgba(255,255,255,.3)'}} />
        <div style={{fontFamily: F.sans, fontWeight: 500, fontSize: 30, color: C.mint}}>{product}</div>
      </div></Rise>
      {tryIt && <Rise at={1.8}><div style={{marginTop: 70, fontFamily: F.sans, fontSize: 26, color: 'rgba(255,254,250,.7)'}}>Try it yourself, just below ↓</div></Rise>}
    </AbsoluteFill>
  </AbsoluteFill>
);

const Brand: React.FC = () => (
  <div style={{position: 'absolute', right: 64, top: 52, fontFamily: F.eyebrow, fontWeight: 700, fontSize: 18, letterSpacing: '0.3em', color: C.white, opacity: 0.8}}>INNATE</div>
);

type Line = {placed: number; dur: number; text: string};
const chunks = (l: Line) => {
  let parts = l.text.split(/(?<=[.?!])\s+/);
  parts = parts.flatMap((p) => (p.length > 64 ? p.split(/(?<=[,:])\s+/) : [p]));
  const merged: string[] = [];
  for (const p of parts) {
    if (merged.length && (merged[merged.length - 1].length + p.length < 44)) merged[merged.length - 1] += ' ' + p;
    else merged.push(p);
  }
  const total = merged.reduce((a, p) => a + p.length, 0);
  let t = l.placed;
  return merged.map((text) => {
    const d = (text.length / total) * l.dur;
    const c = {start: t, end: t + d, text};
    t += d;
    return c;
  });
};
const Subtitles: React.FC<{lines: Line[]}> = ({lines}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const all = lines.flatMap(chunks);
  const c = all.find((x) => t >= x.start - 0.05 && t < x.end + 0.25);
  if (!c) return null;
  const o = interpolate(t, [c.start - 0.05, c.start + 0.1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 58, textAlign: 'center', opacity: o}}>
      <span style={{fontFamily: F.sans, fontSize: 34, fontWeight: 500, color: 'rgba(255,254,250,.95)', textShadow: '0 2px 4px rgba(0,0,0,.5), 0 2px 22px rgba(0,0,0,.7)', letterSpacing: '-0.005em'}}>{c.text}</span>
    </div>
  );
};

export type Shot = {at: number; el: React.ReactNode; cut?: boolean; brand?: boolean};
// A film: shots back to back with short dissolves, burned-in subtitles and the mixed soundtrack.
export const Film: React.FC<{shots: Shot[]; lines: Line[]; audio: string; length: number}> = ({shots, lines, audio, length}) => {
  const X = 0.4;
  return (
    <AbsoluteFill style={{background: C.ink, fontFamily: F.sans}}>
      <style>{fontFaces}</style>
      {shots.map((sh, i) => {
        const end = i < shots.length - 1 ? shots[i + 1].at + X : length;
        return (
          <Sequence key={i} from={s(sh.at)} durationInFrames={s(end - sh.at)}>
            <Fade on={i > 0 && !sh.cut} dur={X}>{sh.el}{sh.brand !== false && <Brand />}</Fade>
          </Sequence>
        );
      })}
      <AbsoluteFill style={{background: 'radial-gradient(120% 95% at 50% 45%, transparent 58%, rgba(0,0,0,.5) 100%)', pointerEvents: 'none'}} />
      <AbsoluteFill style={{opacity: 0.08, mixBlendMode: 'overlay', pointerEvents: 'none', backgroundImage: GRAIN}} />
      <Subtitles lines={lines} />
      <FadeOut length={length} />
      <Audio src={staticFile(`audio/${audio}.mp3`)} />
    </AbsoluteFill>
  );
};
const Fade: React.FC<{on: boolean; dur: number; children: React.ReactNode}> = ({on, dur, children}) => {
  const p = useP(0, dur);
  return <AbsoluteFill style={{opacity: on ? p : 1}}>{children}</AbsoluteFill>;
};
const FadeOut: React.FC<{length: number}> = ({length}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [s(length - 1.2), s(length)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const i = interpolate(f, [0, s(0.6)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#000', opacity: Math.max(o, i), pointerEvents: 'none'}} />;
};

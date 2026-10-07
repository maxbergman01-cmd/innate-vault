import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
export const StageBg = React.createContext<{src?: string; pos?: string}>({});
import {C, F, fontFaces} from '../theme';

// Cinematic base: deep ink, a soft forest light source, film grain and a vignette.
export const Stage: React.FC<{glow?: [number, number]; tint?: string; children?: React.ReactNode}> = ({glow = [72, 18], tint = C.forest, children}) => {
  const bg = React.useContext(StageBg);
  return (
  <AbsoluteFill style={{background: C.ink, overflow: 'hidden', fontFamily: F.sans}}>
    <style>{fontFaces}</style>
    {bg.src && <Img src={staticFile(bg.src)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: bg.pos ?? 'center', transform: 'scale(1.08)', filter: 'saturate(.75) brightness(.4) blur(18px)'}} />}
    <AbsoluteFill style={{background: `radial-gradient(60% 70% at ${glow[0]}% ${glow[1]}%, ${tint}cc 0%, ${tint}33 38%, transparent 70%)`}} />
    <AbsoluteFill style={{background: `radial-gradient(50% 50% at 15% 100%, ${C.forestHi}55 0%, transparent 70%)`}} />
    {children}
    <AbsoluteFill style={{background: 'radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,.55) 100%)', pointerEvents: 'none'}} />
    <AbsoluteFill style={{opacity: 0.09, mixBlendMode: 'overlay', pointerEvents: 'none', backgroundImage:
      'url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27220%27 height=%27220%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%273%27 stitchTiles=%27stitch%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/></svg>")'}} />
  </AbsoluteFill>
  );
};

export const Eyebrow: React.FC<{children: React.ReactNode; color?: string; style?: React.CSSProperties}> = ({children, color = C.mint, style}) => (
  <div style={{fontFamily: F.eyebrow, fontWeight: 600, fontSize: 20, letterSpacing: '0.22em', textTransform: 'uppercase', color, display: 'flex', alignItems: 'center', gap: 14, ...style}}>
    <span style={{width: 28, height: 2, background: color, display: 'inline-block'}} />{children}
  </div>
);

// Burned-in subtitle, Wonderful-style: small, low, quiet.
export const Subtitle: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 54, textAlign: 'center', fontFamily: F.sans, fontSize: 30, fontWeight: 500, color: 'rgba(255,254,250,.92)', textShadow: '0 2px 18px rgba(0,0,0,.6)', letterSpacing: '-0.005em'}}>{children}</div>
);

export const Brand: React.FC<{style?: React.CSSProperties}> = ({style}) => (
  <div style={{position: 'absolute', right: 64, top: 52, display: 'flex', alignItems: 'center', gap: 12, opacity: 0.85, ...style}}>
    <div style={{fontFamily: F.eyebrow, fontWeight: 700, fontSize: 18, letterSpacing: '0.3em', color: C.white}}>INNATE</div>
  </div>
);

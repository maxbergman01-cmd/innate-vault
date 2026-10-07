import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {C, F, fontFaces} from '../theme';

// Real footage with one consistent grade across every film: slightly cooled, green-lifted shadows,
// soft contrast, vignette and grain, so mixed stock reads as one shoot.
export const Graded: React.FC<{src: string; blur?: number; dim?: number; pos?: string; scale?: number; children?: React.ReactNode}> = ({src, blur = 0, dim = 0, pos = 'center', scale = 1.04, children}) => (
  <AbsoluteFill style={{background: C.ink, overflow: 'hidden', fontFamily: F.sans}}>
    <style>{fontFaces}</style>
    <Img src={staticFile(src)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${scale})`,
      filter: `saturate(.82) contrast(1.06) brightness(.92) ${blur ? `blur(${blur}px)` : ''}`}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(13,30,25,.18), rgba(13,30,25,.32))', mixBlendMode: 'multiply'}} />
    <AbsoluteFill style={{background: `rgba(13,16,14,${dim})`}} />
    {children}
    <AbsoluteFill style={{background: 'radial-gradient(120% 95% at 50% 45%, transparent 55%, rgba(0,0,0,.55) 100%)', pointerEvents: 'none'}} />
    <AbsoluteFill style={{opacity: 0.08, mixBlendMode: 'overlay', pointerEvents: 'none', backgroundImage:
      'url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27220%27 height=%27220%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%273%27 stitchTiles=%27stitch%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/></svg>")'}} />
  </AbsoluteFill>
);

// A legibility wash for type over footage: darkens one side only.
export const SideWash: React.FC<{side?: 'left' | 'right'; strength?: number}> = ({side = 'right', strength = 0.78}) => (
  <AbsoluteFill style={{background: `linear-gradient(${side === 'right' ? '270deg' : '90deg'}, rgba(10,14,12,${strength}) 0%, rgba(10,14,12,${strength * 0.75}) 35%, transparent 70%)`}} />
);
export const BottomWash: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(8,11,10,.75) 0%, transparent 28%)'}} />
);

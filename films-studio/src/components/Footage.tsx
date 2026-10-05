import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {easeInOut} from '../theme';

// One shot cut from the existing product footage. `from` and `to` are source seconds;
// the shot is stretched to `dur` scene seconds (kept within a natural-looking speed range).
export type Shot = {from: number; to: number; at: number; dur: number};

export const FootageShot: React.FC<{src: string; shot: Shot; fade?: number; scale?: number; offsetX?: number; feather?: string}> = ({src, shot, fade = 0.33, scale = 0.9, offsetX = 0, feather = 'ellipse 92% 88% at 50% 50%, #000 70%'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const rate = Math.min(1.5, Math.max(0.7, (shot.to - shot.from) / shot.dur));
  const inP = easeInOut(t / fade);
  const outP = easeInOut((t - (shot.dur - fade)) / fade);
  const push = 1 + (t / shot.dur) * 0.025; // slow push keeps a held UI alive
  return (
    <AbsoluteFill style={{opacity: inP * (1 - outP)}}>
      <AbsoluteFill style={{
        transform: `translate(${offsetX}px, -18px) scale(${scale * push})`,
        WebkitMaskImage: `radial-gradient(${feather}, transparent 100%)`,
        maskImage: `radial-gradient(${feather}, transparent 100%)`,
      }}>
        <OffthreadVideo src={staticFile(src)} startFrom={Math.round(shot.from * 30)} playbackRate={rate} muted />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

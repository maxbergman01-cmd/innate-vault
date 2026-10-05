import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop, Eyebrow, lerp} from '../../components/Primitives';
import {FootageShot} from '../../components/Footage';
import {C, FONT, easeOut} from '../../theme';

// Final shot: the product's own scaffold model, the line, the name.
export const Close: React.FC<{c1: number; dur: number}> = ({c1, dur}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const a = easeOut((t - c1) / 0.6);
  const b = easeOut((t - (c1 + 1.45)) / 0.6);
  const name = easeOut((t - (c1 + 2.7)) / 0.7);
  const fadeOut = lerp(t, dur - 0.7, dur, 1, 0);

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <Backdrop />
      <Sequence from={0} durationInFrames={Math.round(dur * fps)}>
        {/* the source film burns its own caption under the model; mask the lower band out */}
        <AbsoluteFill style={{WebkitMaskImage: 'linear-gradient(to bottom, #000 58%, transparent 68%)', maskImage: 'linear-gradient(to bottom, #000 58%, transparent 68%)'}}>
          <FootageShot src="footage/dq-v3.mp4" shot={{from: 127.4, to: 133.4, at: 0, dur: dur + 0.4}} scale={1.05} offsetX={-430} fade={0.5} feather="ellipse 46% 50% at 50% 42%, #000 45%" />
        </AbsoluteFill>
      </Sequence>
      <div style={{position: 'absolute', left: 1010, top: 300, width: 820}}>
        <div style={{fontFamily: FONT, fontSize: 70, fontWeight: 500, color: C.white, letterSpacing: '-0.025em', opacity: a, transform: `translateY(${(1 - a) * 16}px)`}}>The drawings arrive.</div>
        <div style={{fontFamily: FONT, fontSize: 70, fontWeight: 500, color: C.mint, letterSpacing: '-0.025em', marginTop: 4, opacity: b, transform: `translateY(${(1 - b) * 16}px)`}}>The quote follows.</div>
        <div style={{marginTop: 80, opacity: name, transform: `translateY(${(1 - name) * 12}px)`}}>
          <div style={{fontFamily: FONT, fontSize: 46, fontWeight: 600, color: C.white, letterSpacing: '-0.02em'}}>Drawing-to-Quote Engine</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 22}}>
            <Img src={staticFile('logo-mark-white.png')} style={{height: 30}} />
            <Eyebrow color={C.muted} style={{fontSize: 20}}>Built by Innate AI</Eyebrow>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Backdrop, Eyebrow, lerp} from '../../components/Primitives';
import {DeskLamp, Estimator} from '../../components/Estimator';
import {C, FONT, easeInOut, easeOut} from '../../theme';

// Scene-relative beats (seconds). Voice lines: p2 3.2s, p3 8.46s, p4 11.02s.
type Beats = {zoom: number; diag: number; loss: number; end: number};

const SHEETS = 27;
const PLAN_INDEX = 19;

const sheetLayout = (i: number) => {
  // Loose collage pinned to the wall behind the desk, plus a few on the desk.
  const col = i % 9;
  const row = Math.floor(i / 9);
  const x = 186 + col * 62 + (random(`x${i}`) - 0.5) * 16;
  const y = 24 + row * 58 + (random(`y${i}`) - 0.5) * 14;
  const r = (random(`r${i}`) - 0.5) * 12;
  return {x, y, r};
};

const Sheet: React.FC<{i: number; t: number}> = ({i, t}) => {
  const {x, y, r} = sheetLayout(i);
  const land = 0.25 + i * 0.085; // all 27 land within ~2.6s
  const p = easeOut((t - land) / 0.35);
  if (p <= 0) return null;
  const isPlan = i === PLAN_INDEX;
  const kind = i % 4;
  return (
    <g transform={`translate(${x} ${y - (1 - p) * 40}) rotate(${r + (1 - p) * 18} 32 24) scale(0.86)`} opacity={p}>
      <rect width="64" height="46" rx="2" fill={isPlan ? '#fbf9f2' : '#efeadc'} stroke="rgba(0,0,0,.25)" strokeWidth="0.6" />
      {kind === 0 && <path d="M10 36 L10 18 L32 8 L54 18 L54 36 Z M26 36 L26 26 L38 26 L38 36" fill="none" stroke="#6d7a73" strokeWidth="1.2" />}
      {kind === 1 && <g stroke="#6d7a73" strokeWidth="1.1" fill="none"><rect x="9" y="9" width="46" height="28" /><path d="M30 9 V37 M9 22 H30" /></g>}
      {kind === 2 && <g stroke="#6d7a73" strokeWidth="1" fill="none"><path d="M8 12 H56 M8 18 H48 M8 24 H52 M8 30 H40" /></g>}
      {kind === 3 && <g stroke="#6d7a73" strokeWidth="1.1" fill="none"><rect x="9" y="9" width="46" height="28" /><circle cx="20" cy="20" r="3" /><circle cx="44" cy="26" r="3" /></g>}
      {isPlan && <g stroke="#6d7a73" strokeWidth="1.1" fill="none"><rect x="9" y="9" width="46" height="28" fill="#fbf9f2" /><path d="M36 9 V37" /><path d="M9 37 L36 9" strokeDasharray="2 2" stroke="#b55c4f" /></g>}
      <circle cx="32" cy="3" r="2" fill="#9a3b2e" />
    </g>
  );
};

const Clock: React.FC<{t: number}> = ({t}) => {
  // Hands sweep from 17:00 to 19:30 while the drawings pile up: the evening disappearing.
  const minutes = 17 * 60 + lerp(t, 0, 3.0, 0, 150) + Math.max(0, t - 3) * 0.5;
  const mAng = (minutes % 60) * 6;
  const hAng = ((minutes / 60) % 12) * 30;
  return (
    <svg width="150" height="150" viewBox="-60 -60 120 120" style={{position: 'absolute', right: 140, top: 110}}>
      <circle r="52" fill="#151d1a" stroke="#2c3733" strokeWidth="4" />
      {Array.from({length: 12}).map((_, k) => (
        <line key={k} x1="0" y1="-44" x2="0" y2={k % 3 === 0 ? -36 : -40} stroke="#56625d" strokeWidth="3" transform={`rotate(${k * 30})`} />
      ))}
      <line x1="0" y1="6" x2="0" y2="-24" stroke={C.paper} strokeWidth="5" strokeLinecap="round" transform={`rotate(${hAng})`} />
      <line x1="0" y1="8" x2="0" y2="-38" stroke={C.loss} strokeWidth="3" strokeLinecap="round" transform={`rotate(${mAng})`} />
      <circle r="4" fill={C.paper} />
    </svg>
  );
};

const Plan: React.FC<{t: number; b: Beats}> = ({t, b}) => {
  const ring = easeOut((t - (b.zoom + 1.6)) / 0.5);
  const diag = easeOut((t - b.diag) / 0.5);
  const dim = lerp(t, b.loss - 0.2, b.loss + 0.6, 1, 0.04);
  const blur = lerp(t, b.loss - 0.2, b.loss + 0.6, 0, 8);
  const pulse = 1 + Math.sin(t * 6) * 0.04 * ring;
  // Building outline 13,000 x 8,990, internal wall; the 12,170 line is a diagonal check across the left section.
  return (
    <svg viewBox="0 0 1600 900" style={{position: 'absolute', inset: 0, opacity: dim, filter: `blur(${blur}px)`}}>
      <rect x="170" y="80" width="1260" height="760" rx="6" fill="#f8f6ef" />
      <text x="230" y="140" fontFamily={FONT} fontSize="20" letterSpacing="3" fill="#7d837c">FOUNDATION PLAN · SCALE 1:50 · DO NOT SCALE</text>
      <text x="1370" y="140" fontFamily={FONT} fontSize="20" textAnchor="end" fill="#7d837c">PAGE 6 OF 27</text>
      <g stroke="#2f3532" strokeWidth="5" fill="none">
        <rect x="300" y="210" width="1000" height="480" />
        <path d="M940 210 V690" strokeWidth="4" />
      </g>
      <g stroke="#9aa19b" strokeWidth="2" fill="none" strokeDasharray="10 8"><rect x="326" y="236" width="948" height="428" /></g>
      {/* overall dimension: the real wall length */}
      <g stroke={diag > 0 ? C.forestLift : '#2f3532'} strokeWidth="2.5">
        <path d="M300 760 H1300 M300 744 V776 M1300 744 V776" />
      </g>
      <text x="800" y="800" textAnchor="middle" fontFamily={FONT} fontSize="30" fontWeight={diag > 0 ? 700 : 500} fill={diag > 0 ? '#1d6b55' : '#2f3532'}>13,000 OVERALL</text>
      <path d="M1360 210 V690" stroke="#2f3532" strokeWidth="2.5" />
      <text x="1392" y="456" fontFamily={FONT} fontSize="26" fill="#2f3532" transform="rotate(90 1392 456)" textAnchor="middle">8,990</text>
      {/* diagonal check */}
      <path d="M300 690 L940 210" stroke={diag > 0 ? C.loss : '#6b716c'} strokeWidth={diag > 0 ? 6 : 3} strokeDasharray="16 10" />
      <text x="590" y="430" fontFamily={FONT} fontSize="30" fontWeight="600" fill={diag > 0 ? '#c4513f' : '#4a504c'} transform="rotate(-36.87 590 430)">12,170 DIAGONAL CHECK</text>
      {ring > 0 && (
        <circle cx="640" cy="420" r={170 * pulse} fill="none" stroke={C.loss} strokeWidth="5" opacity={ring * (1 - diag * 0.6)} />
      )}
      {diag > 0 && (
        <g opacity={diag} fontFamily={FONT}>
          <rect x="1000" y="300" width="270" height="92" rx="12" fill="#fde9e5" />
          <text x="1022" y="338" fontSize="24" fill="#a3402f" fontWeight="700">Diagonal 12.17 m</text>
          <text x="1022" y="372" fontSize="22" fill="#a3402f">not a wall</text>
          <rect x="1000" y="412" width="270" height="92" rx="12" fill="#e2f4ec" />
          <text x="1022" y="450" fontSize="24" fill="#1d6b55" fontWeight="700">Wall 13.00 m</text>
          <text x="1022" y="484" fontSize="22" fill="#1d6b55">what the quote needs</text>
        </g>
      )}
    </svg>
  );
};

export const Problem: React.FC<{beats: Beats}> = ({beats: b}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  // Camera: wide room, then push into the foundation plan sheet on the wall.
  const zp = easeInOut((t - b.zoom) / 1.2);
  const plan = sheetLayout(PLAN_INDEX);
  const sceneScale = 1 + zp * 9;
  const focusX = (plan.x + 27) / 800;
  const focusY = (plan.y + 20) / 600;
  const planIn = easeOut((t - (b.zoom + 0.8)) / 0.6);
  const loss = easeOut((t - b.loss) / 0.6);
  const count = Math.min(SHEETS, Math.max(0, Math.floor((t - 0.25) / 0.085) + 1));
  const roomOpacity = 1 - planIn;

  return (
    <AbsoluteFill>
      <Backdrop tint="#13302a" />
      <AbsoluteFill style={{opacity: roomOpacity}}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%', width: 1400, height: 1050,
          transform: `translate(-50%,-50%) scale(${sceneScale})`,
          transformOrigin: `${focusX * 100}% ${focusY * 100}%`,
        }}>
          <svg viewBox="0 0 800 600" width="1400" height="1050">
            <ellipse cx="420" cy="562" rx="330" ry="10" fill="rgba(0,0,0,.35)" />
            
            {Array.from({length: SHEETS}).map((_, i) => <Sheet key={i} i={i} t={t} />)}
            {/* pile on the desk */}
            {Array.from({length: Math.min(9, Math.floor(count / 3))}).map((_, k) => (
              <rect key={k} x={470 + (random(`p${k}`) - 0.5) * 14} y={352 - k * 4} width="120" height="5" rx="1" fill={k % 2 ? '#e7e1d1' : '#f2eee3'} />
            ))}
            <DeskLamp glow={0.85 + Math.sin(t * 2) * 0.03} />
            <Estimator pose="buried" breathe={t * 1.6} writing={t} />
          </svg>
        </div>
        <Clock t={t} />
        <div style={{position: 'absolute', left: 110, top: 96, opacity: lerp(t, 0.2, 0.6, 0, 1) * (1 - zp)}}>
          <div style={{fontFamily: FONT, fontWeight: 600, fontSize: 168, lineHeight: 1, color: C.white, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums'}}>{count}</div>
          <Eyebrow style={{marginTop: 10}} color={C.muted}>pages · one house type</Eyebrow>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: planIn, transform: `scale(${1.08 - planIn * 0.08 + lerp(t, b.zoom + 1, b.loss, 0, 0.04)})`}}>
        <Plan t={t} b={b} />
      </AbsoluteFill>

      {loss > 0 && (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: loss}}>
          <div style={{textAlign: 'center', transform: `translateY(${(1 - loss) * 24}px)`}}>
            <div style={{fontFamily: FONT, fontWeight: 600, fontSize: 280, lineHeight: 1, color: C.loss, letterSpacing: '-0.05em', textShadow: '0 30px 80px rgba(0,0,0,.45)'}}>−£157</div>
            <div style={{fontFamily: FONT, fontSize: 44, color: C.white, marginTop: 18, fontWeight: 500}}>on one plot</div>
            <div style={{fontFamily: FONT, fontSize: 30, color: C.muted, marginTop: 14, opacity: lerp(t, b.loss + 0.9, b.loss + 1.5, 0, 1)}}>6.5 m of scaffold missing from the quote</div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

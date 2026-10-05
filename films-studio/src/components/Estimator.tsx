import React from 'react';

// Faceless, flat editorial figure at a desk. Built from rounded strokes so it reads
// as "a person doing the job" without depicting anyone real.
// pose 'buried': slumped, head in hand, pencil on paper. pose 'calm': upright, mug in hand.

const SKIN = '#d6a587';
const SKIN_SHADE = '#b9876b';
const HAIR = '#2a2522';
const SHIRT = '#2c6b5a';
const SHIRT_SHADE = '#1f5245';
const TROUSER = '#1b2421';
const SHOE = '#0e1312';
const CHAIR = '#2a3330';
const DESK = '#3a3f3a';
const DESK_TOP = '#4a504a';

type Props = {pose: 'buried' | 'calm'; breathe?: number; writing?: number};

export const Estimator: React.FC<Props> = ({pose, breathe = 0, writing = 0}) => {
  const b = Math.sin(breathe) * 2.2; // slow breathing bob
  const buried = pose === 'buried';
  // Key joints (viewBox 0 0 800 600). Desk top at y=360.
  const hip = {x: 228, y: 398};
  const shoulder = buried ? {x: 300, y: 268 + b} : {x: 262, y: 246 + b};
  const head = buried ? {x: 338, y: 214 + b} : {x: 280, y: 194 + b};
  const pencilWiggle = Math.sin(writing * 9) * 6;

  return (
    <g>
      {/* chair */}
      <path d="M150 232 Q146 228 152 224 L170 224 Q176 226 176 232 L184 392 L168 392 Z" fill={CHAIR} />
      <rect x="150" y="392" width="140" height="16" rx="8" fill={CHAIR} />
      <rect x="212" y="408" width="10" height="120" fill={CHAIR} />
      <path d="M170 536 L264 536" stroke={CHAIR} strokeWidth="10" strokeLinecap="round" />

      {/* far leg */}
      <path d={`M${hip.x + 6} ${hip.y - 4} L344 404 L350 540`} stroke="#141c19" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M338 548 L382 548" stroke={SHOE} strokeWidth="18" strokeLinecap="round" />

      {/* desk */}
      <rect x="300" y="360" width="470" height="16" rx="4" fill={DESK_TOP} />
      <rect x="318" y="376" width="14" height="190" fill={DESK} />
      <rect x="738" y="376" width="14" height="190" fill={DESK} />
      <rect x="332" y="376" width="406" height="40" fill="#2f3430" />

      {/* far arm */}
      {buried ? (
        <g>
          <path d={`M${shoulder.x - 8} ${shoulder.y + 6} L378 332 L ${436 + pencilWiggle} 350`} stroke={SHIRT_SHADE} strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx={440 + pencilWiggle} cy={350} r="12" fill={SKIN_SHADE} />
          <path d={`M${444 + pencilWiggle} 346 L${470 + pencilWiggle} 324`} stroke="#e8b84a" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <path d={`M${shoulder.x - 6} ${shoulder.y + 8} L322 322 L380 344`} stroke={SHIRT_SHADE} strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="384" cy="344" r="12" fill={SKIN_SHADE} />
        </g>
      )}

      {/* torso */}
      <path
        d={`M${hip.x - 26} ${hip.y + 8} Q${hip.x - 34} ${(hip.y + shoulder.y) / 2} ${shoulder.x - 30} ${shoulder.y - 4}
            Q${shoulder.x} ${shoulder.y - 22} ${shoulder.x + 26} ${shoulder.y + 4}
            Q${shoulder.x + 14} ${(hip.y + shoulder.y) / 2 + 10} ${hip.x + 36} ${hip.y + 8} Z`}
        fill={SHIRT}
      />
      {/* neck */}
      <path d={`M${shoulder.x - 2} ${shoulder.y - 6} L${head.x - 8} ${head.y + 26}`} stroke={SKIN_SHADE} strokeWidth="20" strokeLinecap="round" />

      {/* near leg */}
      <path d={`M${hip.x} ${hip.y} L330 410 L326 542`} stroke={TROUSER} strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M316 552 L366 552" stroke={SHOE} strokeWidth="20" strokeLinecap="round" />

      {/* head, faceless */}
      <ellipse cx={head.x} cy={head.y} rx="33" ry="37" fill={SKIN} transform={buried ? `rotate(14 ${head.x} ${head.y})` : `rotate(-4 ${head.x} ${head.y})`} />
      <path
        d={buried
          ? `M${head.x - 30} ${head.y + 8} Q${head.x - 44} ${head.y - 34} ${head.x - 6} ${head.y - 40} Q${head.x + 30} ${head.y - 42} ${head.x + 32} ${head.y - 16} Q${head.x + 6} ${head.y - 22} ${head.x - 12} ${head.y - 4} Z`
          : `M${head.x - 32} ${head.y + 6} Q${head.x - 40} ${head.y - 38} ${head.x} ${head.y - 40} Q${head.x + 32} ${head.y - 40} ${head.x + 30} ${head.y - 12} Q${head.x + 4} ${head.y - 24} ${head.x - 18} ${head.y - 6} Z`}
        fill={HAIR}
      />
      <ellipse cx={head.x - 22} cy={head.y + 4} rx="6" ry="9" fill={SKIN_SHADE} />

      {/* near arm */}
      {buried ? (
        <g>
          <path d={`M${shoulder.x + 4} ${shoulder.y + 10} L366 352 L${head.x + 14} ${head.y + 30}`} stroke={SHIRT} strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <ellipse cx={head.x + 16} cy={head.y + 22} rx="14" ry="17" fill={SKIN} />
        </g>
      ) : (
        <g>
          <path d={`M${shoulder.x + 6} ${shoulder.y + 10} L300 330 L352 302`} stroke={SHIRT} strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="358" cy="298" r="13" fill={SKIN} />
          {/* mug */}
          <rect x="350" y="268" width="34" height="40" rx="6" fill="#e9e4d6" />
          <path d="M384 278 q16 4 0 20" stroke="#e9e4d6" strokeWidth="6" fill="none" />
          <path d="M360 260 q6 -10 0 -20 M372 258 q6 -10 0 -20" stroke="rgba(255,255,255,.35)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

export const DeskLamp: React.FC<{glow: number}> = ({glow}) => (
  <g>
    <defs>
      <radialGradient id="lampGlow" cx="0.5" cy="0" r="1">
        <stop offset="0" stopColor="#f3d9a4" stopOpacity={0.55 * glow} />
        <stop offset="1" stopColor="#f3d9a4" stopOpacity="0" />
      </radialGradient>
    </defs>
    <path d="M640 236 L540 372 L760 372 Z" fill="url(#lampGlow)" />
    <rect x="690" y="350" width="56" height="10" rx="5" fill="#222826" />
    <path d="M718 352 L700 270 L652 232" stroke="#222826" strokeWidth="7" strokeLinecap="round" fill="none" />
    <path d="M626 214 L676 232 L660 260 L612 240 Z" fill="#2c3431" />
    <ellipse cx="636" cy="250" rx="22" ry="6" fill="#f6e2b8" opacity={0.9 * glow} transform="rotate(22 636 250)" />
  </g>
);

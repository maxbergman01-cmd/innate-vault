import React from 'react';
import {C, F} from '../theme';

// Fact Find Writer screens, rebuilt from the product's own UI (as shown in the existing film)
// so they stay razor sharp at any zoom and can animate state by state.

export const AppWindow: React.FC<{width: number; height: number; children: React.ReactNode; badge?: string}> = ({width, height, children, badge = 'Owen and Freya Leslie · annual review'}) => (
  <div style={{width, height, borderRadius: 18, overflow: 'hidden', background: C.uiBg, boxShadow: '0 60px 120px rgba(0,0,0,.55), 0 20px 40px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.06)', display: 'flex', flexDirection: 'column'}}>
    <div style={{height: 62, background: '#14201b', display: 'flex', alignItems: 'center', padding: '0 28px', gap: 12, flexShrink: 0}}>
      <div style={{width: 30, height: 30, borderRadius: 8, background: C.mint, display: 'grid', placeItems: 'center', fontFamily: F.sans, fontWeight: 800, fontStyle: 'italic', color: '#0e3b2f', fontSize: 18}}>L</div>
      <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 21, color: C.white}}>Innate</div>
      <div style={{fontFamily: F.sans, fontSize: 20, color: 'rgba(255,255,255,.6)'}}>· Fact Find Writer</div>
      <div style={{marginLeft: 'auto', border: '1px solid rgba(255,255,255,.22)', borderRadius: 8, padding: '7px 14px', fontFamily: F.sans, fontSize: 15, color: 'rgba(255,255,255,.85)'}}>{badge}</div>
    </div>
    {children}
  </div>
);

export const Header: React.FC<{eyebrow: string; title?: string; count?: number}> = ({eyebrow, title = 'Owen and Freya Leslie', count}) => (
  <div style={{background: '#fff', padding: '30px 40px 26px', borderBottom: `1px solid ${C.uiLine}`, display: 'flex', alignItems: 'flex-end'}}>
    <div>
      <div style={{borderLeft: `3px solid ${C.mintDeep}`, paddingLeft: 10, fontFamily: F.sans, fontSize: 14, letterSpacing: '.14em', color: C.uiMuted}}>{eyebrow}</div>
      <div style={{fontFamily: F.sans, fontWeight: 600, fontSize: 44, letterSpacing: '-0.03em', color: C.uiText, marginTop: 10}}>{title}</div>
    </div>
    {count !== undefined && (
      <div style={{marginLeft: 'auto', textAlign: 'right'}}>
        <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 72, lineHeight: 1, color: C.mintDeep, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums'}}>{count}</div>
        <div style={{fontFamily: F.mono, fontSize: 13, letterSpacing: '.14em', color: C.uiMuted, marginTop: 6}}>PROPOSED CHANGES</div>
      </div>
    )}
  </div>
);

export const TILES: [string, number, string][] = [
  ['Income', 14, 'salary, profit, rental'], ['Property', 9, 'home, flat, valuations'], ['Pensions', 12, 'workplace, personal'],
  ['Protection', 8, 'death in service, cover'], ['Children', 6, 'Isla, Rory'], ['Spending', 23, 'household budget'],
  ['Debts', 11, 'mortgages, loans'], ['Goals', 10, 'retire at 60, school fees'], ['Profile', 19, 'contact, health, will'],
];

export const Tiles: React.FC<{shown?: number}> = ({shown = 9}) => (
  <div style={{padding: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20}}>
    {TILES.map(([k, n, d], i) => (
      <div key={k} style={{background: '#fff', borderRadius: 14, border: `1px solid ${C.uiLine}`, padding: '24px 26px', opacity: i < shown ? 1 : 0, transform: `translateY(${i < shown ? 0 : 14}px)`}}>
        <div style={{fontFamily: F.sans, fontSize: 15, letterSpacing: '.12em', color: C.uiMuted}}>{k.toUpperCase()}</div>
        <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 46, color: C.uiText, marginTop: 6}}>{n}</div>
        <div style={{fontFamily: F.sans, fontSize: 18, color: C.uiMuted, marginTop: 2}}>{d}</div>
      </div>
    ))}
  </div>
);

export const Card: React.FC<{title: string; who?: string; tag?: {text: string; tone: 'ok' | 'warn' | 'hold'}; children: React.ReactNode; style?: React.CSSProperties}> = ({title, who, tag, children, style}) => {
  const tones = {ok: ['#e3f5ec', '#1d6b55'], warn: ['#fbefd9', '#9a6a12'], hold: ['#fde6e2', '#b0402f']};
  return (
    <div style={{background: '#fff', borderRadius: 16, border: `1px solid ${C.uiLine}`, overflow: 'hidden', ...style}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '22px 26px', borderBottom: `1px solid ${C.uiLine}`}}>
        <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 24, color: C.uiText}}>{title}</div>
        {who && <div style={{fontFamily: F.sans, fontSize: 21, color: C.uiMuted}}>{who}</div>}
        {tag && <div style={{marginLeft: 'auto', background: tones[tag.tone][0], color: tones[tag.tone][1], fontFamily: F.sans, fontWeight: 600, fontSize: 15, padding: '6px 12px', borderRadius: 999}}>{tag.text}</div>}
      </div>
      <div style={{padding: '22px 26px'}}>{children}</div>
    </div>
  );
};

const ICONS: Record<string, React.ReactNode> = {
  pen: <path d="M4 20l4-1 10-10-3-3L5 16l-1 4zM14 6l3 3" />,
  image: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-8 8" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M20 20H3" /></>,
  table: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 4v16" /></>,
  quote: <><path d="M5 6h14v10H9l-4 4z" /><path d="M9 10h6" /></>,
};
export const SourceChip: React.FC<{icon: keyof typeof ICONS | string; label: string; style?: React.CSSProperties}> = ({icon, label, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, background: '#fff', border: `1px solid ${C.uiLine}`, borderRadius: 14, padding: '14px 20px 14px 14px', fontFamily: F.sans, fontSize: 21, fontWeight: 500, color: C.uiText, boxShadow: '0 18px 40px rgba(0,0,0,.28)', ...style}}>
    <span style={{width: 34, height: 34, borderRadius: 9, background: '#e5f3ec', display: 'grid', placeItems: 'center'}}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.mintDeep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONS[icon]}</svg>
    </span>{label}
  </div>
);

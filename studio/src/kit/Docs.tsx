import React from 'react';
import {C, F} from '../theme';

// Client paperwork, drawn as real-looking documents rather than grey rectangles.
type P = {style?: React.CSSProperties; w?: number};

const sheet = (w: number, h: number, extra?: React.CSSProperties): React.CSSProperties => ({
  width: w, height: h, background: '#fbfaf5', borderRadius: 6, position: 'relative', overflow: 'hidden',
  boxShadow: '0 30px 60px rgba(0,0,0,.45), 0 8px 18px rgba(0,0,0,.3)', ...extra,
});
const line = (w: string | number, o = 0.14, h = 6): React.CSSProperties => ({height: h, width: w, background: `rgba(20,24,20,${o})`, borderRadius: 3});

export const HandwrittenFactFind: React.FC<P> = ({style, w = 360}) => {
  const rows: [string, string][] = [['Name', 'Owen & Freya Leslie'], ['Employer', 'Tamarind Rail'], ['Salary', '£80k?  65k from Oct'], ['Home value', '£395,000'], ['Mortgage', '£212,400'], ['Children', 'Isla (9), Rory (6)'], ['Goals', 'retire at 60']];
  return (
    <div style={{...sheet(w, w * 1.32), padding: 26, ...style}}>
      <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 15, letterSpacing: '.14em', color: '#3a4039'}}>CLIENT FACT FIND</div>
      <div style={{...line('100%', 0.2, 2), margin: '10px 0 14px'}} />
      {rows.map(([k, v]) => (
        <div key={k} style={{display: 'flex', alignItems: 'flex-end', gap: 10, height: w * 0.115, borderBottom: '1.5px solid rgba(20,24,20,.13)'}}>
          <div style={{fontFamily: F.sans, fontSize: 12, color: '#7a8079', width: 78, paddingBottom: 6, letterSpacing: '.04em'}}>{k.toUpperCase()}</div>
          <div style={{fontFamily: F.hand, fontSize: w * 0.075, color: '#24366b', lineHeight: 1, paddingBottom: 2, transform: `rotate(${(k.length % 3) - 1}deg)`}}>{v}</div>
        </div>
      ))}
    </div>
  );
};

export const Passport: React.FC<P> = ({style, w = 250}) => (
  <div style={{...sheet(w, w * 0.7, {background: '#e9ecef'}), padding: 16, display: 'flex', gap: 14, ...style}}>
    <div style={{width: w * 0.3, height: '100%', borderRadius: 4, background: 'linear-gradient(180deg,#cfd6dd,#b8c2cc)', position: 'relative', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: '22%', top: '18%', width: '56%', height: '42%', borderRadius: '50%', background: '#8c97a3'}} />
      <div style={{position: 'absolute', left: '8%', bottom: '-12%', width: '84%', height: '50%', borderRadius: '50% 50% 0 0', background: '#8c97a3'}} />
    </div>
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 4}}>
      <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 11, letterSpacing: '.16em', color: '#5b2738'}}>PASSPORT</div>
      <div style={line('80%', 0.22)} /><div style={line('62%')} /><div style={line('70%')} /><div style={line('45%')} />
      <div style={{marginTop: 'auto', fontFamily: F.mono, fontSize: 9, color: '#59606a', letterSpacing: '.08em'}}>P&lt;GBRLESLIE&lt;&lt;FREYA&lt;&lt;&lt;</div>
    </div>
  </div>
);

export const Payslip: React.FC<P> = ({style, w = 280}) => (
  <div style={{...sheet(w, w * 0.92), padding: 20, ...style}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
      <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 14, color: '#2b302b'}}>Tamarind Rail</div>
      <div style={{fontFamily: F.sans, fontSize: 11, color: '#7a8079', letterSpacing: '.12em'}}>PAYSLIP</div>
    </div>
    <div style={{...line('100%', 0.18, 2), margin: '12px 0'}} />
    {[['Basic pay', '£5,416.67'], ['Pension', '-£270.83'], ['Tax', '-£912.40'], ['NI', '-£351.12']].map(([a, b]) => (
      <div key={a} style={{display: 'flex', justifyContent: 'space-between', fontFamily: F.sans, fontSize: 13, color: '#3d433d', padding: '5px 0'}}><span>{a}</span><span style={{fontVariantNumeric: 'tabular-nums'}}>{b}</span></div>
    ))}
    <div style={{...line('100%', 0.18, 2), margin: '10px 0'}} />
    <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: F.sans, fontSize: 14, fontWeight: 700, color: '#1d221d'}}><span>Net pay</span><span>£3,882.32</span></div>
  </div>
);

export const PensionStatement: React.FC<P> = ({style, w = 300}) => (
  <div style={{...sheet(w, w * 1.1), padding: 22, ...style}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
      <div style={{width: 26, height: 26, borderRadius: 13, background: '#2f6f8f'}} />
      <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 14, color: '#22303a'}}>Brightwater Life</div>
    </div>
    <div style={{fontFamily: F.sans, fontSize: 11, color: '#7a8079', marginTop: 14, letterSpacing: '.12em'}}>ANNUAL PENSION STATEMENT</div>
    <div style={{fontFamily: F.sans, fontSize: 30, fontWeight: 700, color: '#1d2a33', marginTop: 8}}>£142,860</div>
    <div style={{fontFamily: F.sans, fontSize: 11, color: '#7a8079'}}>Transfer value at 5 April</div>
    <div style={{display: 'flex', alignItems: 'flex-end', gap: 7, height: 70, marginTop: 18}}>
      {[30, 38, 44, 52, 61, 70].map((h, i) => <div key={i} style={{flex: 1, height: `${h}%`, background: i === 5 ? '#2f6f8f' : '#c9d7df', borderRadius: 2}} />)}
    </div>
    <div style={{marginTop: 14, display: 'grid', gap: 8}}><div style={line('90%')} /><div style={line('72%')} /></div>
  </div>
);

export const Spreadsheet: React.FC<P> = ({style, w = 340}) => {
  const rows = [['Property', 'Value', 'Mortgage'], ['14 Elm Rise', '£395,000', '£212,400'], ['Flat 3, Quay St', '£186,000', '£98,750'], ['Garage plot', '£22,000', '—']];
  return (
    <div style={{...sheet(w, w * 0.56), ...style}}>
      <div style={{height: 26, background: '#1f7a4a', display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: F.sans, fontSize: 11, color: '#fff', fontWeight: 600}}>properties_2026.xlsx</div>
      {rows.map((r, i) => (
        <div key={i} style={{display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', borderBottom: '1px solid #e2e5df', background: i === 0 ? '#eef1ec' : 'transparent'}}>
          {r.map((c, k) => <div key={k} style={{fontFamily: F.sans, fontSize: 12, padding: '7px 10px', color: '#2b302b', fontWeight: i === 0 ? 700 : 400, borderRight: '1px solid #e2e5df'}}>{c}</div>)}
        </div>
      ))}
    </div>
  );
};

export const VoiceNote: React.FC<P & {progress?: number}> = ({style, w = 300, progress = 0.4}) => (
  <div style={{width: w, height: 74, borderRadius: 37, background: '#1b2420', border: '1px solid rgba(120,230,182,.35)', display: 'flex', alignItems: 'center', gap: 14, padding: '0 22px', boxShadow: '0 24px 50px rgba(0,0,0,.45)', ...style}}>
    <div style={{width: 38, height: 38, borderRadius: 19, background: C.mint, display: 'grid', placeItems: 'center'}}>
      <div style={{width: 0, height: 0, borderLeft: '12px solid #0d100e', borderTop: '8px solid transparent', borderBottom: '8px solid transparent', marginLeft: 3}} />
    </div>
    <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 3, height: 34}}>
      {Array.from({length: 30}).map((_, i) => {
        const h = 20 + Math.abs(Math.sin(i * 1.7) * 60 + Math.sin(i * 0.6) * 30);
        return <div key={i} style={{flex: 1, height: `${Math.min(100, h)}%`, borderRadius: 2, background: i / 30 < progress ? C.mint : 'rgba(255,255,255,.28)'}} />;
      })}
    </div>
    <div style={{fontFamily: F.mono, fontSize: 14, color: C.muted}}>0:32</div>
  </div>
);

export const Transcript: React.FC<P> = ({style, w = 340}) => (
  <div style={{...sheet(w, w * 0.9), padding: 22, ...style}}>
    <div style={{fontFamily: F.mono, fontSize: 11, color: '#7a8079', letterSpacing: '.1em'}}>MEETING TRANSCRIPT · 1H 30M</div>
    {[['Owen', 'After the restructure it’s eighty… actually no, sixty-five.'], ['Freya', 'Four days a week from January.'], ['Adviser', 'And the old workplace pension?']].map(([who, t]) => (
      <div key={who} style={{marginTop: 14, fontFamily: F.sans, fontSize: 14, lineHeight: 1.45, color: '#2b302b'}}><b>{who}:</b> {t}</div>
    ))}
  </div>
);

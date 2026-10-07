import React from 'react';
import {AbsoluteFill} from 'remotion';
import Peep from 'react-peeps';
import {Brand, Eyebrow, Stage, Subtitle} from '../kit/Stage';
import {HandwrittenFactFind, Passport, Payslip, PensionStatement, Spreadsheet, Transcript, VoiceNote} from '../kit/Docs';
import {AppWindow, Card, Header, SourceChip, Tiles} from '../ui/FactFind';
import {C, F} from '../theme';

const Float: React.FC<{x: number; y: number; r?: number; s?: number; blur?: number; z?: number; children: React.ReactNode}> = ({x, y, r = 0, s = 1, blur = 0, z = 1, children}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `rotate(${r}deg) scale(${s})`, filter: blur ? `blur(${blur}px)` : undefined, zIndex: z, transformOrigin: 'center'}}>{children}</div>
);

// One character for the whole film: same hair, same dotted sweater; only the expression changes.
const Adviser: React.FC<{face: 'Tired' | 'Smile' | 'SmileBig' | 'Calm'; size: number}> = ({face, size}) => (
  <Peep face={face} body="Paper" hair="Bun" strokeColor="#0d100e" backgroundColor={C.paper}
    viewBox={{x: '-60', y: '-130', width: '1000', height: '1240'}} style={{width: size, height: size * 1.24}} />
);

// 0:02 Hook. The meeting has ended; the paperwork lands on the adviser.
export const FFW1: React.FC = () => (
  <Stage glow={[30, 30]} tint="#1f4a3f">
    {/* depth: blurred documents far back */}
    <Float x={60} y={40} r={-14} s={0.8} blur={5} z={0}><Spreadsheet w={340} /></Float>
    <Float x={760} y={620} r={11} s={0.9} blur={4} z={0}><Passport w={260} /></Float>
    {/* the adviser, lit from the desk lamp */}
    <div style={{position: 'absolute', left: 150, top: 250, width: 640, height: 640, borderRadius: '50%', background: `radial-gradient(circle at 50% 40%, ${C.amber}55, transparent 65%)`}} />
    <Float x={190} y={200} z={2}><Adviser face="Tired" size={600} /></Float>
    {/* paperwork piling in around her */}
    <Float x={20} y={300} r={-9} z={3}><HandwrittenFactFind w={300} /></Float>
    <Float x={600} y={150} r={8} z={3}><PensionStatement w={250} /></Float>
    <Float x={660} y={520} r={-6} z={4}><Payslip w={250} /></Float>
    <Float x={330} y={40} r={4} z={1}><Transcript w={280} /></Float>
    <Float x={90} y={860} r={-3} z={5}><VoiceNote w={330} progress={0.55} /></Float>
    {/* the pain number */}
    <div style={{position: 'absolute', left: 1080, top: 300, width: 760}}>
      <Eyebrow color={C.muted}>Owen & Freya Leslie · annual review</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 300, lineHeight: 0.9, letterSpacing: '-0.06em', color: C.white, marginTop: 28}}>100<span style={{color: C.coral}}>+</span></div>
      <div style={{fontFamily: F.sans, fontSize: 52, fontWeight: 500, letterSpacing: '-0.02em', color: C.white, marginTop: 20, lineHeight: 1.1}}>fields to type in.<br /><span style={{color: C.muted}}>For one couple.</span></div>
    </div>
    <Brand />
    <Subtitle>The review’s over. Now someone types it all in.</Subtitle>
  </Stage>
);

// 0:07 The slip. One missing set of zeros in a regulated record.
export const FFW2: React.FC = () => (
  <Stage glow={[78, 55]} tint="#4a2420">
    <div style={{position: 'absolute', left: 120, top: 250, width: 760}}>
      <Eyebrow color={C.coral}>One slip</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 170, letterSpacing: '-0.055em', lineHeight: 0.95, marginTop: 30, color: 'rgba(255,254,250,.3)', position: 'relative', display: 'inline-block'}}>
        £500,000
        <div style={{position: 'absolute', left: -6, right: -6, top: '52%', height: 10, background: C.coral, borderRadius: 5, transform: 'rotate(-3deg)'}} />
      </div>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 260, letterSpacing: '-0.06em', lineHeight: 0.9, color: C.coral}}>£500</div>
      <div style={{fontFamily: F.sans, fontSize: 40, fontWeight: 500, color: C.white, marginTop: 26, letterSpacing: '-0.015em'}}>In a regulated record.</div>
    </div>
    <div style={{position: 'absolute', left: 930, top: 250, transform: 'perspective(2000px) rotateY(-16deg) rotateX(6deg)', transformOrigin: 'left center'}}>
      <div style={{width: 800, background: '#eceeea', borderRadius: 16, boxShadow: '0 70px 140px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.05)', overflow: 'hidden'}}>
        <div style={{height: 54, background: '#5f6a73', display: 'flex', alignItems: 'center', padding: '0 26px', fontFamily: F.sans, fontSize: 19, color: '#fff'}}>Client record · Leslie, Owen</div>
        <div style={{display: 'flex', gap: 20, padding: '14px 26px', borderBottom: '1px solid #cfd3cf', fontFamily: F.sans, fontSize: 16, color: '#5a615b'}}>
          {['Details', 'Income', 'Assets', 'Liabilities', 'Plans', 'Protection', 'Goals'].map((t) => <span key={t} style={{fontWeight: t === 'Plans' ? 700 : 400, color: t === 'Plans' ? '#1d221d' : undefined, borderBottom: t === 'Plans' ? '2px solid #1d221d' : 'none', paddingBottom: 4}}>{t}</span>)}
        </div>
        <div style={{padding: '30px 30px 36px', display: 'grid', gap: 18}}>
          {[['Provider', 'Brightwater Life'], ['Plan type', 'Workplace pension'], ['Start date', '04/09/2017']].map(([k, v]) => (
            <div key={k} style={{display: 'grid', gridTemplateColumns: '250px 1fr', alignItems: 'center'}}>
              <div style={{fontFamily: F.sans, fontSize: 20, color: '#5a615b'}}>{k}</div>
              <div style={{background: '#fff', border: '1px solid #cfd3cf', borderRadius: 7, padding: '12px 16px', fontFamily: F.mono, fontSize: 19, color: '#2b302b'}}>{v}</div>
            </div>
          ))}
          <div style={{display: 'grid', gridTemplateColumns: '250px 1fr', alignItems: 'center'}}>
            <div style={{fontFamily: F.sans, fontSize: 20, color: '#5a615b'}}>Transfer value</div>
            <div style={{background: '#fff3f1', border: `2px solid ${C.coralDeep}`, borderRadius: 7, padding: '12px 16px', fontFamily: F.mono, fontSize: 19, color: C.coralDeep, display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 0 0 6px rgba(240,138,122,.18)'}}>
              £500<span style={{width: 2, height: 22, background: C.coralDeep}} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Brand />
    <Subtitle>One slip, and five hundred thousand becomes five hundred.</Subtitle>
  </Stage>
);

// 0:24 The build. Everything goes in at once; 112 changes come back, sorted.
export const FFW3: React.FC = () => {
  const chips: [string, string, number][] = [
    ['pen', 'Handwritten fact find', -3], ['image', 'Passport photos · 2', 2], ['image', 'Payslip photo', -2],
    ['doc', 'Pension statement', 3], ['table', 'Properties spreadsheet', -2], ['quote', 'Meeting transcript · 1h 30m', 2],
  ];
  return (
    <Stage glow={[66, 34]}>
      <div style={{position: 'absolute', left: 110, top: 96}}>
        <Eyebrow>Fact Find Writer</Eyebrow>
        <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 62, letterSpacing: '-0.035em', color: C.white, marginTop: 16, lineHeight: 1.05}}>Put it all in.<br /><span style={{color: C.muted}}>However it arrived.</span></div>
      </div>
      {chips.map(([i, l, r], k) => (
        <div key={l} style={{position: 'absolute', left: 110 + (k % 2) * 40, top: 340 + k * 82, transform: `rotate(${r}deg)`}}><SourceChip icon={i} label={l} /></div>
      ))}
      <div style={{position: 'absolute', left: 130, top: 840}}><VoiceNote w={340} progress={0.8} /></div>
      <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 7}).map((_, k) => (
          <path key={k} d={`M ${470 + (k % 2) * 40} ${372 + k * 82} C 620 ${372 + k * 82}, 640 ${470 + k * 30}, 760 ${480 + k * 26}`} stroke="rgba(120,230,182,.4)" strokeWidth="2" fill="none" strokeDasharray="5 8" />
        ))}
      </svg>
      <div style={{position: 'absolute', left: 770, top: 170, transform: 'perspective(2400px) rotateY(-10deg) rotateX(3deg)', transformOrigin: 'left center'}}>
        <div style={{transform: 'scale(0.82)', transformOrigin: 'left top'}}>
          <AppWindow width={1300} height={900}>
            <Header eyebrow="PROPOSED UPDATE · READY TO CHECK" count={112} />
            <Tiles />
          </AppWindow>
        </div>
      </div>
      <Brand />
      <Subtitle>About a minute later: 112 changes, ready to check.</Subtitle>
    </Stage>
  );
};

// 0:36 The intelligence. It follows the conversation: Owen corrects himself, the record takes the correction.
export const FFW4: React.FC = () => (
  <Stage glow={[55, 30]}>
    <div style={{position: 'absolute', left: 120, top: 110}}><Eyebrow>It follows the conversation</Eyebrow></div>
    <div style={{position: 'absolute', left: 110, top: 230, width: 900, transform: 'perspective(2000px) rotateY(8deg)', transformOrigin: 'right center'}}>
      <Card title="Meeting transcript" who="08:13:12">
        <div style={{fontFamily: F.sans, fontSize: 44, lineHeight: 1.42, color: C.uiText, letterSpacing: '-0.01em'}}>
          <b>Owen:</b> After the restructure it’s <span style={{position: 'relative', color: C.uiMuted}}>eighty<span style={{position: 'absolute', left: -4, right: -4, top: '55%', height: 5, background: C.coralDeep, borderRadius: 3}} /></span>… actually no, <span style={{background: '#d5f3e5', color: C.mintDeep, padding: '0 10px', borderRadius: 8, fontWeight: 700}}>sixty-five</span>.
        </div>
      </Card>
    </div>
    <svg width="1920" height="1080" style={{position: 'absolute', inset: 0}}>
      <defs><filter id="g"><feGaussianBlur stdDeviation="6" /></filter></defs>
      <path d="M 700 470 C 860 640, 1000 640, 1110 640" stroke={C.mint} strokeWidth="10" fill="none" opacity=".35" filter="url(#g)" />
      <path d="M 700 470 C 860 640, 1000 640, 1110 640" stroke={C.mint} strokeWidth="4" fill="none" />
      <circle cx="1110" cy="640" r="10" fill={C.mint} />
    </svg>
    <div style={{position: 'absolute', left: 1110, top: 520, width: 700, transform: 'perspective(2000px) rotateY(-8deg)', transformOrigin: 'left center'}}>
      <Card title="Basic income" who="Owen" tag={{text: 'From transcript', tone: 'ok'}}>
        <div style={{fontFamily: F.sans, fontSize: 22, color: C.uiMuted}}>Gross annual salary</div>
        <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 96, color: C.uiText, letterSpacing: '-0.03em', lineHeight: 1.1}}>£65,000</div>
        <div style={{display: 'inline-block', marginTop: 10, background: '#e3f5ec', color: C.mintDeep, fontFamily: F.sans, fontSize: 20, fontWeight: 600, padding: '8px 14px', borderRadius: 999}}>Corrected figure used · £80,000 not written</div>
      </Card>
    </div>
    <Brand />
    <Subtitle>Owen said eighty, then corrected himself. It takes sixty-five.</Subtitle>
  </Stage>
);

// 1:00 The payoff. Same adviser, evening back. The result number, large.
export const FFW5: React.FC = () => (
  <Stage glow={[70, 40]} tint="#1d5246">
    <div style={{position: 'absolute', left: 170, top: 170, width: 560, height: 560, borderRadius: '50%', background: C.mint, boxShadow: `0 0 160px ${C.mint}55`}} />
    <div style={{position: 'absolute', left: 150, top: 150}}><Adviser face="SmileBig" size={560} /></div>
    <div style={{position: 'absolute', left: 880, top: 230, width: 960}}>
      <Eyebrow>Every year, across 156 fact finds</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 330, lineHeight: 0.88, letterSpacing: '-0.065em', color: C.mint, marginTop: 24}}>110<span style={{fontSize: 120, letterSpacing: '-0.03em', marginLeft: 18, color: C.white}}>hours</span></div>
      <div style={{fontFamily: F.sans, fontSize: 52, fontWeight: 500, color: C.white, letterSpacing: '-0.02em', marginTop: 18}}>of typing, back.</div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(26, 1fr)', gap: 7, marginTop: 50, width: 860}}>
        {Array.from({length: 156}).map((_, i) => <div key={i} style={{height: 26, borderRadius: 3, background: C.mint, opacity: 0.85}} />)}
      </div>
    </div>
    <Brand />
    <Subtitle>Across 156 fact finds a year, that’s around 110 hours back.</Subtitle>
  </Stage>
);

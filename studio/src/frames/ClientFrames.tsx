import React from 'react';
import Peep from 'react-peeps';
import {Brand, Eyebrow, Stage, Subtitle} from '../kit/Stage';
import {C, F} from '../theme';

// Client Intelligence UI, rebuilt from the live demo's design: deep green panels, gold actions, serif names.
export const U = {bg: '#13211c', card: '#192a24', line: 'rgba(233,230,220,.10)', text: '#ebe8de', muted: '#9aa59e', gold: '#b5a46e'};

export const Panel: React.FC<{title: string; children: React.ReactNode; style?: React.CSSProperties}> = ({title, children, style}) => (
  <div style={{background: U.card, border: `1px solid ${U.line}`, borderRadius: 14, padding: '26px 28px', ...style}}>
    <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 24, color: U.text, marginBottom: 18}}>{title}</div>
    {children}
  </div>
);
export const Row: React.FC<{k: string; v: string; hi?: boolean}> = ({k, v, hi}) => (
  <div style={{display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${U.line}`, fontFamily: F.sans, fontSize: 21, color: U.text}}>
    <span style={{color: U.muted}}>{k}</span><span style={{fontWeight: hi ? 700 : 500, color: hi ? C.mint : U.text}}>{v}</span>
  </div>
);
export const GoldButton: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{display: 'inline-block', background: U.gold, color: '#1b1a12', fontFamily: F.sans, fontWeight: 600, fontSize: 19, padding: '13px 20px', borderRadius: 9, marginTop: 18}}>{children}</div>
);
export const AppFrame: React.FC<{w: number; children: React.ReactNode}> = ({w, children}) => (
  <div style={{width: w, background: U.bg, borderRadius: 18, overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.07)'}}>
    <div style={{padding: '30px 36px 22px', borderBottom: `1px solid ${U.line}`, display: 'flex', alignItems: 'center'}}>
      <div>
        <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.18em', color: U.muted}}>CLIENT PROFILE · PRIVATE CLIENT</div>
        <div style={{fontFamily: F.serif, fontSize: 56, color: U.text, marginTop: 4}}>Amelia Hart</div>
      </div>
      <div style={{marginLeft: 'auto', width: 64, height: 64, borderRadius: 14, background: '#25392f', display: 'grid', placeItems: 'center', fontFamily: F.sans, fontSize: 22, color: U.text}}>AH</div>
    </div>
    <div style={{padding: 30}}>{children}</div>
  </div>
);

const Sophie: React.FC<{face: 'Concerned' | 'Smile' | 'SmileBig' | 'Hectic'; size: number}> = ({face, size}) => (
  <Peep face={face} body="BlazerBlackTee" hair="Long" strokeColor="#0d100e" backgroundColor={C.paper}
    viewBox={{x: '-60', y: '-130', width: '1000', height: '1240'}} style={{width: size, height: size * 1.24}} />
);

const Sticky: React.FC<{children: React.ReactNode; r: number; style?: React.CSSProperties}> = ({children, r, style}) => (
  <div style={{position: 'absolute', width: 300, padding: '26px 24px', background: '#f6e7a6', boxShadow: '0 24px 50px rgba(0,0,0,.45)', transform: `rotate(${r}deg)`, fontFamily: F.hand, fontSize: 34, lineHeight: 1.15, color: '#2c2a1e', ...style}}>{children}</div>
);

// 0:02 Hook. Amelia said exactly what she wants; it lives on a sticky note.
export const CI1: React.FC = () => (
  <Stage glow={[30, 35]} tint="#2a3a2f">
    <div style={{position: 'absolute', left: 190, top: 230, width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle, ${C.amber}40, transparent 66%)`}} />
    <div style={{position: 'absolute', left: 170, top: 180}}><Sophie face="Concerned" size={600} /></div>
    <Sticky r={-7} style={{left: 640, top: 250}}>Amelia H. anniversary!<br />steel, blue dial<br />up to £12k · by 18 Oct</Sticky>
    <Sticky r={5} style={{left: 60, top: 640, background: '#f3d6c2', width: 250, fontSize: 30}}>call her back re: watch??</Sticky>
    {/* the empty CRM record that should have held it */}
    <div style={{position: 'absolute', left: 660, top: 620, width: 340, background: U.card, border: `1px solid ${U.line}`, borderRadius: 12, padding: '18px 20px', transform: 'rotate(3deg)', boxShadow: '0 30px 60px rgba(0,0,0,.5)'}}>
      <div style={{fontFamily: F.serif, fontSize: 30, color: U.text}}>Amelia Hart</div>
      <div style={{fontFamily: F.sans, fontSize: 16, color: U.muted, marginTop: 10}}>Preferences</div>
      <div style={{fontFamily: F.sans, fontSize: 18, color: C.coral, marginTop: 2}}>None recorded</div>
      <div style={{fontFamily: F.sans, fontSize: 16, color: U.muted, marginTop: 10}}>Last contact</div>
      <div style={{fontFamily: F.sans, fontSize: 18, color: U.text, marginTop: 2}}>22 June</div>
    </div>
    <div style={{position: 'absolute', left: 1120, top: 300, width: 720}}>
      <Eyebrow color={C.muted}>Luxury watch dealer · London</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 280, lineHeight: 0.9, letterSpacing: '-0.06em', color: C.white, marginTop: 26}}>4<span style={{color: C.coral}}> in </span>5</div>
      <div style={{fontFamily: F.sans, fontSize: 50, fontWeight: 500, letterSpacing: '-0.02em', color: C.white, marginTop: 22, lineHeight: 1.1}}>client conversations<br /><span style={{color: C.muted}}>never made it into the CRM.</span></div>
    </div>
    <Brand />
    <Subtitle>Amelia told you exactly what she wanted. Next time she calls, will anyone know?</Subtitle>
  </Stage>
);

// 0:22 The note becomes reviewed preferences.
export const CI2: React.FC = () => (
  <Stage glow={[60, 30]}>
    <div style={{position: 'absolute', left: 110, top: 110, width: 640}}>
      <Eyebrow>Client Intelligence</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 62, letterSpacing: '-0.035em', color: C.white, marginTop: 16, lineHeight: 1.05}}>The conversation,<br /><span style={{color: C.muted}}>turned into a profile.</span></div>
    </div>
    <div style={{position: 'absolute', left: 110, top: 400, width: 600, background: '#0f1a16', border: `1px solid ${U.line}`, borderRadius: 14, padding: '24px 26px', transform: 'rotate(-2deg)', boxShadow: '0 30px 70px rgba(0,0,0,.5)'}}>
      <div style={{fontFamily: F.mono, fontSize: 14, color: U.muted, letterSpacing: '.1em'}}>CALL NOTE · SOPHIE ELLIS · 28 SEP</div>
      <div style={{fontFamily: F.sans, fontSize: 26, color: U.text, lineHeight: 1.5, marginTop: 12}}>
        Spoke to Amelia about an anniversary gift. She prefers a <M>steel</M> watch with a <M>blue dial</M>. Budget <M>up to £12,000</M>. Needs it by 18 October. Avoid yellow gold.
      </div>
    </div>
    <div style={{position: 'absolute', left: 820, top: 150, transform: 'perspective(2400px) rotateY(-12deg)', transformOrigin: 'left center'}}>
      <AppFrame w={1000}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22}}>
          <Panel title="Proposed profile updates">
            <Row k="Maximum budget" v="£12,000" hi /><Row k="Dial" v="Blue" hi /><Row k="Material" v="Steel" hi />
            <div style={{fontFamily: F.sans, fontSize: 17, color: U.muted, marginTop: 14}}>Source: the call note. Review before saving.</div>
            <GoldButton>Accept reviewed preferences</GoldButton>
          </Panel>
          <Panel title="Client profile">
            <Row k="Relationship" v="Returning client" /><Row k="Account manager" v="Sophie Ellis" /><Row k="Preferred contact" v="Email" />
            <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 20, color: U.text, margin: '22px 0 6px'}}>Relationship timeline</div>
            <Row k="12 September" v="Service enquiry" /><Row k="22 June" v="Collection" />
          </Panel>
        </div>
      </AppFrame>
    </div>
    <Brand />
    <Subtitle>It picks the details out of the conversation. Sophie reviews them in seconds.</Subtitle>
  </Stage>
);
export const M: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span style={{background: 'rgba(120,230,182,.18)', color: C.mint, borderRadius: 6, padding: '0 6px'}}>{children}</span>
);

// 0:38 The right watch, and a personal follow-up, ready.
export const CI3: React.FC = () => (
  <Stage glow={[45, 30]} tint="#1f4a3f">
    <div style={{position: 'absolute', left: 120, top: 110}}><Eyebrow>Matched to stock · follow-up drafted</Eyebrow></div>
    <div style={{position: 'absolute', left: 120, top: 200, width: 700, transform: 'perspective(2200px) rotateY(10deg)', transformOrigin: 'right center'}}>
      <Panel title="Inventory match" style={{boxShadow: '0 50px 100px rgba(0,0,0,.55)'}}>
        <div style={{height: 300, borderRadius: 12, background: 'linear-gradient(135deg,#dccbbd,#efe6db)', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden'}}>
          {/* watch face */}
          <div style={{width: 190, height: 190, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #3b6aa8, #142b4f 70%)', border: '14px solid #c9ccd1', boxShadow: '0 20px 40px rgba(0,0,0,.35), inset 0 0 0 3px #9aa0a8', position: 'relative'}}>
            <div style={{position: 'absolute', left: '50%', top: '18%', width: 4, height: '34%', background: '#e9eef5', transform: 'translateX(-50%) rotate(-30deg)', transformOrigin: 'bottom center', borderRadius: 2}} />
            <div style={{position: 'absolute', left: '50%', top: '28%', width: 5, height: '24%', background: '#e9eef5', transform: 'translateX(-50%) rotate(60deg)', transformOrigin: 'bottom center', borderRadius: 2}} />
          </div>
          <div style={{position: 'absolute', bottom: 16, fontFamily: F.serif, fontStyle: 'italic', fontSize: 34, color: '#5d5248'}}>Atelier Meridian 40</div>
        </div>
        <Row k="In stock" v="£10,800" hi />
        <div style={{fontFamily: F.sans, fontSize: 18, color: U.muted, marginTop: 12}}>Matches reviewed budget, dial and material.</div>
      </Panel>
    </div>
    <div style={{position: 'absolute', left: 930, top: 260, width: 860, transform: 'perspective(2200px) rotateY(-8deg)', transformOrigin: 'left center'}}>
      <Panel title="Follow-up draft" style={{boxShadow: '0 50px 100px rgba(0,0,0,.55)'}}>
        <div style={{background: '#0f1a16', border: `1px solid ${U.line}`, borderRadius: 12, padding: '22px 24px', fontFamily: F.sans, fontSize: 25, lineHeight: 1.5, color: U.text}}>
          Hi Amelia,<br /><br />Following our conversation, I have shortlisted the Atelier Meridian 40 at £10,800. It matches what you described and is within your £12,000 budget.<br /><br />Happy anniversary in advance. Would you like to arrange a private viewing?<br /><br />Best,<br />Sophie
        </div>
        <GoldButton>Save reviewed follow-up</GoldButton>
      </Panel>
    </div>
    <Brand />
    <Subtitle>The right piece from stock, and a personal note in her words. Sophie checks it and sends.</Subtitle>
  </Stage>
);

// 1:00 Payoff: same Sophie, relaxed. The number.
export const CI4: React.FC = () => (
  <Stage glow={[70, 40]} tint="#1d5246">
    <div style={{position: 'absolute', left: 170, top: 170, width: 560, height: 560, borderRadius: '50%', background: C.mint, boxShadow: `0 0 160px ${C.mint}55`}} />
    <div style={{position: 'absolute', left: 150, top: 150}}><Sophie face="SmileBig" size={560} /></div>
    <div style={{position: 'absolute', left: 900, top: 200, width: 940}}>
      <Eyebrow>Every week</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 300, lineHeight: 0.88, letterSpacing: '-0.065em', color: C.mint, marginTop: 24}}>15+<span style={{fontSize: 110, letterSpacing: '-0.03em', marginLeft: 18, color: C.white}}>hours</span></div>
      <div style={{fontFamily: F.sans, fontSize: 50, fontWeight: 500, color: C.white, letterSpacing: '-0.02em', marginTop: 18}}>of follow-up and CRM entry, gone.</div>
      <div style={{display: 'flex', gap: 60, marginTop: 56}}>
        {[['< 5 min', 'conversation to follow-up'], ['5x', 'more conversations logged']].map(([n, l]) => (
          <div key={n}>
            <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 76, color: C.white, letterSpacing: '-0.04em'}}>{n}</div>
            <div style={{fontFamily: F.sans, fontSize: 24, color: C.muted, marginTop: 4}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
    <Brand />
    <Subtitle>Now every client is remembered as an individual. And Sophie gets fifteen hours a week back.</Subtitle>
  </Stage>
);

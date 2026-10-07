import React from 'react';
import Peep from 'react-peeps';
import {Brand, Eyebrow, Stage, Subtitle} from '../kit/Stage';
import {C, F} from '../theme';

// Proposal and Quote Agent UI, rebuilt from the live demo: cream panels, serif client names, violet actions.
export const U = {bg: '#faf6ef', card: '#fffdf8', line: 'rgba(30,25,20,.10)', text: '#1b1916', muted: '#77716a', violet: '#5b4fd6', red: '#c4473a'};

const Lead: React.FC<{face: 'Concerned' | 'Hectic' | 'Smile' | 'SmileBig' | 'Calm'; size: number}> = ({face, size}) => (
  <Peep face={face} body="Device" hair="Afro" strokeColor="#0d100e" backgroundColor={C.paper}
    viewBox={{x: '-60', y: '-130', width: '1000', height: '1240'}} style={{width: size, height: size * 1.24}} />
);
const Bubble: React.FC<{who: string; text: string; me?: boolean; style?: React.CSSProperties}> = ({who, text, me, style}) => (
  <div style={{position: 'absolute', maxWidth: 380, ...style}}>
    <div style={{fontFamily: F.sans, fontSize: 15, color: C.muted, marginBottom: 6, textAlign: me ? 'right' : 'left'}}>{who}</div>
    <div style={{background: me ? '#2f6a57' : '#24302b', color: C.white, fontFamily: F.sans, fontSize: 24, padding: '14px 20px', borderRadius: 20, borderBottomRightRadius: me ? 6 : 20, borderBottomLeftRadius: me ? 20 : 6, boxShadow: '0 20px 40px rgba(0,0,0,.45)'}}>{text}</div>
  </div>
);
export const MarginBar: React.FC<{pct: number; floor?: number; w: number; dark?: boolean}> = ({pct, floor = 35, w, dark}) => {
  const max = 50;
  const bad = pct < floor;
  return (
    <div style={{width: w, position: 'relative', height: 64}}>
      <div style={{position: 'absolute', top: 30, left: 0, right: 0, height: 14, borderRadius: 7, background: dark ? 'rgba(255,255,255,.12)' : '#ece6dc'}} />
      <div style={{position: 'absolute', top: 30, left: 0, width: `${(pct / max) * 100}%`, height: 14, borderRadius: 7, background: bad ? (dark ? C.coral : U.red) : (dark ? C.mint : U.violet)}} />
      <div style={{position: 'absolute', top: 18, left: `${(floor / max) * 100}%`, width: 3, height: 38, background: dark ? C.white : U.text}} />
      <div style={{position: 'absolute', top: -6, left: `${(floor / max) * 100}%`, transform: 'translateX(-50%)', fontFamily: F.sans, fontSize: 15, letterSpacing: '.12em', color: dark ? C.muted : U.muted, whiteSpace: 'nowrap'}}>{floor}% FLOOR</div>
    </div>
  );
};

// 0:02 Hook. Friday 4:40. A 12% discount waved through on a train.
export const PQ1: React.FC = () => (
  <Stage glow={[30, 35]} tint="#2b3a32">
    <div style={{position: 'absolute', left: 170, top: 240, width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle, ${C.amber}40, transparent 66%)`}} />
    <div style={{position: 'absolute', left: 120, top: 200}}><Lead face="Concerned" size={580} /></div>
    <Bubble who="Amara · Loxley Foods" text="Any chance of a launch discount? 12%?" style={{left: 600, top: 170}} />
    <Bubble who="You → James (on the train)" text="Can I do 12?" me style={{left: 680, top: 330}} />
    <Bubble who="James" text="Fine" style={{left: 610, top: 470}} />
    <div style={{position: 'absolute', left: 1060, top: 250, width: 800}}>
      <Eyebrow color={C.muted}>Friday · 4:40pm · £50,200 proposal</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 170, lineHeight: 0.9, letterSpacing: '-0.055em', color: C.white, marginTop: 30, whiteSpace: 'nowrap'}}>
        <span style={{color: 'rgba(255,254,250,.35)'}}>39%</span><span style={{color: C.muted, fontSize: 100, margin: '0 22px', letterSpacing: 0, verticalAlign: '12%'}}>→</span><span style={{color: C.coral}}>30%</span>
      </div>
      <div style={{fontFamily: F.sans, fontSize: 46, fontWeight: 500, color: C.white, marginTop: 20, letterSpacing: '-0.02em'}}>margin. Five points under the floor.</div>
      <div style={{marginTop: 40}}><MarginBar pct={30} w={700} dark /></div>
    </div>
    <Brand />
    <Subtitle>Nobody works out what twelve percent does to the margin. And the proposal goes out anyway.</Subtitle>
  </Stage>
);

export const PriceRow: React.FC<{k: string; v: string; b?: boolean}> = ({k, v, b}) => (
  <div style={{display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontFamily: F.sans, fontSize: b ? 26 : 21, fontWeight: b ? 700 : 400, color: U.text}}><span>{k}</span><span style={{fontVariantNumeric: 'tabular-nums'}}>{v}</span></div>
);
const Pricing: React.FC<{disc: number; total: string; less: string; margin: number}> = ({disc, total, less, margin}) => {
  const bad = margin < 35;
  return (
    <div style={{width: 1180, background: U.bg, borderRadius: 18, overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,.6)'}}>
      <div style={{padding: '24px 34px', borderBottom: `1px solid ${U.line}`, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 36, height: 36, borderRadius: 9, background: U.violet, display: 'grid', placeItems: 'center', color: '#fff', fontFamily: F.sans, fontWeight: 700}}>Q</div>
        <div style={{fontFamily: F.serif, fontSize: 30, color: U.text}}>Loxley Foods</div>
        <div style={{fontFamily: F.sans, fontSize: 18, color: U.muted}}>Marketing content agent · Amara Diallo</div>
        <div style={{marginLeft: 'auto', fontFamily: F.sans, fontWeight: 700, fontSize: 30, color: U.text}}>{total}</div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 24, padding: 30}}>
        <div style={{background: U.card, border: `1px solid ${U.line}`, borderRadius: 14, padding: '22px 26px'}}>
          <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.16em', color: U.muted, marginBottom: 8}}>PRICE BUILD-UP · RATE CARD</div>
          <PriceRow k="Engineering · 20d @ £950" v="£19,000" /><PriceRow k="Delivery · 20d @ £750" v="£15,000" /><PriceRow k="Design · 12d @ £850" v="£10,200" /><PriceRow k="QA · 10d @ £600" v="£6,000" />
          <div style={{height: 1, background: U.line, margin: '8px 0'}} />
          <PriceRow k={`Discount (${disc}%)`} v={less} /><PriceRow k="Total (ex VAT)" v={total} b />
          <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.16em', color: U.muted, marginTop: 22}}>DISCOUNT · {disc}%</div>
          <div style={{position: 'relative', height: 30, marginTop: 10}}>
            <div style={{position: 'absolute', top: 12, left: 0, right: 0, height: 6, borderRadius: 3, background: '#ece6dc'}} />
            <div style={{position: 'absolute', top: 12, left: 0, width: `${(disc / 25) * 100}%`, height: 6, borderRadius: 3, background: '#1f5a4c'}} />
            <div style={{position: 'absolute', top: 2, left: `calc(${(disc / 25) * 100}% - 13px)`, width: 26, height: 26, borderRadius: 13, background: '#1f5a4c', boxShadow: '0 4px 10px rgba(0,0,0,.25)'}} />
          </div>
        </div>
        <div style={{display: 'grid', gap: 20, alignContent: 'start'}}>
          <div style={{background: U.card, border: `1.5px solid ${bad ? U.red : U.line}`, borderRadius: 14, padding: '22px 26px'}}>
            <div style={{display: 'flex', alignItems: 'baseline'}}>
              <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.16em', color: U.muted}}>MARGIN AFTER DISCOUNT</div>
              <div style={{marginLeft: 'auto', fontFamily: F.sans, fontWeight: 700, fontSize: 64, color: bad ? U.red : U.violet, letterSpacing: '-0.03em'}}>{margin}%</div>
            </div>
            <MarginBar pct={margin} w={440} />
            <div style={{fontFamily: F.sans, fontSize: 18, color: bad ? U.red : U.muted, marginTop: 6}}>{bad ? 'Below the 35% floor. This can’t send without James Attwood.' : 'Within delegation. No approval needed.'}</div>
          </div>
          <div style={{background: U.card, border: `1px solid ${U.line}`, borderRadius: 14, padding: '22px 26px'}}>
            <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.16em', color: U.muted}}>SEND</div>
            {bad ? (
              <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 12}}>
                <div style={{width: 46, height: 46, borderRadius: 23, background: '#ece8ff', display: 'grid', placeItems: 'center', fontFamily: F.sans, fontWeight: 700, color: U.violet}}>JA</div>
                <div><div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 20, color: U.text}}>James Attwood</div><div style={{fontFamily: F.sans, fontSize: 16, color: U.red}}>Founding partner · approval needed</div></div>
              </div>
            ) : (
              <div style={{marginTop: 12, background: U.violet, color: '#fff', borderRadius: 999, padding: '14px', textAlign: 'center', fontFamily: F.sans, fontWeight: 600, fontSize: 20}}>Send proposal · {total}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 0:34 The discount, with its consequence attached. Two states side by side as the hero frame.
export const PQ3: React.FC = () => (
  <Stage glow={[55, 30]}>
    <div style={{position: 'absolute', left: 110, top: 90}}>
      <Eyebrow>Proposal and Quote Agent</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 60, letterSpacing: '-0.035em', color: C.white, marginTop: 16, lineHeight: 1.05}}>Move the discount.<br /><span style={{color: C.muted}}>See what it costs.</span></div>
    </div>
    <div style={{position: 'absolute', left: 640, top: 70, transform: 'perspective(2600px) rotateY(-10deg) scale(0.78)', transformOrigin: 'left top', filter: 'brightness(.55) blur(1px)'}}>
      <Pricing disc={5} total="£47,690" less="−£2,510" margin={35} />
    </div>
    <div style={{position: 'absolute', left: 300, top: 360, transform: 'perspective(2600px) rotateY(-8deg) scale(0.86)', transformOrigin: 'left top'}}>
      <Pricing disc={12} total="£44,176" less="−£6,024" margin={30} />
    </div>
    <Brand />
    <Subtitle>At twelve percent the margin turns red, and the proposal goes to the partner. At five, it's clear to send.</Subtitle>
  </Stage>
);

// 1:00 Payoff.
export const PQ4: React.FC = () => (
  <Stage glow={[70, 40]} tint="#1d5246">
    <div style={{position: 'absolute', left: 170, top: 170, width: 560, height: 560, borderRadius: '50%', background: C.mint, boxShadow: `0 0 160px ${C.mint}55`}} />
    <div style={{position: 'absolute', left: 150, top: 150}}><Lead face="SmileBig" size={560} /></div>
    <div style={{position: 'absolute', left: 900, top: 230, width: 940}}>
      <Eyebrow>Every proposal</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 300, lineHeight: 0.88, letterSpacing: '-0.065em', color: C.mint, marginTop: 24}}>0</div>
      <div style={{fontFamily: F.sans, fontSize: 52, fontWeight: 500, color: C.white, letterSpacing: '-0.02em', marginTop: 18, lineHeight: 1.15}}>discounts below the 35% floor<br />sent without the partner seeing the margin.</div>
    </div>
    <Brand />
    <Subtitle>Every proposal leaves at a price someone with authority chose, knowing exactly what it costs.</Subtitle>
  </Stage>
);

// 0:16 The brief becomes requirements, each with its evidence.
export const Req: React.FC<{group: string; text: string; ev: string; conf: string; check?: boolean}> = ({group, text, ev, conf, check}) => (
  <div style={{padding: '14px 0', borderBottom: `1px solid ${U.line}`}}>
    <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.16em', color: U.muted}}>{group}</div>
    <div style={{display: 'flex', alignItems: 'flex-start', gap: 16, marginTop: 6}}>
      <div style={{fontFamily: F.sans, fontSize: 23, color: U.text, flex: 1, lineHeight: 1.3}}>{text}</div>
      <div style={{fontFamily: F.sans, fontSize: 16, fontWeight: 600, padding: '5px 11px', borderRadius: 999, background: check ? '#fbefdc' : '#efedff', color: check ? '#9a6a12' : U.violet, whiteSpace: 'nowrap'}}>{conf}{check ? ' · check' : ''}</div>
    </div>
    <div style={{fontFamily: F.sans, fontStyle: 'italic', fontSize: 17, color: U.muted, marginTop: 4}}>Evidence: {ev}</div>
  </div>
);
export const PQ2: React.FC = () => (
  <Stage glow={[60, 30]}>
    <div style={{position: 'absolute', left: 110, top: 100, width: 700}}>
      <Eyebrow>Proposal and Quote Agent</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 60, letterSpacing: '-0.035em', color: C.white, marginTop: 16, lineHeight: 1.05}}>The brief, read.<br /><span style={{color: C.muted}}>Every requirement sourced.</span></div>
    </div>
    <div style={{position: 'absolute', left: 110, top: 400, width: 700, background: U.card, borderRadius: 14, padding: '24px 28px', boxShadow: '0 50px 100px rgba(0,0,0,.55)', transform: 'perspective(2200px) rotateY(9deg)', transformOrigin: 'right center'}}>
      <div style={{fontFamily: F.sans, fontSize: 15, color: U.muted}}>Written brief · 3 pages · 24 Sept 2026</div>
      <div style={{fontFamily: F.sans, fontSize: 24, lineHeight: 1.55, color: U.text, marginTop: 12}}>A content agent to support two new product ranges launching this autumn. It drafts product pages, retailer listings and launch emails for marketing to approve; the team must run it without agency support. Keep the tone “premium but northern”.</div>
    </div>
    <div style={{position: 'absolute', left: 900, top: 120, width: 900, transform: 'perspective(2200px) rotateY(-9deg)', transformOrigin: 'left center'}}>
      <div style={{background: U.card, borderRadius: 14, padding: '22px 28px', boxShadow: '0 50px 100px rgba(0,0,0,.55)', marginBottom: 20}}>
        <div style={{display: 'flex', alignItems: 'baseline'}}><div style={{fontFamily: F.sans, fontSize: 15, letterSpacing: '.16em', color: U.muted}}>READINESS TO QUOTE</div><div style={{marginLeft: 'auto', fontFamily: F.sans, fontWeight: 700, fontSize: 28, color: U.text}}>100%</div></div>
        <div style={{height: 8, borderRadius: 4, background: U.violet, marginTop: 12}} />
      </div>
      <div style={{background: U.card, borderRadius: 14, padding: '22px 28px', boxShadow: '0 50px 100px rgba(0,0,0,.55)'}}>
        <div style={{fontFamily: F.sans, fontSize: 15, letterSpacing: '.16em', color: U.muted}}>EXTRACTED REQUIREMENTS</div>
        <Req group="GOAL" text="Content agent drafting launch content for two autumn ranges, run by marketing" ev="Brief p.1" conf="93%" />
        <Req group="CONSTRAINT" text="Marketing team must run the agent unaided" ev="Brief p.2" conf="90%" />
        <Req group="TIMELINE" text="Live for autumn range launch" ev="Brief p.1" conf="88%" check />
        <Req group="SUCCESS" text="Ranges launch with agent-drafted content, no agency involvement" ev="Brief p.2" conf="80%" check />
      </div>
    </div>
    <Brand />
    <Subtitle>It reads the brief and pulls out the requirements, each one linked to the line it came from.</Subtitle>
  </Stage>
);

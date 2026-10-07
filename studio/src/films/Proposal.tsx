import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BottomWash, Clip, EndCard, Film, Lockup, SceneTitle, Shot, SideWash, Stat, UIStage} from '../kit/Film';
import {Count, Cursor, FPS, Rise, useP} from '../kit/motion';
import {MarginBar, PriceRow, Req, U} from '../frames/ProposalFrames';
import {C, F} from '../theme';
import lines from './proposal.lines.json';

const gbp = (n: number) => '£' + Math.round(n).toLocaleString('en-GB');
const clampI = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// 0:14 The brief becomes requirements, each with the line it came from.
const Brief: React.FC = () => {
  const ready = useP(1.2, 2.4);
  return (
    <UIStage clip="39838" from={6}>
      <SceneTitle eyebrow="Proposal and Quote Agent" width={1200} title={<>The brief, read.<br /><span style={{color: 'rgba(255,254,250,.55)'}}>Every requirement sourced.</span></>} />
      <Rise at={0.2} style={{position: 'absolute', left: 110, top: 340, width: 700, transform: 'perspective(2200px) rotateY(8deg)', transformOrigin: 'right center'}}>
        <div style={{background: U.card, borderRadius: 14, padding: '24px 28px', boxShadow: '0 50px 100px rgba(0,0,0,.55)'}}>
          <div style={{fontFamily: F.sans, fontSize: 16, color: U.muted}}>Written brief · Loxley Foods · 3 pages</div>
          <div style={{fontFamily: F.sans, fontSize: 25, lineHeight: 1.55, color: U.text, marginTop: 12}}>A content agent to support two new product ranges launching this autumn. It drafts product pages, retailer listings and launch emails for marketing to approve; the team must run it without agency support.</div>
        </div>
      </Rise>
      <Rise at={0.6} style={{position: 'absolute', left: 900, top: 250, width: 900, transform: 'perspective(2200px) rotateY(-8deg)', transformOrigin: 'left center'}}>
        <div style={{background: U.card, borderRadius: 14, padding: '20px 28px', boxShadow: '0 50px 100px rgba(0,0,0,.55)', marginBottom: 18}}>
          <div style={{display: 'flex', alignItems: 'baseline'}}><div style={{fontFamily: F.sans, fontSize: 15, letterSpacing: '.16em', color: U.muted}}>READINESS TO QUOTE</div><div style={{marginLeft: 'auto', fontFamily: F.sans, fontWeight: 700, fontSize: 28, color: U.text}}>{Math.round(ready * 100)}%</div></div>
          <div style={{height: 8, borderRadius: 4, background: '#ece6dc', marginTop: 12}}><div style={{height: '100%', width: `${ready * 100}%`, borderRadius: 4, background: U.violet}} /></div>
        </div>
        <div style={{background: U.card, borderRadius: 14, padding: '20px 28px', boxShadow: '0 50px 100px rgba(0,0,0,.55)'}}>
          <div style={{fontFamily: F.sans, fontSize: 15, letterSpacing: '.16em', color: U.muted}}>EXTRACTED REQUIREMENTS</div>
          <Rise at={1.2} y={10}><Req group="GOAL" text="Content agent drafting launch content for two autumn ranges, run by marketing" ev="Brief p.1" conf="93%" /></Rise>
          <Rise at={1.8} y={10}><Req group="CONSTRAINT" text="Marketing team must run the agent unaided" ev="Brief p.2" conf="90%" /></Rise>
          <Rise at={2.4} y={10}><Req group="TIMELINE" text="Live for autumn range launch" ev="Brief p.1" conf="88%" check /></Rise>
        </div>
      </Rise>
    </UIStage>
  );
};

const RATE: [string, number][] = [['Engineering · 20d @ £950', 19000], ['Delivery · 20d @ £750', 15000], ['Design · 12d @ £850', 10200], ['QA · 10d @ £600', 6000]];

// Pricing screen. disc/total/margin come from the demo's own states (5% £47,690 35%; 12% £44,176 30%).
const Pricing: React.FC<{disc: number; total: number; margin: number; sent?: boolean; build?: number; showMargin?: boolean}> = ({disc, total, margin, sent, build = 1, showMargin = true}) => {
  const bad = margin < 35;
  const sub = RATE.reduce((a, [, v], i) => a + (build * RATE.length > i ? v : 0), 0);
  return (
    <div style={{width: 1240, background: U.bg, borderRadius: 18, overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,.6)'}}>
      <div style={{padding: '22px 34px', borderBottom: `1px solid ${U.line}`, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 36, height: 36, borderRadius: 9, background: U.violet, display: 'grid', placeItems: 'center', color: '#fff', fontFamily: F.sans, fontWeight: 700}}>Q</div>
        <div style={{fontFamily: F.serif, fontSize: 32, color: U.text}}>Loxley Foods</div>
        <div style={{fontFamily: F.sans, fontSize: 18, color: U.muted}}>Marketing content agent · Amara Diallo</div>
        {sent && <div style={{marginLeft: 'auto', background: '#e3f2ea', color: '#2d7457', fontFamily: F.sans, fontSize: 16, fontWeight: 600, padding: '5px 12px', borderRadius: 999}}>Sent</div>}
        <div style={{marginLeft: sent ? 14 : 'auto', fontFamily: F.sans, fontWeight: 700, fontSize: 30, color: U.text, fontVariantNumeric: 'tabular-nums'}}>{gbp(build < 1 ? sub : total)}</div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: showMargin ? '1.15fr 1fr' : '1fr', gap: 24, padding: 30}}>
        <div style={{background: U.card, border: `1px solid ${U.line}`, borderRadius: 14, padding: '22px 26px'}}>
          <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.16em', color: U.muted, marginBottom: 8}}>PRICE BUILD-UP · RATE CARD</div>
          {RATE.map(([k, v], i) => <div key={k} style={{opacity: build * RATE.length > i ? 1 : 0.15}}><PriceRow k={k} v={gbp(v)} /></div>)}
          <div style={{height: 1, background: U.line, margin: '8px 0'}} />
          <PriceRow k="Subtotal at rate card" v={gbp(sub)} />
          {showMargin && <><PriceRow k={`Discount (${disc}%)`} v={'−' + gbp(50200 - total)} /><PriceRow k="Total (ex VAT)" v={gbp(total)} b /></>}
          {showMargin && <>
            <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.16em', color: U.muted, marginTop: 20}}>DISCOUNT · {disc}%</div>
            <div style={{position: 'relative', height: 30, marginTop: 10}}>
              <div style={{position: 'absolute', top: 12, left: 0, right: 0, height: 6, borderRadius: 3, background: '#ece6dc'}} />
              <div style={{position: 'absolute', top: 12, left: 0, width: `${(disc / 25) * 100}%`, height: 6, borderRadius: 3, background: sent ? '#b9b3aa' : '#1f5a4c'}} />
              <div style={{position: 'absolute', top: 2, left: `calc(${(disc / 25) * 100}% - 13px)`, width: 26, height: 26, borderRadius: 13, background: sent ? '#b9b3aa' : '#1f5a4c', boxShadow: '0 4px 10px rgba(0,0,0,.25)'}} />
            </div>
            {sent && <div style={{fontFamily: F.sans, fontSize: 16, color: U.muted, marginTop: 6}}>locked · sent at {gbp(total)}</div>}
          </>}
        </div>
        {showMargin && (
          <div style={{display: 'grid', gap: 20, alignContent: 'start'}}>
            <div style={{background: U.card, border: `1.5px solid ${bad ? U.red : U.line}`, borderRadius: 14, padding: '22px 26px'}}>
              <div style={{display: 'flex', alignItems: 'baseline'}}>
                <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.16em', color: U.muted}}>MARGIN AFTER DISCOUNT</div>
                <div style={{marginLeft: 'auto', fontFamily: F.sans, fontWeight: 700, fontSize: 64, color: bad ? U.red : U.violet, letterSpacing: '-0.03em'}}>{margin}%</div>
              </div>
              <MarginBar pct={margin} w={440} />
              <div style={{fontFamily: F.sans, fontSize: 18, color: bad ? U.red : U.muted, marginTop: 6}}>{sent ? `Sent within delegation at ${gbp(total)}` : bad ? 'Below the 35% floor. Approval needed from James Attwood.' : 'Within delegation. No approval needed.'}</div>
            </div>
            <div style={{background: U.card, border: `1px solid ${U.line}`, borderRadius: 14, padding: '22px 26px'}}>
              <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.16em', color: U.muted}}>SEND</div>
              {sent ? (
                <div style={{fontFamily: F.sans, fontSize: 19, color: U.muted, marginTop: 12}}>Sent 7 Oct 2026 · price locked</div>
              ) : bad ? (
                <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 12}}>
                  <div style={{width: 46, height: 46, borderRadius: 23, background: '#ece8ff', display: 'grid', placeItems: 'center', fontFamily: F.sans, fontWeight: 700, color: U.violet}}>JA</div>
                  <div><div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 20, color: U.text}}>Request approval from James Attwood</div><div style={{fontFamily: F.sans, fontSize: 16, color: U.red}}>Founding partner · below floor</div></div>
                </div>
              ) : (
                <div style={{marginTop: 12, background: U.violet, color: '#fff', borderRadius: 999, padding: '14px', textAlign: 'center', fontFamily: F.sans, fontWeight: 600, fontSize: 20}}>Send proposal · {gbp(total)}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 0:24 Priced from the rate card in seconds.
const Build: React.FC = () => {
  const b = useP(0.6, 2.0);
  return (
    <UIStage clip="39839" from={2}>
      <SceneTitle eyebrow="Priced from your rate card" title={<>Priced in seconds.</>} />
      <Rise at={0.1} style={{position: 'absolute', left: 520, top: 250, transform: 'perspective(2600px) rotateX(3deg) scale(.82)', transformOrigin: 'left top'}}>
        <div style={{width: 1060}}><Pricing disc={0} total={50200} margin={0} build={b} showMargin={false} /></div>
      </Rise>
    </UIStage>
  );
};

// 0:31 Move the discount and the margin moves with it.
const Discount: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  // 5% -> 12% (30%, routed), then back to 5% (35%, ready to send)
  const toBad = interpolate(t, [1.0, 2.4], [0, 1], clampI);
  const back = interpolate(t, [4.2, 5.0], [0, 1], clampI);
  const disc = Math.round(5 + 7 * toBad - 7 * back);
  const total = disc === 12 ? 44176 : disc === 5 ? 47690 : 50200 * (1 - disc / 100);
  // cost implied by the demo: 39% margin at list price (£50,200), which reproduces 35% at 5% and 30% at 12%
  const margin = Math.floor(((total - 50200 * 0.61) / total) * 100);
  return (
    <UIStage clip="39839" from={5} pos="70% center">
      <SceneTitle eyebrow="Margin, live" title={<>Move the discount. The margin moves with it.</>} width={1500} />
      <Rise at={0.1} style={{position: 'absolute', left: 350, top: 230, transform: 'scale(.98)', transformOrigin: 'left top'}}>
        <Pricing disc={disc} total={total} margin={margin} />
      </Rise>
      <Cursor path={[[0.4, 900, 950], [1.0, 518, 798], [2.4, 674, 798], [4.2, 674, 798], [5.0, 518, 798]]} click={[]} />
    </UIStage>
  );
};

// 0:48 Sent, and the price is locked.
const Sent: React.FC = () => {
  const sent = useP(0.9, 0.3) > 0.5;
  return (
    <UIStage clip="39841" from={1}>
      <SceneTitle eyebrow="Sent" title={<>Once it’s sent, the price is locked.</>} width={1300} />
      <div style={{position: 'absolute', left: 350, top: 230, transform: 'scale(.98)', transformOrigin: 'left top'}}>
        <Pricing disc={5} total={47690} margin={35} sent={sent} />
      </div>
      <Cursor path={[[0.1, 1320, 960], [0.7, 1278, 665]]} click={[0.85]} />
    </UIStage>
  );
};

const L = lines as {placed: number; dur: number; text: string}[];
const shots: Shot[] = [
  {at: 0, el: <Clip src="39838" from={1.5} kb={[1.06, 1.12]} />},
  {at: 2.8, el: <><Clip src="39839" from={1} pos="35% center" kb={[1.04, 1.1]} /><SideWash side="left" strength={0.84} /><BottomWash />
    <Stat side="left" at={0.2} eyebrow="Every proposal" size={190} big={<>Half <span style={{color: 'rgba(255,254,250,.6)'}}>a day</span></>} line={<>of rate cards, scope<br />and chasing approval.</>} note="est. half a day per proposal" /></>},
  {at: 7.4, el: <><Clip src="39841" from={6.5} kb={[1.04, 1.1]} /><SideWash side="left" strength={0.86} /><BottomWash />
    <Stat side="left" at={0.3} eyebrow="A 12% discount, in the rush" size={210} big={<span style={{whiteSpace: 'nowrap'}}><span style={{color: 'rgba(255,254,250,.4)'}}>39%</span><span style={{fontSize: 110, margin: '0 18px', color: C.muted}}>→</span><span style={{color: C.coral}}>30%</span></span>} line={<>margin. Five points<br />under the floor.</>} /></>},
  {at: 11.8, el: <><Clip src="39838" from={8} blur={18} kb={[1.1, 1.14]} /><Lockup sub="So we built" name="Proposal and Quote Agent" /></>},
  {at: 14.4, el: <Brief />},
  {at: 23.6, el: <Build />},
  {at: 30.6, el: <Discount />},
  {at: 39.6, el: <><Clip src="4872" from={2} kb={[1.04, 1.1]} /><BottomWash />
    <Rise at={0.6} style={{position: 'absolute', left: 120, bottom: 150}}><div style={{display: 'inline-flex', alignItems: 'center', gap: 14, background: 'rgba(20,32,27,.88)', borderRadius: 14, padding: '16px 22px', fontFamily: F.sans, fontSize: 25, color: C.white}}><span style={{color: C.mint, fontWeight: 800}}>✓</span> Margin checked before anything leaves · 35% floor</div></Rise></>},
  {at: 47.6, el: <Sent />},
  {at: 54.6, el: <><Clip src="241" from={1} kb={[1.04, 1.1]} /><SideWash side="left" strength={0.86} /><BottomWash />
    <Stat side="left" top={230} at={0.4} eyebrow="Every proposal" color={C.mint} big={<><Count at={0.55} dur={1.2} to={20} /> <span style={{fontSize: 130, letterSpacing: '-0.03em'}}>min</span></>} line={<>and never under the 35%<br />floor without sign-off.</>} note="est. 20 minutes per proposal, from half a day" /></>},
  {at: 67.6, el: <EndCard clip="39838" from={4} product="Proposal and Quote Agent" tryIt tagline={<>The discount is a decision.<br /><span style={{color: C.mint}}>Never a slip.</span></>} />, brand: false},
];

export const ProposalFilm: React.FC = () => <Film shots={shots} lines={L} audio="proposal" length={75} />;

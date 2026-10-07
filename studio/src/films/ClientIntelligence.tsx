import React from 'react';
import {BottomWash, Clip, EndCard, Film, Lockup, SceneTitle, Shot, SideWash, Stat, UIStage} from '../kit/Film';
import {Count, Cursor, Rise, Typed, useP} from '../kit/motion';
import {AppFrame, GoldButton, Panel, Row, U} from '../frames/ClientFrames';
import {C, F} from '../theme';
import lines from './client-intelligence.lines.json';

const Hi: React.FC<{at: number; children: React.ReactNode}> = ({at, children}) => {
  const p = useP(at, 0.4);
  return <span style={{background: `rgba(120,230,182,${0.2 * p})`, color: p > 0.5 ? C.mint : U.text, borderRadius: 6, padding: '0 6px', boxShadow: p > 0.5 ? `0 0 0 1px rgba(120,230,182,${0.4 * p})` : undefined}}>{children}</span>;
};
const RowIn: React.FC<{at: number; k: string; v: string; hi?: boolean}> = ({at, ...r}) => <Rise at={at} y={12}><Row {...r} /></Rise>;
const Swap: React.FC<{at: number; a: React.ReactNode; b: React.ReactNode}> = ({at, a, b}) => {
  const p = useP(at, 0.3);
  return <>{p < 0.5 ? a : b}</>;
};

// 0:13 The note she'd write anyway becomes reviewed profile updates.
const Note: React.FC = () => (
  <UIStage clip="34213" from={3}>
    <SceneTitle eyebrow="Client Intelligence" width={1200} title={<>Write the note you’d write anyway.<br /><span style={{color: 'rgba(255,254,250,.55)'}}>It picks out what matters.</span></>} />
    <Rise at={0.3} style={{position: 'absolute', left: 110, top: 330, width: 700, transform: 'perspective(2200px) rotateY(8deg)', transformOrigin: 'right center'}}>
      <div style={{background: '#0f1a16', border: `1px solid ${U.line}`, borderRadius: 16, padding: '28px 30px', boxShadow: '0 40px 90px rgba(0,0,0,.55)'}}>
        <div style={{fontFamily: F.mono, fontSize: 15, color: U.muted, letterSpacing: '.1em'}}>CALL NOTE · SOPHIE ELLIS · 28 SEPTEMBER</div>
        <div style={{fontFamily: F.sans, fontSize: 29, color: U.text, lineHeight: 1.55, marginTop: 14}}>
          Spoke to Amelia about an anniversary gift. She prefers a <Hi at={4.1}>steel</Hi> watch with a <Hi at={3.6}>blue dial</Hi>. Budget <Hi at={3.0}>up to £12,000</Hi>. Needs it by 18 October. Please follow up by email. Avoid yellow gold.
        </div>
      </div>
    </Rise>
    <Rise at={0.6} style={{position: 'absolute', left: 880, top: 300, transform: 'perspective(2400px) rotateY(-9deg)', transformOrigin: 'left center'}}>
      <div style={{transform: 'scale(.92)', transformOrigin: 'left top'}}>
        <AppFrame w={1000}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22}}>
            <Panel title="Proposed profile updates">
              <RowIn at={3.2} k="Maximum budget" v="£12,000" hi /><RowIn at={3.8} k="Dial" v="Blue" hi /><RowIn at={4.3} k="Material" v="Steel" hi />
              <Rise at={4.6}><div style={{fontFamily: F.sans, fontSize: 17, color: U.muted, marginTop: 14}}>Source: the note above. Review before saving.</div></Rise>
              <Rise at={4.8}><Swap at={5.7} a={<GoldButton>Accept reviewed preferences</GoldButton>} b={<div style={{display: 'inline-block', background: '#3c4a36', color: '#cfd6c4', fontFamily: F.sans, fontWeight: 600, fontSize: 19, padding: '13px 20px', borderRadius: 9, marginTop: 18}}>✓ Accepted</div>} /></Rise>
            </Panel>
            <Panel title="Client profile">
              <Row k="Relationship" v="Returning client" /><Row k="Account manager" v="Sophie Ellis" />
              <Swap at={6.1} a={<Row k="Budget" v="Not recorded" />} b={<Rise at={6.1} y={8}><Row k="Budget" v="£12,000" hi /></Rise>} />
              <Swap at={6.3} a={<Row k="Preferences" v="Not recorded" />} b={<Rise at={6.3} y={8}><Row k="Preferences" v="Steel / Blue dial" hi /></Rise>} />
            </Panel>
          </div>
        </AppFrame>
      </div>
    </Rise>
    <Cursor path={[[4.4, 1500, 900], [5.4, 1080, 798]]} click={[5.6]} />
  </UIStage>
);

// 0:27 The right piece, in stock.
const Match: React.FC = () => (
  <UIStage clip="3653" from={1}>
    <SceneTitle eyebrow="Matched to stock" title={<>The right piece, in stock.</>} />
    <Rise at={0.3} y={40} style={{position: 'absolute', left: 560, top: 260, width: 800}}>
      <Panel title="Inventory match" style={{boxShadow: '0 60px 120px rgba(0,0,0,.6)'}}>
        <div style={{height: 330, borderRadius: 12, background: 'linear-gradient(135deg,#dccbbd,#efe6db)', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden'}}>
          <div style={{width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #3b6aa8, #142b4f 70%)', border: '14px solid #c9ccd1', boxShadow: '0 20px 40px rgba(0,0,0,.35), inset 0 0 0 3px #9aa0a8', position: 'relative', marginTop: -40}}>
            <div style={{position: 'absolute', left: '50%', top: '18%', width: 4, height: '34%', background: '#e9eef5', transform: 'translateX(-50%) rotate(-30deg)', transformOrigin: 'bottom center', borderRadius: 2}} />
            <div style={{position: 'absolute', left: '50%', top: '28%', width: 5, height: '24%', background: '#e9eef5', transform: 'translateX(-50%) rotate(60deg)', transformOrigin: 'bottom center', borderRadius: 2}} />
          </div>
          <div style={{position: 'absolute', bottom: 18, fontFamily: F.serif, fontStyle: 'italic', fontSize: 40, color: '#5d5248'}}>Atelier Meridian 40</div>
        </div>
        <RowIn at={0.9} k="In stock" v="£10,800" hi />
        <Rise at={1.2}><div style={{fontFamily: F.sans, fontSize: 19, color: U.muted, marginTop: 12}}>Matches reviewed budget, dial and material.</div></Rise>
      </Panel>
    </Rise>
  </UIStage>
);

const DRAFT = 'Following our conversation, I have shortlisted the Atelier Meridian 40 at £10,800. It matches the reviewed preferences in our conversation and is within your £12,000 budget.\n\nHappy anniversary in advance. Would you like to arrange a private viewing?\n\nBest,\nSophie';

// 0:40 A personal follow-up, checked, saved to her record.
const FollowUp: React.FC = () => (
  <UIStage clip="34213" from={7} pos="30% center">
    <SceneTitle eyebrow="Follow-up drafted" width={1400} title={<>Personal. Checked. On her record.</>} />
    <Rise at={0.2} style={{position: 'absolute', left: 110, top: 270, width: 960, transform: 'perspective(2200px) rotateY(7deg)', transformOrigin: 'right center'}}>
      <Panel title="Follow-up draft" style={{boxShadow: '0 50px 100px rgba(0,0,0,.55)'}}>
        <div style={{background: '#0f1a16', border: `1px solid ${U.line}`, borderRadius: 12, padding: '22px 26px', fontFamily: F.sans, fontSize: 25, lineHeight: 1.5, color: U.text, height: 400}}>
          <Typed at={0.6} cps={95} text={DRAFT} />
        </div>
        <Swap at={4.7} a={<GoldButton>Save reviewed follow-up</GoldButton>} b={<div style={{display: 'inline-block', background: '#3c4a36', color: '#cfd6c4', fontFamily: F.sans, fontWeight: 600, fontSize: 19, padding: '13px 20px', borderRadius: 9, marginTop: 18}}>✓ Saved</div>} />
      </Panel>
    </Rise>
    <Rise at={0.5} style={{position: 'absolute', left: 1160, top: 330, width: 650, transform: 'perspective(2200px) rotateY(-8deg)', transformOrigin: 'left center'}}>
      <Panel title="Relationship timeline" style={{boxShadow: '0 50px 100px rgba(0,0,0,.55)'}}>
        <Swap at={5.1} a={null} b={<RowIn at={5.1} k="28 September" v="Follow-up saved" hi />} />
        <Row k="28 September" v="Preferences reviewed" hi />
        <Row k="12 September" v="Service enquiry" />
        <Row k="22 June" v="Collection appointment" />
      </Panel>
    </Rise>
    <Cursor path={[[3.6, 900, 980], [4.4, 330, 808]]} click={[4.6]} />
  </UIStage>
);

const Chip: React.FC<{at: number; children: React.ReactNode}> = ({at, children}) => (
  <Rise at={at} style={{position: 'absolute', left: 120, bottom: 150}}>
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 14, background: 'rgba(20,32,27,.88)', borderRadius: 14, padding: '16px 22px', fontFamily: F.sans, fontSize: 25, color: C.white}}>{children}</div>
  </Rise>
);

const L = lines as {placed: number; dur: number; text: string}[];
const shots: Shot[] = [
  {at: 0, el: <Clip src="34213" from={0.5} kb={[1.06, 1.12]} />},
  {at: 2.4, el: <Clip src="3653" from={2} kb={[1.04, 1.1]} />},
  {at: 4.2, el: <><Clip src="5595" from={1} pos="30% center" kb={[1.04, 1.1]} /><SideWash side="right" strength={0.84} /><BottomWash />
    <Stat at={0.2} eyebrow="Every client conversation" big={<><Count at={0.35} dur={1.3} to={15} />+</>} line={<>hours a week writing up<br />notes and follow-ups.</>} /></>},
  {at: 9.6, el: <><Clip src="34213" from={6} blur={18} kb={[1.1, 1.14]} /><Lockup sub="So we built" name="Client Intelligence" /></>},
  {at: 12.6, el: <Note />},
  {at: 26.6, el: <Match />},
  {at: 33.4, el: <><Clip src="3653" from={5} kb={[1.06, 1.14]} /><BottomWash /><Chip at={0.6}><span style={{fontFamily: F.serif, fontStyle: 'italic', fontSize: 30}}>Atelier Meridian 40</span> · £10,800 · <span style={{color: C.mint}}>in stock</span></Chip></>},
  {at: 39.6, el: <FollowUp />},
  {at: 49.6, el: <><Clip src="34213" from={8} kb={[1.12, 1.18]} /><BottomWash /><Chip at={0.6}><span style={{color: C.mint, fontWeight: 800}}>✓</span> On Amelia’s record, for whoever she speaks to next</Chip></>},
  {at: 54.6, el: <><Clip src="5434" from={0} kb={[1.08, 1.14]} pan={[4, 5]} /><SideWash side="left" strength={0.86} /><BottomWash />
    <Stat side="left" at={0.4} eyebrow="Back every week" color={C.mint} big={<><Count at={0.55} dur={1.4} to={15} />+</>} line={<>hours. And every follow-up<br />out in under 5 minutes.</>} /></>},
  {at: 67.6, el: <EndCard clip="34213" from={4} product="Client Intelligence" tryIt tagline={<>Every client.<br /><span style={{color: C.mint}}>Remembered.</span></>} />, brand: false},
];

export const ClientIntelligenceFilm: React.FC = () => <Film shots={shots} lines={L} audio="client-intelligence" length={75} />;

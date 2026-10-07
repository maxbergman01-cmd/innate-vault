import React from 'react';
import {BottomWash, Clip, EndCard, Film, Lockup, SceneTitle, Shot, SideWash, Stat, UIStage} from '../kit/Film';
import {Count, Cursor, Rise, Typed, useP} from '../kit/motion';
import {Box, conf, Email, Field, U} from '../frames/EnquiryFrames';
import {C, F} from '../theme';
import lines from './enquiry.lines.json';

const FieldIn: React.FC<{at: number; k: string; v: string; c: keyof typeof conf}> = ({at, ...r}) => <Rise at={at} y={10}><Field {...r} /></Rise>;
const Swap: React.FC<{at: number; a: React.ReactNode; b: React.ReactNode}> = ({at, a, b}) => {
  const p = useP(at, 0.3);
  return <>{p < 0.5 ? a : b}</>;
};

// 0:13 The email becomes a brief, and the unclear budget is flagged, not guessed.
const Brief: React.FC = () => {
  const flag = useP(4.2, 0.4);
  return (
    <UIStage clip="24344" from={2}>
      <SceneTitle eyebrow="Enquiry-to-Viewing Desk" width={1200} title={<>From enquiry to brief.<br /><span style={{color: 'rgba(255,254,250,.55)'}}>With the gaps flagged.</span></>} />
      <Rise at={0.3} style={{position: 'absolute', left: 110, top: 330, width: 760, transform: 'perspective(2200px) rotateY(8deg)', transformOrigin: 'right center'}}>
        <Email hi={flag > 0.5} />
      </Rise>
      <Rise at={0.8} style={{position: 'absolute', left: 960, top: 250, width: 850, transform: 'perspective(2200px) rotateY(-8deg)', transformOrigin: 'left center'}}>
        <Box eyebrow="PREPARED EXTRACTION" title="Review the brief">
          <FieldIn at={1.4} k="Requirement" v="Office relocation" c="high" />
          <FieldIn at={1.8} k="Area" v="4,500–6,000 sq ft" c="high" />
          <FieldIn at={2.2} k="Location" v="Farringdon / Clerkenwell" c="high" />
          <FieldIn at={2.6} k="Timing" v="Before 31 March 2027" c="med" />
          <FieldIn at={4.0} k="Budget" v="£55 psf · basis unclear" c="low" />
          <FieldIn at={3.0} k="Must have" v="Natural light; meeting room" c="high" />
          <Rise at={4.6}><div style={{marginTop: 18, background: '#fbf0e3', borderLeft: '4px solid #d9963a', borderRadius: 8, padding: '14px 16px', fontFamily: F.sans, fontSize: 19, color: '#6b4a14', lineHeight: 1.4}}>
            <b>Confirmation needed.</b> Does £55 psf include service charge and rates?
          </div></Rise>
        </Box>
      </Rise>
    </UIStage>
  );
};

// 0:27 One question drafted; the reply goes straight into the brief.
const Clarify: React.FC = () => (
  <UIStage clip="24344" from={6} pos="70% center">
    <SceneTitle eyebrow="Clarified" title={<>One question. Answered in the brief.</>} width={1300} />
    <div style={{position: 'absolute', left: 110, top: 280, width: 780, transform: 'perspective(2200px) rotateY(8deg)', transformOrigin: 'right center'}}>
      <Rise at={0.2}>
        <Box eyebrow="CLARIFICATION · DRAFTED" title="To Maya Patel">
          <div style={{fontFamily: F.sans, fontSize: 27, lineHeight: 1.5, color: U.text, marginTop: 6, minHeight: 124}}>
            <Typed at={0.5} cps={75} caret={C.mintDeep} text="Thanks Maya. Before I shortlist the right options, could you confirm whether £55 psf includes service charge and rates?" />
          </div>
          <Swap at={2.8} a={<div style={{display: 'inline-block', marginTop: 16, background: U.green, color: '#fff', fontFamily: F.sans, fontWeight: 600, fontSize: 19, padding: '13px 20px', borderRadius: 10}}>Add client’s reply →</div>}
            b={<div style={{display: 'inline-block', marginTop: 16, border: `1px solid ${U.line}`, color: U.muted, fontFamily: F.sans, fontSize: 19, padding: '13px 20px', borderRadius: 10}}>Reply added</div>} />
        </Box>
      </Rise>
      <Rise at={3.1} style={{marginTop: 26}}>
        <div style={{background: '#e9f5ef', borderRadius: 14, padding: '20px 24px', fontFamily: F.sans, fontSize: 25, color: '#1e5a44', boxShadow: '0 30px 70px rgba(0,0,0,.45)'}}>
          <b>Maya:</b> £55 is the headline rent. Service charge and rates are separate.
        </div>
      </Rise>
    </div>
    <Rise at={0.5} style={{position: 'absolute', left: 980, top: 320, width: 830, transform: 'perspective(2200px) rotateY(-8deg)', transformOrigin: 'left center'}}>
      <Box eyebrow="PREPARED EXTRACTION" title="Review the brief">
        <Field k="Area" v="4,500–6,000 sq ft" c="high" />
        <Field k="Location" v="Farringdon / Clerkenwell" c="high" />
        <Swap at={4.1} a={<Field k="Budget" v="£55 psf · basis unclear" c="low" />} b={<Rise at={4.1} y={8}><Field k="Budget" v="£55 psf headline; service charge and rates separate" c="high" /></Rise>} />
        <Swap at={4.5} a={<div style={{marginTop: 18, background: '#fbf0e3', borderLeft: '4px solid #d9963a', borderRadius: 8, padding: '14px 16px', fontFamily: F.sans, fontSize: 19, color: '#6b4a14'}}><b>Confirmation needed.</b> Budget basis</div>}
          b={<Rise at={4.5} y={8}><div style={{marginTop: 18, background: '#e9f5ef', borderLeft: `4px solid ${C.mintDeep}`, borderRadius: 8, padding: '14px 16px', fontFamily: F.sans, fontSize: 19, color: '#1e5a44'}}><b>No blocking gaps.</b> Owner: Alex Morgan</div></Rise>} />
      </Box>
    </Rise>
    <Cursor path={[[1.8, 700, 900], [2.5, 300, 640]]} click={[2.7]} />
  </UIStage>
);

// 0:40 Confirm, and the search starts from the right brief.
const Confirm: React.FC = () => (
  <UIStage clip="48503" from={3}>
    <SceneTitle eyebrow="Confirmed" title={<>The search starts from the right brief.</>} width={1300} />
    <Rise at={0.2} style={{position: 'absolute', left: 400, top: 260, width: 1000, transform: 'scale(1.12)', transformOrigin: 'left top'}}>
      <Box eyebrow="ENQUIRY BRIEF · ENQ-1048" title="Maya Patel · Northbeam Studio">
        <div style={{position: 'absolute', right: 28, top: 26}}>
          <Swap at={1.1} a={<div style={{border: `1px solid ${U.line}`, borderRadius: 8, padding: '7px 14px', fontFamily: F.sans, fontSize: 16, color: U.muted}}>Draft</div>}
            b={<div style={{background: '#e9f5ef', borderRadius: 8, padding: '7px 14px', fontFamily: F.sans, fontSize: 16, color: '#1e5a44'}}>✓ Confirmed</div>} />
        </div>
        <div style={{fontFamily: F.sans, fontSize: 23, lineHeight: 1.75, color: U.text}}>
          Requirement: Office relocation<br />Area: 4,500–6,000 sq ft<br />Location: Farringdon / Clerkenwell<br />Timing: Before 31 March 2027<br />Budget: £55 psf headline rent; service charge and rates separate<br />Must have: Natural light; meeting room
        </div>
        <Swap at={1.1} a={<div style={{display: 'inline-block', marginTop: 18, background: U.green, color: '#fff', fontFamily: F.sans, fontWeight: 600, fontSize: 20, padding: '14px 24px', borderRadius: 10}}>Confirm brief</div>}
          b={<div style={{display: 'inline-block', marginTop: 18, background: '#dfe6e1', color: U.muted, fontFamily: F.sans, fontWeight: 600, fontSize: 20, padding: '14px 24px', borderRadius: 10}}>Brief confirmed</div>} />
      </Box>
    </Rise>
    <Rise at={1.5} style={{position: 'absolute', left: 460, top: 880}}>
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, background: '#14201b', color: '#fff', borderRadius: 12, padding: '16px 22px', fontFamily: F.sans, fontSize: 21, boxShadow: '0 20px 50px rgba(0,0,0,.5)'}}>
        <span style={{color: C.mint}}>✓</span> Brief ENQ-1048 confirmed · <b style={{color: C.mint}}>Open Property Matcher →</b>
      </div>
    </Rise>
    <Cursor path={[[0.2, 900, 950], [0.8, 560, 845]]} click={[1.0]} />
  </UIStage>
);

const L = lines as {placed: number; dur: number; text: string}[];
const shots: Shot[] = [
  {at: 0, el: <Clip src="24217" from={1} kb={[1.06, 1.12]} />},
  {at: 3.0, el: <><Clip src="24344" from={0} pos="30% center" kb={[1.04, 1.1]} /><SideWash side="right" strength={0.84} /><BottomWash />
    <Stat at={0.2} eyebrow="Every broker, every week" big={<><Count at={0.35} dur={1.2} to={6} /> <span style={{fontSize: 130, letterSpacing: '-0.03em'}}>hrs</span></>} line={<>retyping enquiries and<br />chasing the gaps.</>} note="est. 20 enquiries a week × 18 minutes each" /></>},
  {at: 9.6, el: <><Clip src="48503" from={8} blur={18} kb={[1.1, 1.14]} /><Lockup sub="So we built" name="Enquiry-to-Viewing Desk" /></>},
  {at: 12.6, el: <Brief />},
  {at: 26.6, el: <Clarify />},
  {at: 39.6, el: <Confirm />},
  {at: 46, el: <><Clip src="48503" from={14} kb={[1.06, 1.12]} /><BottomWash />
    <Rise at={0.6} style={{position: 'absolute', left: 120, bottom: 150}}><div style={{display: 'inline-flex', alignItems: 'center', gap: 14, background: 'rgba(20,32,27,.88)', borderRadius: 14, padding: '16px 22px', fontFamily: F.sans, fontSize: 25, color: C.white}}><span style={{color: C.mint, fontWeight: 800}}>✓</span> Brief confirmed · shortlist built from it</div></Rise></>},
  {at: 51.6, el: <><Clip src="13126" from={4} kb={[1.04, 1.1]} pan={[2, 3]} /><SideWash side="left" strength={0.86} /><BottomWash />
    <Stat side="left" top={230} at={0.4} eyebrow="Back every week, per broker" color={C.mint} big={<><Count at={0.55} dur={1.2} to={6} /> <span style={{fontSize: 130, letterSpacing: '-0.03em'}}>hrs</span></>} line={<>spent on viewings,<br />not retyping.</>} note="est. 20 enquiries a week × 18 minutes each" /></>},
  {at: 64.6, el: <EndCard clip="48503" from={2} product="Enquiry-to-Viewing Desk" tryIt tagline={<>Every enquiry.<br /><span style={{color: C.mint}}>Ready to view.</span></>} />, brand: false},
];

export const EnquiryFilm: React.FC = () => <Film shots={shots} lines={L} audio="enquiry" length={75} />;

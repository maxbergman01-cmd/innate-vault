import React from 'react';
import Peep from 'react-peeps';
import {Brand, Eyebrow, Stage, Subtitle} from '../kit/Stage';
import {C, F} from '../theme';

// Enquiry-to-Viewing Desk UI, rebuilt from the live demo: warm paper, serif headings, confidence pills.
export const U = {bg: '#f5f4ef', card: '#fff', line: 'rgba(20,30,25,.10)', text: '#16201b', muted: '#6c746e', green: '#1e4a3d'};
export const conf = {high: ['#e6f2ec', '#2d7457', 'High confidence'], med: ['#fbefdc', '#9a6a12', 'Medium confidence'], low: ['#fde7e3', '#b0402f', 'Low confidence']} as const;

const Alex: React.FC<{face: 'Hectic' | 'Concerned' | 'Smile' | 'SmileBig'; size: number}> = ({face, size}) => (
  <Peep face={face} body="ButtonShirt" hair="ShortWavy" strokeColor="#0d100e" backgroundColor={C.paper}
    viewBox={{x: '-60', y: '-130', width: '1000', height: '1240'}} style={{width: size, height: size * 1.24}} />
);

export const Field: React.FC<{k: string; v: string; c: keyof typeof conf}> = ({k, v, c}) => (
  <div style={{display: 'grid', gridTemplateColumns: '150px 1fr auto', alignItems: 'center', padding: '15px 0', borderBottom: `1px solid ${U.line}`, gap: 12}}>
    <div style={{fontFamily: F.sans, fontSize: 18, color: U.muted}}>{k}</div>
    <div style={{fontFamily: F.sans, fontSize: 21, fontWeight: 600, color: U.text}}>{v}</div>
    <div style={{background: conf[c][0], color: conf[c][1], fontFamily: F.sans, fontSize: 15, fontWeight: 600, padding: '5px 11px', borderRadius: 999}}>{conf[c][2]}</div>
  </div>
);
export const Box: React.FC<{eyebrow: string; title: string; children: React.ReactNode; style?: React.CSSProperties}> = ({eyebrow, title, children, style}) => (
  <div style={{background: U.card, border: `1px solid ${U.line}`, borderRadius: 14, padding: '24px 28px', boxShadow: '0 50px 100px rgba(0,0,0,.5)', ...style}}>
    <div style={{fontFamily: F.sans, fontSize: 13, letterSpacing: '.16em', color: U.muted}}>{eyebrow}</div>
    <div style={{fontFamily: F.serif, fontSize: 34, color: U.text, marginTop: 2, marginBottom: 10}}>{title}</div>
    {children}
  </div>
);
export const Email: React.FC<{style?: React.CSSProperties; hi?: boolean}> = ({style, hi}) => (
  <div style={{background: U.card, borderRadius: 14, padding: '26px 30px', boxShadow: '0 40px 90px rgba(0,0,0,.5)', ...style}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 46, height: 46, borderRadius: 23, background: '#e7ebe7', display: 'grid', placeItems: 'center', fontFamily: F.sans, fontSize: 16, color: U.muted}}>MP</div>
      <div><div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 20, color: U.text}}>Maya Patel</div><div style={{fontFamily: F.sans, fontSize: 15, color: U.muted}}>Design studio · 09:42</div></div>
    </div>
    <div style={{fontFamily: F.sans, fontSize: 23, lineHeight: 1.55, color: U.text, marginTop: 18}}>
      Hi Alex, we have outgrown our studio and need around 4,500 to 6,000 sq ft, ideally close to Farringdon. We would like to move before the end of March. Natural light and a client-facing meeting room are important.{' '}
      <span style={hi ? {background: '#fde7e3', color: '#a3402f', borderRadius: 6, padding: '1px 6px'} : undefined}>Budget is roughly £55 per sq ft, although I need to confirm whether that includes service charge.</span>
    </div>
  </div>
);

// 0:02 Hook. Monday morning inbox; one sentence decides whether the shortlist is right.
export const EQ1: React.FC = () => (
  <Stage glow={[30, 35]} tint="#2b3a32">
    <div style={{position: 'absolute', left: 170, top: 230, width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle, ${C.amber}40, transparent 66%)`}} />
    <div style={{position: 'absolute', left: 140, top: 190}}><Alex face="Hectic" size={580} /></div>
    {/* stacked unread enquiries */}
    {[['Elena Rossi', 'Web form · yesterday', -6, 610, 120], ['Daniel Reed', 'Call note · 09:18', 4, 650, 210], ['Maya Patel', 'Email · 09:42', -2, 620, 300]].map(([n, s, r, x, y]) => (
      <div key={String(n)} style={{position: 'absolute', left: Number(x), top: Number(y), width: 360, background: '#fff', borderRadius: 12, padding: '16px 18px', transform: `rotate(${r}deg)`, boxShadow: '0 24px 50px rgba(0,0,0,.45)', display: 'flex', gap: 12, alignItems: 'center'}}>
        <div style={{width: 10, height: 10, borderRadius: 5, background: C.coralDeep}} />
        <div><div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 19, color: U.text}}>{n}</div><div style={{fontFamily: F.sans, fontSize: 15, color: U.muted}}>{s}</div></div>
        <div style={{marginLeft: 'auto', fontFamily: F.sans, fontSize: 13, color: U.muted}}>Unread</div>
      </div>
    ))}
    <div style={{position: 'absolute', left: 1080, top: 280, width: 780}}>
      <Eyebrow color={C.muted}>Commercial property · Monday 9:42</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 200, lineHeight: 0.92, letterSpacing: '-0.055em', color: C.white, marginTop: 26}}>£55 psf.</div>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 92, lineHeight: 1, letterSpacing: '-0.04em', color: C.coral, marginTop: 14}}>Including service charge?</div>
      <div style={{fontFamily: F.sans, fontSize: 40, fontWeight: 500, color: C.muted, marginTop: 24}}>Guess wrong, and the whole shortlist is wrong.</div>
    </div>
    <Brand />
    <Subtitle>Every enquiry gets retyped by hand. And the one detail that matters is the one that's unclear.</Subtitle>
  </Stage>
);

// 0:20 The enquiry becomes a checked brief; the weak spot is flagged, not guessed.
export const EQ2: React.FC = () => (
  <Stage glow={[60, 30]}>
    <div style={{position: 'absolute', left: 110, top: 100}}>
      <Eyebrow>Enquiry-to-Viewing Desk</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 60, letterSpacing: '-0.035em', color: C.white, marginTop: 16, lineHeight: 1.05}}>From email to brief.<br /><span style={{color: C.muted}}>With the gaps flagged.</span></div>
    </div>
    <div style={{position: 'absolute', left: 110, top: 380, width: 760, transform: 'perspective(2200px) rotateY(9deg)', transformOrigin: 'right center'}}><Email hi /></div>
    <div style={{position: 'absolute', left: 960, top: 120, width: 850, transform: 'perspective(2200px) rotateY(-9deg)', transformOrigin: 'left center'}}>
      <Box eyebrow="REVIEW THE BRIEF" title="Maya Patel · office relocation">
        <Field k="Requirement" v="Office relocation" c="high" />
        <Field k="Area" v="4,500–6,000 sq ft" c="high" />
        <Field k="Location" v="Farringdon / Clerkenwell" c="high" />
        <Field k="Timing" v="Before 31 March 2027" c="med" />
        <Field k="Budget" v="£55 psf · basis unclear" c="low" />
        <Field k="Must have" v="Natural light; meeting room" c="high" />
        <div style={{marginTop: 18, background: '#fbf0e3', borderLeft: '4px solid #d9963a', borderRadius: 8, padding: '14px 16px', fontFamily: F.sans, fontSize: 18, color: '#6b4a14', lineHeight: 1.4}}>
          <b>Confirmation needed.</b> Does £55 psf include service charge and rates?
        </div>
      </Box>
    </div>
    <Brand />
    <Subtitle>It turns the email into a brief, and flags the budget instead of guessing it.</Subtitle>
  </Stage>
);

// 0:36 The question is drafted, the answer lands, the brief is confirmed.
export const EQ3: React.FC = () => (
  <Stage glow={[45, 30]} tint="#1f4a3f">
    <div style={{position: 'absolute', left: 120, top: 110}}><Eyebrow>Clarified, confirmed, ready to match</Eyebrow></div>
    <div style={{position: 'absolute', left: 120, top: 200, width: 760, transform: 'perspective(2200px) rotateY(9deg)', transformOrigin: 'right center'}}>
      <Box eyebrow="DRAFT REPLY · READY TO SEND" title="To Maya Patel">
        <div style={{fontFamily: F.sans, fontSize: 28, lineHeight: 1.5, color: U.text, marginTop: 6}}>Thanks Maya. Before I shortlist the right options, could you confirm whether £55 psf includes service charge and rates?</div>
      </Box>
      <div style={{marginTop: 28, background: '#e9f5ef', borderRadius: 14, padding: '20px 24px', fontFamily: F.sans, fontSize: 24, color: '#1e5a44', boxShadow: '0 30px 70px rgba(0,0,0,.45)'}}>
        <b>Maya:</b> £55 is the headline rent. Service charge and rates are separate.
      </div>
    </div>
    <div style={{position: 'absolute', left: 960, top: 250, width: 840, transform: 'perspective(2200px) rotateY(-9deg)', transformOrigin: 'left center'}}>
      <Box eyebrow="REVIEW THE BRIEF" title="Budget resolved">
        <Field k="Budget" v="£55 psf headline; service charge and rates separate" c="high" />
        <div style={{marginTop: 18, background: '#e9f5ef', borderLeft: `4px solid ${C.mintDeep}`, borderRadius: 8, padding: '14px 16px', fontFamily: F.sans, fontSize: 18, color: '#1e5a44'}}><b>No blocking gaps.</b> Owner: Alex Morgan</div>
        <div style={{display: 'flex', gap: 14, marginTop: 20}}>
          <div style={{flex: 1, textAlign: 'center', border: `1px solid ${U.line}`, borderRadius: 10, padding: '14px', fontFamily: F.sans, fontSize: 19, color: U.text}}>Edit fields</div>
          <div style={{flex: 1, textAlign: 'center', background: U.green, borderRadius: 10, padding: '14px', fontFamily: F.sans, fontWeight: 600, fontSize: 19, color: '#fff'}}>Confirm brief</div>
        </div>
      </Box>
      <div style={{marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 12, background: '#14201b', color: '#fff', borderRadius: 12, padding: '14px 18px', fontFamily: F.sans, fontSize: 19, boxShadow: '0 20px 50px rgba(0,0,0,.5)'}}>
        <span style={{color: C.mint}}>✓</span> Brief confirmed · <b style={{color: C.mint}}>Open in Property Matcher →</b>
      </div>
    </div>
    <Brand />
    <Subtitle>One question, drafted for Alex. The answer goes straight into the brief.</Subtitle>
  </Stage>
);

// 1:00 Payoff.
export const EQ4: React.FC = () => (
  <Stage glow={[70, 40]} tint="#1d5246">
    <div style={{position: 'absolute', left: 170, top: 170, width: 560, height: 560, borderRadius: '50%', background: C.mint, boxShadow: `0 0 160px ${C.mint}55`}} />
    <div style={{position: 'absolute', left: 150, top: 150}}><Alex face="SmileBig" size={560} /></div>
    <div style={{position: 'absolute', left: 900, top: 220, width: 940}}>
      <Eyebrow>Per broker, every week</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 300, lineHeight: 0.88, letterSpacing: '-0.065em', color: C.mint, marginTop: 24}}>6<span style={{fontSize: 110, letterSpacing: '-0.03em', marginLeft: 22, color: C.white}}>hours</span></div>
      <div style={{fontFamily: F.sans, fontSize: 50, fontWeight: 500, color: C.white, letterSpacing: '-0.02em', marginTop: 18}}>back from retyping and chasing.</div>
      <div style={{fontFamily: F.sans, fontSize: 24, color: C.muted, marginTop: 30}}>Est. 20 enquiries a week × 18 minutes each</div>
    </div>
    <Brand />
    <Subtitle>Every enquiry becomes a checked brief, and every broker gets their week back.</Subtitle>
  </Stage>
);

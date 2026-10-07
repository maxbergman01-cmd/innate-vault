import React from 'react';
import {Brand, Eyebrow, Subtitle} from '../kit/Stage';
import {BottomWash, Graded, SideWash} from '../kit/Footage';
import {AppWindow, Card, Header, SourceChip, Tiles} from '../ui/FactFind';
import {C, F} from '../theme';

export const Stat: React.FC<{eyebrow: string; big: React.ReactNode; line: React.ReactNode; side?: 'left' | 'right'; top?: number; color?: string}> = ({eyebrow, big, line, side = 'right', top = 300, color = C.white}) => (
  <div style={{position: 'absolute', [side]: 110, top, width: 820, textAlign: 'left'}}>
    <Eyebrow color={C.mint}>{eyebrow}</Eyebrow>
    <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 250, lineHeight: 0.9, letterSpacing: '-0.06em', color, marginTop: 24, textShadow: '0 20px 60px rgba(0,0,0,.45)'}}>{big}</div>
    <div style={{fontFamily: F.sans, fontSize: 50, fontWeight: 500, letterSpacing: '-0.02em', color: C.white, marginTop: 18, lineHeight: 1.12, textShadow: '0 10px 40px rgba(0,0,0,.5)'}}>{line}</div>
  </div>
);

// 0:05 Hook: the meeting is over; the evening goes on data entry.
export const RF1: React.FC = () => (
  <Graded src="stock/ffw-night.jpg" pos="30% center">
    <SideWash side="right" />
    <BottomWash />
    <Stat eyebrow="Every client meeting" big={<>200<span style={{color: C.mint}}>+</span></>} line={<>hours a year typing<br />into Intelliflo.</>} />
    <Brand />
    <Subtitle>Every client meeting ends the same way. Hours of typing it all into Intelliflo.</Subtitle>
  </Graded>
);

// 0:16 Build: everything from the meeting goes in; the fact find comes back ready to check.
export const RF2: React.FC = () => (
  <Graded src="stock/ffw-desk.jpg" blur={14} dim={0.35}>
    <div style={{position: 'absolute', left: 110, top: 96}}>
      <Eyebrow>Fact Find Writer</Eyebrow>
      <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 60, letterSpacing: '-0.035em', color: C.white, marginTop: 14, lineHeight: 1.05}}>Everything from the meeting.<br /><span style={{color: 'rgba(255,254,250,.6)'}}>One minute later, ready to check.</span></div>
    </div>
    {[['quote', 'Meeting transcript · 1h 30m', -2], ['pen', 'Handwritten fact find', 2], ['image', 'Payslip and passport photos', -2], ['doc', 'Pension statement', 3], ['table', 'Properties spreadsheet', -2]].map(([i, l, r], k) => (
      <div key={String(l)} style={{position: 'absolute', left: 110 + (k % 2) * 36, top: 360 + k * 96, transform: `rotate(${r}deg)`}}><SourceChip icon={String(i)} label={String(l)} /></div>
    ))}
    <div style={{position: 'absolute', left: 800, top: 250, transform: 'perspective(2400px) rotateY(-10deg) rotateX(3deg)', transformOrigin: 'left center'}}>
      <div style={{transform: 'scale(0.74)', transformOrigin: 'left top'}}>
        <AppWindow width={1300} height={900}>
          <Header eyebrow="PROPOSED UPDATE · READY TO CHECK" count={112} />
          <Tiles />
        </AppWindow>
      </div>
    </div>
    <Brand />
    <Subtitle>Put in everything from the meeting. About a minute later, the whole fact find is ready to check.</Subtitle>
  </Graded>
);

// 0:34 Build: it follows the conversation and never guesses.
export const RF3: React.FC = () => (
  <Graded src="stock/ffw-desk.jpg" blur={18} dim={0.45} pos="70% center">
    <div style={{position: 'absolute', left: 110, top: 100}}><Eyebrow>Checked, not guessed</Eyebrow></div>
    <div style={{position: 'absolute', left: 110, top: 190, width: 830, transform: 'perspective(2000px) rotateY(7deg)', transformOrigin: 'right center'}}>
      <Card title="Meeting transcript" who="08:13:12">
        <div style={{fontFamily: F.sans, fontSize: 38, lineHeight: 1.42, color: C.uiText}}>
          <b>Owen:</b> After the restructure it’s <span style={{position: 'relative', color: C.uiMuted}}>eighty<span style={{position: 'absolute', left: -4, right: -4, top: '55%', height: 5, background: C.coralDeep, borderRadius: 3}} /></span>… actually no, <span style={{background: '#d5f3e5', color: C.mintDeep, padding: '0 10px', borderRadius: 8, fontWeight: 700}}>sixty-five</span>.
        </div>
      </Card>
      <div style={{marginTop: 26}}>
        <Card title="Old workplace pension" who="Owen" tag={{text: 'Waiting for value', tone: 'hold'}}>
          <div style={{background: '#fdecea', color: '#a3402f', borderRadius: 10, padding: '14px 16px', fontFamily: F.sans, fontSize: 21, lineHeight: 1.35}}>Mentioned in the meeting. No value given, so nothing is written until it is.</div>
        </Card>
      </div>
    </div>
    <div style={{position: 'absolute', left: 1020, top: 250, width: 790, transform: 'perspective(2000px) rotateY(-7deg)', transformOrigin: 'left center'}}>
      <Card title="Basic income" who="Owen" tag={{text: 'From transcript', tone: 'ok'}}>
        <div style={{fontFamily: F.sans, fontSize: 22, color: C.uiMuted}}>Gross annual salary</div>
        <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 92, color: C.uiText, letterSpacing: '-0.03em', lineHeight: 1.1}}>£65,000</div>
        <div style={{display: 'inline-block', marginTop: 10, background: '#e3f5ec', color: C.mintDeep, fontFamily: F.sans, fontSize: 19, fontWeight: 600, padding: '8px 14px', borderRadius: 999}}>Corrected figure used · £80,000 not written</div>
      </Card>
      <div style={{marginTop: 26, display: 'flex', alignItems: 'center', gap: 14, background: '#14201b', borderRadius: 14, padding: '18px 22px', boxShadow: '0 30px 70px rgba(0,0,0,.5)'}}>
        <div style={{width: 34, height: 34, borderRadius: 17, background: C.mint, display: 'grid', placeItems: 'center', color: C.ink, fontWeight: 800}}>✓</div>
        <div style={{fontFamily: F.sans, fontSize: 22, color: C.white}}><b>111 changes approved</b> · written to Intelliflo</div>
      </div>
    </div>
    <Brand />
    <Subtitle>It follows the conversation, shows you where sources disagree, and waits for anything it wasn't told.</Subtitle>
  </Graded>
);

// 1:00 Payoff: the work is done in daylight.
export const RF4: React.FC = () => (
  <Graded src="stock/ffw-smile.jpg" pos="70% center">
    <SideWash side="left" strength={0.82} />
    <BottomWash />
    <Stat side="left" eyebrow="Back every year" big={<span style={{color: C.mint}}>200+</span>} line={<>hours, for the work<br />only an adviser can do.</>} />
    <Brand />
    <Subtitle>That's over two hundred hours a year back, for the work only an adviser can do.</Subtitle>
  </Graded>
);

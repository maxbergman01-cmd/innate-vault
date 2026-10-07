import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {BottomWash, Clip, EndCard, Film, Lockup, SceneTitle, Shot, SideWash, Stat, UIStage} from '../kit/Film';
import {Count, Cursor, FPS, lerp, Rise, s, useP} from '../kit/motion';
import {AppWindow, Card, Header, SourceChip, TILES} from '../ui/FactFind';
import {C, F} from '../theme';
import lines from './fact-find-writer.lines.json';

// 0:13 Everything from the meeting goes in; a minute later the fact find is ready to check.
const Inputs: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const chips: [string, string, number][] = [
    ['quote', 'Meeting transcript · 1h 30m', 1.2], ['pen', 'Handwritten fact find', 2.5], ['image', 'Payslip and passport photos', 3.5],
    ['doc', 'Pension statement', 4.3], ['table', 'Properties spreadsheet', 4.9], ['chart', 'Voice note from the car', 5.6],
  ];
  const suck = interpolate(t, [7.6, 8.8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const win = useP(7.2, 1);
  const shown = Math.floor(interpolate(t, [10.6, 12.6], [0, 9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return (
    <UIStage clip="42664" from={1}>
      <SceneTitle width={1300} eyebrow="Fact Find Writer" title={<>Everything from the meeting.<br /><span style={{color: 'rgba(255,254,250,.55)'}}>Ready to check in about a minute.</span></>} />
      {chips.map(([i, l, at], k) => {
        const e = interpolate(t, [at, at + 0.5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const delay = k * 0.06;
        const sp = interpolate(suck, [delay, Math.min(1, delay + 0.7)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const x = lerp(sp, 110 + (k % 2) * 40, 1100);
        const y = lerp(sp, 340 + k * 92, 560);
        return (
          <div key={l} style={{position: 'absolute', left: x, top: y, opacity: e * (1 - sp), transform: `translateY(${(1 - e) * 30}px) rotate(${(k % 2 ? 2 : -2) * (1 - sp)}deg) scale(${1 - sp * 0.5})`}}>
            <SourceChip icon={i} label={l} />
          </div>
        );
      })}
      <div style={{position: 'absolute', left: lerp(win, 980, 780), top: 300, opacity: win, transform: 'perspective(2400px) rotateY(-9deg) rotateX(2deg)', transformOrigin: 'left center'}}>
        <div style={{transform: 'scale(0.78)', transformOrigin: 'left top'}}>
          <AppWindow width={1300} height={790}>
            <Header eyebrow={t < 10.4 ? 'READING 6 SOURCES…' : 'PROPOSED UPDATE · READY TO CHECK'} count={Math.round(interpolate(t, [10.4, 12.6], [0, 112], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}))} />
            {t < 10.4 && t > 8.4 && (
              <div style={{padding: 40}}>
                <div style={{height: 10, borderRadius: 5, background: '#e2e5e1', overflow: 'hidden'}}><div style={{height: '100%', width: `${interpolate(t, [8.4, 10.4], [5, 100], {extrapolateRight: 'clamp'})}%`, background: C.mintDeep}} /></div>
                <div style={{fontFamily: F.sans, fontSize: 20, color: C.uiMuted, marginTop: 16}}>Reading transcript, fact find, photos, statements and voice note</div>
              </div>
            )}
            <div style={{padding: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20}}>
              {TILES.map(([k, n, d], i) => {
                const on = i < shown;
                return (
                  <div key={k} style={{background: '#fff', borderRadius: 14, border: `1px solid ${C.uiLine}`, padding: '24px 26px', opacity: on ? 1 : 0, transform: `translateY(${on ? 0 : 16}px)`, transition: 'none'}}>
                    <div style={{fontFamily: F.sans, fontSize: 15, letterSpacing: '.12em', color: C.uiMuted}}>{k.toUpperCase()}</div>
                    <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 46, color: C.uiText, marginTop: 6}}>{n}</div>
                    <div style={{fontFamily: F.sans, fontSize: 18, color: C.uiMuted, marginTop: 2}}>{d}</div>
                  </div>
                );
              })}
            </div>
          </AppWindow>
        </div>
      </div>
    </UIStage>
  );
};

// 0:30 It follows the conversation, shows disagreements, waits for missing figures.
const Checked: React.FC = () => {
  const strike = useP(1.4, 0.4);
  const hi = useP(2.0, 0.4);
  return (
    <UIStage clip="42656" from={0.5} pos="70% center">
      <SceneTitle eyebrow="Checked, not guessed" title={<>It follows the conversation.</>} />
      <div style={{position: 'absolute', left: 110, top: 300, width: 840, transform: 'perspective(2000px) rotateY(7deg)', transformOrigin: 'right center'}}>
        <Rise at={0.3}>
          <Card title="Meeting transcript" who="01:13:12">
            <div style={{fontFamily: F.sans, fontSize: 38, lineHeight: 1.42, color: C.uiText}}>
              <b>Owen:</b> After the restructure my salary’s <span style={{position: 'relative', color: strike > 0.5 ? C.uiMuted : C.uiText}}>eighty<span style={{position: 'absolute', left: -4, top: '55%', height: 5, width: `calc(${strike * 100}% + 8px)`, background: C.coralDeep, borderRadius: 3}} /></span>… actually no, <span style={{background: `rgba(213,243,229,${hi})`, color: hi > 0.5 ? C.mintDeep : C.uiText, padding: '0 10px', borderRadius: 8, fontWeight: 700}}>sixty-five</span>.
            </div>
          </Card>
        </Rise>
        <Rise at={5.6} style={{marginTop: 40}}>
          <Card title="Old workplace pension" who="Owen" tag={{text: 'Waiting for value', tone: 'hold'}}>
            <div style={{background: '#fdecea', color: '#a3402f', borderRadius: 10, padding: '14px 16px', fontFamily: F.sans, fontSize: 22, lineHeight: 1.35}}>Mentioned in the meeting. No value given, so nothing is written until it is.</div>
          </Card>
        </Rise>
      </div>
      <div style={{position: 'absolute', left: 1020, top: 340, width: 790, transform: 'perspective(2000px) rotateY(-7deg)', transformOrigin: 'left center'}}>
        <Rise at={2.4}>
          <Card title="Basic income" who="Owen" tag={{text: 'From transcript', tone: 'ok'}}>
            <div style={{fontFamily: F.sans, fontSize: 22, color: C.uiMuted}}>Gross annual salary</div>
            <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 92, color: C.uiText, letterSpacing: '-0.03em', lineHeight: 1.1}}>£65,000</div>
          </Card>
        </Rise>
        <Rise at={3.6} style={{marginTop: 40}}>
          <Card title="Sources disagree" tag={{text: 'Your call', tone: 'warn'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
              {[['Handwritten fact find', '£80,000'], ['Meeting, corrected', '£65,000']].map(([k, v]) => (
                <div key={k} style={{background: '#f6f6f3', borderRadius: 10, padding: '14px 16px'}}>
                  <div style={{fontFamily: F.sans, fontSize: 18, color: C.uiMuted}}>{k}</div>
                  <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 36, color: C.uiText, marginTop: 4}}>{v}</div>
                </div>
              ))}
            </div>
          </Card>
        </Rise>
      </div>
    </UIStage>
  );
};

// 0:42 Check it, approve it, written to Intelliflo.
const Approve: React.FC = () => {
  const done = useP(2.9, 0.35);
  const rows: [string, string, string][] = [
    ['Gross annual salary', '£58,000', '£65,000'], ['Retirement goal', 'Age 65', 'Age 60'], ['Children', 'Isla', 'Isla, Rory'], ['Home valuation', '£640,000', '£715,000'], ['Old workplace pension', '—', 'Held · waiting for value'],
  ];
  return (
    <UIStage clip="42664" from={4}>
      <SceneTitle eyebrow="Approve" title={<>Check it. Approve it.</>} />
      <div style={{position: 'absolute', left: 300, top: 250, transform: 'perspective(2400px) rotateX(4deg)', transformOrigin: 'center top'}}>
        <Rise at={0.1}>
          <AppWindow width={1320} height={588}>
            <div style={{background: '#fff', padding: '22px 36px', borderBottom: `1px solid ${C.uiLine}`, display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', fontFamily: F.mono, fontSize: 14, letterSpacing: '.14em', color: C.uiMuted}}>
              <div>FIELD</div><div>IN INTELLIFLO NOW</div><div>PROPOSED</div>
            </div>
            {rows.map(([k, a, b], i) => (
              <Rise key={k} at={0.4 + i * 0.18} y={12}>
                <div style={{display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', padding: '20px 36px', borderBottom: `1px solid ${C.uiLine}`, fontFamily: F.sans, fontSize: 26, background: '#fff'}}>
                  <div style={{color: C.uiText, fontWeight: 600}}>{k}</div>
                  <div style={{color: C.uiMuted}}>{a}</div>
                  <div style={{color: i === 4 ? '#b0402f' : C.mintDeep, fontWeight: 700}}>{b}</div>
                </div>
              </Rise>
            ))}
            <div style={{padding: '24px 36px', display: 'flex', alignItems: 'center', gap: 18}}>
              <div style={{fontFamily: F.sans, fontSize: 21, color: C.uiMuted}}>+ 107 more · 1 held for a value</div>
              <div style={{marginLeft: 'auto', background: done > 0.5 ? C.mint : C.mintDeep, color: done > 0.5 ? C.ink : '#fff', fontFamily: F.sans, fontWeight: 700, fontSize: 23, padding: '16px 28px', borderRadius: 12}}>{done > 0.5 ? '✓ 111 changes approved' : 'Approve 111 changes'}</div>
            </div>
          </AppWindow>
        </Rise>
      </div>
      <Rise at={3.3} style={{position: 'absolute', left: 1240, top: 170}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#14201b', borderRadius: 14, padding: '18px 24px', boxShadow: '0 30px 70px rgba(0,0,0,.5)'}}>
          <div style={{width: 34, height: 34, borderRadius: 17, background: C.mint, display: 'grid', placeItems: 'center', color: C.ink, fontWeight: 800}}>✓</div>
          <div style={{fontFamily: F.sans, fontSize: 24, color: C.white}}><b>Written to Intelliflo</b> · 111 changes</div>
        </div>
      </Rise>
      <Cursor path={[[0.9, 1250, 700], [2.4, 1500, 925]]} click={[2.8]} />
    </UIStage>
  );
};

const L = lines as {placed: number; dur: number; text: string}[];
const shots: Shot[] = [
  {at: 0, el: <Clip src="4547" from={4} kb={[1.08, 1.14]} />},
  {at: 2.6, el: <Clip src="46755" from={2.2} kb={[1.05, 1.1]} />},
  {at: 4.4, el: <><Clip src="23718" from={2} pos="30% center" kb={[1.04, 1.12]} pan={[0, -1.5]} /><SideWash side="right" strength={0.82} /><BottomWash />
    <Stat at={0.2} eyebrow="Every client meeting" big={<><Count at={0.35} dur={1.4} to={200} />+</>} line={<>hours a year typing<br />into Intelliflo.</>} /></>},
  {at: 9.8, el: <><Clip src="45923" from={0.5} blur={18} kb={[1.1, 1.14]} /><Lockup sub="So we built" name="Fact Find Writer" /></>},
  {at: 13, el: <Inputs />},
  {at: 29.8, el: <Checked />},
  {at: 41.8, el: <Approve />},
  {at: 49, el: <><Clip src="4547" from={20.5} kb={[1.1, 1.16]} /><BottomWash />
    <Rise at={0.8} style={{position: 'absolute', left: 120, bottom: 150}}><div style={{display: 'inline-flex', alignItems: 'center', gap: 14, background: 'rgba(20,32,27,.85)', borderRadius: 14, padding: '16px 22px', fontFamily: F.sans, fontSize: 24, color: C.white}}><span style={{color: C.mint, fontWeight: 800}}>✓</span> Fact find up to date · nothing retyped</div></Rise></>},
  {at: 54.6, el: <><Clip src="4876" from={1.5} kb={[1.08, 1.14]} pan={[3, 4]} /><SideWash side="left" strength={0.84} /><BottomWash />
    <Stat side="left" at={0.4} eyebrow="Back every year" color={C.mint} big={<><Count at={0.55} dur={1.6} to={200} />+</>} line={<>hours, for the work<br />only an adviser can do.</>} /></>},
  {at: 67.6, el: <EndCard clip="42664" from={2} product="Fact Find Writer" tagline={<>The meeting ends.<br /><span style={{color: C.mint}}>The typing doesn’t start.</span></>} />, brand: false},
];

export const FactFindWriterFilm: React.FC = () => <Film shots={shots} lines={L} audio="fact-find-writer" length={75} />;

import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {BottomWash, Clip, EndCard, Film, Lockup, SceneTitle, Shot, SideWash, Stat, UIStage} from '../kit/Film';
import {Count, Cursor, FPS, Rise, Typed, useP} from '../kit/motion';
import {C, F} from '../theme';
import lines from './trend-intelligence.lines.json';

// Trend Intelligence UI, rebuilt from the live demo: warm paper, serif trend names, beige tiles, dark green signal bars.
const U = {bg: '#f6f5f1', card: '#ffffff', line: 'rgba(29,42,36,.12)', text: '#1d2a24', muted: '#6c736e', green: '#2f5545', track: '#dcdcd6'};
const clampI = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// The six trends exactly as the demo has them.
const TRENDS: {name: string; cat: string; score: number}[] = [
  {name: 'Blurred lip colour', cat: 'Beauty', score: 82}, {name: 'Tinted daily SPF', cat: 'Beauty', score: 78}, {name: 'Refillable home fragrance', cat: 'Home', score: 75},
  {name: 'Skin comfort rituals', cat: 'Beauty', score: 69}, {name: 'Sculptural ceramics', cat: 'Home', score: 65}, {name: 'Mini discovery formats', cat: 'Beauty', score: 72},
];

const Btn: React.FC<{children: React.ReactNode; on?: boolean; primary?: boolean}> = ({children, on, primary}) => (
  <div style={{display: 'inline-block', border: `1px solid ${primary ? U.green : U.line}`, background: primary ? U.green : on ? '#eeeee9' : '#fff', color: primary ? '#fff' : U.text, borderRadius: 6, padding: '10px 16px', fontFamily: F.sans, fontSize: 18}}>{children}</div>
);

const TrendCard: React.FC<{t: (typeof TRENDS)[number]; fill?: number; selected?: boolean; compact?: boolean}> = ({t, fill = 1, selected, compact}) => (
  <div style={{background: U.card, border: `${selected ? 2 : 1}px solid ${selected ? U.green : U.line}`, borderRadius: 12, padding: compact ? 16 : 20, display: 'grid', gap: compact ? 10 : 12}}>
    <div style={{height: compact ? 80 : 104, borderRadius: 8, background: 'linear-gradient(120deg,#d8c4b4,#efe5da)', display: 'grid', placeItems: 'center', fontFamily: F.serif, fontStyle: 'italic', fontSize: compact ? 26 : 32, color: '#5b5048'}}>{t.name}</div>
    <div style={{fontFamily: F.sans, fontSize: 13, letterSpacing: '.16em', color: U.muted}}>{t.cat.toUpperCase()} / EMERGING</div>
    <div style={{fontFamily: F.serif, fontSize: compact ? 24 : 27, color: U.text, fontWeight: 600}}>{t.name}</div>
    <div style={{fontFamily: F.sans, fontSize: 18, color: U.text}}>Signal score <b>{Math.round(t.score * fill)}/100</b></div>
    <div style={{height: 6, borderRadius: 3, background: U.track}}><div style={{height: '100%', width: `${t.score * fill}%`, borderRadius: 3, background: U.green}} /></div>
  </div>
);

const Window: React.FC<{children: React.ReactNode; width: number}> = ({children, width}) => (
  <div style={{width, background: U.bg, borderRadius: 18, overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.06)'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '20px 30px', borderBottom: `1px solid ${U.line}`, background: '#fff'}}>
      <div style={{fontFamily: F.sans, fontWeight: 700, fontSize: 21, color: U.text}}>innate /</div>
      <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.18em', color: U.muted}}>TREND INTELLIGENCE</div>
      <div style={{marginLeft: 'auto', border: `1px solid ${U.line}`, borderRadius: 999, padding: '6px 14px', fontFamily: F.sans, fontSize: 15, color: U.text}}>September research edition</div>
    </div>
    <div style={{padding: 28}}>{children}</div>
  </div>
);

const SOURCES = ['Retail shelf', 'Launch trackers', 'Search signals', 'Design desks', 'Beauty press', 'Home assortments', 'Gift assortments', 'Social listening'];

// 0:13 Over a thousand sources monitored; the trend report drafts itself.
const Report: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  return (
    <UIStage clip="49381" from={0}>
      <SceneTitle eyebrow="Trend Intelligence Platform" width={1300} title={<>Over 1,000 sources, watched for you.<br /><span style={{color: 'rgba(255,254,250,.55)'}}>The trend report, drafted.</span></>} />
      <Rise at={0.3} style={{position: 'absolute', left: 110, top: 330, width: 470}}>
        <div style={{background: '#14201b', borderRadius: 16, padding: '24px 26px', boxShadow: '0 40px 90px rgba(0,0,0,.5)'}}>
          <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.16em', color: 'rgba(255,255,255,.6)'}}>SOURCES MONITORED</div>
          <div style={{fontFamily: F.display, fontWeight: 600, fontSize: 92, color: C.mint, letterSpacing: '-0.04em', lineHeight: 1.05, fontVariantNumeric: 'tabular-nums'}}><Count at={0.6} dur={2.4} to={1000} fmt={(n) => Math.round(n).toLocaleString('en-GB')} />{t > 3 ? '+' : ''}</div>
          <div style={{display: 'grid', gap: 8, marginTop: 14}}>
            {SOURCES.map((s, i) => {
              const on = interpolate(t, [0.8 + i * 0.28, 1.1 + i * 0.28], [0, 1], clampI);
              return (
                <div key={s} style={{display: 'flex', alignItems: 'center', gap: 10, opacity: on, transform: `translateX(${(1 - on) * -14}px)`, fontFamily: F.sans, fontSize: 19, color: 'rgba(255,255,255,.88)'}}>
                  <span style={{width: 8, height: 8, borderRadius: 4, background: C.mint}} />{s}
                  <span style={{marginLeft: 'auto', fontSize: 15, color: 'rgba(255,255,255,.5)'}}>live</span>
                </div>
              );
            })}
          </div>
        </div>
      </Rise>
      <Rise at={1.0} style={{position: 'absolute', left: 660, top: 300, transform: 'perspective(2600px) rotateY(-7deg)', transformOrigin: 'left center'}}>
        <div style={{transform: 'scale(.78)', transformOrigin: 'left top'}}>
          <Window width={1440}>
            <div style={{fontFamily: F.sans, fontSize: 14, letterSpacing: '.16em', color: U.muted}}>RESEARCH / POINT-IN-TIME</div>
            <div style={{fontFamily: F.serif, fontSize: 46, color: U.text, lineHeight: 1.1, margin: '8px 0 22px'}}>Find the signal. Build the next brief.</div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20}}>
              {TRENDS.map((tr, i) => {
                const at = 3.4 + i * 0.35;
                const fill = interpolate(t, [at + 0.2, at + 1.2], [0, 1], {...clampI, easing: (x) => 1 - Math.pow(1 - x, 3)});
                return <Rise key={tr.name} at={at} y={18}><TrendCard t={tr} fill={fill} compact /></Rise>;
              })}
            </div>
          </Window>
        </div>
      </Rise>
    </UIStage>
  );
};

// 0:27 The evidence behind a trend, and what it doesn't prove yet. Pick the ones worth pursuing.
const Evidence: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const picks = [3.4, 4.0, 4.6];
  const n = picks.filter((p) => t >= p).length;
  return (
    <UIStage clip="46682" from={14}>
      <SceneTitle eyebrow="Inspect evidence" width={1400} title={<>The evidence, and what it doesn’t prove yet.</>} />
      <Rise at={0.2} style={{position: 'absolute', left: 110, top: 250, width: 820, transform: 'perspective(2200px) rotateY(7deg)', transformOrigin: 'right center'}}>
        <div style={{background: U.card, borderRadius: 16, padding: 26, boxShadow: '0 50px 100px rgba(0,0,0,.55)', display: 'grid', gap: 14}}>
          <TrendCard t={TRENDS[0]} selected={n >= 1} />
          <Rise at={0.9} y={12}>
            <div style={{background: '#eef4f0', borderRadius: 10, padding: '16px 18px', fontFamily: F.sans, fontSize: 22, color: U.text, lineHeight: 1.4}}>
              <div style={{fontSize: 13, letterSpacing: '.16em', color: U.green, fontWeight: 700, marginBottom: 4}}>EVIDENCE</div>
              8 of 24 sampled launches use soft-focus or stain language.
            </div>
          </Rise>
          <Rise at={1.6} y={12}>
            <div style={{background: '#fbf0e3', borderRadius: 10, padding: '16px 18px', fontFamily: F.sans, fontSize: 22, color: '#6b4a14', lineHeight: 1.4}}>
              <div style={{fontSize: 13, letterSpacing: '.16em', fontWeight: 700, marginBottom: 4}}>WHAT IT DOESN’T PROVE</div>
              Launch language indicates supply, not proven consumer demand.
            </div>
          </Rise>
        </div>
      </Rise>
      <div style={{position: 'absolute', left: 1010, top: 270, width: 800, transform: 'perspective(2200px) rotateY(-7deg)', transformOrigin: 'left center', display: 'grid', gap: 16}}>
        {TRENDS.slice(0, 3).map((tr, i) => (
          <Rise key={tr.name} at={0.5 + i * 0.2}>
            <div style={{display: 'flex', alignItems: 'center', gap: 18, background: U.card, border: `${t >= picks[i] ? 2 : 1}px solid ${t >= picks[i] ? U.green : U.line}`, borderRadius: 12, padding: '16px 20px', boxShadow: '0 30px 70px rgba(0,0,0,.45)'}}>
              <div style={{width: 120, height: 64, borderRadius: 8, background: 'linear-gradient(120deg,#d8c4b4,#efe5da)'}} />
              <div style={{flex: 1}}>
                <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 25, color: U.text}}>{tr.name}</div>
                <div style={{fontFamily: F.sans, fontSize: 17, color: U.muted}}>Signal score {tr.score}/100</div>
              </div>
              <Btn on={t >= picks[i]}>{t >= picks[i] ? 'Remove from brief' : 'Add to brief'}</Btn>
            </div>
          </Rise>
        ))}
        <Rise at={0.9}><div style={{fontFamily: F.sans, fontSize: 22, color: C.white, marginTop: 6}}><b style={{color: C.mint}}>{n}</b> {n === 1 ? 'trend' : 'trends'} selected</div></Rise>
      </div>
      <Cursor path={[[2.8, 1500, 980], [3.3, 1735, 318], [3.9, 1735, 438], [4.5, 1735, 558]]} click={[3.4, 4.0, 4.6]} />
    </UIStage>
  );
};

const BRIEF = 'OPPORTUNITY BRIEF\nAudience: UK accessible premium beauty buyer\n\nBlurred lip colour\nConcept: Explore a sheer, buildable lip stain in three muted shades.\nValidation: Launch language indicates supply, not proven consumer demand.\n\nTinted daily SPF\nConcept: Test a tinted daily complexion concept with a claims review.\nValidation: Claims and protection need independent product testing.\n\nRefillable home fragrance\nConcept: Prototype a reusable vessel with two seasonal refills.\nValidation: Refill uptake and repeat purchase are not available in this sample.\n\nNext step: test concepts with five target buyers before commissioning samples.';

// 0:40 Selected trends become an opportunity brief for buyer conversations.
const Brief: React.FC = () => {
  const built = useP(0.8, 0.3) > 0.5;
  return (
    <UIStage clip="42643" from={0.5}>
      <SceneTitle eyebrow="Opportunity brief" width={1400} title={<>Ready for the buyer conversation.</>} />
      <Rise at={0.2} style={{position: 'absolute', left: 300, top: 240, width: 1320}}>
        <div style={{background: U.card, borderRadius: 16, padding: '26px 30px', boxShadow: '0 60px 120px rgba(0,0,0,.6)'}}>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 20}}>
            <div style={{flex: 1}}>
              <div style={{fontFamily: F.serif, fontWeight: 600, fontSize: 30, color: U.text}}>Opportunity brief</div>
              <div style={{fontFamily: F.sans, fontSize: 15, color: U.muted, marginTop: 10}}>Audience / retail partner</div>
              <div style={{background: U.bg, border: `1px solid ${U.line}`, borderRadius: 8, padding: '12px 14px', fontFamily: F.sans, fontSize: 20, color: U.text, marginTop: 6}}>UK accessible premium beauty buyer</div>
            </div>
            <div style={{display: 'grid', gap: 8, justifyItems: 'end'}}>
              <div style={{fontFamily: F.sans, fontSize: 17, color: U.muted}}>3 trends selected</div>
              <Btn primary>{built ? 'Brief built' : 'Build opportunity brief'}</Btn>
            </div>
          </div>
          <div style={{marginTop: 20, border: `1px solid ${U.green}`, borderRadius: 12, padding: '20px 24px', height: 520, fontFamily: F.sans, fontSize: 19, lineHeight: 1.45, color: U.text, opacity: built ? 1 : 0.25}}>
            {built && <Typed at={1.1} cps={160} caret={U.green} text={BRIEF} />}
          </div>
        </div>
      </Rise>
      <Cursor path={[[0.1, 1300, 980], [0.6, 1500, 345]]} click={[0.8]} />
    </UIStage>
  );
};

const L = lines as {placed: number; dur: number; text: string}[];
const shots: Shot[] = [
  {at: 0, el: <Clip src="45160" from={0.3} kb={[1.06, 1.12]} />},
  {at: 2.6, el: <Clip src="46682" from={3} kb={[1.06, 1.1]} />},
  {at: 4.4, el: <><Clip src="4700" from={0} pos="30% center" kb={[1.04, 1.1]} /><SideWash side="right" strength={0.84} /><BottomWash />
    <Stat at={0.2} eyebrow="Home & beauty supplier for UK retailers" big={<>2–3 <span style={{fontSize: 130, letterSpacing: '-0.03em'}}>wks</span></>} line={<>of senior research,<br />every trend cycle.</>} note="Around 20 sources, checked by hand" /></>},
  {at: 9.8, el: <><Clip src="46682" from={10} blur={18} kb={[1.1, 1.14]} /><Lockup sub="So we built" name="Trend Intelligence Platform" size={112} /></>},
  {at: 12.8, el: <Report />},
  {at: 26.6, el: <Evidence />},
  {at: 39.6, el: <Brief />},
  {at: 48.6, el: <><Clip src="42666" from={0.5} kb={[1.04, 1.1]} /><BottomWash />
    <Rise at={0.6} style={{position: 'absolute', left: 120, bottom: 150}}><div style={{display: 'inline-flex', alignItems: 'center', gap: 14, background: 'rgba(20,32,27,.88)', borderRadius: 14, padding: '16px 22px', fontFamily: F.sans, fontSize: 25, color: C.white}}><span style={{color: C.mint, fontWeight: 800}}>✓</span> Concepts and questions, ready for buyers</div></Rise></>},
  {at: 54.6, el: <><Clip src="49381" from={1} kb={[1.04, 1.1]} /><SideWash side="right" strength={0.86} /><BottomWash />
    <Stat at={0.4} eyebrow="Every trend cycle" color={C.mint} big={<><span style={{fontSize: 120, letterSpacing: '-0.03em'}}>Under </span>4 <span style={{fontSize: 130, letterSpacing: '-0.03em'}}>hrs</span></>} line={<>down from 2–3 weeks.<br />1,000+ sources, not 20.</>} /></>},
  {at: 67.6, el: <EndCard clip="42643" from={3} product="Trend Intelligence Platform" tryIt tagline={<>Every trend.<br /><span style={{color: C.mint}}>Backed by evidence.</span></>} />, brand: false},
];

export const TrendIntelligenceFilm: React.FC = () => <Film shots={shots} lines={L} audio="trend-intelligence" length={75} />;

import React from 'react';
import {Brand, StageBg, Subtitle} from '../kit/Stage';
import {BottomWash, Graded, SideWash} from '../kit/Footage';
import {Stat} from './RealFactFind';
import {CI2, CI3} from './ClientFrames';
import {EQ2, EQ3} from './EnquiryFrames';
import {PQ2, PQ3} from './ProposalFrames';
import {C} from '../theme';

const Over: React.FC<{src: string; pos?: string; children: React.ReactNode}> = ({src, pos, children}) => (
  <StageBg.Provider value={{src, pos}}>{children}</StageBg.Provider>
);
const Small: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{fontSize: 34, color: 'rgba(255,254,250,.7)', fontWeight: 500}}>{children}</span>;

// Client Intelligence
export const RC1: React.FC = () => (
  <Graded src="stock/ci-tired.jpg" pos="25% center">
    <SideWash side="right" strength={0.85} /><BottomWash />
    <Stat eyebrow="Every client conversation" big={<>15<span style={{color: C.mint}}>+</span></>} line={<>hours a week writing up<br />notes and follow-ups.</>} />
    <Brand /><Subtitle>Every client conversation creates work. Notes, records, follow-ups. Fifteen hours a week of it.</Subtitle>
  </Graded>
);
export const RC2: React.FC = () => <Over src="stock/ci-showroom.jpg"><CI2 /></Over>;
export const RC3: React.FC = () => <Over src="stock/ci-watch.jpg"><CI3 /></Over>;
export const RC4: React.FC = () => (
  <Graded src="stock/ci-calm.jpg" pos="40% center">
    <SideWash side="right" strength={0.85} /><BottomWash />
    <Stat eyebrow="Back every week" big={<span style={{color: C.mint}}>15+</span>} line={<>hours. And every follow-up<br />out in under 5 minutes.</>} />
    <Brand /><Subtitle>Fifteen hours a week back, and every follow-up out in under five minutes.</Subtitle>
  </Graded>
);

// Enquiry-to-Viewing
export const RE1: React.FC = () => (
  <Graded src="stock/eq-phone.jpg" pos="30% center">
    <SideWash side="right" strength={0.85} /><BottomWash />
    <Stat eyebrow="Every broker, every week" big={<>6 <span style={{fontSize: 120, letterSpacing: '-0.03em'}}>hrs</span></>} line={<>retyping enquiries and<br />chasing the gaps. <Small>est.</Small></>} />
    <Brand /><Subtitle>Every enquiry gets retyped into a brief by hand, then chased for what's missing.</Subtitle>
  </Graded>
);
export const RE2: React.FC = () => <Over src="stock/eq-late.jpg"><EQ2 /></Over>;
export const RE3: React.FC = () => <Over src="stock/eq-late.jpg" pos="70% center"><EQ3 /></Over>;
export const RE4: React.FC = () => (
  <Graded src="stock/eq-keys.jpg" pos="center">
    <SideWash side="left" strength={0.8} /><BottomWash />
    <Stat side="left" top={220} eyebrow="Back every week, per broker" big={<span style={{color: C.mint}}>6 <span style={{fontSize: 120, letterSpacing: '-0.03em'}}>hrs</span></span>} line={<>so the time goes on<br />viewings, not retyping. <Small>est.</Small></>} />
    <Brand /><Subtitle>Around six hours a week back for every broker, spent on viewings instead.</Subtitle>
  </Graded>
);

// Proposal and Quote
export const RP1: React.FC = () => (
  <Graded src="stock/pq-tired.jpg" pos="70% center">
    <SideWash side="left" strength={0.85} /><BottomWash />
    <Stat side="left" eyebrow="Every proposal" big={<>½ <span style={{fontSize: 120, letterSpacing: '-0.03em'}}>day</span></>} line={<>of rate cards and chasing.<br /><span style={{color: C.coral}}>Margin 39% → 30%</span> in the rush. <Small>est.</Small></>} />
    <Brand /><Subtitle>Every proposal takes half a day. And in the rush, a twelve percent discount takes the margin from thirty-nine to thirty.</Subtitle>
  </Graded>
);
export const RP2: React.FC = () => <Over src="stock/pq-late.jpg"><PQ2 /></Over>;
export const RP3: React.FC = () => <Over src="stock/pq-late.jpg" pos="70% center"><PQ3 /></Over>;
export const RP4: React.FC = () => (
  <Graded src="stock/pq-sign.jpg" pos="65% center">
    <SideWash side="left" strength={0.82} /><BottomWash />
    <Stat side="left" top={220} eyebrow="Every proposal" big={<span style={{color: C.mint}}>20 <span style={{fontSize: 120, letterSpacing: '-0.03em'}}>min</span></span>} line={<>and never under the 35% floor<br />without sign-off. <Small>est.</Small></>} />
    <Brand /><Subtitle>Proposals out in minutes, at a price someone with authority chose.</Subtitle>
  </Graded>
);

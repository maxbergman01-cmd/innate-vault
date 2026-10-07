import React from 'react';
import {Composition, Still} from 'remotion';
import {FactFindWriterFilm} from './films/FactFindWriter';
import {ClientIntelligenceFilm} from './films/ClientIntelligence';
import {EnquiryFilm} from './films/Enquiry';
import {ProposalFilm} from './films/Proposal';
import {FFW1, FFW2, FFW3, FFW4, FFW5} from './frames/FactFindFrames';
import {CI1, CI2, CI3, CI4} from './frames/ClientFrames';
import {EQ1, EQ2, EQ3, EQ4} from './frames/EnquiryFrames';
import {PQ1, PQ2, PQ3, PQ4} from './frames/ProposalFrames';
import {RF1, RF2, RF3, RF4} from './frames/RealFactFind';
import {RC1, RC2, RC3, RC4, RE1, RE2, RE3, RE4, RP1, RP2, RP3, RP4} from './frames/RealOthers';

const frames: [string, React.FC][] = [
  ['ffw-1', FFW1], ['ffw-2', FFW2], ['ffw-3', FFW3], ['ffw-4', FFW4], ['ffw-5', FFW5],
  ['ci-1', CI1], ['ci-2', CI2], ['ci-3', CI3], ['ci-4', CI4],
  ['eq-1', EQ1], ['eq-2', EQ2], ['eq-3', EQ3], ['eq-4', EQ4],
  ['rc-1', RC1], ['rc-2', RC2], ['rc-3', RC3], ['rc-4', RC4], ['re-1', RE1], ['re-2', RE2], ['re-3', RE3], ['re-4', RE4], ['rp-1', RP1], ['rp-2', RP2], ['rp-3', RP3], ['rp-4', RP4],
  ['rf-1', RF1], ['rf-2', RF2], ['rf-3', RF3], ['rf-4', RF4],
  ['pq-1', PQ1], ['pq-2', PQ2], ['pq-3', PQ3], ['pq-4', PQ4],
];
export const Root: React.FC = () => <>
  {frames.map(([id, C]) => <Still key={id} id={id} component={C} width={1920} height={1080} />)}
  <Composition id="film-client-intelligence" component={ClientIntelligenceFilm} durationInFrames={2250} fps={30} width={1920} height={1080} />
  <Composition id="film-enquiry" component={EnquiryFilm} durationInFrames={2250} fps={30} width={1920} height={1080} />
  <Composition id="film-proposal" component={ProposalFilm} durationInFrames={2250} fps={30} width={1920} height={1080} />
  <Composition id="film-fact-find-writer" component={FactFindWriterFilm} durationInFrames={2250} fps={30} width={1920} height={1080} />
</>;

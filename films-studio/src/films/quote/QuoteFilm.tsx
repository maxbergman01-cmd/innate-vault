import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {fontFaces} from '../../theme';
import {Problem} from './Problem';
import {Build} from './Build';
import {Result} from './Result';
import {Close} from './Close';
import timeline from './timeline.json';

const FPS = 30;
const f = (s: number) => Math.round(s * FPS);
const scene = (id: string) => timeline.scenes.find((s) => s.id === id)!;
const line = (id: string) => timeline.scenes.flatMap((s) => s.lines).find((l) => l.id === id)!;

export const QuoteFilm: React.FC = () => {
  const [problem, build, result, close] = ['problem', 'build', 'result', 'close'].map(scene);
  const rel = (id: string, s: {start: number}) => line(id).start - s.start;
  const span = (s: {start: number; end: number}) => s.end - s.start;
  const b = (id: string) => rel(id, build);
  return (
    <AbsoluteFill style={{background: '#10120f'}}>
      <style>{fontFaces}</style>
      <Sequence from={f(problem.start)} durationInFrames={f(span(problem))}>
        <Problem beats={{zoom: rel('p2', problem) - 0.1, diag: rel('p3', problem), loss: rel('p4', problem), end: span(problem)}} />
      </Sequence>
      <Sequence from={f(build.start)} durationInFrames={f(span(build))}>
        <Build l={{b1: b('b1'), b2: b('b2'), b3: b('b3'), b4: b('b4'), b5: b('b5'), b6: b('b6'), b7: b('b7'), b8: b('b8'), end: span(build)}} />
      </Sequence>
      <Sequence from={f(result.start)} durationInFrames={f(span(result))}>
        <Result r1={rel('r1', result)} />
      </Sequence>
      <Sequence from={f(close.start)} durationInFrames={f(span(close))}>
        <Close c1={rel('c1', close)} dur={span(close)} />
      </Sequence>

      {timeline.scenes.flatMap((s) => s.lines).map((l) => (
        <Sequence key={l.id} from={f(l.start)} durationInFrames={f(l.dur) + 6}>
          <Audio src={staticFile(l.src)} />
        </Sequence>
      ))}
      <Audio src={staticFile('audio/quote-music.wav')} />
      <Audio src={staticFile('audio/quote-sfx.wav')} />
    </AbsoluteFill>
  );
};

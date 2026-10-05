import React from 'react';
import {Composition} from 'remotion';
import {QuoteFilm} from './films/quote/QuoteFilm';
import quoteTimeline from './films/quote/timeline.json';

export const Root: React.FC = () => (
  <>
    <Composition id="quote" component={QuoteFilm} durationInFrames={quoteTimeline.frames} fps={30} width={1920} height={1080} />
  </>
);

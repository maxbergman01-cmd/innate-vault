import {staticFile} from 'remotion';

export const C = {
  ink: '#0d100e',
  ink2: '#111714',
  forest: '#153f37',
  forestHi: '#1f5a4c',
  paper: '#f7f5ee',
  paper2: '#ebe8df',
  white: '#fffefa',
  mint: '#78e6b6',
  mintDeep: '#1d6b55',
  muted: '#8d948c',
  coral: '#f08a7a',
  coralDeep: '#c4513f',
  amber: '#f3c98b',
  uiBg: '#f4f4f1',
  uiLine: 'rgba(16,18,15,.10)',
  uiText: '#141714',
  uiMuted: '#6b716b',
};

export const F = {
  sans: '"DM Sans", Arial, sans-serif',
  display: '"DM Sans", Arial, sans-serif',
  eyebrow: '"Syne", "DM Sans", sans-serif',
  hand: '"Caveat", cursive',
  mono: '"JetBrains Mono", ui-monospace, monospace',
  serif: '"Instrument Serif", Georgia, serif',
};

export const fontFaces = `
@font-face{font-family:"DM Sans";src:url(${staticFile('fonts/dmsans.woff2')}) format("woff2");font-weight:100 1000;font-display:block}
@font-face{font-family:"Syne";src:url(${staticFile('fonts/syne.woff2')}) format("woff2");font-weight:400 800;font-display:block}
@font-face{font-family:"Caveat";src:url(${staticFile('fonts/caveat.woff2')}) format("woff2");font-weight:400 700;font-display:block}
@font-face{font-family:"JetBrains Mono";src:url(${staticFile('fonts/mono.woff2')}) format("woff2");font-weight:400 600;font-display:block}
@font-face{font-family:"Instrument Serif";src:url(${staticFile('fonts/serif1.woff2')}) format("woff2");font-style:normal;font-display:block}
@font-face{font-family:"Instrument Serif";src:url(${staticFile('fonts/serif0.woff2')}) format("woff2");font-style:italic;font-display:block}
*{box-sizing:border-box}
`;

import {staticFile} from 'remotion';

// Brand tokens, taken from the live site's styles.css.
export const C = {
  ink: '#10120f',
  ink2: '#0b1411',
  forest: '#153f37',
  forestLift: '#1d5246',
  paper: '#f7f5ee',
  paper2: '#ebe8df',
  white: '#fffefa',
  mint: '#78e6b6',
  muted: '#8b9089',
  loss: '#f08a7a',
  warm: '#f3c98b',
};

export const FONT = '"DM Sans", Arial, sans-serif';
export const EYEBROW = '"Syne", "DM Sans", Arial, sans-serif';

export const fontFaces = `
@font-face{font-family:"DM Sans";src:url(${staticFile('fonts/dmsans.woff2')}) format("woff2");font-weight:100 1000;font-display:block}
@font-face{font-family:"Syne";src:url(${staticFile('fonts/syne.woff2')}) format("woff2");font-weight:400 800;font-display:block}
`;

export const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
export const easeInOut = (t: number) => {
  const x = Math.min(Math.max(t, 0), 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

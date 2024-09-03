import { blue, green, indigo, purple, teal, turquoise, lavender, violet, mint } from './colors';

export const getPrimary = (preset) => {
  switch (preset) {
    case 'blue':
      return blue;
    case 'green':
      return green;
    case 'indigo':
      return indigo;
    case 'purple':
      return purple;
    case 'teal':
      return teal;
    case 'turquoise':
      return turquoise;
    case 'lavender':
      return lavender;
    case 'violet':
      return violet;
    case 'mint':
      return mint;
    default:
      console.error(
        'Invalid color preset, accepted values: "blue", "green", "indigo", "purple", "teal", "turquoise", "lavender", "violet" or "mint" ".'
      );
      return blue;
  }
};

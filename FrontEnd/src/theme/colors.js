import { alpha } from '@mui/system/colorManipulator';

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927',
};

export const blue = withAlphas({
  lightest: '#F5F8FF',
  light: '#EBEFFF',
  main: '#2970FF',
  dark: '#004EEB',
  darkest: '#00359E',
  contrastText: '#FFFFFF',
});

export const green = withAlphas({
  lightest: '#F6FEF9',
  light: '#EDFCF2',
  main: '#16B364',
  dark: '#087443',
  darkest: '#084C2E',
  contrastText: '#FFFFFF',
});

export const indigo = withAlphas({
  lightest: '#F5F7FF',
  light: '#EBEEFE',
  main: '#6366F1',
  dark: '#4338CA',
  darkest: '#312E81',
  contrastText: '#FFFFFF',
});

export const purple = withAlphas({
  lightest: '#F9F5FF',
  light: '#F4EBFF',
  main: '#9E77ED',
  dark: '#6941C6',
  darkest: '#42307D',
  contrastText: '#FFFFFF',
});

export const teal = withAlphas({
  lightest: '#E0F2F1',
  light: '#80CBC4',
  main: '#008080',
  dark: '#00695C',
  darkest: '#004D40',
  contrastText: '#FFFFFF',
});

export const turquoise = withAlphas({
  lightest: '#E0FFFF',
  light: '#AFEEEE',
  main: '#40E0D0',
  dark: '#00CED1',
  darkest: '#008B8B',
  contrastText: '#FFFFFF',
});

export const lavender = withAlphas({
  lightest: '#FAF0E6',
  light: '#E6E6FA',
  main: '#B57EDC',
  dark: '#7D4E9C',
  darkest: '#4B306F',
  contrastText: '#FFFFFF',
});

export const violet = withAlphas({
  lightest: '#E6E6FA',
  light: '#B19CD9',
  main: '#8A2BE2',
  dark: '#5B00A5',
  darkest: '#2D005A',
  contrastText: '#FFFFFF',
});

export const mint = withAlphas({
  lightest: '#F5FFFA',
  light: '#CFFFE5',
  main: '#98FF98',
  dark: '#66CDAA',
  darkest: '#4682B4',
  contrastText: '#FFFFFF',
});

export const success = withAlphas({
  lightest: '#F0FDF9',
  light: '#3FC79A',
  main: '#10B981',
  dark: '#0B815A',
  darkest: '#134E48',
  contrastText: '#FFFFFF',
});

export const info = withAlphas({
  lightest: '#ECFDFF',
  light: '#CFF9FE',
  main: '#06AED4',
  dark: '#0E7090',
  darkest: '#164C63',
  contrastText: '#FFFFFF',
});

export const warning = withAlphas({
  lightest: '#FFFAEB',
  light: '#FEF0C7',
  main: '#F79009',
  dark: '#B54708',
  darkest: '#7A2E0E',
  contrastText: '#FFFFFF',
});

export const error = withAlphas({
  lightest: '#FEF3F2',
  light: '#FEE4E2',
  main: '#F04438',
  dark: '#B42318',
  darkest: '#7A271A',
  contrastText: '#FFFFFF',
});

import { Theme } from '@emotion/react';

export const theme: {
  [key: string]: Theme;
} = {
  light: {
    colors: {
      background: '#fff',
      primaryColor: '#000',
      gray: {
        '000': '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
      },
    },
  },
  dark: {
    colors: {
      background: '#000',
      primaryColor: '#fff',
      gray: {
        '000': '#24292f',
        100: '#32383f',
        200: '#424a53',
        300: '#afb8c1',
        400: '#57606a',
        500: '#6e7781',
        600: '#8c959f',
        700: '#d0d7de',
        800: '#eaeef2',
        900: '#f6f8fa',
      },
    },
  },
};

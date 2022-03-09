import { Theme } from '@emotion/react';

export const theme: {
  [key: string]: Theme;
} = {
  light: {
    colors: {
      background: '#fff',
      primaryColor: '#000',
      gray: {
        100: '#fafafa',
        200: '#f5f5f5',
        300: '#eaeaea'
      }
    }
  },
  dark: {
    colors: {
      background: '#000',
      primaryColor: '#fff',
      gray: {
        100: '#fafafa',
        200: '#f5f5f5',
        300: '#eaeaea'
      }
    }
  }
};

import { css, Interpolation, Theme } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const globalStyles: Interpolation<Theme> = theme => css`
  ${emotionReset}

  html {
    font-family: Pretendard, sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.primaryColor};
    overscroll-behavior-y: none;
    overflow-y: auto;
  }

  body {
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primaryColor};

    &:visited {
      all: unset;
    }
  }
`;

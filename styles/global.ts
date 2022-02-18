import { Interpolation, Theme } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const globalStyles: Interpolation<Theme> = theme => ({
  ...emotionReset,
  html: {
    fontFamily: 'Pretendard, sans-serif',
    backgroundColor: theme.background,
    color: theme.primaryColor
  }
});

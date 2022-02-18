import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      background: string;
      primaryColor: string;
      gray: {
        100: string;
        200: string;
        300: string;
      };
    };
  }
}

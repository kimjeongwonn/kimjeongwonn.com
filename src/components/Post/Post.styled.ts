import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const PostArticle = styled.article(
  ({ theme }) => css`
    padding: 20px;
    max-width: 480px;
    color: ${theme.colors.primaryColor};
  `
);

export const PostHeader = styled.header(
  ({ theme }) => css`
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${theme.colors.primaryColor};
  `
);

export const PostTitle = styled.h1(
  ({ theme }) => css`
    font-size: 36px;
    font-weight: 700;
  `
);

export const PostTime = styled.time(
  ({ theme }) => css`
    display: block;
    font-size: 14px;
    margin-bottom: 10px;
  `
);

export const PostExcerpt = styled.p(
  ({ theme }) => css`
    font-size: 14px;
    margin-top: 10px;
  `
);

export const PostContent = styled.section(
  ({ theme }) => css`
    color: ${theme.colors.primaryColor};
    font-size: 16px;
    line-height: 1.8;
    word-break: keep-all;
    overflow-wrap: break-word;

    a {
      text-decoration: underline;
    }

    hr {
      border: none;
      border-bottom: 1px solid ${theme.colors.gray[300]};
      margin: 16px 0;
    }

    /* list */
    ul {
      li {
        margin-left: 32px;
        list-style: disc;
        li {
          list-style: circle;
          li {
            list-style: square;
          }
        }
      }
    }

    ol {
      li {
        list-style: decimal;
        margin-left: 32px;
      }
    }

    /* headers */
    h2 {
      font-size: 28px;
      font-weight: 700;
      margin: 12px 0;
      border-bottom: 1px solid ${theme.colors.gray[300]};
    }

    h3 {
      font-size: 22px;
      font-weight: 700;
      margin-top: 8px;
    }

    h4 {
      font-size: 18px;
      font-weight: 700;
      margin-top: 8px;
    }

    h5,
    h6 {
      font-weight: 700;
      margin-top: 6px;
    }

    /* typography */
    p {
      margin-block-start: 1ch;
      margin-block-end: 1ch;
    }

    strong {
      font-weight: 700;
    }

    em {
      font-style: italic;
    }

    blockquote {
      border-left: 4px solid ${theme.colors.gray[300]};
      line-height: 1.5;
      margin: 16px 0;
      padding-left: 12px;

      color: ${theme.colors.gray[600]};
      font-size: 14px;

      code {
        font-size: 12px;
        background-color: unset;
        padding: 2px;
      }
    }

    pre {
      font-family: JetBrains Mono, monospace;
      position: relative;
      box-sizing: border-box;
      left: -20px;
      width: min(100vw, 768px);
      padding: 24px;
      background-color: ${theme.colors.gray['100']};
      line-height: 1.5;
      overflow-x: auto;
      box-sizing: border-box;

      code {
        all: unset;
        font-size: 14px;
      }
    }

    code {
      font-family: JetBrains Mono, monospace;
      line-height: 1;
      padding: 2px 4px;
      background-color: ${theme.colors.gray['100']};
      border-radius: 4px;
      font-size: 14px;
      margin: 0 2px;
    }

    /* rich data */
    img {
      max-width: 100%;
    }
  `
);

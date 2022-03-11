import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const LayoutContainer = styled.div(
  ({ theme }) => css`
    max-width: 768px;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    border-left: 1px solid ${theme.colors.primaryColor};
    border-right: 1px solid ${theme.colors.primaryColor};
    margin: 0 auto;

    @media screen and (max-width: 768px) {
      border-left: none;
      border-right: none;
    }
  `
);

export const LayoutHeaderContainer = styled.header<{ extended?: boolean }>(
  ({ theme, extended }) => css`
    position: sticky;
    top: 0;
    padding: 20px;
    border-bottom: 1px solid ${theme.colors.primaryColor};
    background-color: ${theme.colors.background};
    user-select: none;
    transform: translateY(${extended ? '0px' : '-100%'});

    transition: transform 0.4s;
  `
);

export const LayoutHeaderTitle = styled.h1(
  ({ theme }) => css`
    font-family: JetBrains Mono;
    font-weight: 700;
    font-size: 18px;
    color: ${theme.colors.primaryColor};
    line-height: 1;
  `
);

export const LayoutHeaderButton = styled.button(
  ({ theme }) => css`
    display: block;
    appearance: none;
    margin: 0;
    margin-top: 8px;
    padding: 0;
    background: none;
    border: none;
    font-family: JetBrains Mono;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    width: max-content;
  `
);

export const YearsContainer = styled.ul(
  ({}) => css`
    position: fixed;
    top: 20px;
    right: 20px;
  `
);
export const YearsItem = styled.li<{ active: boolean }>(
  ({ active }) =>
    active &&
    css`
      a {
        font-weight: 700;
      }
    `
);

export const LayoutMain = styled.main(({}) => css``);

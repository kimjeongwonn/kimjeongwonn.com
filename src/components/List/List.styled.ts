import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ListContainer = styled.ul(({ theme }) => css``);

export const ListItemContainer = styled.li(
  ({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.gray[300]};
    padding: 20px 0 20px 20px;
    cursor: pointer;
  `
);

export const ListItemTitle = styled.h3(
  ({ theme }) => css`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  `
);

export const ListItemTime = styled.time(
  ({ theme }) => css`
    display: block;
    font-size: 12px;
    margin-bottom: 10px;
  `
);

export const ListItemExcerpt = styled.p(
  ({ theme }) => css`
    font-size: 12px;
  `
);

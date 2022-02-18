import styled from '@emotion/styled';

export const LayoutHeaderContainer = styled.header(({ theme }) => ({
  padding: 20,
  paddingTop: 100,
  borderBottom: `1px solid ${theme.colors.primaryColor}`
}));

export const LayoutContainer = styled.div(({ theme }) => ({
  maxWidth: 768,
  minHeight: '100vh',
  borderLeft: `1px solid ${theme.colors.primaryColor}`,
  borderRight: `1px solid ${theme.colors.primaryColor}`,
  margin: '0 auto'
}));

export const LayoutHeaderTitle = styled.h1(({ theme }) => ({
  fontFamily: 'JetBrains Mono',
  fontWeight: '800',
  fontSize: 18,
  color: theme.colors.primaryColor
}));

export const LayoutMain = styled.main``;

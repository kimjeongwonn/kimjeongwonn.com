import React from 'react';
import { LayoutContainer, LayoutMain } from './Layout.styled';
import LayoutHeader from './LayoutHeader';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <LayoutContainer>
      <LayoutHeader />
      <LayoutMain>{children}</LayoutMain>
    </LayoutContainer>
  );
};

export default Layout;

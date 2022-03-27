import React from 'react';
import { LayoutFooterContainer } from './Layout.styled';

const LayoutFooter = () => {
  return <LayoutFooterContainer>© {new Date().getFullYear()} kimjeongwonn</LayoutFooterContainer>;
};

export default LayoutFooter;

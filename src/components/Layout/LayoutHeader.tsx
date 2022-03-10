import Link from 'next/link';
import React from 'react';
import { BLOG_TITLE } from '../../constant/meta';
import { LayoutHeaderButton, LayoutHeaderContainer, LayoutHeaderTitle } from './Layout.styled';

const LayoutHeader = ({ extended }: { extended: boolean; years: number[] }) => {
  return (
    <LayoutHeaderContainer extended={extended}>
      <Link passHref href='/'>
        <LayoutHeaderTitle as='a'>{BLOG_TITLE}</LayoutHeaderTitle>
      </Link>
      <Link passHref href='/about'>
        <LayoutHeaderButton as='a'>about</LayoutHeaderButton>
      </Link>
    </LayoutHeaderContainer>
  );
};

export default LayoutHeader;

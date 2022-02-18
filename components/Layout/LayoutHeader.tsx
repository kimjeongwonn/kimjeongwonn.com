import React from 'react';
import { BLOG_TITLE } from '../../constant/meta';
import { LayoutHeaderContainer, LayoutHeaderTitle } from './Layout.styled';

type Props = {};

const LayoutHeader = (props: Props) => {
  return (
    <LayoutHeaderContainer>
      <LayoutHeaderTitle>{BLOG_TITLE}</LayoutHeaderTitle>
    </LayoutHeaderContainer>
  );
};

export default LayoutHeader;

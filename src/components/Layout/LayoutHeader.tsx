import Link from 'next/link';
import { BLOG_TITLE } from '../../constant/meta';
import {
  LayoutHeaderButton,
  LayoutHeaderContainer,
  LayoutHeaderTitle,
} from './Layout.styled';

const LayoutHeader = ({ extended }: { extended: boolean; years: number[] }) => {
  return (
    <LayoutHeaderContainer extended={extended}>
      <Link passHref href='/' legacyBehavior>
        <LayoutHeaderTitle as='a'>{BLOG_TITLE}</LayoutHeaderTitle>
      </Link>
      <Link passHref href='/about' legacyBehavior>
        <LayoutHeaderButton as='a'>about</LayoutHeaderButton>
      </Link>
    </LayoutHeaderContainer>
  );
};

export default LayoutHeader;

import React, { useEffect, useState } from 'react';
import { LayoutContainer, LayoutMain } from './Layout.styled';
import LayoutHeader from './LayoutHeader';
import throttle from 'lodash/throttle';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [isExtendsHeader, setIsExtendsHeader] = useState(true);

  useEffect(() => {
    let lastScrollY = 0;
    const scrollHandler = throttle(
      () => {
        const scrollY = window.scrollY;
        if (scrollY > lastScrollY) {
          setIsExtendsHeader(false);
          lastScrollY = scrollY;
        }
        if (scrollY < lastScrollY - 30) {
          setIsExtendsHeader(true);
          lastScrollY = scrollY;
        }
      },
      250,
      { leading: false }
    );

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <LayoutContainer>
      <LayoutHeader extended={isExtendsHeader} />
      <LayoutMain>{children}</LayoutMain>
    </LayoutContainer>
  );
};

export default Layout;

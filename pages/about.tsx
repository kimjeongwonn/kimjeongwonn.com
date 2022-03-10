import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import About from 'src/components/Layout/About/About';
import { getAbout } from 'src/lib/getStaticData';

interface Props {
  about: ReturnType<typeof getAbout>;
}

const AboutPage: NextPage<Props> = ({ about }: Props) => {
  return (
    <>
      <NextSeo title='About' description='프론트엔드 개발자 김정원' />
      <About data={about} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      about: getAbout()
    }
  };
};

export default AboutPage;

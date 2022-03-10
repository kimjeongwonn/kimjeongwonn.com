import { GetStaticProps, NextPage } from 'next';
import About from 'src/components/Layout/About/About';
import { getAbout } from 'src/lib/getStaticData';

interface Props {
  about: ReturnType<typeof getAbout>;
}

const AboutPage: NextPage<Props> = ({ about }: Props) => {
  return <About data={about} />;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      about: getAbout()
    }
  };
};

export default AboutPage;

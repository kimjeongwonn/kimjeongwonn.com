import type { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import List from 'src/components/List/List';
import { BLOG_TITLE } from 'src/constant/meta';
import { getPostList, getYears } from 'src/lib/getStaticData';
import { PostI } from 'src/types/post';

interface Props {
  postList: PostI[];
}

const Home: NextPage<Props> = ({ postList }) => {
  return (
    <>
      <NextSeo title={BLOG_TITLE + ' blog'} />
      <List posts={postList} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postList = getPostList();
  return {
    props: {
      postList,
      years: getYears(),
    },
  };
};

export default Home;

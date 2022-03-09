import type { GetStaticProps, NextPage } from 'next';
import List from 'src/components/List/List';
import { getPostList } from 'src/lib/getStaticData';
import { PostI } from 'src/types/post';

interface Props {
  postList: PostI[];
}

const Home: NextPage<Props> = ({ postList }) => {
  return <List posts={postList} />;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const postList = getPostList();
  return {
    props: {
      postList
    }
  };
};

export default Home;

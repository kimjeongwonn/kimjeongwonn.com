import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Post from 'src/components/Post/Post';
import { getPostData, getPostList } from 'src/lib/getStaticData';

export interface PostPageProps {
  title: string;
  createAt: string;
  content: string;
  excerpt: string;
}

export const getStaticPaths: GetStaticPaths<{
  year: string;
  slug: string;
}> = async () => {
  const posts = getPostList();
  return {
    paths: posts.map(post => ({
      params: {
        year: String(dayjs(post.createAt).get('year')),
        slug: post.slug
      }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const postData = getPostData(String(params?.slug ?? ''));
  if (!postData) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      title: postData.title,
      createAt: postData.createAt,
      content: postData.content,
      excerpt: postData.excerpt
    }
  };
};

export default Post;

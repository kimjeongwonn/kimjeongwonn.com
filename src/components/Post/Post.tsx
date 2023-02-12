import dayjs from 'dayjs';
import 'highlight.js/styles/github.css';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { PostPageProps } from 'pages/[year]/[slug]';
import { BLOG_TITLE, BLOG_URL } from 'src/constant/meta';
import Comment from '../Comment/Comment';
import {
  PostArticle,
  PostContent,
  PostExcerpt,
  PostHeader,
  PostTime,
  PostTitle,
} from './Post.styled';

const Post = ({ content, createAt, title, excerpt }: PostPageProps) => {
  const router = useRouter();
  return (
    <>
      <NextSeo
        title={title}
        description={excerpt}
        openGraph={{
          title,
          description: excerpt,
          locale: 'ko_KR',
          type: 'article',
          url: BLOG_URL + router.asPath,
          site_name: BLOG_TITLE + ' blog',
        }}
      />
      <PostArticle>
        <PostHeader>
          <PostTime>{dayjs(createAt).format('YYYY/MM/DD')}</PostTime>
          <PostTitle>{title}</PostTitle>
          {excerpt && <PostExcerpt>{excerpt}</PostExcerpt>}
        </PostHeader>
        <PostContent
          dangerouslySetInnerHTML={{ __html: content }}
        ></PostContent>
      </PostArticle>
      <Comment />
    </>
  );
};

export default Post;

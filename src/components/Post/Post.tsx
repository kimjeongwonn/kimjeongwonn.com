import dayjs from 'dayjs';
import 'highlight.js/styles/github.css';
import { PostPageProps } from 'pages/[year]/[slug]';
import React from 'react';
import {
  PostArticle,
  PostContent,
  PostExcerpt,
  PostHeader,
  PostTime,
  PostTitle
} from './Post.styled';

const Post = ({ content, createAt, title, excerpt }: PostPageProps) => {
  return (
    <PostArticle>
      <PostHeader>
        <PostTime>{dayjs(createAt).format('YY/MM/DD')}</PostTime>
        <PostTitle>{title}</PostTitle>
        {excerpt && <PostExcerpt>{excerpt}</PostExcerpt>}
      </PostHeader>
      <PostContent dangerouslySetInnerHTML={{ __html: content }}></PostContent>
    </PostArticle>
  );
};

export default Post;

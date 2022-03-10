import React from 'react';
import { PostArticle, PostContent, PostHeader, PostTitle } from 'src/components/Post/Post.styled';
import type { getAbout } from 'src/lib/getStaticData';
import { AboutContainer } from './About.styles';

interface Props {
  data: ReturnType<typeof getAbout>;
}

const About = ({ data }: Props) => {
  return (
    <AboutContainer>
      <PostTitle>{data.title}</PostTitle>
      <PostContent dangerouslySetInnerHTML={{ __html: data.content }}></PostContent>
    </AboutContainer>
  );
};

export default About;

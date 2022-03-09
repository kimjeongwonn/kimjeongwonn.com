import React from 'react';
import { PostI } from '../../types/post';
import ListItem from './ListItem';
import { ListContainer } from './List.styled';
import Link from 'next/link';

interface Props {
  posts: PostI[];
}

const List = ({ posts }: Props) => {
  return (
    <ListContainer>
      {posts.map(post => (
        <ListItem key={post.createAt} item={post} />
      ))}
    </ListContainer>
  );
};

export default List;

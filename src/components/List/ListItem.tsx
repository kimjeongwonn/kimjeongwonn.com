import React from 'react';
import dayjs from 'dayjs';
import { PostI } from '../../types/post';
import { ListItemContainer, ListItemExcerpt, ListItemTime, ListItemTitle } from './List.styled';
import Link from 'next/link';

interface Props {
  item: PostI;
}

const ListItem = ({ item }: Props) => {
  const { slug, title, excerpt, createAt } = item;

  return (
    <Link href={`/${dayjs(createAt).get('year')}/${slug}`} passHref>
      <ListItemContainer>
        <ListItemTime>{dayjs(createAt).format('YYYY/MM/DD')}</ListItemTime>
        <ListItemTitle>{title}</ListItemTitle>
        <ListItemExcerpt>{excerpt}</ListItemExcerpt>
      </ListItemContainer>
    </Link>
  );
};

export default ListItem;

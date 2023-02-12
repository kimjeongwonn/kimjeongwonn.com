import dayjs from 'dayjs';
import Link from 'next/link';
import { PostI } from '../../types/post';
import {
  ListItemContainer,
  ListItemExcerpt,
  ListItemTime,
  ListItemTitle,
} from './List.styled';

interface Props {
  item: PostI;
}

const ListItem = ({ item }: Props) => {
  const { slug, title, excerpt, createAt } = item;

  return (
    <Link href={`/${dayjs(createAt).get('year')}/${slug}`} passHref>
      <a>
        <ListItemContainer>
          <ListItemTime>{dayjs(createAt).format('YYYY/MM/DD')}</ListItemTime>
          <ListItemTitle>{title}</ListItemTitle>
          {excerpt && <ListItemExcerpt>{excerpt}</ListItemExcerpt>}
        </ListItemContainer>
      </a>
    </Link>
  );
};

export default ListItem;

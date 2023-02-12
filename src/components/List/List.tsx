import { PostI } from '../../types/post';
import { ListContainer } from './List.styled';
import ListItem from './ListItem';

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

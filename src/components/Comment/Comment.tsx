import Giscus from '@giscus/react';
import { CommentSection } from './Comment.styles';

const Comment = () => {
  return (
    <CommentSection>
      <Giscus
        id='comments'
        repo='kimjeongwonn/kimjeongwonn.com'
        repoId='MDEwOlJlcG9zaXRvcnkzOTQ5NDE3NDM='
        category='Comments'
        categoryId='DIC_kwDOF4pVL84CifCd'
        mapping='title'
        strict='0'
        reactionsEnabled='1'
        emitMetadata='0'
        inputPosition='bottom'
        theme='light'
        lang='ko'
      />
    </CommentSection>
  );
};

export default Comment;

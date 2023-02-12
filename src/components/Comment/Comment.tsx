import { useCallback } from 'react';
import { CommentSection } from './Comment.styles';

const Comment = () => {
  const refCallback = useCallback((elem: HTMLDivElement | null) => {
    if (!elem) {
      return;
    }
    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://utteranc.es/client.js';
    scriptElem.async = true;
    scriptElem.setAttribute('repo', 'kimjeongwonn/kimjeongwonn.com');
    scriptElem.setAttribute('issue-term', 'pathname');
    scriptElem.setAttribute('theme', 'github-light');
    scriptElem.setAttribute('label', 'blog-comment');
    scriptElem.crossOrigin = 'anonymous';
    elem.appendChild(scriptElem);
  }, []);

  return <CommentSection ref={refCallback} />;
};

export default Comment;

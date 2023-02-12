const Utterances = () => (
  <section
    ref={elem => {
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
    }}
  />
);

export default Utterances;

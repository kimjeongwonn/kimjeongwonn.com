import { Feed } from 'feed';

import { BLOG_TITLE, BLOG_URL } from '../src/constant/meta';
import { getPostList } from '../src/lib/getStaticData';
import { writeFileSync } from 'fs';
const AUTHOR = 'kimjeongwon';
const EMAIL = 'kimjeongwonn@gmail.com';

const feed = new Feed({
  title: `${BLOG_TITLE} blog`,
  description: `${BLOG_TITLE} blog`,
  id: BLOG_URL,
  link: BLOG_URL,
  language: 'ko',
  generator: 'feed for Node.js',
  feedLinks: {
    json: `${BLOG_URL}/json`,
    atom: `${BLOG_URL}/atom`,
  },
  copyright: `All rights reserved since 2020, ${AUTHOR}`,
  author: { name: AUTHOR, email: EMAIL },
});

const posts = getPostList();

for (const post of posts) {
  const date = new Date(post.createAt);
  feed.addItem({
    title: post.title,
    id: post.slug,
    link: `${BLOG_URL}/${date.getFullYear()}/${post.slug}`,
    description: post.excerpt,
    content: post.content,
    author: [{ name: AUTHOR, email: EMAIL }],
    contributor: [{ name: AUTHOR, email: EMAIL }],
    date,
  });
}

// Output: RSS 2.0
writeFileSync('out/rss.xml', feed.rss2(), 'utf-8');
// Output: Atom 1.0
writeFileSync('out/rss-atom.xml', feed.atom1(), 'utf-8');
// Output: JSON Feed 1.0
writeFileSync('out/feed.json', feed.json1(), 'utf-8');

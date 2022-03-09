import fs from 'fs';
import path from 'path';
import { PostI } from '../types/post';
import MarkdownIt from 'markdown-it';
import * as matter from 'gray-matter';

const md = new MarkdownIt();

const contents: PostI[] = [];

const contentPath = path.join(process.cwd(), '/contents');

const contentFiles = fs.readdirSync(contentPath);
contentFiles.forEach(fileName => {
  const ext = path.extname(fileName);
  if (ext !== '.md') {
    return;
  }
  const postRawData = matter.read(path.join(contentPath, fileName));
  const PostData: PostI = {
    slug: fileName.replace(ext, '').replaceAll(' ', '-'),
    content: md.render(postRawData.content),
    createAt: (postRawData.data.date as Date).toISOString(),
    title: postRawData.data.title,
    excerpt: postRawData.data.excerpt ?? postRawData.excerpt
  };
  contents.push(PostData);
});

contents.sort((a, b) => {
  return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
});

export const getPostList = () => {
  return contents;
};

export const getPostData = (slug?: string) => {
  const post = contents.find(post => post.slug === slug);
  return post;
};

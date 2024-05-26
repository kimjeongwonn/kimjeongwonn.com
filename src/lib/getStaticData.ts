import dayjs from 'dayjs';
import fs from 'fs';
import * as matter from 'gray-matter';
import highlight from 'highlight.js';
import MarkdownIt from 'markdown-it';
import path from 'path';
import { PostI } from '../types/post';

const md = new MarkdownIt({
  typographer: true,
  highlight: (str, lang) => {
    if (lang && highlight) {
      try {
        return highlight.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return '';
  },
});
md.renderer.rules.image = (tokens, idx) => {
  const token = tokens[idx];
  const src = token.attrGet('src');
  const alt = token.content;

  return `<a href="${src}" target="_blank"><img src="${src}" alt="${alt}"></a>`;
};

const contents: PostI[] = [];
const years: Set<number> = new Set();

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
    excerpt: postRawData.data.excerpt ?? postRawData.excerpt,
  };
  contents.push(PostData);
  years.add(dayjs(postRawData.data.date).get('year'));
});

contents.sort((a, b) => {
  return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
});

export const getPostList = (year?: string) => {
  if (year) {
    return contents.filter(
      post => String(dayjs(post.createAt).get('year')) === year
    );
  }
  return contents;
};

export const getYears = () => {
  return Array.from(years).sort((a, b) => b - a);
};

export const getPostData = (slug?: string) => {
  const post = contents.find(post => post.slug === slug);
  return post;
};

export const getAbout = () => {
  const postRawData = matter.read(path.join(process.cwd(), 'about.md'));
  return {
    content: md.render(postRawData.content) ?? null,
    title: postRawData.data.title ?? null,
  };
};

const fs = require('fs');
const path = require('path');
const globby = require('globby');
const prettier = require('prettier');
const matter = require('gray-matter');

const getDate = new Date().toISOString();

const YOUR_AWESOME_DOMAIN = 'https://kimjeongwonn.github.io';

const formatted = sitemap => prettier.format(sitemap, { parser: 'html' });

(async () => {
  const posts = await globby('contents/*.md');

  const postsSitemap = `
    ${posts
      .map(post => {
        const date = new Date(matter.read(path.join(__dirname, `../${post}`)).data.date);
        const postPath = post
          .replace('contents/', date.getFullYear() + '/')
          .replace('.md', '')
          .replaceAll(' ', '-');

        return `
          <url>
            <loc>${YOUR_AWESOME_DOMAIN}/${postPath}</loc>
            <lastmod>${date.toISOString()}</lastmod>
          </url>
        `;
      })
      .join('')}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      <url>
        <loc>${YOUR_AWESOME_DOMAIN}/about</loc>
        <lastmod>${getDate}</lastmod>
      </url>
      ${postsSitemap}
    </urlset>
  `;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync('out/sitemap.xml', formattedSitemap, 'utf8');
})();

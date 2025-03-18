import { BlogClient } from 'seobot';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BLOG_DIR = 'src/content/blog/en/';
const PAGE_SIZE = 10;

const iframe = `<iframe src="$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>`;
const iframeRegex = /:::\s*@iframe\s+(.*?)\s*:::/g;
async function main() {
  if (!process.env.SEOBOT_API_KEY) {
    throw new Error('SEOBOT_API_KEY environment variable is required');
  }

  const client = new BlogClient(process.env.SEOBOT_API_KEY);
  
  // Ensure blog directory exists
  if (!existsSync(BLOG_DIR)) {
    mkdirSync(BLOG_DIR, { recursive: true });
  }

  let page = 0;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await client.getArticles(page, PAGE_SIZE);
      console.log(`Fetched ${response.articles.length} articles on page ${page}, total: ${response.total}`);
      
      if (!response.articles || response.articles.length === 0) {
        hasMore = false;
        continue;
      }

      for (const article of response.articles) {
      const fileName = `${article.slug}.md`;
      const filePath = join(BLOG_DIR, fileName);
      const articleResponse = await client.getArticle(article.slug);
      console.log(`Fetched article ${article.slug}`);
      
      // Create frontmatter
      const frontmatter = [
        '---',
        `slug: ${article.slug}`,
        `title: '${article.headline}'`,
        `description: '${article.metaDescription}'`,
        'author: Martin Donadieu',
        'author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4',
        'author_url: https://github.com/riderx',
        `created_at: ${article.createdAt}`,
        `updated_at: ${article.updatedAt}`,
        `head_image: ${article.image}`,
        `head_image_alt: '${article.category.title}'`,
        `keywords: '${articleResponse.metaKeywords}'`,
        `tag: '${article.tags.map(tag => tag.title).join(', ')}'`,
        'published: true',
        'locale: en',
        'next_blog: \'\'',
        '---',
        '',
      ].join('\n');

      const cleanMarkdown = articleResponse.markdown.replace(`# ${article.headline}
`, '');
      const transformedMarkdown = cleanMarkdown.replace(iframeRegex, iframe);
      // Combine frontmatter with markdown content
      const content = `${frontmatter}${transformedMarkdown}`;
      
      writeFileSync(filePath, content);
    }

    page++;
    } catch (error) {
      console.error(`Error fetching articles for page ${page}:`, error);
      hasMore = false;
    }
  }
}

main().catch(console.error); 

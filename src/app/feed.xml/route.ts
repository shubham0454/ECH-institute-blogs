import { Feed } from "feed";
import { marked } from "marked";

import { getAllPosts } from "@/lib/blog";

// Force dynamic rendering to ensure feed updates with new posts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const posts = await getAllPosts();
  
  // Get the current request URL to handle both localhost and production
  const requestUrl = new URL(request.url);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 
    `${requestUrl.protocol}//${requestUrl.host}`;

  const feed = new Feed({
    title: "ECH Institute Blog",
    description: "The official blog of the ECH Institute. Herding Knowledge, Building Community, Homesteading Ethereum!",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    favicon: `${siteUrl}/favicon.svg`,
    copyright: `${new Date().getFullYear()}, ECH Institute, Inc.`,
    updated: posts.length > 0 ? posts[0].frontmatter.date : new Date(),
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  });

  for (const post of posts) {
    const { frontmatter, content } = post;
    // Ensure htmlContent is a string by awaiting the result if it's a Promise
    const htmlContent = await marked(content);

    const url = `${siteUrl}/${post.slug}`;
    feed.addItem({
      id: url,
      link: url,
      title: frontmatter.title,
      date: frontmatter.date,
      author: [
        {
          name: frontmatter.author,
        },
      ],
      image: frontmatter.image
        ? {
            url: frontmatter.image,
          }
        : undefined,
      description:
        content.length > 280 ? content.slice(0, 280) + "..." : content,
      content: htmlContent,
    });
  }

  let xmlContent = feed.rss2();

  // Inject XSLT stylesheet reference for better browser display
  // This makes the RSS feed readable in browsers instead of showing raw XML
  const xsltStylesheet = `<?xml-stylesheet type="text/xsl" href="${siteUrl}/feed-stylesheet.xsl"?>`;
  
  // Insert the stylesheet reference right after the XML declaration
  if (xmlContent.startsWith('<?xml')) {
    const firstLineEnd = xmlContent.indexOf('?>') + 2;
    xmlContent = xmlContent.slice(0, firstLineEnd) + '\n' + xsltStylesheet + xmlContent.slice(firstLineEnd);
  } else {
    xmlContent = xsltStylesheet + '\n' + xmlContent;
  }

  return new Response(xmlContent, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

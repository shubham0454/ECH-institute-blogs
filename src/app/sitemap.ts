import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.echinstitute.org";

// SEO: Enhanced sitemap with better priorities and change frequencies
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  
  // SEO: Calculate priority based on post recency (newer posts get higher priority)
  const now = new Date();
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const postDate = post.frontmatter.date;
    let priority = 0.7;
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly';
    
    // SEO: Recent posts (within 1 month) get higher priority and more frequent updates
    if (postDate >= oneMonthAgo) {
      priority = 0.9;
      changeFrequency = 'weekly';
    } 
    // SEO: Posts within 3 months get medium priority
    else if (postDate >= threeMonthsAgo) {
      priority = 0.8;
      changeFrequency = 'monthly';
    }
    
    return {
      url: `${siteUrl}/${post.slug}`,
      lastModified: postDate,
      changeFrequency,
      priority,
    };
  });

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...postEntries,
  ];
}

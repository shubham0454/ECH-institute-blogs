import { marked } from 'marked';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getPostBySlug, PostNotFoundError, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { shouldUnoptimizeImage } from '@/lib/image-utils';
import { IPFSImage } from '@/components/IPFSImage';
import { UnoptimizedImage } from '@/components/UnoptimizedImage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.echinstitute.org";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let post;
  
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return {
        title: "Post Not Found",
      };
    }
    throw error;
  }

  const { frontmatter, content } = post;
  const postUrl = `${siteUrl}/${slug}`;
  
  // Convert relative image paths (starting with /) to absolute URLs for metadata
  // Other formats (URLs, IPFS, data URLs, etc.) are used as-is
  const imageUrlForMetadata = frontmatter.image
    ? frontmatter.image.startsWith('/')
      ? `${siteUrl}${frontmatter.image}`
      : frontmatter.image
    : null;
  
  // Strip markdown syntax for clean description
  const plainText = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  const description = plainText.length > 160 
    ? plainText.slice(0, 157).trim() + "..."
    : plainText.trim();
  const keywords = [
    "ECH Institute",
    "Ethereum",
    "EIP",
    frontmatter.title,
    ...(frontmatter.title.toLowerCase().includes("pectra") ? ["Pectra upgrade", "Ethereum upgrade"] : []),
    ...(frontmatter.title.toLowerCase().includes("devconnect") ? ["Devconnect", "Ethereum conference"] : []),
  ];

  return {
    title: frontmatter.title,
    description,
    keywords,
    authors: [{ name: frontmatter.author }],
    // SEO: Article-specific metadata
    category: "Technology",
    classification: "Blog Post",
    openGraph: {
      title: frontmatter.title,
      description,
      url: postUrl,
      siteName: "ECH Institute Blog",
      type: "article",
      publishedTime: frontmatter.date.toISOString(),
      modifiedTime: frontmatter.date.toISOString(),
      authors: [frontmatter.author],
      section: "Ethereum Protocol Development",
      tags: keywords,
      images: imageUrlForMetadata
        ? [
            {
              url: imageUrlForMetadata,
              width: 1200,
              height: 630,
              alt: frontmatter.title,
            },
          ]
        : [
            {
              url: `${siteUrl}/ech_full_logo_inverted.png`,
              width: 1200,
              height: 630,
              alt: "ECH Institute Logo",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description,
      images: imageUrlForMetadata ? [imageUrlForMetadata] : [`${siteUrl}/ech_full_logo_inverted.png`],
      creator: "@EthCatHerders",
      site: "@EthCatHerders",
    },
    alternates: {
      canonical: postUrl,
    },
    // SEO: Additional metadata for better indexing
    other: {
      "article:published_time": frontmatter.date.toISOString(),
      "article:modified_time": frontmatter.date.toISOString(),
      "article:author": frontmatter.author,
      "article:section": "Ethereum Protocol Development",
      "article:tag": keywords.join(", "),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      // notFound() throws an error internally, so execution stops here
      notFound();
    }
    throw error;
  }
  
  const { frontmatter, content } = post;
  // Configure marked to produce consistent output
  const htmlContent = await marked(content, {
    breaks: false,
    gfm: true,
  });

  // Format date consistently for SSR and client
  const formattedDate = frontmatter.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const postUrl = `${siteUrl}/${slug}`;
  // Convert relative image paths (starting with /) to absolute URLs for structured data
  // Other formats (URLs, IPFS, etc.) are used as-is
  const imageUrl = frontmatter.image
    ? frontmatter.image.startsWith('/')
      ? `${siteUrl}${frontmatter.image}`
      : frontmatter.image
    : `${siteUrl}/ech_full_logo_inverted.png`;
  
  // Strip markdown syntax for clean description (same logic as in generateMetadata)
  const plainText = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  const description = plainText.length > 160 
    ? plainText.slice(0, 157).trim() + "..."
    : plainText.trim();
  
  const keywords = [
    "ECH Institute",
    "Ethereum",
    "EIP",
    frontmatter.title,
    ...(frontmatter.title.toLowerCase().includes("pectra") ? ["Pectra upgrade", "Ethereum upgrade"] : []),
    ...(frontmatter.title.toLowerCase().includes("devconnect") ? ["Devconnect", "Ethereum conference"] : []),
  ];
  
  // SEO: Enhanced BlogPosting schema with Article properties for better search visibility
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: description,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: frontmatter.date.toISOString(),
    dateModified: frontmatter.date.toISOString(),
    author: {
      "@type": "Person",
      name: frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ECH Institute",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/ech_full_logo_inverted.png`,
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
    inLanguage: "en-US",
    articleSection: "Ethereum Protocol Development",
    keywords: keywords.join(", "),
    wordCount: content.split(/\s+/).length,
    // SEO: Article-specific properties
    articleBody: plainText,
    genre: "Technology Blog",
    about: {
      "@type": "Thing",
      name: "Ethereum",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ECH Institute Blog",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: frontmatter.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      {/* SEO: BlogPosting structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {/* SEO: BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className='flex flex-col min-h-screen'>
        {/* SEO: Semantic HTML5 main element */}
        <main className='flex flex-col w-full max-w-4xl mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-12 px-4 sm:px-6 md:px-8'>
          {/* SEO: Semantic navigation element */}
          <nav aria-label="Breadcrumb navigation" className="mb-4 sm:mb-6">
            <Link href='/' className='text-blue-600 hover:text-blue-700' aria-label="Return to blog homepage">
              <div className='flex items-center gap-2 text-sm sm:text-base'>
                <ArrowLeftIcon className='w-4 h-4' aria-hidden="true" />
                <span>Back to all blogs</span>
              </div>
            </Link>
          </nav>
          {frontmatter.image && (
            <div className="relative w-full mt-4 sm:mt-5 md:mt-6 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden">
              {frontmatter.image.includes('ipfs.io') || frontmatter.image.includes('/ipfs/') ? (
                <div className="relative w-full aspect-video">
                  <IPFSImage
                    src={frontmatter.image}
                    alt={frontmatter.title}
                    className="object-contain w-full h-full"
                    fill
                  />
                </div>
              ) : frontmatter.image.includes('hackmd.io') ? (
                // Use Next.js Image with unoptimized to bypass optimization (HackMD images resolve to private IPs)
                <div className="relative w-full aspect-video">
                  <Image
                    src={frontmatter.image}
                    alt={frontmatter.title}
                    className="object-contain w-full h-full"
                    fill
                    unoptimized
                    loading="lazy"
                    sizes="100vw"
                  />
                </div>
              ) : shouldUnoptimizeImage(frontmatter.image) ? (
                <div className="relative w-full aspect-video">
                  <UnoptimizedImage
                    src={frontmatter.image}
                    alt={frontmatter.title}
                    className="object-contain w-full h-full"
                    fill
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-video">
                  <Image
                    src={frontmatter.image}
                    alt={frontmatter.title}
                    className="object-contain w-full h-full"
                    fill
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          )}
          {/* SEO: Semantic HTML5 article element */}
          <article className='w-full mt-4 sm:mt-5 md:mt-6' itemScope itemType="https://schema.org/BlogPosting">
            {/* SEO: Semantic header element */}
            <header className="mb-4 sm:mb-5 md:mb-6">
              <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 font-antonio leading-tight' itemProp="headline">
                {frontmatter.title}
              </h1>
              <p className='text-xs sm:text-sm text-gray-500 mb-4 sm:mb-5 md:mb-6'>
                Written by{' '}
                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{frontmatter.author}</span>
                </span>
                {' '}on{' '}
                <time dateTime={frontmatter.date.toISOString()} itemProp="datePublished">
                  {formattedDate}
                </time>
              </p>
            </header>
            {/* SEO: Article body with proper semantic markup */}
            <div 
              className='prose prose-slate max-w-none prose-sm sm:prose-base md:prose-lg prose-headings:font-antonio prose-p:leading-relaxed prose-img:rounded-lg prose-img:my-4 sm:prose-img:my-6' 
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: String(htmlContent) }} 
            />
          </article>
        </main>
      </div>
    </>
  );
}

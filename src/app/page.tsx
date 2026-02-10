import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { shouldUnoptimizeImage } from "@/lib/image-utils";
import { IPFSImage } from "@/components/IPFSImage";
import { UnoptimizedImage } from "@/components/UnoptimizedImage";
import { AllPostsSection } from "@/components/AllPostsSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.echinstitute.org";

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getAllPosts();
  const latestPost = posts[0];

  // Convert relative image paths (starting with /) to absolute URLs for metadata
  // Other formats (URLs, IPFS, data URLs, etc.) are used as-is
  const latestPostImage = latestPost?.frontmatter.image
    ? latestPost.frontmatter.image.startsWith('/')
      ? `${siteUrl}${latestPost.frontmatter.image}`
      : latestPost.frontmatter.image
    : null;

  return {
    title: "ECH Institute Blog",
    description: "The official blog of the ECH Institute. Herding Knowledge, Building Community, Homesteading Ethereum! Stay updated with the latest insights on Ethereum protocol development, EIPs, and ecosystem news.",
    openGraph: {
      title: "ECH Institute Blog",
      description: "The official blog of the ECH Institute. Herding Knowledge, Building Community, Homesteading Ethereum!",
      url: siteUrl,
      siteName: "ECH Institute Blog",
      images: latestPostImage
        ? [
            {
              url: latestPostImage,
              width: 1200,
              height: 630,
              alt: latestPost.frontmatter.title,
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
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "ECH Institute Blog",
      description: "The official blog of the ECH Institute. Herding Knowledge, Building Community, Homesteading Ethereum!",
      images: latestPostImage ? [latestPostImage] : [`${siteUrl}/ech_full_logo_inverted.png`],
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function Home() {
  const posts = await getAllPosts();
  
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ECH Institute Blog",
    description: "The official blog of the ECH Institute. Herding Knowledge, Building Community, Homesteading Ethereum!",
    url: siteUrl,
    publisher: {
      "@type": "Organization",
      name: "ECH Institute",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/ech_full_logo_inverted.png`,
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.frontmatter.title,
      datePublished: post.frontmatter.date.toISOString(),
      author: {
        "@type": "Person",
        name: post.frontmatter.author,
      },
      url: `${siteUrl}/${post.slug}`,
      image: post.frontmatter.image,
    })),
  };

  // SEO: Enhanced Blog structured data with more comprehensive information
  const enhancedBlogSchema = {
    ...blogSchema,
    "@type": "Blog",
    inLanguage: "en-US",
    potentialAction: {
      "@type": "ReadAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/{slug}`,
      },
    },
  };

  // SEO: WebSite schema for better search visibility
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ECH Institute Blog",
    url: siteUrl,
    description: "The official blog of the ECH Institute. Herding Knowledge, Building Community, Homesteading Ethereum!",
    publisher: {
      "@type": "Organization",
      name: "ECH Institute",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/ech_full_logo_inverted.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* SEO: Blog structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(enhancedBlogSchema) }}
      />
      {/* SEO: WebSite structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="p-8 pb-20 gap-16 sm:p-20 font-roboto">
        {/* SEO: Semantic HTML5 main element */}
        <main className="max-w-4xl mx-auto">
          {/* SEO: Semantic header element */}
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-bold mb-4 font-antonio">ECH Institute Blog</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Official Blog of the ECH Institute
            </p>
          </header>

        {/* SEO: Semantic section element for latest posts */}
        <section className="mb-16" aria-label="Latest blog posts">
          <h2 className="text-2xl font-bold mb-6 font-antonio">Latest Posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.slice(0, 4).map(({ slug, frontmatter }) => (
              <Link 
                key={slug}
                href={`/${slug}`}
                className="block rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              >
                {frontmatter.image && (
                  <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    {frontmatter.image.includes('ipfs.io') || frontmatter.image.includes('/ipfs/') ? (
                      <IPFSImage
                        src={frontmatter.image}
                        alt={frontmatter.title}
                        className="object-contain w-full h-full transition-transform duration-1000 hover:scale-[1.05]"
                        fill
                      />
                    ) : frontmatter.image.includes('hackmd.io') ? (
                      // Use Next.js Image with unoptimized to bypass optimization (HackMD images resolve to private IPs)
                      <Image
                        src={frontmatter.image}
                        alt={frontmatter.title}
                        className="object-contain w-full h-full transition-transform duration-1000 hover:scale-[1.05]"
                        fill
                        unoptimized
                        loading="lazy"
                        sizes="100vw"
                      />
                    ) : shouldUnoptimizeImage(frontmatter.image) ? (
                      <UnoptimizedImage
                        src={frontmatter.image}
                        alt={frontmatter.title}
                        className="object-contain w-full h-full transition-transform duration-1000 hover:scale-[1.05]"
                        fill
                      />
                    ) : (
                      <Image
                        src={frontmatter.image}
                        alt={frontmatter.title}
                        className="object-contain w-full h-full transition-transform duration-1000 hover:scale-[1.05]"
                        fill
                        loading="lazy"
                      />
                    )}
                  </div>
                )}
                <div className="px-6 pb-4 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      {frontmatter.date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <h3 className="text-xl font-semibold mb-2 font-antonio">
                      {frontmatter.title}
                    </h3>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {frontmatter.author}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {posts.length > 4 && (
          <AllPostsSection posts={posts.slice(4)} />
        )}
        </main>
      </div>
    </>
  );
}

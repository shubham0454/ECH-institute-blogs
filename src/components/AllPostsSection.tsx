'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { shouldUnoptimizeImage } from '@/lib/image-utils';
import { IPFSImage } from '@/components/IPFSImage';
import { UnoptimizedImage } from '@/components/UnoptimizedImage';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    author: string;
    date: Date;
    image?: string;
  };
}

interface AllPostsSectionProps {
  posts: Post[];
  currentPage?: number;
}

const POSTS_PER_PAGE = 10;

export function AllPostsSection({ posts, currentPage = 1 }: AllPostsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(currentPage);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }
    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.frontmatter.title.toLowerCase().includes(query) ||
        post.frontmatter.author.toLowerCase().includes(query) ||
        post.slug.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section>
      {/* Header with title, search, and pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold font-antonio">All Posts</h2>
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400 px-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Posts Grid - Horizontal layout */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedPosts.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="flex flex-col rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors overflow-hidden"
            >
              {frontmatter.image && (
                <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {frontmatter.image.includes('ipfs.io') || frontmatter.image.includes('/ipfs/') ? (
                    <IPFSImage
                      src={frontmatter.image}
                      alt={frontmatter.title}
                      className="object-contain w-full h-full transition-transform duration-1000 hover:scale-[1.05]"
                      fill
                    />
                  ) : frontmatter.image.includes('hackmd.io') ? (
                    <Image
                      src={frontmatter.image}
                      alt={frontmatter.title}
                      className="object-contain w-full h-full transition-transform duration-1000 hover:scale-[1.05]"
                      fill
                      unoptimized
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  )}
                </div>
              )}
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">
                  {frontmatter.date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <h3 className="text-lg font-semibold mb-2 font-antonio overflow-hidden text-ellipsis" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {frontmatter.title}
                </h3>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-auto">
                  {frontmatter.author}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No posts found matching &quot;{searchQuery}&quot;
        </div>
      )}

      {/* Pagination at bottom (optional, for better UX) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 inline mr-1" />
            Previous
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              // Show first page, last page, current page, and pages around current
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-lg border transition-colors ${
                      pageNum === page
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (pageNum === page - 2 || pageNum === page + 2) {
                return <span key={pageNum} className="px-2">...</span>;
              }
              return null;
            })}
          </div>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4 inline ml-1" />
          </button>
        </div>
      )}
    </section>
  );
}

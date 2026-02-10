'use client';

import { useState, useEffect } from 'react';

interface UnoptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}

export function UnoptimizedImage({ src, alt, className, fill }: UnoptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Get base URL without query parameters
  const getBaseUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return `${urlObj.origin}${urlObj.pathname}`;
    } catch {
      const queryIndex = url.indexOf('?');
      return queryIndex > 0 ? url.substring(0, queryIndex) : url;
    }
  };

  // Reset when src changes
  useEffect(() => {
    setImageSrc(src);
    setRetryCount(0);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (retryCount < 2) {
      // Retry with cache-busting parameter
      const baseUrl = getBaseUrl(src);
      setTimeout(() => {
        setImageSrc(`${baseUrl}?t=${Date.now()}`);
        setRetryCount(retryCount + 1);
      }, 1000);
    } else {
      setHasError(true);
    }
  };

  const imageStyle = fill
    ? {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain' as const,
      }
    : {
        width: '100%',
        height: '100%',
        objectFit: 'contain' as const,
      };

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={() => setHasError(false)}
        loading="lazy"
        style={imageStyle}
      />
      {hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 text-xs p-2 text-center"
          style={fill ? { position: 'absolute' } : undefined}
        >
          {alt}
        </div>
      )}
    </>
  );
}

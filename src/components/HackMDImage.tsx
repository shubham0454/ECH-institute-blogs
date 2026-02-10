'use client';

import { useState, useEffect } from 'react';

interface HackMDImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}

export function HackMDImage({ src, alt, className, fill }: HackMDImageProps) {
  const [useCors, setUseCors] = useState(false); // Start without CORS (more reliable)
  const [hasError, setHasError] = useState(false);

  // Reset when src changes
  useEffect(() => {
    setUseCors(false);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!useCors && !hasError) {
      // Try with CORS if it fails without CORS
      setUseCors(true);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setHasError(false);
  };

  const imageStyle = fill
    ? {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const,
      }
    : {
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const,
      };

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`hackmd-${useCors ? 'cors' : 'nocors'}-${src}`}
        src={src}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        crossOrigin={useCors ? 'anonymous' : undefined}
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

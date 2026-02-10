'use client';

import { useState } from 'react';

interface IPFSImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}

// Alternative IPFS gateways to try if the primary one fails
// Cloudflare is often more reliable on localhost
const IPFS_GATEWAYS = [
  'https://cloudflare-ipfs.com/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://ipfs.filebase.io/ipfs/',
  'https://dweb.link/ipfs/',
];

export function IPFSImage({ src, alt, className, fill }: IPFSImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [errorCount, setErrorCount] = useState(0);

  // Extract IPFS hash from URL
  const getIPFSHash = (url: string): string | null => {
    const match = url.match(/\/ipfs\/([^/?]+)/);
    return match ? match[1] : null;
  };

  // Try alternative gateway if current one fails
  const handleError = () => {
    const hash = getIPFSHash(imageSrc);
    if (hash && errorCount < IPFS_GATEWAYS.length) {
      // Try next gateway
      const nextGateway = IPFS_GATEWAYS[errorCount];
      setImageSrc(`${nextGateway}${hash}`);
      setErrorCount(errorCount + 1);
    }
  };

  // Use regular img tag for IPFS images to support error handling
  // When fill is true, position absolutely to fill the parent container
  // We use <img> instead of Next.js <Image> for IPFS images to support error handling with gateway fallbacks
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      style={
        fill
          ? {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }
          : {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }
      }
    />
  );
}

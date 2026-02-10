/**
 * Determines if an image URL should bypass Next.js optimization
 * Images from slow or unreliable sources should be unoptimized to prevent timeouts
 */
export function shouldUnoptimizeImage(imageUrl: string): boolean {
  if (!imageUrl) return false;
  
  const problematicSources = [
    'ipfs.io',
    'hackmd.io',
    'raw.githubusercontent.com',
    'githubusercontent.com',
  ];
  
  return problematicSources.some(source => imageUrl.includes(source));
}

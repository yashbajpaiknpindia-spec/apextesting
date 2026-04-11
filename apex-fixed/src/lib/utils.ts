import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves a coverImage value to a usable <img> src.
 * Handles:
 *   - base64 data URLs  (data:image/...)
 *   - full HTTP(S) URLs (https://...)
 *   - Unsplash photo IDs (anything else)
 */
export function getImageSrc(coverImage: string | undefined | null, width = 800): string | null {
  if (!coverImage) return null;
  if (coverImage.startsWith('data:') || coverImage.startsWith('http') || coverImage.startsWith('blob:')) {
    return coverImage;
  }
  return `https://images.unsplash.com/photo-${coverImage}?auto=format&fit=crop&q=80&w=${width}`;
}

import { useEffect, useRef } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const SITE_NAME = 'The Black Apex Consultancy';
const BASE_URL = 'https://theblackapexconsultancy.in';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.svg`;

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSEO({ title, description, canonical, ogImage, ogType = 'website', noIndex = false }: SEOProps) {
  // Track last fired path so gtag page_view only fires once per route, not on
  // every re-render (which was causing the "multiple loads" appearance).
  const lastFiredPath = useRef<string | null>(null);

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Elite Business Strategy`;
    const fullCanonical = canonical ? `${BASE_URL}${canonical}` : `${BASE_URL}${window.location.pathname}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    document.title = fullTitle;

    // Standard meta
    if (description) setMeta('description', description);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('og:title', fullTitle, 'property');
    if (description) setMeta('og:description', description, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:url', fullCanonical, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    if (description) setMeta('twitter:description', description);
    setMeta('twitter:image', image);
    setMeta('twitter:url', fullCanonical);

    // Canonical
    setCanonical(fullCanonical);

    // Fire GA4 page_view ONLY when the route actually changes — not on re-renders
    const currentPath = window.location.pathname;
    if (typeof window !== 'undefined' && (window as any).gtag && lastFiredPath.current !== currentPath) {
      lastFiredPath.current = currentPath;
      (window as any).gtag('event', 'page_view', {
        page_title: fullTitle,
        page_location: fullCanonical,
        page_path: currentPath,
      });
      // Reset scroll depth tracking for the new page
      if (typeof (window as any)._resetScrollTracking === 'function') {
        (window as any)._resetScrollTracking();
      }
    }
  }, [title, description, canonical, ogImage, ogType, noIndex]);
}

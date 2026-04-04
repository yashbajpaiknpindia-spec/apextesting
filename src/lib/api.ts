// API utility functions for fetching from server

export async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  return res;
}

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
  createdAt: string;
  isStatic?: boolean;
};

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  industry?: string;
  problem?: string;
  solution?: string;
  results?: string;
  metrics?: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
  createdAt: string;
};

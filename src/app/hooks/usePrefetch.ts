import { useEffect } from 'react';

export function usePrefetch(urls: string[]) {
  useEffect(() => {
    urls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }, [urls]);
}

export function usePreload(url: string, as: 'image' | 'script' | 'style' | 'font' = 'image') {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = as;
    document.head.appendChild(link);
  }, [url, as]);
}
import { useState, useRef, useEffect } from 'react';

export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newImg = new Image();
            newImg.onload = () => {
              setImageSrc(src);
              setIsLoaded(true);
            };
            newImg.onerror = () => {
              setHasError(true);
            };
            newImg.src = src;
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return { imageSrc, isLoaded, hasError, imgRef };
}
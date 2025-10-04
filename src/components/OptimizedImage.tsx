import { ImgHTMLAttributes, useState, useEffect, useRef } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className = "",
  sizes,
  ...props 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Generate srcset for responsive images
  const generateSrcSet = (baseSrc: string) => {
    if (!baseSrc) return undefined;
    
    // Create responsive image variants
    return `${baseSrc} 1x, ${baseSrc} 2x`;
  };

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      srcSet={isInView ? generateSrcSet(src) : undefined}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      onLoad={() => setIsLoaded(true)}
      aria-hidden={alt === '' ? 'true' : undefined}
      role={alt === '' ? 'presentation' : undefined}
      {...props}
    />
  );
};

export default OptimizedImage;

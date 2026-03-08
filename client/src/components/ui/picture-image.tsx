import { useRef, useState, useEffect, CSSProperties } from "react";

const PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

interface SrcSetEntry {
  width: number;
  avifSrc: string;
  webpSrc: string;
}

interface PictureImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
  srcSetEntries?: SrcSetEntry[];
  sizes?: string;
  priority?: boolean;
  rootMargin?: string;
  style?: CSSProperties;
}

/**
 * PictureImage — serves AVIF → WebP → PNG fallback with responsive srcset.
 *
 * - priority={true}:  fetchPriority="high" + loading="eager"  (use for LCP / hero)
 * - priority={false}: IntersectionObserver lazy load            (use for below-fold)
 *
 * The container always has an explicit aspect-ratio set from width/height,
 * which prevents Cumulative Layout Shift (CLS) while images are loading.
 */
export function PictureImage({
  src,
  alt,
  width,
  height,
  className = "",
  containerClassName = "",
  srcSetEntries = [],
  sizes = "100vw",
  priority = false,
  rootMargin = "200px",
  style,
}: PictureImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(priority);

  useEffect(() => {
    if (priority) return;

    const el = containerRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, rootMargin]);

  const buildSrcSet = (entries: SrcSetEntry[], format: "avif" | "webp") =>
    entries
      .map((e) => `${format === "avif" ? e.avifSrc : e.webpSrc} ${e.width}w`)
      .join(", ");

  const avifSrcSet = isVisible ? buildSrcSet(srcSetEntries, "avif") : undefined;
  const webpSrcSet = isVisible ? buildSrcSet(srcSetEntries, "webp") : undefined;

  const imgProps = {
    src: isVisible ? src : PLACEHOLDER,
    alt,
    width,
    height,
    className,
    style,
    decoding: "async" as const,
    ...(priority
      ? { fetchPriority: "high" as const, loading: "eager" as const }
      : { loading: "lazy" as const }),
  };

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {srcSetEntries.length > 0 ? (
        <picture>
          {avifSrcSet && (
            <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
          )}
          {webpSrcSet && (
            <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
          )}
          <img {...imgProps} />
        </picture>
      ) : (
        <img {...imgProps} />
      )}
    </div>
  );
}

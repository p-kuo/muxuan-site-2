import { useEffect } from "react";

const DEFAULTS = {
  title: "沐璿草本護髮 | 天然・安全・有效",
  description:
    "沐璿草本護髮中心採用中醫師調製草本配方，嚴選當歸、人蔘、何首烏等天然中藥材，專業改善白髮、落髮、頭皮屑等問題。台北、嘉義、新加坡服務。",
  canonical: "https://muxuantw.com",
  ogTitle: "沐璿草本護髮中心｜天然草本護髮・頭皮SPA",
} as const;

function setMeta(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

export interface SeoOptions {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogType?: string;
  /** Structured data object(s) to inject as JSON-LD. Requires jsonLdId. */
  jsonLd?: object;
  /** Unique id for the injected <script> tag, used for cleanup. */
  jsonLdId?: string;
}

/**
 * Manages per-page SEO meta tags and JSON-LD structured data.
 * Restores default values when the component unmounts (SPA navigation).
 */
export function useSeo({
  title,
  description,
  canonical,
  ogTitle,
  ogType = "website",
  jsonLd,
  jsonLdId,
}: SeoOptions) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", canonical);
    setMeta('meta[property="og:title"]', "content", ogTitle ?? title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:type"]', "content", ogType);
    setMeta('meta[name="twitter:title"]', "content", ogTitle ?? title);
    setMeta('meta[name="twitter:description"]', "content", description);

    if (jsonLd && jsonLdId) {
      document.getElementById(jsonLdId)?.remove();
      const script = document.createElement("script");
      script.id = jsonLdId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = DEFAULTS.title;
      setMeta('meta[name="description"]', "content", DEFAULTS.description);
      setMeta('link[rel="canonical"]', "href", DEFAULTS.canonical);
      setMeta('meta[property="og:title"]', "content", DEFAULTS.ogTitle);
      setMeta('meta[property="og:description"]', "content", DEFAULTS.description);
      setMeta('meta[property="og:url"]', "content", DEFAULTS.canonical);
      setMeta('meta[property="og:type"]', "content", "website");
      setMeta('meta[name="twitter:title"]', "content", DEFAULTS.ogTitle);
      setMeta('meta[name="twitter:description"]', "content", DEFAULTS.description);
      if (jsonLdId) document.getElementById(jsonLdId)?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

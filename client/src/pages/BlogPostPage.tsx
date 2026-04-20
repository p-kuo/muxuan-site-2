import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, CalendarDays, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { getArticleBySlug, articles, type ArticleSection } from "@/data/articles";

function buildSrcSet(url: string): string | undefined {
  if (!url.includes("images.unsplash.com")) return undefined;
  return [400, 800, 1200]
    .map((w) => `${url.replace(/w=\d+/, `w=${w}`)} ${w}w`)
    .join(", ");
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });
}

function isQSection(section: ArticleSection) {
  return section.type === "h2" && !!section.text?.startsWith("Q");
}

function renderSection(section: ArticleSection, index: number) {
  switch (section.type) {
    case "h2": {
      if (isQSection(section)) {
        const qText = section.text ?? "";
        const colonIdx = qText.search(/[：:]/);
        const qLabel = colonIdx > -1 ? qText.slice(0, colonIdx + 1) : "Q";
        const qBody = colonIdx > -1 ? qText.slice(colonIdx + 1).trimStart() : qText;
        return (
          <div
            key={index}
            className="flex items-start gap-4 rounded-2xl border-l-4 border-primary bg-primary/5 px-5 py-4 mt-10 mb-2"
          >
            <span className="shrink-0 font-bold text-primary text-lg leading-snug pt-0.5 min-w-[2rem]">
              {qLabel}
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground leading-snug m-0">
              {qBody}
            </h2>
          </div>
        );
      }
      return (
        <h2
          key={index}
          className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-10 mb-4"
        >
          {section.text}
        </h2>
      );
    }
    case "h3":
      return (
        <h3
          key={index}
          className="text-xl font-serif font-semibold text-foreground mt-8 mb-3"
        >
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="text-foreground/80 text-base leading-8 mb-4">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="list-none space-y-2 mb-6 pl-0 border-l-2 border-primary/20 ml-1">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 pl-4 text-foreground/80 text-base leading-relaxed"
            >
              <span className="mt-1 text-primary shrink-0 text-sm">✦</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "ref":
      return (
        <div key={index} className="mt-10 pt-6 border-t border-border/40">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            參考資料
          </p>
          <ol className="list-decimal list-inside space-y-2">
            {section.links?.map((link, i) => (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline underline-offset-2"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ol>
        </div>
      );
    default:
      return null;
  }
}

function renderSections(content: ArticleSection[]) {
  return content.map((section, i) => renderSection(section, i));
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const article = getArticleBySlug(params.slug ?? "");

  useEffect(() => {
    // Preconnect to Unsplash only on blog post pages
    const preconnect = document.createElement("link");
    preconnect.id = "unsplash-preconnect";
    preconnect.rel = "preconnect";
    preconnect.href = "https://images.unsplash.com";
    const dnsPrefetch = document.createElement("link");
    dnsPrefetch.id = "unsplash-dns-prefetch";
    dnsPrefetch.rel = "dns-prefetch";
    dnsPrefetch.href = "https://images.unsplash.com";
    document.head.appendChild(preconnect);
    document.head.appendChild(dnsPrefetch);

    window.scrollTo({ top: 0 });
    if (article) {
      const articleUrl = `https://muxuantw.com/blog/${article.slug}`;
      const articleTitle = `${article.title} | 沐璿草本護髮部落格`;

      document.title = articleTitle;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", article.metaDescription);

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", articleUrl);

      // OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", articleTitle);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", article.metaDescription);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", articleUrl);
      const ogType = document.querySelector('meta[property="og:type"]');
      if (ogType) ogType.setAttribute("content", "article");
      // og:image — prefer article cover, fall back to global site image
      const globalOgImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "https://muxuantw.com/opengraph.jpg";
      const resolvedOgImage = article.coverImage ?? globalOgImage;
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute("content", resolvedOgImage);

      // Article + BreadcrumbList JSON-LD
      const existing = document.getElementById("article-jsonld");
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = "article-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://muxuantw.com" },
              { "@type": "ListItem", "position": 2, "name": "護髮部落格", "item": "https://muxuantw.com/blog" },
              { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://muxuantw.com/blog/${article.slug}` },
            ],
          },
          {
            "@type": "BlogPosting",
            "@id": `https://muxuantw.com/blog/${article.slug}`,
            "headline": article.title,
            "name": article.title,
            "description": article.metaDescription,
            "datePublished": article.date,
            "dateModified": article.lastUpdated ?? article.date,
            "articleSection": article.category,
            "inLanguage": "zh-TW",
            "url": `https://muxuantw.com/blog/${article.slug}`,
            "isPartOf": { "@id": "https://muxuantw.com/blog" },
            "author": {
              "@type": "Person",
              "name": "葉玉女",
              "jobTitle": "創辦人",
              "url": "https://muxuantw.com/about",
              "worksFor": { "@id": "https://muxuantw.com/#organization" },
            },
            "publisher": { "@id": "https://muxuantw.com/#organization" },
            "image": {
              "@type": "ImageObject",
              "url": article.coverImage ?? globalOgImage,
              "description": article.coverAlt,
              "width": 1200,
              "height": 630,
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://muxuantw.com/blog/${article.slug}`,
            },
          },
        ],
      });
      document.head.appendChild(script);

      // Preload LCP cover image
      if (article.coverImage) {
        const preload = document.createElement("link");
        preload.id = "article-cover-preload";
        preload.rel = "preload";
        preload.as = "image";
        preload.href = article.coverImage;
        const srcset = buildSrcSet(article.coverImage);
        if (srcset) {
          preload.setAttribute("imagesrcset", srcset);
          preload.setAttribute("imagesizes", "(max-width: 768px) calc(100vw - 2rem), 896px");
        }
        document.head.appendChild(preload);
      }
    }

    return () => {
      document.getElementById("unsplash-preconnect")?.remove();
      document.getElementById("unsplash-dns-prefetch")?.remove();
      document.getElementById("article-cover-preload")?.remove();
      const existing = document.getElementById("article-jsonld");
      if (existing) existing.remove();
      document.title = "沐璿草本護髮 | 天然・安全・有效";
      const defaultDesc = "沐璿草本護髮中心採用中醫師調製草本配方，嚴選當歸、人蔘、何首烏等天然中藥材，專業改善白髮、落髮、頭皮屑等問題。台北、嘉義、新加坡服務。";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", defaultDesc);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", "https://muxuantw.com");
      // Restore OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", "沐璿草本護髮中心｜天然草本護髮・頭皮SPA");
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", defaultDesc);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", "https://muxuantw.com");
      const ogType = document.querySelector('meta[property="og:type"]');
      if (ogType) ogType.setAttribute("content", "website");
    };
  }, [article]);

  if (!article) {
    const robots = document.querySelector('meta[name="robots"]');
    robots?.setAttribute("content", "noindex, nofollow");
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <p className="text-2xl font-serif text-foreground">找不到此文章</p>
          <Button asChild>
            <Link href="/blog">回到部落格</Link>
          </Button>
        </div>
        <PageFooter />
      </div>
    );
  }

  const otherArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/40 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <nav
              aria-label="頁面路徑"
              className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap"
            >
              <Link
                href="/"
                title="回到沐璿草本護髮中心首頁"
                className="hover:text-primary transition-colors"
              >
                首頁
              </Link>
              <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              <Link
                href="/blog"
                title="回到護髮部落格"
                className="hover:text-primary transition-colors"
              >
                護髮部落格
              </Link>
              <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span
                className="text-foreground font-medium truncate max-w-[180px] sm:max-w-none"
                aria-current="page"
              >
                {article.title}
              </span>
            </nav>

            {/* Category + meta */}
            <div className="flex items-center gap-4 flex-wrap mb-4">
              <Badge
                variant="outline"
                className="border-primary/30 text-primary bg-primary/5 px-3 py-1"
              >
                {article.category}
              </Badge>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                {formatDate(article.date)}
              </span>
              {article.lastUpdated && article.lastUpdated !== article.date && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  最後更新：{formatDate(article.lastUpdated)}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                閱讀約 {article.readingTime} 分鐘
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground leading-snug mb-3">
              {article.title}
            </h1>
            <div className="h-1 w-16 bg-primary rounded-full mb-5" />
            <p className="text-muted-foreground text-lg max-w-2xl">{article.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Cover image */}
      {article.coverImage && (
        <div className="container mx-auto px-4 md:px-6 max-w-4xl -mt-6 mb-2">
          <motion.img
            src={article.coverImage}
            srcSet={buildSrcSet(article.coverImage) ?? undefined}
            sizes="(max-width: 768px) calc(100vw - 2rem), 896px"
            alt={article.coverAlt}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full rounded-2xl object-cover max-h-[360px] shadow-md"
            width={1200}
            height={360}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      )}

      {/* Article Body */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {renderSections(article.content)}
          </motion.div>

          {/* Author note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 p-5 rounded-2xl bg-secondary/50 border border-border/40 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-primary font-bold text-sm">沐</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">葉玉女</p>
              <p className="text-xs text-primary font-medium mb-1">創辦人・沐璿草本護髮中心</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                草本護髮領域深耕16年，2011年創立沐璿護髮中心，從草本原料篩選，到無數次測試與修正，歷經一年多時間，研發出專屬的天然草本配方，協助數仟位客戶從根部改善頭皮健康。
                <a href="/about" className="ml-1 text-primary hover:underline text-xs">了解更多</a>
              </p>
            </div>
          </motion.div>

          {/* Back link */}
          <div className="mt-10">
            <Link
              href="/blog"
              title="返回護髮部落格列表"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回部落格
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8">您可能也感興趣</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {otherArticles.map((a, index) => (
                <Link href={`/blog/${a.slug}`} title={a.title} className="block">
                  <motion.article
                    key={a.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3 cursor-pointer"
                  >
                    <Badge
                      variant="outline"
                      className="self-start border-primary/20 text-primary text-xs"
                    >
                      {a.category}
                    </Badge>
                    <h3 className="font-serif font-bold text-lg text-foreground leading-snug hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{a.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-auto">
                      閱讀全文 <ChevronRight className="w-4 h-4" />
                    </span>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary-foreground)/0.05),transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              準備好預約草本護理了嗎？
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              讓沐璿專業護理師為您進行頭皮檢測，量身打造最適合的草本護理方案。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold text-lg h-12 px-10"
              >
                <a
                  href="https://lin.ee/NxoDqq0"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="透過LINE預約沐璿草本護髮服務"
                >
                  LINE 立即預約
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg h-12 px-10"
              >
                <Link href="/contact" title="聯絡沐璿草本護髮中心">
                  聯絡我們
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}

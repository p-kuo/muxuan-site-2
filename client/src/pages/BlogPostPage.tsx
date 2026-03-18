import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, CalendarDays, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { getArticleBySlug, articles, type ArticleSection } from "@/data/articles";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });
}

function renderSection(section: ArticleSection, index: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="text-2xl md:text-3xl font-serif font-bold text-foreground mt-10 mb-4"
        >
          {section.text}
        </h2>
      );
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
        <ul key={index} className="list-none space-y-2 mb-6 pl-0">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-foreground/80 text-base leading-relaxed">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const article = getArticleBySlug(params.slug ?? "");

  useEffect(() => {
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
      // og:image — use global site image (update when a branded og image is available)
      const globalOgImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "https://replit.com/public/images/opengraph.png";
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute("content", globalOgImage);

      // Article JSON-LD
      const existing = document.getElementById("article-jsonld");
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = "article-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        name: article.title,
        headline: article.title,
        description: article.metaDescription,
        datePublished: article.date,
        dateModified: article.date,
        author: {
          "@type": "Person",
          name: "沐璿護理師",
          worksFor: {
            "@type": "Organization",
            name: "沐璿草本護髮中心",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "沐璿草本護髮中心",
          url: "https://muxuantw.com",
        },
        url: `https://muxuantw.com/blog/${article.slug}`,
        inLanguage: "zh-TW",
        image: {
          "@type": "ImageObject",
          url: globalOgImage,
          description: article.coverAlt,
        },
      });
      document.head.appendChild(script);
    }

    return () => {
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
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                閱讀約 {article.readingTime} 分鐘
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground leading-snug mb-4">
              {article.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">{article.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose-like"
          >
            {article.content.map((section, i) => renderSection(section, i))}
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
              <p className="text-sm font-semibold text-foreground mb-1">沐璿護理師</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                沐璿草本護髮中心的專業護理師團隊，擁有豐富的頭皮調理經驗，致力於用天然草本幫助每位客戶找回頭皮健康。
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
                <motion.article
                  key={a.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3"
                >
                  <Badge
                    variant="outline"
                    className="self-start border-primary/20 text-primary text-xs"
                  >
                    {a.category}
                  </Badge>
                  <h3 className="font-serif font-bold text-lg text-foreground leading-snug">
                    <Link
                      href={`/blog/${a.slug}`}
                      title={a.title}
                      className="hover:text-primary transition-colors"
                    >
                      {a.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a.excerpt}</p>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-auto"
                  >
                    閱讀全文 <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.article>
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

import { useEffect } from "react";
import { useSeo } from "@/hooks/use-seo";
import { Link } from "wouter";
import { useLineModal } from "@/components/LineModal";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, CalendarDays, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { PictureImage } from "@/components/ui/picture-image";
import { articles } from "@/data/articles";

import heroBgPng from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere.png";
import heroBg320w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-320w.webp";
import heroBg640w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-640w.webp";
import heroBg1024w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-1024w.webp";
import heroBg320wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-320w.avif";
import heroBg640wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-640w.avif";
import heroBg1024wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-1024w.avif";

const heroBgSrcSet = [
  { width: 320, webpSrc: heroBg320w, avifSrc: heroBg320wAvif },
  { width: 640, webpSrc: heroBg640w, avifSrc: heroBg640wAvif },
  { width: 1024, webpSrc: heroBg1024w, avifSrc: heroBg1024wAvif },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });
}

const categoryColors: Record<string, string> = {
  頭皮知識: "bg-amber-50 text-amber-700 border-amber-200",
  草本知識: "bg-emerald-50 text-emerald-700 border-emerald-200",
  護髮教學: "bg-sky-50 text-sky-700 border-sky-200",
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://muxuantw.com" },
        { "@type": "ListItem", "position": 2, "name": "護髮部落格", "item": "https://muxuantw.com/blog" },
      ],
    },
    {
      "@type": "Blog",
      "@id": "https://muxuantw.com/blog",
      "name": "沐璿草本護髮部落格",
      "url": "https://muxuantw.com/blog",
      "inLanguage": "zh-TW",
      "description": "深度解析頭皮知識、草本成分與護髮教學，幫助您從根本了解頭皮健康。",
      "publisher": { "@id": "https://muxuantw.com/#organization" },
      "blogPost": articles.map((a) => ({
        "@type": "BlogPosting",
        "headline": a.title,
        "url": `https://muxuantw.com/blog/${a.slug}`,
        "datePublished": a.date,
        "dateModified": a.lastUpdated ?? a.date,
        "description": a.metaDescription,
        "author": {
          "@type": "Person",
          "name": "葉玉女",
          "jobTitle": "創辦人",
          "url": "https://muxuantw.com/about",
          "worksFor": { "@id": "https://muxuantw.com/#organization" },
        },
        ...(a.coverImage ? {
          "image": {
            "@type": "ImageObject",
            "url": a.coverImage,
            "description": a.coverAlt,
            "width": 1200,
            "height": 630,
          },
        } : {}),
      })),
    },
  ],
};

export default function BlogPage() {
  const { openLineModal } = useLineModal();
  useSeo({
    title: "護髮部落格 | 沐璿草本護髮中心",
    description: "沐璿草本護髮部落格：深度解析頭皮出油、草本染髮、產後落髮、護髮素使用誤區、熱造型傷髮等頭皮知識，幫助您從根本了解頭皮健康。",
    canonical: "https://muxuantw.com/blog",
    ogTitle: "護髮部落格 | 沐璿草本護髮中心",
    jsonLd: blogJsonLd,
    jsonLdId: "blog-jsonld",
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-40 pb-16 relative overflow-hidden bg-background">
        {/* Background image */}
        <div className="absolute inset-0">
          <PictureImage
            src={heroBgPng}
            srcSetEntries={heroBgSrcSet}
            alt=""
            aria-hidden="true"
            width={1024}
            height={1024}
            sizes="100vw"
            priority={true}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-center opacity-55"
          />
        </div>
        {/* Left-to-right gradient keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        {/* Bottom fade blends into content below */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        {/* Subtle brand warmth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.10),transparent_55%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav
              aria-label="頁面路徑"
              className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
            >
              <Link
                href="/"
                title="回到沐璿草本護髮中心首頁"
                className="hover:text-primary transition-colors"
              >
                首頁
              </Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <span className="text-foreground font-medium" aria-current="page">
                護髮部落格
              </span>
            </nav>
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1"
            >
              草本知識・護髮教學
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              護髮部落格
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              深入了解頭皮健康知識、草本成分解析與日常護髮建議，讓您從根本照顧頭皮。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
              >
                <Link
                  href={`/blog/${article.slug}`}
                  title={article.title}
                  className="flex flex-col flex-1"
                >
                  {/* Card colour bar */}
                  <div className="h-1.5 bg-primary w-full" />

                  <div className="p-6 flex flex-col flex-1 gap-4">
                    {/* Category + meta */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          categoryColors[article.category] ??
                          "bg-primary/5 text-primary border-primary/20"
                        }`}
                      >
                        {article.category}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {formatDate(article.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readingTime} 分鐘
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-serif font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {article.excerpt}
                    </p>

                    {/* Read more */}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200 mt-auto">
                      閱讀全文
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

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
              準備好給頭皮一次草本體驗了嗎？
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              閱讀完文章，還有問題嗎？直接透過 LINE 向沐璿專業護理師諮詢。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold text-lg h-12 px-10"
                onClick={openLineModal}
              >
                LINE 立即諮詢
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg h-12 px-10"
              >
                <Link href="/faq" title="查看常見問題">
                  常見問題
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

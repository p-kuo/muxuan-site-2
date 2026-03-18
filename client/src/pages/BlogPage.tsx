import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, CalendarDays, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { articles } from "@/data/articles";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });
}

const categoryColors: Record<string, string> = {
  頭皮知識: "bg-amber-50 text-amber-700 border-amber-200",
  草本知識: "bg-emerald-50 text-emerald-700 border-emerald-200",
  護髮教學: "bg-sky-50 text-sky-700 border-sky-200",
};

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const blogTitle = "護髮部落格 | 沐璿草本護髮中心";
    const blogDesc = "沐璿草本護髮中心護髮部落格：深度解析頭皮知識、草本成分與護髮教學，幫助您從根本了解頭皮健康。";
    const blogUrl = "https://muxuantw.com/blog";

    document.title = blogTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", blogDesc);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", blogUrl);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", blogTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", blogDesc);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", blogUrl);
    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) ogType.setAttribute("content", "website");

    return () => {
      document.title = "沐璿草本護髮 | 天然・安全・有效";
      const defaultDesc = "沐璿草本護髮中心採用中醫師調製草本配方，嚴選當歸、人蔘、何首烏等天然中藥材，專業改善白髮、落髮、頭皮屑等問題。台北、嘉義、新加坡服務。";
      const md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute("content", defaultDesc);
      const cn = document.querySelector('link[rel="canonical"]');
      if (cn) cn.setAttribute("href", "https://muxuantw.com");
      const ot = document.querySelector('meta[property="og:title"]');
      if (ot) ot.setAttribute("content", "沐璿草本護髮中心｜天然草本護髮・頭皮SPA");
      const od = document.querySelector('meta[property="og:description"]');
      if (od) od.setAttribute("content", defaultDesc);
      const ou = document.querySelector('meta[property="og:url"]');
      if (ou) ou.setAttribute("content", "https://muxuantw.com");
      const otp = document.querySelector('meta[property="og:type"]');
      if (otp) otp.setAttribute("content", "website");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/40 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.08),transparent_60%)]" />
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
                    <Link href={`/blog/${article.slug}`} title={article.title}>
                      {article.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {article.excerpt}
                  </p>

                  {/* Read more */}
                  <Link
                    href={`/blog/${article.slug}`}
                    title={`閱讀全文：${article.title}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200 mt-auto"
                  >
                    閱讀全文
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
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
                  LINE 立即諮詢
                </a>
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

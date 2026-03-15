import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Leaf, Droplets, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";

const cases = [
  {
    tag: "落髮調理",
    icon: <Leaf className="w-5 h-5 text-primary" />,
    title: "持續三年落髮，八週草本調理後髮量明顯恢復",
    profile: "女性，34歲，台北",
    duration: "調理週期：8週",
    summary:
      "長期壓力與產後荷爾蒙失調導致髮量稀疏，經頭皮檢測後採用髮根強健滋養配方，配合每週一次密集護理，第六週起落髮顯著減少，整體髮量豐盈感提升。",
  },
  {
    tag: "頭皮屑與油脂",
    icon: <Droplets className="w-5 h-5 text-primary" />,
    title: "反覆頭皮屑困擾多年，四週後頭皮明顯穩定",
    profile: "男性，28歲，嘉義",
    duration: "調理週期：4週",
    summary:
      "脂漏性皮膚炎反覆發作，使用市售控油洗髮精效果有限。採用深層頭皮淨化配方進行密集護理後，油脂分泌趨於平衡，頭皮屑大幅減少，不適感消失。",
  },
  {
    tag: "化學染敏感",
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    title: "對化學染劑嚴重過敏，改用草本染後零不適",
    profile: "女性，52歲，新加坡",
    duration: "調理週期：持續保養",
    summary:
      "多年化學染髮導致頭皮紅腫、癢痛，部分時期需就醫治療。改用沐璿草本天然染髮配方後，完全無刺激氣味，頭皮全無敏感反應，白髮遮蓋效果自然柔和。",
  },
];

export default function CasesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
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
            {/* Breadcrumb */}
            <nav aria-label="頁面路徑" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" title="回到沐璿草本護髮中心首頁" className="hover:text-primary transition-colors">
                首頁
              </Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <span className="text-foreground font-medium" aria-current="page">成功案例</span>
            </nav>

            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              真實調理紀錄
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              草本護髮成功案例
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              每一個案例都是一段真實的修復旅程。以下分享部分客戶的調理歷程，感受草本護髮的溫和與有效。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <ol className="space-y-10 max-w-3xl mx-auto list-none p-0" aria-label="成功案例列表">
            {cases.map((c, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <article className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8 border-l-4 border-primary">
                  <header className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                      {c.icon}
                    </span>
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                      {c.tag}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-auto">{c.duration}</span>
                  </header>

                  <h2 className="text-xl font-bold text-foreground mb-2 leading-snug">
                    {c.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 font-medium">{c.profile}</p>
                  <p className="text-muted-foreground leading-relaxed">{c.summary}</p>
                </article>
              </motion.li>
            ))}
          </ol>
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
              開始您的草本調理旅程
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              每個頭皮問題都有專屬的草本解方，立即諮詢讓我們為您量身規劃。
            </p>
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
                立即預約
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}

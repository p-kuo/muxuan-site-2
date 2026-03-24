import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Facebook, MapPin, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";

const locations = [
  {
    name: "台北店",
    address: "忠孝東路一段108號",
    phone: "02-23967893",
    hours: "週二至週六 09:00–18:00",
  },
  {
    name: "嘉義市店",
    address: "吳鳳南路15-1號",
    phone: "05-2222166",
    hours: "週二至週六 09:00–18:00",
  },
  {
    name: "嘉義縣府店",
    address: "祥和一路東段78號",
    phone: "05-3628586",
    hours: "週二至週六 09:00–18:00",
  },
  {
    name: "新加坡店",
    address: "BLK 530 Bedok North Street 3, #01-646",
    phone: "+65 6538 9589",
    hours: "週一、週三至週日 09:00–18:00",
  },
];

export default function ContactPage() {
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
            <nav aria-label="頁面路徑" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" title="回到沐璿草本護髮中心首頁" className="hover:text-primary transition-colors">
                首頁
              </Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <span className="text-foreground font-medium" aria-current="page">聯絡我們</span>
            </nav>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              預約與聯絡
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              聯絡沐璿草本護髮中心
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              立即預約您的草本體驗，讓沐璿為您找回頭皮的健康與自信。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              立即預約您的草本體驗
            </h2>
            <p className="text-muted-foreground text-lg">
              讓沐璿為您找回頭皮的健康與自信
            </p>
          </motion.div>

          {/* Branch phone numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8 text-center">
              各門市聯絡資訊
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {locations.map((loc, index) => (
                <motion.address
                  key={loc.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="not-italic bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow p-6 space-y-3"
                >
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    沐璿草本護髮中心 {loc.name}
                  </h3>
                  <p className="text-muted-foreground text-sm pl-7">{loc.address}</p>
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2 pl-7 text-primary font-medium hover:underline"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    {loc.phone}
                  </a>
                  <p className="text-muted-foreground text-sm pl-7">{loc.hours}</p>
                </motion.address>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-3 gap-6 mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a
              href="https://lin.ee/NxoDqq0"
              target="_blank"
              rel="noopener noreferrer"
              title="透過LINE預約沐璿草本護髮"
              className="flex flex-col items-center gap-3 py-8 px-6 rounded-2xl bg-[#00B900] hover:bg-[#00B900]/90 text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              <span className="text-xl font-bold">LINE 加好友</span>
              <span className="text-sm text-white/80">最快速的預約方式</span>
              <MessageCircle className="w-8 h-8" />
            </a>

            <a
              href="https://www.facebook.com/muherbal"
              target="_blank"
              rel="noopener noreferrer"
              title="前往沐璿草本護髮Facebook粉絲頁"
              className="flex flex-col items-center gap-3 py-8 px-6 rounded-2xl bg-[#1877F2] hover:bg-[#1877F2]/90 text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              <span className="text-xl font-bold">Facebook</span>
              <span className="text-sm text-white/80">追蹤最新消息</span>
              <Facebook className="w-8 h-8" />
            </a>

            <div className="flex flex-col items-center gap-3 py-8 px-6 rounded-2xl bg-secondary text-foreground shadow-lg">
              <span className="text-xl font-bold">電話預約</span>
              <span className="text-sm text-muted-foreground">請依分店直撥</span>
              <Phone className="w-8 h-8 text-primary" />
            </div>
          </motion.div>
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
              有任何問題嗎？
            </h2>
            <p className="text-white/80 text-lg mb-8 text-center">
              直接透過 LINE 與我們聯繫
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
                  立即預約
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

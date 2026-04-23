import { useEffect } from "react";
import { useSeo } from "@/hooks/use-seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Facebook, MapPin, ChevronRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { PictureImage } from "@/components/ui/picture-image";
import { useLineModal } from "@/components/LineModal";

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

const locations = [
  {
    name: "台北店",
    address: "忠孝東路一段108號",
    phone: "02-23967893",
    hours: "週二 08:30–15:30",
  },
  {
    name: "台北林森店",
    address: "台北市林森北路5巷10號",
    phone: "02-23967893",
    hours: "週一至週六 10:00–18:00（最後預約）",
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

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://muxuantw.com" },
        { "@type": "ListItem", "position": 2, "name": "聯絡我們", "item": "https://muxuantw.com/contact" },
      ],
    },
    {
      "@type": "ContactPage",
      "url": "https://muxuantw.com/contact",
      "inLanguage": "zh-TW",
      "name": "聯絡沐璿草本護髮中心",
      "description": "透過LINE、電話聯絡或親自到店諮詢預約。台北（兩店）、嘉義（市區店、縣府店）、新加坡共五處門市歡迎您。",
      "provider": { "@id": "https://muxuantw.com/#organization" },
    },
  ],
};

export default function ContactPage() {
  const { openLineModal } = useLineModal();
  useSeo({
    title: "聯絡我們 | 沐璿草本護髮中心",
    description: "透過LINE或電話聯絡沐璿草本護髮中心，預約頭皮護理諮詢。台北（兩店）、嘉義（市區店與縣府店）、新加坡共五處門市歡迎您。",
    canonical: "https://muxuantw.com/contact",
    ogTitle: "聯絡我們 | 沐璿草本護髮中心",
    jsonLd: contactJsonLd,
    jsonLdId: "contact-jsonld",
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-background">
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
                  className="not-italic bg-white rounded-2xl border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Card header */}
                  <div className="border-t-4 border-primary px-6 py-4">
                    <h3 className="text-xl font-bold text-foreground">
                      沐璿草本護髮中心 {loc.name}
                    </h3>
                  </div>

                  {/* Card body */}
                  <div className="px-6 py-5 space-y-4 flex-1">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">地址</p>
                        <p className="text-sm text-foreground font-medium">{loc.address}</p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">營業時間</p>
                        <p className="text-sm text-foreground font-medium">{loc.hours}</p>
                      </div>
                    </div>

                    {/* Phone CTA */}
                    {loc.phone && (
                      <a
                        href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`}
                        className="flex items-center justify-center gap-2 w-full mt-2 py-2.5 px-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-sm transition-colors duration-200"
                      >
                        <Phone className="w-4 h-4 shrink-0" />
                        {loc.phone}
                      </a>
                    )}
                  </div>
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
            <button
              onClick={openLineModal}
              title="透過LINE預約沐璿草本護髮"
              className="flex flex-col items-center gap-2 py-8 px-6 rounded-2xl bg-[#00B900] hover:bg-[#00B900]/90 text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xl font-bold">LINE 加好友</span>
              <span className="text-sm text-white/80">最快速的預約方式</span>
            </button>

            <a
              href="https://www.facebook.com/muherbal"
              target="_blank"
              rel="noopener noreferrer"
              title="前往沐璿草本護髮Facebook粉絲頁"
              className="flex flex-col items-center gap-2 py-8 px-6 rounded-2xl border border-primary/20 text-primary bg-background shadow-lg transition-all duration-200 hover:bg-gradient-to-br hover:from-[#1877F2] hover:to-[#4267B2] hover:text-white hover:border-transparent hover:shadow-xl hover:-translate-y-0.5 active:from-[#1565C0] active:to-[#365899]"
            >
              <Facebook className="w-6 h-6" />
              <span className="text-xl font-bold">Facebook</span>
              <span className="text-sm text-muted-foreground">追蹤最新消息</span>
            </a>

            <div className="flex flex-col items-center gap-2 py-8 px-6 rounded-2xl bg-primary text-white shadow-lg">
              <Phone className="w-6 h-6" />
              <span className="text-xl font-bold">電話預約</span>
              <span className="text-sm text-white/80">請依分店直撥</span>
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
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold text-lg h-12 px-10"
                onClick={openLineModal}
              >
                  立即預約
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

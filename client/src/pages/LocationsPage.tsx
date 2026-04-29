import { useEffect, useState } from "react";
import { useSeo } from "@/hooks/use-seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, CalendarX, Navigation, ChevronRight, MessageCircle, Facebook } from "lucide-react";
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
    name: "沐璿草本護髮中心(台北華山店)",
    city: "台北店",
    tag: "台北",
    streetAddress: "忠孝東路一段108號",
    addressLocality: "台北市",
    addressRegion: "台北市",
    addressCountry: "TW",
    phone: "02-23967893",
    hours: "早上8:30 - 下午3:30",
    closed: "星期日、星期一",
    openingHours: ["Tu-Sa 08:30-15:30"],
    directions: ["華山市場2樓", "阜杭豆漿對面", "善導寺捷運站4號、5號出口"],
    mapUrl: "https://maps.app.goo.gl/kiGMjQ2J4wPozSEHA",
  },
  {
    name: "沐璿草本護髮中心(台北林森店)",
    city: "台北林森店",
    tag: "台北",
    streetAddress: "林森北路5巷10號",
    addressLocality: "台北市",
    addressRegion: "台北市",
    addressCountry: "TW",
    phone: "02-23967893",
    hours: "早上10:00 - 下午6:00（最後預約）",
    closed: "星期日",
    openingHours: ["Mo-Sa 10:00-18:00"],
    directions: ["善導寺捷運站1號、3號、6號出口"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=台北市林森北路5巷10號",
  },
  {
    name: "沐璿草本護髮中心(嘉義市店)",
    city: "嘉義市店",
    tag: "嘉義",
    streetAddress: "吳鳳南路15-1號",
    addressLocality: "嘉義市",
    addressRegion: "嘉義市",
    addressCountry: "TW",
    phone: "05-2222166",
    hours: "早上9:00 - 下午6:00",
    closed: "星期日、星期一",
    openingHours: ["Tu-Sa 09:00-18:00"],
    directions: ["垂楊路摩斯漢堡附近"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=嘉義市吳鳳南路15-1號",
  },
  {
    name: "沐璿草本護髮中心(嘉義縣府店)",
    city: "嘉義縣府店",
    tag: "嘉義",
    streetAddress: "祥和一路東段78號",
    addressLocality: "嘉義縣",
    addressRegion: "嘉義縣",
    addressCountry: "TW",
    phone: "05-3628586",
    hours: "早上9:00 - 下午6:00",
    closed: "星期日、星期一",
    openingHours: ["Tu-Sa 09:00-18:00"],
    directions: [],
    mapUrl: "https://www.google.com/maps/place/%E6%B2%90%E7%92%BF%E8%8D%89%E6%9C%AC%E8%AD%B7%E9%AB%AE%E4%B8%AD%E5%BF%83~%E5%98%89%E7%BE%A9%E7%B8%A3%E5%BA%9C%E5%BA%97/@23.4581828,119.0785232,9z/data=!4m10!1m2!2m1!1z5rKQ55K_6I2J5pys6K236auu5Lit5b-D!3m6!1s0x346e9a34b0ebf949:0xa407e3774983da79!8m2!3d23.4581828!4d120.2980056!15sChjmspDnkr_ojYnmnKzorbfpq67kuK3lv4MiA4gBAVofIh3mspAg55K_IOiNieacrCDorbcg6auuIOS4reW_g5IBDGJlYXV0eV9zYWxvbpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSSmNFb3RjblYzUlJBQuABAPoBBAgAEAw!16s%2Fg%2F11f313w21f?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "沐璿草本護髮中心(新加坡店)",
    city: "新加坡店",
    tag: "新加坡",
    streetAddress: "BLK 530 Bedok North Street 3, #01-646",
    addressLocality: "Bedok",
    addressRegion: "Singapore",
    addressCountry: "SG",
    phone: "+65 6538 9589",
    hours: "9:00am - 6:00pm",
    closed: "星期二",
    openingHours: ["Mo 09:00-18:00", "We-Su 09:00-18:00"],
    directions: [
      "從 勿洛轉運站 (Bedok Interchange)：搭乘 225G 或 225W，5 站後於 CC 下車。",
      "從 勿洛北地鐵站 (Bedok North MRT) B 出口：搭乘 137，3 站後於 CC 下車。",
    ],
    mapUrl: "https://maps.app.goo.gl/twR7wuCQXdkb6vDg7",
  },
];


const ALL_TAG = "全部";
const tags = [ALL_TAG, "台北", "嘉義", "新加坡"];

export default function LocationsPage() {
  const { openLineModal } = useLineModal();
  const [activeTag, setActiveTag] = useState(ALL_TAG);

  useSeo({
    title: "門市地點與營業時間 | 沐璿草本護髮中心",
    description: "沐璿草本護髮中心四處門市：台北忠孝東路（02-23967893）、嘉義市吳鳳南路（05-2222166）、嘉義縣府祥和一路（05-3628586）、新加坡Bedok（+65 6538 9589）。週二至週六09:00-18:00。",
    canonical: "https://muxuantw.com/locations",
    ogTitle: "門市地點 | 沐璿草本護髮中心",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://muxuantw.com" },
        { "@type": "ListItem", "position": 2, "name": "門市地點", "item": "https://muxuantw.com/locations" },
      ],
    },
    jsonLdId: "locations-jsonld",
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const filtered = activeTag === ALL_TAG ? locations : locations.filter((l) => l.tag === activeTag);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-40 pb-0 relative overflow-hidden bg-background">
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
        {/* Left-to-right gradient: opaque background on left keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        {/* Bottom fade: blends hero seamlessly into the cards section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        {/* Subtle brand warmth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.10),transparent_55%)]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="pb-12">

            {/* Left — copy + stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <nav aria-label="頁面路徑" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link href="/" className="hover:text-primary transition-colors">首頁</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-medium">門市資訊</span>
              </nav>

              <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
                全台及海外
              </Badge>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
                全台及海外服務據點
              </h1>

              <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
                歡迎蒞臨體驗最純淨的草本護髮，我們在台北、嘉義與新加坡等地恭候您的光臨。
              </p>

            </motion.div>

          </div>

          {/* Region filter toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-2 flex-wrap border-t border-border/40 pt-5 pb-1"
          >
            <span className="text-xs text-muted-foreground mr-1 shrink-0">篩選：</span>
            {tags.map((tag) => {
              const active = tag === activeTag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={[
                    "text-sm px-4 py-1.5 rounded-full border transition-all duration-200 font-medium",
                    active
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white/70 text-muted-foreground border-border/50 hover:border-primary/40 hover:text-primary",
                  ].join(" ")}
                >
                  {tag}
                </button>
              );
            })}
          </motion.div>

          {/* Divider line fading into the section below */}
          <div className="border-t border-border/30" />
        </div>
      </section>

      {/* Location Cards */}
      <section className="py-20 md:py-28 bg-stone-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filtered.map((loc, index) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <CardContent className="p-8 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-8 bg-primary rounded-full shrink-0" />
                      <div>
                        <h2 className="text-xl font-bold text-foreground leading-tight">
                          {loc.name}
                        </h2>
                      </div>
                    </div>

                    {/* Contact details — wrapped in <address> for semantic HTML + GEO */}
                    <address className="not-italic">
                      <div className="space-y-4">
                        {/* Address */}
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground font-medium leading-relaxed">
                            {loc.addressLocality} {loc.streetAddress}
                          </span>
                        </div>

                        {/* Phone — render spacer when absent to keep field heights equal across cards */}
                        {loc.phone ? (
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-primary shrink-0" />
                            <a
                              href={`tel:${loc.phone.replace(/\s/g, "")}`}
                              className="font-medium tracking-wide text-foreground hover:text-primary transition-colors"
                            >
                              {loc.phone}
                            </a>
                          </div>
                        ) : (
                          <div className="h-5" />
                        )}

                        {/* Hours */}
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary shrink-0" />
                          <time className="text-muted-foreground">{loc.hours}</time>
                        </div>

                        {/* Closed days */}
                        <div className="flex items-center gap-3">
                          <CalendarX className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-muted-foreground">公休：{loc.closed}</span>
                        </div>
                      </div>
                    </address>

                    {/* Directions — sits directly below contact fields, top-aligned across sibling cards */}
                    {loc.directions.length > 0 && (
                      <div className="mt-6 text-sm bg-stone-50 p-4 rounded-lg border border-stone-100">
                        <div className="flex items-center gap-2 mb-3 text-stone-600 font-bold">
                          <Navigation className="w-4 h-4" />
                          <p>交通指引：</p>
                        </div>
                        <div className="space-y-2 text-stone-500">
                          {loc.directions.map((line, i) => (
                            <p key={i} className="leading-snug pl-3 -indent-3 text-[13px]">
                              • {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Spacer pushes map button to the bottom of the card */}
                    <div className="flex-1" />

                    {/* Map button */}
                    <Button
                      asChild
                      variant="outline"
                      className="w-full mt-6 border-primary/20 text-primary hover:bg-primary/5 shrink-0"
                    >
                      <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer">
                        查看地圖
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pt-8 pb-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2 text-center">
            聯絡我們
          </h2>
          <p className="text-muted-foreground text-center mb-8">立即預約您的草本體驗</p>
          <motion.div
            className="grid sm:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
              預約最近的服務據點
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              致電或到店諮詢，讓我們的專業護理師為您量身設計草本護髮方案。
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg h-12 px-10"
              onClick={openLineModal}
            >
              立即預約
            </Button>
          </motion.div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}

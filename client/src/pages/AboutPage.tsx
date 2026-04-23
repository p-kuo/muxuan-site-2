import { useEffect } from "react";
import { useLineModal } from "@/components/LineModal";
import { useSeo } from "@/hooks/use-seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { PictureImage } from "@/components/ui/picture-image";

import singaporeImg from "@assets/Singapore.webp";
import shopImg from "@assets/shop.webp";
import shopJpegImg from "@assets/generated_images/shop.webp";
import shop1Img from "@assets/generated_images/shop1.webp";
import image123 from "@assets/123.webp";
import heroBgPng from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere.png";
import heroBg320w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-320w.webp";
import heroBg640w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-640w.webp";
import heroBg1024w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-1024w.webp";
import heroBg320wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-320w.avif";
import heroBg640wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-640w.avif";
import heroBg1024wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-1024w.avif";
import storyImgPng from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs.png";
import story320w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-320w.webp";
import story640w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-640w.webp";
import story1024w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-1024w.webp";
import story320wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-320w.avif";
import story640wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-640w.avif";
import story1024wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-1024w.avif";
import herbsImg from "@assets/generated_images/traditional_chinese_herbs_composition_including_ginseng_and_angelica.png";
import naturalHerbsImg from "@assets/generated_images/close_up_of_natural_herbs_and_botanical_ingredients.png";
import taipeiImg from "@assets/generated_images/taipei.webp";

const heroBgSrcSet = [
  { width: 320, webpSrc: heroBg320w, avifSrc: heroBg320wAvif },
  { width: 640, webpSrc: heroBg640w, avifSrc: heroBg640wAvif },
  { width: 1024, webpSrc: heroBg1024w, avifSrc: heroBg1024wAvif },
];

const storySrcSet = [
  { width: 320, webpSrc: story320w, avifSrc: story320wAvif },
  { width: 640, webpSrc: story640w, avifSrc: story640wAvif },
  { width: 1024, webpSrc: story1024w, avifSrc: story1024wAvif },
];

interface Milestone {
  year: string;
  title: string;
  description: string;
  address?: string;
  image?: string;
  imageAlt?: string;
  tag?: string;
}

const milestones: Milestone[] = [
  {
    year: "2009",
    title: "緣起新加坡",
    description:
      "創辦人葉玉女在新加坡四馬路觀音廟的指點下，踏上天然草本頭皮護理的研究之路，開始深入鑽研能真正解決頭皮問題的天然配方",
    image: singaporeImg,
    imageAlt: "新加坡 — 沐璿草本護髮的起源地",
    tag: "起源",
  },
  {
    year: "2011",
    title: "沐璿正式成立",
    description:
      "歷經無數次試驗，草本配方研發成功。沐璿正式成立，開始將這份專業帶給有需要的人",
    image: image123,
    imageAlt: "沐璿草本護髮中心品牌標誌",
    tag: "創立",
  },
  {
    year: "2012",
    title: "台北華山店正式開幕",
    description:
      "沐璿第一家實體店面在台北華山市場正式開幕，將天然草本護髮服務帶入繁華都會",
    address: "臺北市忠孝東路一段108號2樓",
    image: taipeiImg,
    imageAlt: "台北華山店草本護髮服務",
    tag: "台北",
  },
  {
    year: "2017",
    title: "新加坡店正式開幕",
    description:
      "回到品牌緣起之地，新加坡實體店面正式開幕，將更專業、高品質的服務帶給在地顧客",
    address: "BLK 530 Bedok North Street 3, #01-646",
    image: shopImg,
    imageAlt: "沐璿新加坡店面",
    tag: "新加坡",
  },
  {
    year: "2019",
    title: "嘉義吳鳳南路店開幕",
    description:
      "從住家到店面，沐璿將草本護髮的專業服務延伸至嘉義，讓更多南台灣的朋友受惠",
    address: "嘉義市吳鳳南路15-1號",
    image: shopJpegImg,
    imageAlt: "沐璿草本護髮嘉義吳鳳南路店 — 嘉義草本頭皮護理中心門市",
    tag: "嘉義",
  },
  {
    year: "現在",
    title: "五店持續服務",
    description:
      "台北、嘉義、新加坡，沐璿以最天然的成分、最安全的配方，持續守護每一位客人的頭皮健康，實踐「好的產品應讓更多人受惠」的初心",
    tag: "持續",
  },
];

const imageObjectPosition: Record<string, string> = {
  "2009": "center 45%",
  "2012": "center 18%",
  "2017": "15% 40%",
};

const imagePaddingY: Record<string, { top: string; bottom: string }> = {
  "2012": { top: "10%", bottom: "10%" },
  "2017": { top: "0%", bottom: "10%" },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://muxuantw.com" },
        { "@type": "ListItem", "position": 2, "name": "品牌故事", "item": "https://muxuantw.com/about" },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": "https://muxuantw.com/about",
      "name": "品牌故事 | 沐璿草本護髮中心",
      "url": "https://muxuantw.com/about",
      "inLanguage": "zh-TW",
      "about": { "@id": "https://muxuantw.com/#organization" },
      "description": "沐璿草本護髮中心品牌故事：從2009年創辦人葉玉女在新加坡的啟程，歷經多年草本研究，於台灣台北、嘉義建立專業草本護髮中心。",
    },
  ],
};

export default function AboutPage() {
  const { openLineModal } = useLineModal();
  useSeo({
    title: "品牌故事 | 沐璿草本護髮中心",
    description: "了解沐璿草本護髮中心的品牌故事——從2009年創辦人葉玉女在新加坡的啟程，到台北、嘉義多家門市的草本護髮事業，15年天然護髮專業。",
    canonical: "https://muxuantw.com/about",
    ogTitle: "品牌故事 | 沐璿草本護髮中心",
    jsonLd: aboutJsonLd,
    jsonLdId: "about-jsonld",
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-0 relative overflow-hidden bg-background">
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
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — copy, quote, stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <nav aria-label="頁面路徑" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link href="/" title="回到沐璿草本護髮中心首頁" className="hover:text-primary transition-colors">
                  首頁
                </Link>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
                <span className="text-foreground font-medium" aria-current="page">關於沐璿</span>
              </nav>

              <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
                品牌故事
              </Badge>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
                關於沐璿<br />草本護髮中心
              </h1>

              <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed">
                源自對「真正安全、天然、有效」護髮方式的追求，一個三代人共同走過的草本旅程
              </p>

              {/* Founder's pull-quote */}
              <blockquote className="border-l-2 border-primary/40 pl-4 mb-8">
                <p className="font-serif italic font-bold text-foreground/70 text-base leading-relaxed">
                  「好的產品，應讓更多人受惠」
                </p>
                <cite className="text-xs text-muted-foreground not-italic mt-1 block">— 創辦人 葉玉女</cite>
              </blockquote>

              {/* Stats chips */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: "2011", label: "創立" },
                  { value: "5", label: "服務據點" },
                  { value: "15+", label: "年專業經驗" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                    className="bg-white/70 backdrop-blur-sm border border-border/40 rounded-xl px-2 py-3 text-center shadow-sm"
                  >
                    <p className="text-lg font-bold text-primary leading-none mb-1">{s.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — image (desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="hidden md:block relative"
            >
              {/* Decorative glow blob */}
              <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-primary/8 blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={shop1Img}
                  alt="沐璿草本護髮中心門市 — MU HERB草本護髮品牌標誌，台灣草本頭皮護理專家"
                  width={800}
                  height={600}
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  className="w-full h-full object-cover object-left-top"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Brand Story Content */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Image Column */}
            <motion.div
              className="lg:col-span-4 relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="sticky top-32">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] h-full">
                  <PictureImage
                    src={storyImgPng}
                    alt="沐璿草本護髮品牌故事 — 草本植物從傳統藥材中生長，象徵品牌追求天然護髮之旅"
                    width={1024}
                    height={1024}
                    srcSetEntries={storySrcSet}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority={false}
                    className="w-full h-full object-cover"
                    containerClassName="absolute inset-0 w-full h-full"
                    style={{ aspectRatio: "unset" }}
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                </div>
                <blockquote className="absolute -bottom-6 -right-6 bg-background p-6 rounded-xl shadow-xl max-w-xs border border-border hidden md:block">
                  <p className="font-serif text-lg italic text-primary">
                    "真正好的產品，應該讓更多人受惠。"
                  </p>
                  <footer className="text-right mt-2 text-sm font-bold text-muted-foreground">
                    —— 葉玉女 創始人
                  </footer>
                </blockquote>
              </div>
            </motion.div>

            {/* Text Column */}
            <motion.div
              className="lg:col-span-8 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                源自一個家族的親身體驗
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-6 leading-loose text-justify font-sans">
                <p>
                  創辦人葉玉女在新加坡生活的20年裡，與四馬路觀音廟結下一段特別的緣分。這段經歷，也引導她走上以草本頭皮護理為方向的道路。在深入研究頭皮調理過程中，歷經一年多反覆測試與調整，終於研發出一套溫和且穩定的天然草本配方。此配方結合草本護理與天然染髮，在調理頭皮的同時也能自然上色，有助於改善頭皮油、頭皮屑與頭皮癢，並協助頭皮回到較健康的狀態，也為沐璿奠定了重要基礎。
                </p>
                <p>
                  其實，最早面臨頭皮問題的，就是她的家人。創辦人長期深受頭皮屑與反覆不適困擾，女兒也有相同狀況，母親則多年因頭皮問題反覆就醫。
                </p>
                <p>
                  三代人共同面臨頭皮困擾，使她更加堅定要找到真正安全、溫和的改善方式。經過長時間調整與使用，這套草本配方幫助家人逐步改善頭皮狀況，這份來自親身經歷的成果，也成為品牌誕生的重要起點。隨著新加坡經驗逐漸累積，她決定將這份草本護理帶回她的家鄉——台灣，希望讓更多人透過溫和自然的方式，找回頭皮的舒適與平衡。
                </p>
                <p>
                  沐璿草本護髮始終堅持以真誠的心、天然的成分與安心的配方，帶給每一位需要的人。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline — In-N-Out style alternating image/text */}
      <section className="py-20 md:py-32 bg-[#f9f7f4] overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              品牌歷程
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              沐璿走過的每一步
            </h2>
          </motion.div>

          {/* Timeline entries */}
          <div className="relative max-w-6xl mx-auto">

            {/* Central vertical line — desktop only */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary/15 -translate-x-1/2" />

            {milestones.map((item, index) => {
              const imageOnLeft = index % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  className="relative mb-8 md:mb-0"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {/* Desktop: two-column alternating */}
                  <div className="hidden md:grid md:grid-cols-2 md:min-h-[420px] gap-0">

                    {/* Left column */}
                    <div className="flex items-stretch pr-12 py-10">
                      {imageOnLeft && item.image ? (
                        /* Image on left */
                        <div className="relative w-full group">
                          <div className={`relative overflow-hidden rounded-xl border-2 border-primary/20 shadow-lg aspect-square${imagePaddingY[item.year] ? " bg-white" : ""}`}>
                            <div className="absolute inset-0" style={imagePaddingY[item.year] ? { paddingTop: imagePaddingY[item.year].top, paddingBottom: imagePaddingY[item.year].bottom } : undefined}>
                              <img
                                src={item.image}
                                alt={item.imageAlt}
                                width={600}
                                height={600}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                style={{ objectPosition: imageObjectPosition[item.year] ?? "center center" }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Text on left */
                        <div className="flex flex-col justify-center text-right w-full">
                          <span className="block text-7xl font-serif font-bold text-primary/60 leading-none mb-3 tabular-nums">
                            {item.year}
                          </span>
                          <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                          {item.address && (
                            <p className="flex items-center justify-end gap-1.5 mt-3 text-sm text-primary font-medium">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              {item.address}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-5 h-5 rounded-full bg-primary border-4 border-[#f9f7f4] shadow-md" />
                    </div>

                    {/* Right column */}
                    <div className="flex items-stretch pl-12 py-10">
                      {imageOnLeft ? (
                        /* Text on right */
                        <div className="flex flex-col justify-center text-left w-full">
                          <span className="block text-7xl font-serif font-bold text-primary/60 leading-none mb-3 tabular-nums">
                            {item.year}
                          </span>
                          <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                          {item.address && (
                            <p className="flex items-center gap-1.5 mt-3 text-sm text-primary font-medium">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              {item.address}
                            </p>
                          )}
                        </div>
                      ) : item.image ? (
                        /* Image on right */
                        <div className="relative w-full group">
                          <div className={`relative overflow-hidden rounded-xl border-2 border-primary/20 shadow-lg aspect-square${imagePaddingY[item.year] ? " bg-white" : ""}`}>
                            <div className="absolute inset-0" style={imagePaddingY[item.year] ? { paddingTop: imagePaddingY[item.year].top, paddingBottom: imagePaddingY[item.year].bottom } : undefined}>
                              <img
                                src={item.image}
                                alt={item.imageAlt}
                                width={600}
                                height={600}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                style={{ objectPosition: imageObjectPosition[item.year] ?? "center center" }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Mobile: image top, text bottom, left rail */}
                  <div className="md:hidden flex gap-5 pb-10 last:pb-0 relative">
                    {/* Left rail dot */}
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-primary border-4 border-[#f9f7f4] shadow-sm mt-1 shrink-0" />
                      {index < milestones.length - 1 && (
                        <div className="w-[2px] flex-1 bg-primary/15 mt-2" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-2">
                      {item.image && (
                        <div className={`relative overflow-hidden rounded-xl border border-primary/20 shadow-md mb-4 aspect-square${imagePaddingY[item.year] ? " bg-white" : ""}`}>
                          <div className="absolute inset-0" style={imagePaddingY[item.year] ? { paddingTop: imagePaddingY[item.year].top, paddingBottom: imagePaddingY[item.year].bottom } : undefined}>
                          <img
                            src={item.image}
                            alt={item.imageAlt}
                            width={600}
                            height={600}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-center"
                            style={{ objectPosition: imageObjectPosition[item.year] ?? "center center" }}
                          />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                        </div>
                      )}
                      <span className="block text-4xl font-serif font-bold text-primary/60 leading-none mb-1 tabular-nums">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {item.description}
                      </p>
                      {item.address && (
                        <p className="flex items-center gap-1.5 mt-2 text-xs text-primary font-medium">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {item.address}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
              親身體驗草本護髮的溫和力量
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              和葉玉女創辦人一樣，讓草本配方從根本改善您的頭皮健康。
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

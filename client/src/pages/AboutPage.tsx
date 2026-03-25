import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { PictureImage } from "@/components/ui/picture-image";

import singaporeImg from "@assets/Singapore.png";
import shopImg from "@assets/shop.png";
import image123 from "@assets/123.png";
import storyImgPng from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs.png";
import story320w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-320w.webp";
import story640w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-640w.webp";
import story1024w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-1024w.webp";
import story320wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-320w.avif";
import story640wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-640w.avif";
import story1024wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-1024w.avif";
import herbsImg from "@assets/generated_images/traditional_chinese_herbs_composition_including_ginseng_and_angelica.png";
import naturalHerbsImg from "@assets/generated_images/close_up_of_natural_herbs_and_botanical_ingredients.png";
import salonImg from "@assets/generated_images/happy_mid-age_chinese_man_enjoying_herbal_hair_steam_treatment_in_salon.png";

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
  image: string;
  imageAlt: string;
  tag?: string;
}

const milestones: Milestone[] = [
  {
    year: "2009",
    title: "緣起新加坡",
    description:
      "創辦人葉玉女在新加坡四馬路觀音廟的指點下，踏上天然草本頭皮護理的研究之路，開始深入鑽研能真正解決頭皮問題的天然配方。",
    image: singaporeImg,
    imageAlt: "新加坡 — 沐璿草本護髮的起源地",
    tag: "起源",
  },
  {
    year: "2011",
    title: "沐璿正式成立",
    description:
      "歷經無數次試驗，草本配方研發成功。沐璿正式成立，開始將這份專業帶給有需要的人。",
    image: image123,
    imageAlt: "沐璿草本護髮中心品牌標誌",
    tag: "創立",
  },
  {
    year: "2012",
    title: "台北店正式開幕",
    description:
      "沐璿第一家實體店面在台北華山市場正式開幕，將天然草本護髮服務帶入繁華都會。",
    address: "臺北市忠孝東路一段108號2樓",
    image: herbsImg,
    imageAlt: "台北店草本護髮服務",
    tag: "台北",
  },
  {
    year: "2017",
    title: "新加坡店正式開幕",
    description:
      "回到品牌緣起之地，新加坡實體店面正式開幕，將更專業、高品質的服務帶給在地顧客。",
    address: "530 Bedok North St 3, #01-646",
    image: shopImg,
    imageAlt: "沐璿新加坡店面",
    tag: "新加坡",
  },
  {
    year: "2019",
    title: "嘉義吳鳳南路店開幕",
    description:
      "從住家到店面，沐璿將草本護髮的專業服務延伸至嘉義，讓更多南台灣的朋友受惠。",
    address: "嘉義市吳鳳南路15-1號",
    image: naturalHerbsImg,
    imageAlt: "天然草本成分",
    tag: "嘉義",
  },
  {
    year: "現在",
    title: "四店持續服務",
    description:
      "台北、嘉義兩店、新加坡，沐璿以最天然的成分、最安全的配方，持續守護每一位客人的頭皮健康，實踐「好的產品應讓更多人受惠」的初心。",
    image: salonImg,
    imageAlt: "沐璿草本護髮專業服務",
    tag: "持續",
  },
];

export default function AboutPage() {
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
              <span className="text-foreground font-medium" aria-current="page">關於沐璿</span>
            </nav>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              品牌故事
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              關於沐璿草本護髮中心
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              源自對「真正安全、天然、有效」護髮方式的追求，一個三代人共同走過的草本療癒旅程。
            </p>
          </motion.div>
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
                  2009 年，創辦人葉玉女在新加坡四馬路觀音廟的指點下，走上了採用草本頭皮護理這條道路，開啟了天然草本配方的研究旅程。從一開始對頭皮護理毫無概念，到深入研究頭皮修護過程中，經過無數次試驗，終於研發出有效改善頭皮問題的天然配方。此配方不僅讓頭皮屑消失、舒緩頭皮癢，甚至在預防白髮增長方面也展現驚人的效果，奠定了沐璿最堅實的基礎。
                </p>
                <p>
                  其實，最早面臨頭皮問題的，就是她的家人。創辦人長期深受脂漏性皮膚炎遺傳，有頭皮屑困擾、反覆癢痛，多年難以完全改善。 更讓她掛心的是，女兒也遺傳了同樣的狀況， 而媽媽也多年因脂漏性皮膚炎長期看醫生、打類固醇針，一直反覆。
                </p>
                <p>
                  三代人共同面臨頭皮問題，使她更加堅定要找到真正安全、有效、溫和的天然解方。經過時間淬鍊，此草本配方成功讓三代人恢復頭皮健康，這份親身體驗，成為她推動品牌的最大力量。隨著新加坡市場逐漸穩定，她決定把這份成果帶回台灣 —— 因為她相信，真正好的產品，應該讓更多人受惠。
                </p>
                <p>
                  一路走來，她始終堅信：只要專注品質、堅守初心，品牌就會持續成長。每一次努力與突破都讓沐璿更接近「以最天然的方式改善頭皮健康」的使命。沐璿草本護髮的核心精神，是以最真誠的心、最天然的成分、最安全的配方，帶給每一位需要的人。未來，她將持續提升品質、精進技術，讓更多人感受草本護髮所帶來的健康。
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
                  <div className="hidden md:grid md:grid-cols-2 md:min-h-[420px]">

                    {/* Left column */}
                    <div className={`flex items-stretch ${imageOnLeft ? "pr-16" : "pl-16"} py-10`}>
                      {imageOnLeft ? (
                        /* Image on left */
                        <div className="relative w-full group">
                          <div className="relative overflow-hidden rounded-xl border-2 border-primary/20 shadow-lg h-full min-h-[300px]">
                            <img
                              src={item.image}
                              alt={item.imageAlt}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                            {item.tag && (
                              <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                {item.tag}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Text on left */
                        <div className="flex flex-col justify-center text-right w-full">
                          <span className="block text-7xl font-serif font-bold text-primary/25 leading-none mb-3 tabular-nums">
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
                    <div className={`flex items-stretch ${imageOnLeft ? "pl-16" : "pr-16"} py-10`}>
                      {imageOnLeft ? (
                        /* Text on right */
                        <div className="flex flex-col justify-center text-left w-full">
                          <span className="block text-7xl font-serif font-bold text-primary/25 leading-none mb-3 tabular-nums">
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
                      ) : (
                        /* Image on right */
                        <div className="relative w-full group">
                          <div className="relative overflow-hidden rounded-xl border-2 border-primary/20 shadow-lg h-full min-h-[300px]">
                            <img
                              src={item.image}
                              alt={item.imageAlt}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                            {item.tag && (
                              <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                {item.tag}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
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
                      <div className="relative overflow-hidden rounded-xl border border-primary/20 shadow-md mb-4 aspect-video">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                        {item.tag && (
                          <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <span className="block text-4xl font-serif font-bold text-primary/30 leading-none mb-1 tabular-nums">
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

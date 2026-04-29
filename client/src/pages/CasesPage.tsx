import { useEffect, useRef, useState, useCallback } from "react";
import { useLineModal } from "@/components/LineModal";
import { useSeo } from "@/hooks/use-seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Leaf, Droplets, ShieldCheck, ChevronsLeftRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { PictureImage } from "@/components/ui/picture-image";

import hairImg from "@assets/generated_images/hair.jpeg";
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

// ---------------------------------------------------------------------------
// Before / After drag-to-compare slider
// ---------------------------------------------------------------------------
interface SliderImageProps {
  src: string;
  /** WebP srcset string, e.g. "/cases/bef-480w.webp 480w, /cases/bef-960w.webp 960w" */
  webpSrcSet?: string;
  alt: string;
  sizes?: string;
  objectPosition?: string;
  priority?: boolean;
  className?: string;
}

function SliderImage({ src, webpSrcSet, alt, sizes, objectPosition = "center center", priority = false, className }: SliderImageProps) {
  return (
    <picture className={`absolute inset-0 block w-full h-full ${className ?? ""}`}>
      {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        draggable={false}
        width={960}
        height={1280}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ objectPosition }}
      />
    </picture>
  );
}

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeWebpSrcSet,
  afterWebpSrcSet,
  reversed = false,
  priority = false,
  /** CSS object-position for both images — use to align the key comparison area */
  objectPosition = "center center",
  sizes = "(max-width: 768px) calc(100vw - 2rem), 800px",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeWebpSrcSet?: string;
  afterWebpSrcSet?: string;
  /** When true, the after image appears on the left and before on the right. */
  reversed?: boolean;
  /** Set true for the LCP image (hero preview) — enables eager loading & fetchPriority. */
  priority?: boolean;
  objectPosition?: string;
  sizes?: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const clamp = (v: number) => Math.max(2, Math.min(98, v));

  const updateFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) updateFromClientX(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => updateFromClientX(e.touches[0].clientX);

  // Which image sits in the background (right) vs. the clipped foreground (left)
  const bgSrc        = reversed ? beforeSrc        : afterSrc;
  const bgAlt        = reversed ? beforeAlt        : afterAlt;
  const bgWebpSrcSet = reversed ? beforeWebpSrcSet : afterWebpSrcSet;
  const fgSrc        = reversed ? afterSrc         : beforeSrc;
  const fgAlt        = reversed ? afterAlt         : beforeAlt;
  const fgWebpSrcSet = reversed ? afterWebpSrcSet  : beforeWebpSrcSet;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl select-none cursor-col-resize shadow-xl"
      style={{ aspectRatio: "4 / 3" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      {/* Background image — fills the right side */}
      <SliderImage
        src={bgSrc}
        webpSrcSet={bgWebpSrcSet}
        alt={bgAlt}
        sizes={sizes}
        objectPosition={objectPosition}
        priority={priority}
      />

      {/* Foreground image — clipped to reveal the left side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <SliderImage
          src={fgSrc}
          webpSrcSet={fgWebpSrcSet}
          alt={fgAlt}
          sizes={sizes}
          objectPosition={objectPosition}
          priority={priority}
        />
      </div>

      {/* Labels — always 調理前 left, 調理後 right */}
      <span className="absolute top-3 left-3 z-10 bg-black/55 text-white text-xs font-semibold px-2.5 py-1 rounded-full pointer-events-none">
        調理前
      </span>
      <span className="absolute top-3 right-3 z-10 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full pointer-events-none">
        調理後
      </span>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/90 shadow-md" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center ring-2 ring-primary/30">
          <ChevronsLeftRight className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Drag hint */}
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/40 text-white text-[11px] px-3 py-1 rounded-full pointer-events-none whitespace-nowrap">
        拖曳滑桿比較前後
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Case data
// ---------------------------------------------------------------------------
const ALL_TAG = "全部";

const cases = [
  {
    tag: "頭皮發炎",
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    title: "頭皮發炎 頭髮無法生長",
    profile: "女性，51歲，新加坡",
    duration: "調理週期：8週",
    summary:
      "當頭皮處於發炎狀態時，毛囊環境惡化，會直接導致頭髮無法生長。經過幾週的護理，現在發炎區域已完全痊癒，已經可以觀察到新生髮根。",
    beforeSrc: "/cases/bef.jpg",
    afterSrc:  "/cases/aft.jpg",
    beforeWebpSrcSet: "/cases/bef-480w.webp 480w, /cases/bef-768w.webp 768w, /cases/bef-960w.webp 960w",
    afterWebpSrcSet:  "/cases/aft-480w.webp 480w, /cases/aft-768w.webp 768w, /cases/aft-960w.webp 960w",
    beforeAlt: "頭皮發炎調理前：頭頂分缝處可見明顯發炎傷口，毛囊受損",
    afterAlt:  "頭皮發炎痊癒後：發炎消退，可觀察到密集新生髮根",
    // objectPosition focuses the crop on the scalp parting where the key
    // difference is visible — both images have this area at roughly 40% from top
    objectPosition: "center 40%",
    priority: true,
    reversed: false,
  },
  {
    tag: "頭皮過敏，發炎",
    icon: <Droplets className="w-5 h-5 text-primary" />,
    title: "頭皮癢困擾多年，六週後頭皮明顯消紅",
    profile: "女性，47歲，嘉義",
    duration: "調理週期：6週",
    summary:
      "使用化學染(PPD)遮蓋白髮，因過敏頭皮迅速出現大面積發紅和劇烈搔癢等症狀。經過幾週的護理，現在發炎區域幾乎全痊癒，頭皮不再搔癢。",
    beforeSrc: "/cases/befo.jpg",
    afterSrc:  "/cases/afte.jpg",
    beforeWebpSrcSet: "/cases/befo-480w.webp 480w, /cases/befo-768w.webp 768w, /cases/befo-960w.webp 960w",
    afterWebpSrcSet:  "/cases/afte-480w.webp 480w, /cases/afte-768w.webp 768w, /cases/afte-960w.webp 960w",
    beforeAlt: "頭皮過敏調理前：使用化學染PPD後頭皮大面積發紅搔癢",
    afterAlt:  "頭皮過敏調理後：六週護理後發炎消退，頭皮恢復健康",
    objectPosition: "center 35%",
  },
  {
    tag: "天然蓋白髮",
    icon: <Leaf className="w-5 h-5 text-primary" />,
    title: "重現青春光彩",
    profile: "女性，71歲，新加坡",
    duration: "調理週期：持續保養",
    summary:
      "不同於化學染劑生硬的烏黑，天然草本能呈現最自然的光澤黑，讓您看起來更年輕、更有活力。",
    beforeSrc: "/cases/whiteh.jpeg",
    afterSrc:  "/cases/blackh.jpeg",
    beforeAlt: "天然草本染髮前：白髮自然髮色狀態",
    afterAlt:  "天然草本染髮後：白髮轉為光澤黑髮的效果",
    objectPosition: "center 30%",
  },
];

const tags = [ALL_TAG, ...Array.from(new Set(cases.map((c) => c.tag)))];

// ---------------------------------------------------------------------------
// Stats data
// ---------------------------------------------------------------------------
const stats = [
  { value: "100+", label: "成功案例" },
  { value: "95%", label: "客戶滿意度" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const casesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://muxuantw.com" },
        { "@type": "ListItem", "position": 2, "name": "護理成果", "item": "https://muxuantw.com/cases" },
      ],
    },
    {
      "@type": "CollectionPage",
      "url": "https://muxuantw.com/cases",
      "inLanguage": "zh-TW",
      "name": "草本護髮護理成果 | 沐璿草本護髮中心",
      "description": "沐璿草本護髮中心真實護理成果：天然草本蓋白髮、頭皮發炎修復、頭皮過敏調理等前後對比案例，展示天然草本配方的實際效果。",
      "provider": { "@id": "https://muxuantw.com/#organization" },
    },
    {
      "@type": "ItemList",
      "name": "草本護髮成功案例",
      "url": "https://muxuantw.com/cases",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "頭皮發炎 頭髮無法生長",
          "description": "當頭皮處於發炎狀態時，毛囊環境惡化，會直接導致頭髮無法生長。經過幾週的護理，現在發炎區域已完全痊癒，已經可以觀察到新生髮根。",
          "url": "https://muxuantw.com/cases#頭皮發炎",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "頭皮癢困擾多年，六週後頭皮明顯消紅",
          "description": "使用化學染(PPD)遮蓋白髮，因過敏頭皮迅速出現大面積發紅和劇烈搔癢等症狀。經過幾週的護理，現在發炎區域幾乎全痊癒，頭皮不再搔癢。",
          "url": "https://muxuantw.com/cases#頭皮過敏",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "重現青春光彩",
          "description": "不同於化學染劑生硬的烏黑，天然草本能呈現最自然的光澤黑，讓您看起來更年輕、更有活力。",
          "url": "https://muxuantw.com/cases#天然蓋白髮",
        },
      ],
    },
  ],
};

export default function CasesPage() {
  const { openLineModal } = useLineModal();
  const [activeTag, setActiveTag] = useState(ALL_TAG);

  useSeo({
    title: "護理成果案例 | 沐璿草本護髮中心",
    description: "查看沐璿草本護髮中心的真實護理成果——天然草本蓋白髮、頭皮發炎修復、頭皮過敏調理等前後對比案例，見證天然草本配方的實際效果。",
    canonical: "https://muxuantw.com/cases",
    ogTitle: "護理成果案例 | 沐璿草本護髮中心",
    jsonLd: casesJsonLd,
    jsonLdId: "cases-jsonld",
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const filtered = activeTag === ALL_TAG ? cases : cases.filter((c) => c.tag === activeTag);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* ------------------------------------------------------------------ */}
      {/* Page Hero                                                            */}
      {/* ------------------------------------------------------------------ */}
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
        {/* Left-to-right gradient keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        {/* Bottom fade blends into content below */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        {/* Subtle brand warmth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.10),transparent_55%)]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center pb-12">

            {/* Left — copy + stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
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

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
                草本護髮<br />成功案例
              </h1>

              <p className="text-muted-foreground text-base md:text-lg max-w-md mb-8 leading-relaxed">
                每一個案例都是一段真實的修復旅程。拖曳比較滑桿，親眼見證草本調理的前後差異。
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 max-w-md">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/70 backdrop-blur-sm border border-border/40 rounded-xl px-4 py-3 text-center shadow-sm"
                  >
                    <p className="text-2xl font-bold text-primary leading-none mb-1">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
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
              <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-primary/8 blur-2xl pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={hairImg}
                  alt="沐璿草本護髮護理成果 — 天然草本頭皮調理前後效果，台灣嘉義新加坡草本護髮中心"
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

          {/* ---------------------------------------------------------------- */}
          {/* Category filter tabs — sits at bottom edge of hero               */}
          {/* ---------------------------------------------------------------- */}
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
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Cases list                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <ol className="space-y-16 max-w-3xl mx-auto list-none p-0" aria-label="成功案例列表">
            {filtered.map((c, index) => (
              <motion.li
                key={c.tag + index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <article className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-border/50">
                  {/* Before / After slider */}
                  <div className="p-4 pb-0">
                    <BeforeAfterSlider
                      beforeSrc={c.beforeSrc}
                      afterSrc={c.afterSrc}
                      beforeAlt={c.beforeAlt}
                      afterAlt={c.afterAlt}
                      beforeWebpSrcSet={c.beforeWebpSrcSet}
                      afterWebpSrcSet={c.afterWebpSrcSet}
                      reversed={c.reversed}
                      objectPosition={c.objectPosition}
                    />
                  </div>

                  {/* Card body */}
                  <div className="p-6 pt-5">
                    <header className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                        {c.icon}
                      </span>
                      <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                        {c.tag}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-auto">{c.duration}</span>
                    </header>

                    <h2 className="text-xl font-bold text-foreground mb-1 leading-snug">
                      {c.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-3 font-medium">{c.profile}</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">{c.summary}</p>
                  </div>
                </article>
              </motion.li>
            ))}

            {filtered.length === 0 && (
              <li className="text-center py-16 text-muted-foreground">
                目前尚無此分類案例。
              </li>
            )}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                  */}
      {/* ------------------------------------------------------------------ */}
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

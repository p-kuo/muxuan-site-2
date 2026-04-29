import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useLineModal } from "@/components/LineModal";
import { useSeo } from "@/hooks/use-seo";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PictureImage } from "@/components/ui/picture-image";
import {
  Leaf,
  Droplets,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  FlaskConical,
  HandHeart,
  CalendarCheck,
  ChevronRight,
  Snowflake,
  ShieldAlert,
  TrendingDown,
  Palette,
  Brain,
  Flame,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { InlineCerts } from "@/components/CertificateSection";

import heroBgPng from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere.png";
import heroBg320w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-320w.webp";
import heroBg640w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-640w.webp";
import heroBg1024w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-1024w.webp";
import heroBg320wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-320w.avif";
import heroBg640wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-640w.avif";
import heroBg1024wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-1024w.avif";
import ingredientsImgPng from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates.png";
import ingredients320w from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-320w.webp";
import ingredients640w from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-640w.webp";
import ingredients1024w from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-1024w.webp";
import ingredients320wAvif from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-320w.avif";
import ingredients640wAvif from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-640w.avif";
import ingredients1024wAvif from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-1024w.avif";

const heroBgSrcSet = [
  { width: 320, webpSrc: heroBg320w, avifSrc: heroBg320wAvif },
  { width: 640, webpSrc: heroBg640w, avifSrc: heroBg640wAvif },
  { width: 1024, webpSrc: heroBg1024w, avifSrc: heroBg1024wAvif },
];

const ingredientsSrcSet = [
  { width: 320, webpSrc: ingredients320w, avifSrc: ingredients320wAvif },
  { width: 640, webpSrc: ingredients640w, avifSrc: ingredients640wAvif },
  { width: 1024, webpSrc: ingredients1024w, avifSrc: ingredients1024wAvif },
];

const formulas = [
  {
    id: "scalp",
    title: "深層頭皮淨化配方",
    subtitle: "油性・頭皮屑・毛囊阻塞",
    icon: <Droplets className="w-6 h-6" />,
    color: "from-teal-500/10 to-teal-500/5",
    activeColor: "bg-teal-600",
    ingredients: ["當歸", "人蔘", "何首烏", "薑萃取", "薄荷精華"],
    benefits: [
      "溫和溶解毛囊油脂與老廢角質",
      "平衡頭皮油脂分泌，告別黏膩感",
      "打造清爽、能自由呼吸的頭皮環境",
    ],
    tags: ["控油", "去屑", "潔淨"],
  },
  {
    id: "nourish",
    title: "髮根強健滋養配方",
    subtitle: "落髮・稀疏・頭皮養護",
    icon: <Leaf className="w-6 h-6" />,
    color: "from-amber-500/10 to-amber-500/5",
    activeColor: "bg-amber-600",
    ingredients: ["人參", "何首烏", "當歸", "川芎", "黑芝麻"],
    benefits: [
      "珍貴本草深入毛囊，補充生長所需營養",
      "強健髮根結構，減少日常斷髮掉髮",
      "促進頭皮微循環，喚活健康生長週期",
    ],
    tags: ["固髮", "滋養", "活化"],
  },
];

const conditions = [
  {
    id: "oily-scalp",
    title: "頭皮出油",
    brief: "洗完不到半天又油膩？草本配方幫你重設油脂節律。",
    icon: <Droplets className="w-5 h-5" />,
    tags: ["控油", "深層清潔", "頭皮養護"],
    disclaimer: undefined as string | undefined,
  },
  {
    id: "dandruff",
    title: "頭皮屑困擾",
    brief: "無論油性或乾性頭皮屑，天然中藥配方給予溫和深層養護。",
    icon: <Snowflake className="w-5 h-5" />,
    tags: ["去屑", "換季保養", "草本養護"],
    disclaimer: "若持續嚴重，建議同時諮詢皮膚科醫師。",
  },
  {
    id: "itchy-scalp",
    title: "頭皮敏感癢",
    brief: "植萃精華輕柔按摩，讓過度敏感的頭皮得到舒緩與放鬆。",
    icon: <ShieldAlert className="w-5 h-5" />,
    tags: ["舒緩", "敏感肌", "溫和養護"],
    disclaimer: undefined,
  },
  {
    id: "hair-loss",
    title: "掉髮稀疏",
    brief: "草本養護幫助頭皮維持舒適狀態，為健康毛囊環境奠基。",
    icon: <TrendingDown className="w-5 h-5" />,
    tags: ["強健髮根", "頭皮養護", "草本滋養"],
    disclaimer: "嚴重掉髮建議諮詢皮膚科或毛髮專科醫師。",
  },
  {
    id: "white-hair",
    title: "白髮增多",
    brief: "何首烏等傳統本草為核心，給頭皮溫和且持續的草本養護。",
    icon: <Palette className="w-5 h-5" />,
    tags: ["白髮養護", "何首烏", "草本調理"],
    disclaimer: undefined,
  },
  {
    id: "stress",
    title: "壓力・肩頸緊繃",
    brief: "草本頭療結合肩頸舒緩手技，讓忙碌的你從頭放鬆到頸。",
    icon: <Brain className="w-5 h-5" />,
    tags: ["舒壓", "肩頸放鬆", "頭療"],
    disclaimer: undefined,
  },
  {
    id: "dye-damage",
    title: "染燙後受損",
    brief: "天然植萃配方溫和不刺激，為受損髪質給予修復養護體驗。",
    icon: <Flame className="w-5 h-5" />,
    tags: ["染燙修護", "溫和配方", "敏感養護"],
    disclaimer: undefined,
  },
  {
    id: "postpartum",
    title: "產後落髮",
    brief: "輕柔手技配合草本配方，安心呵護產後媽媽的頭皮健康。",
    icon: <Leaf className="w-5 h-5" />,
    tags: ["產後護理", "溫和養護", "天然草本"],
    disclaimer: "產後落髮屬正常生理現象，若超過六個月建議諮詢專科。",
  },
];

const steps = [
  {
    number: "01",
    icon: <MessageCircle className="w-6 h-6 text-primary" />,
    title: "頭皮問題諮詢",
    description: "專業護理師深入了解您的頭皮狀況、生活習慣與護髮歷史，找出根本原因。",
  },
  {
    number: "02",
    icon: <FlaskConical className="w-6 h-6 text-primary" />,
    title: "草本配方調配",
    description: "依據諮詢結果，為您量身選配最適合的天然草本配方，確保安全有效。",
  },
  {
    number: "03",
    icon: <HandHeart className="w-6 h-6 text-primary" />,
    title: "深層護理療程",
    description: "運用草本精華進行深層頭皮護理，舒緩不適、強化毛囊、滋養髮絲。",
  },
  {
    number: "04",
    icon: <CalendarCheck className="w-6 h-6 text-primary" />,
    title: "定期追蹤調整",
    description: "持續追蹤頭皮改善進度，適時調整配方與療程，讓效果穩定長久。",
  },
];


const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://muxuantw.com" },
        { "@type": "ListItem", "position": 2, "name": "服務介紹", "item": "https://muxuantw.com/services" },
      ],
    },
    {
      "@type": "Service",
      "name": "草本頭皮護理療程",
      "provider": { "@id": "https://muxuantw.com/#organization" },
      "url": "https://muxuantw.com/services",
      "description": "沐璿草本護髮提供兩大草本配方：深層頭皮淨化配方（針對頭皮屑、油脂過剩）與髮根強健滋養配方（針對落髮、稀疏髮質），採用人蔘、何首烏、當歸等中醫草本成分。",
      "areaServed": [{ "@type": "Country", "name": "Taiwan" }, { "@type": "Country", "name": "Singapore" }],
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": 800,
          "maxPrice": 1550,
          "priceCurrency": "TWD",
          "description": "依頭髮長度與密度而定，特長另計"
        }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "草本護髮療程",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "深層頭皮淨化配方",
              "description": "針對頭皮屑、油脂過剩與毛囊堵塞問題，使用珍貴草本精華溫和去除老廢角質，平衡頭皮油脂分泌。"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "髮根強健滋養配方",
              "description": "專為落髮、稀疏髮質設計，富含人參、何首烏等滋養成分，深入毛囊提供營養，強健髮根。"
            }
          }
        ]
      }
    },
  ],
};

export default function ServicesPage() {
  const { openLineModal } = useLineModal();
  const [location] = useLocation();
  const [activeFormula, setActiveFormula] = useState(0);
  const [activeCondition, setActiveCondition] = useState<string | null>(null);

  useSeo({
    title: "草本護髮服務介紹 | 沐璿草本護髮中心",
    description: "沐璿草本護髮中心以天然草本配方針對頭皮屑、落髮、白髮等問題，提供深層淨化與髮根強健兩種療程。首次護理約1.5小時，無化學刺激成分。",
    canonical: "https://muxuantw.com/services",
    ogTitle: "草本護髮服務介紹 | 沐璿草本護髮中心",
    jsonLd: servicesJsonLd,
    jsonLdId: "services-jsonld",
  });

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  const selectedCondition = conditions.find((c) => c.id === activeCondition);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* ── Page Hero ──────────────────────────────────────────────── */}
      <section className="pt-40 pb-16 relative overflow-hidden bg-background">
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
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.10),transparent_55%)]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav aria-label="頁面路徑" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">首頁</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">服務介紹</span>
            </nav>

            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              獨家技術
            </Badge>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              沐璿草本護髮服務
            </h1>

            <p className="text-muted-foreground text-lg max-w-xl">
              結合傳統草本智慧與現代萃取技術，為不同頭皮問題量身打造天然解方。
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 成分安全認證 ─────────────────────────────────────────────── */}
      {/* ── 兩大草本配方 ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              兩大草本配方
            </h2>
            <p className="text-muted-foreground">
              依頭皮類型精準對應，溫和有效，長期安全使用。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left — tab + detail panel */}
            <div className="space-y-4">
              {/* Formula tabs */}
              <div className="flex gap-3">
                {formulas.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFormula(i)}
                    className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                      activeFormula === i
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <span className={activeFormula === i ? "text-white" : "text-primary"}>
                      {f.icon}
                    </span>
                    <span className="leading-tight text-left">{f.title}</span>
                  </button>
                ))}
              </div>

              {/* Active formula detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFormula}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-border/40 shadow-lg overflow-hidden"
                >
                  {/* Header strip */}
                  <div className="px-6 pt-6 pb-4 border-b border-border/20">
                    <p className="text-sm text-muted-foreground mb-1">{formulas[activeFormula].subtitle}</p>
                    <h3 className="text-xl font-bold text-foreground">{formulas[activeFormula].title}</h3>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Key ingredients */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        核心草本成分
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formulas[activeFormula].ingredients.map((ing) => (
                          <span
                            key={ing}
                            className="px-3 py-1 rounded-full bg-secondary text-sm font-medium text-foreground border border-border/30"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        主要功效
                      </p>
                      <ul className="space-y-2.5">
                        {formulas[activeFormula].benefits.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-primary" />
                            </span>
                            <span className="text-sm text-foreground leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 pt-1">
                      {formulas[activeFormula].tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Certifications */}
              <div className="flex gap-6 px-1 pt-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  SGS 安全認證
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                  <Sparkles className="w-4 h-4 text-primary" />
                  無化學添加物
                </div>
              </div>

              {/* ── Inline lab-cert mini previews ── */}
              <InlineCerts />
            </div>

            {/* Right — ingredient image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square">
                <PictureImage
                  src={ingredientsImgPng}
                  alt="沐璿草本護髮 — 人參、當歸等傳統中藥草本食材"
                  width={1024}
                  height={1024}
                  srcSetEntries={ingredientsSrcSet}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  containerClassName="absolute inset-0 w-full h-full"
                  style={{ aspectRatio: "unset" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-serif text-xl italic opacity-90">"源自大自然的治癒力量"</p>
                </div>
              </div>
              <div className="absolute -inset-4 border-2 border-primary/15 rounded-[2rem] -z-10 translate-x-4 translate-y-4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 頭皮困擾對照 — symptom selector ─────────────────────────── */}
      <section className="pt-5 pb-20 md:pt-7 md:pb-28 bg-stone-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              頭皮困擾對照
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              你也有這些頭皮困擾嗎？
            </h2>
            <p className="text-muted-foreground">
              點選困擾，了解沐璿如何以天然草本配方給予對應養護。
            </p>
          </motion.div>

          {/* Symptom grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-6">
            {conditions.map((c, i) => (
              <motion.button
                key={c.id}
                id={c.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setActiveCondition(activeCondition === c.id ? null : c.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-sm font-medium transition-all duration-200 ${
                  activeCondition === c.id
                    ? "bg-primary text-white border-primary shadow-md scale-[1.03]"
                    : "bg-white border-border/50 text-foreground hover:border-primary/40 hover:shadow-sm"
                }`}
              >
                <span className={activeCondition === c.id ? "text-white" : "text-primary"}>
                  {c.icon}
                </span>
                <span className="leading-tight text-center">{c.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence>
            {selectedCondition && (
              <motion.div
                key={selectedCondition.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden max-w-3xl mx-auto"
              >
                <div className="bg-white rounded-2xl border border-border/40 shadow-lg p-6 mt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      {selectedCondition.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground mb-1">{selectedCondition.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{selectedCondition.brief}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCondition.tags.map((tag) => (
                          <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-secondary text-foreground rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {selectedCondition.disclaimer && (
                        <p className="text-xs text-muted-foreground/70 mt-3 pt-3 border-t border-border/30 italic">
                          ＊ {selectedCondition.disclaimer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!activeCondition && (
            <p className="text-center text-sm text-muted-foreground mt-4">↑ 點選任一困擾查看詳情</p>
          )}
        </div>
      </section>

      {/* ── 服務流程 ──────────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              服務流程
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              四步驟完整護髮體驗
            </h2>
            <p className="text-muted-foreground">
              從諮詢到追蹤，每個環節都由專業護理師全程陪伴。
            </p>
          </motion.div>

          {/* Steps — alternating layout on md+ */}
          <div className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary/15 -translate-x-px" />

            <div className="space-y-10">
              {steps.map((step, i) => {
                const isRight = i % 2 === 0;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: isRight ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative flex items-start gap-6 md:gap-0"
                  >
                    {/* Dot on line */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm top-3" />

                    {/* Card — always left-offset on mobile, alternating on desktop */}
                    <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isRight ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"} w-full`}>
                      <div className="bg-white rounded-2xl border border-border/40 shadow-sm hover:shadow-md transition-shadow p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                            {step.icon}
                          </div>
                          <span className="text-xs font-bold text-primary/50 tracking-widest">{step.number}</span>
                        </div>
                        <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── First-timer promo card ───────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Leaf className="text-primary" size={32} />
            </div>
            <Badge variant="outline" className="mb-3 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              新客限定
            </Badge>
            <h2 className="font-serif text-2xl font-bold text-primary mb-1">
              首次體驗・草本護髮
            </h2>
            <p className="text-5xl font-bold text-primary mb-3">
              $700 <span className="text-2xl font-semibold">元</span>
            </p>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              專為初次到訪的您設計，體驗沐璿草本護髮的溫柔呵護
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold text-base h-12 px-10"
              onClick={openLineModal}
            >
              立即預約體驗
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
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
              準備好體驗草本護髮？
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              立即預約，讓專業護理師為您量身打造最適合的頭皮護理方案。
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

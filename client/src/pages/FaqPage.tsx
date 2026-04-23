import { useEffect } from "react";
import { useSeo } from "@/hooks/use-seo";
import { Link } from "wouter";
import { useLineModal } from "@/components/LineModal";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { PictureImage } from "@/components/ui/picture-image";

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

const faqs = [
  {
    question: "Q1：草本護髮真的有效嗎？",
    answer: "我們自 2012 年以來，已協助數百位客戶改善頭皮屑、掉髮、白髮、油脂失衡與敏感不適等狀況。\n天然草本植物富含多種活性營養素，能溫和調理頭皮環境、強化毛囊健康。草本護理著重「循序修復、深層養護」，雖然見效較為自然、漸進，但效果穩定且持久。",
  },
  {
    question: "Q2：草本護髮能幫助生髮嗎？",
    answer: "草本醫學研究與臨床經驗均指出：天然草本成分能促進頭皮微循環、減緩過度落髮、活化毛囊生長力。\n若持續調理，可有效改善長期掉髮問題，並提升整體頭皮健康度，是安全且可長期維持的生髮輔助方式。",
  },
  {
    question: "Q3：草本護髮與化學染劑有何不同？",
    answer: "沐璿草本護髮 不含 PPD、不含 PTD，沒有刺激性氣味，也不會破壞頭髮鱗片或引發頭皮敏感。\n在上色的同時，草本成分能滋養頭皮、強化髮絲，使顏色自然柔和、服貼持久。這也是許多敏弱肌與長期染髮者選擇草本護髮的主要原因。",
  },
  {
    question: "Q4：多久需要做一次護理？",
    answer: "依個人頭皮狀況而定：\n\n特殊狀況（如嚴重油脂、落髮、敏感）：建議每週調理一次。\n一般保養：每月一次即可。\n\n初期可採密集調理，加速穩定頭皮；當狀況改善後，可逐步延長保養週期。",
  },
  {
    question: "Q5：一次護理的價格多少？",
    answer: "我們會依您的頭皮狀況與頭髮長度，提供客製化的專屬課程建議。\n一次護理的價格根據頭髮長度與密度而定，範圍為 $800 - $1550，特長另計，將由專業頭皮護理師於現場為您評估並報價。",
  },
  {
    question: "Q6：一次頭皮護理需要多久？",
    answer: "首次護理：約 1.5 小時\n第二次加強護理：約 1 小時\n\n時間包括頭皮檢測、草本調理、護理程序與專業諮詢，確保每位客戶都能獲得最完整的護理體驗。",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://muxuantw.com" },
        { "@type": "ListItem", "position": 2, "name": "常見問題", "item": "https://muxuantw.com/faq" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://muxuantw.com/faq",
      "url": "https://muxuantw.com/faq",
      "inLanguage": "zh-TW",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question.replace(/^Q\d+：/, ""),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer.replace(/\n+/g, " ").trim(),
        },
      })),
    },
  ],
};

export default function FaqPage() {
  const { openLineModal } = useLineModal();
  useSeo({
    title: "草本護髮常見問題 | 沐璿草本護髮中心",
    description: "關於沐璿草本護髮的常見問題：療程是否有效、能否改善落髮、草本與化學染髮的差異，以及費用與護理頻率說明。",
    canonical: "https://muxuantw.com/faq",
    ogTitle: "草本護髮常見問題 | 沐璿草本護髮中心",
    jsonLd: faqJsonLd,
    jsonLdId: "faq-jsonld",
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
              <span className="text-foreground font-medium" aria-current="page">常見問題</span>
            </nav>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              常見問與答
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              草本護髮常見問題
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              為您解答關於沐璿草本護髮的常見疑問，讓您預約前充分了解療程。
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors py-6">
                    <span className="text-lg font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
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
              還有其他問題？
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              歡迎透過 LINE 或電話直接聯絡我們，專業護理師為您解答。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold text-lg h-12 px-10"
                onClick={openLineModal}
              >
                LINE 諮詢
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg h-12 px-10"
              >
                <Link href="/contact" title="前往聯絡我們頁面">
                  聯絡我們
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

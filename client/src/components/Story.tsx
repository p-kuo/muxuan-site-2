import { motion } from "framer-motion";
import { PictureImage } from "@/components/ui/picture-image";

import storyImgPng from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs.png";
import story320w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-320w.webp";
import story640w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-640w.webp";
import story1024w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-1024w.webp";
import story320wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-320w.avif";
import story640wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-640w.avif";
import story1024wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-1024w.avif";

const storySrcSet = [
  { width: 320, webpSrc: story320w, avifSrc: story320wAvif },
  { width: 640, webpSrc: story640w, avifSrc: story640wAvif },
  { width: 1024, webpSrc: story1024w, avifSrc: story1024wAvif },
];

export default function Story() {
  return (
    <section id="story" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 relative inline-block">
            關於沐璿
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full left-1/2 -translate-x-1/2"></span>
          </h2>
        </div>

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
              <div className="absolute -bottom-6 -right-6 bg-background p-6 rounded-xl shadow-xl max-w-xs border border-border hidden md:block">
                <p className="font-serif text-lg italic text-primary">
                  "真正好的產品，應該讓更多人受惠。"
                </p>
                <p className="text-right mt-2 text-sm font-bold text-muted-foreground">—— 葉玉女 創始人</p>
              </div>
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
            <div className="text-muted-foreground space-y-5 leading-loose text-[15px] font-sans">
              <p>
                創辦人葉玉女，在新加坡生活的20年間，與草本文化結下了一段深厚的緣分，也開啟了她對「天然染白髮」的探索之路。在步入中年後，白髮開始悄悄出現。她和許多女性一樣，開始面臨「染白髮」的需求。因她長期深受脂漏性皮膚炎影響，頭皮屑、頭皮癢反覆出現，始終不願意選擇化學染劑染髮。
              </p>
              <p>
                她開始思考：「難道想要遮蓋白髮，就一定要犧牲頭皮健康嗎？」在新加坡生活期間，她接觸到天然草本染髮文化，發現原來染白髮，也可以有更溫和、更安心的選擇。透過天然草本植物，不僅能自然覆蓋白髮，同時也能兼顧頭皮的保養。這樣的理念，讓她決定投入更多時間與心力，尋找真正適合自己的染髪方式。
              </p>
              <p>
                她投入一年多時間，專注研究天然草本配方，反覆測試、調整比例，只為找到一種能穩定覆蓋白髮，又能溫和呵護頭皮的方式。最終，她成功研發出一套以「天然染白髮」為核心的草本配方。這套配方不僅幫助改善母親、自己、女兒三代人困擾多年的頭皮屑、頭皮癢問題，也讓頭皮逐漸回到健康狀態。這段親身驗證的改善歷程，所經歷的不只是產品的誕生，更是一個被實踐證明可行的答案。
              </p>
              <p className="font-medium text-foreground/70">
                對大多數客人而言，來到沐璿，初衷都是為了「染白髮」。但經過護理後，才發現原來染髮，也可以是一種保養。隨著新加坡市場逐漸穩定，創辦人葉玉女決定將這份結合「天然染白髮」與「頭皮護理」的成果帶回台灣，創立沐璿草本，讓更多人不必在美麗與健康之間做選擇。沐璿草本始終相信，真正好的染髮，不只是遮蓋白髮，而是讓人在每一次整理自己時，都能感受到安心與被溫柔照顧。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

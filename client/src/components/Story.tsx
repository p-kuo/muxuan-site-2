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
                隨著年齡增加，毛囊的黑色素會自然老化，開始長出白頭髮。我們服務的客人，多數都有白髮染髮的需求。這些客人因為白髮長出來，需要定期、長期染髮，因此希望尋找一種以天然草本為核心、自己覺得可以安心長期使用的染髮方式。
              </p>
              <blockquote className="border-l-4 border-primary/40 pl-5 py-1 my-6">
                <p className="font-serif text-lg font-bold text-foreground/80 italic leading-snug">
                  「來自新加坡的天然植物染，如果需要長期染白髮，是不是可以有一種以天然草本為核心的染髮選擇，讓客人在追求髮色的同時，也多一份安心感？」
                </p>
              </blockquote>

              <p>
                在多年的實務經驗中，我持續研究天然草本植物染髮方式，並搭配一些傳統使用的草本材料，例如當歸、人參、何首烏等，希望為需要長期染髮的客人，多提供一個天然草本的選擇。在這 15 年的服務過程中，我觀察到有一些長期做天然植物染的客人，經過多年之後，白髮增加的速度似乎沒有我原本想像中那麼快。
              </p>
              <p>
                沐璿的核心服務是「天然草本染髮」，同時兼顧客人在染髮過程中的頭皮照顧與舒適感。部分客人在選擇天然植物染之前，也會有頭皮屑、頭皮出油、頭皮癢等困擾，因此沐璿也會從頭皮護理的角度提供照顧。因為白髮染髮往往不是一次性的需求，而是需要長期持續進行，這也是我持續投入天然植物染研究與研發的重要原因。
              </p>
              <p className="font-medium text-foreground/70">
                看到一些長期跟著沐璿做天然植物染的客人，能夠持續回來，也讓我更加珍惜自己一路研究與累積下來的經驗。每一位客人的頭髮，都有自己的狀態；每一次染髮，也都需要被認真對待。沐璿提供的不只是一次染髮服務，而是一種可以陪伴客人長期走下去的天然草本染髮選擇。我在意的，不只是最後染出來的顏色，而是希望從染髮到頭皮照顧的整個過程，都能讓客人感受到我們的用心。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

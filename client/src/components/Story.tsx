import { motion } from "framer-motion";
import { LazyImage } from "@/components/ui/lazy-image";
import storyImg from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs.png";

export default function Story() {
  return (
    <section id="story" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 relative inline-block">
            品牌故事
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full left-1/2 -translate-x-1/2"></span>
          </h2>
          <h3 className="text-xl text-primary font-medium">
            源自對「真正安全、天然、有效」護髮方式的追求
          </h3>
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
                <LazyImage 
                  src={storyImg} 
                  alt="Brand Journey" 
                  className="w-full h-full object-cover"
                  width={1024}
                  height={1024}
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
  );
}

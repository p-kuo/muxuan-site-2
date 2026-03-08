import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LazyImage } from "@/components/ui/lazy-image";
import hairLossImg from "@assets/generated_images/asian_woman_looking_in_mirror_concerned_about_hair_volume.webp";
import postpartumImg from "@assets/generated_images/gentle_asian_mother_holding_newborn_baby.webp";
import damagedHairImg from "@assets/generated_images/close_up_texture_of_dry_brittle_hair_ends.webp";
import sensitiveScalpImg from "@assets/generated_images/calm_mid-age_chinese_man_with_closed-mouth_smile_and_brown_towels_under_steamer_in_herbal_salon.webp";
import grayHairImg from "@assets/generated_images/asian_woman_showing_half_gray_white_hair_and_half_natural_dark_brown-black_hair.webp";
import chemicalSensitiveImg from "@assets/generated_images/asian_woman_showing_visible_scalp_redness_and_irritation_from_chemical_dye_sensitivity.webp";

const audiences = [
  {
    title: "有白髮困擾",
    description: "遮蓋白髮",
    image: grayHairImg,
    width: 512,
    height: 358,
    alt: "沐璿草本護髮中心 — 白髮遮蓋草本染髮，天然植物配方安全覆蓋白髮"
  },
  {
    title: "對化學染敏感",
    description: "化學染後頭皮會癢、腫",
    image: chemicalSensitiveImg,
    width: 512,
    height: 358,
    alt: "沐璿草本護髮中心 — 化學染髮敏感頭皮紅腫，適合改用天然草本護髮"
  },
  {
    title: "敏感頭皮",
    description: "有頭皮屑、油脂旺盛、敏感、紅癢者",
    image: sensitiveScalpImg,
    width: 512,
    height: 512,
    alt: "沐璿草本護髮中心 — 敏感頭皮草本蒸氣護理，舒緩頭皮屑與油脂問題"
  },
  {
    title: "落髮困擾",
    description: "面臨落髮、髮量變薄的男性與女性",
    image: hairLossImg,
    width: 512,
    height: 512,
    alt: "沐璿草本護髮中心 — 落髮稀疏髮量草本養護，強健髮根促進生長"
  },
  {
    title: "產後修復",
    description: "產後落髮的女性，需要溫和調理",
    image: postpartumImg,
    width: 512,
    height: 512,
    alt: "沐璿草本護髮中心 — 產後落髮溫和草本修復，安全天然適合哺乳期媽媽"
  },
  {
    title: "受損髮質",
    description: "因染燙受損、乾燥、脆弱髮質者",
    image: damagedHairImg,
    width: 512,
    height: 512,
    alt: "沐璿草本護髮中心 — 染燙受損乾燥髮質草本滋養修復護理"
  }
];

export default function Audience() {
  return (
    <section id="audience" className="py-24 bg-secondary/30" aria-labelledby="audience-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 id="audience-heading" className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            誰適合草本護髮？
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            無論是日常保養或是特定頭皮問題，天然草本都能給予最溫和的呵護。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {audiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <article>
                <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden group">
                  <div className="flex h-full">
                    <div
                      className="w-1/3 relative overflow-hidden"
                      style={{ aspectRatio: `${item.width} / ${item.height}` }}
                    >
                      <LazyImage 
                        src={item.image} 
                        alt={item.alt} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={item.width}
                        height={item.height}
                      />
                    </div>
                    
                    <div className="w-2/3 p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

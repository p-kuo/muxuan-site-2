import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/ui/lazy-image";
import { Leaf, Droplets, ShieldCheck, Sparkles } from "lucide-react";
import ingredientsImg from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates.png";

const features = [
  {
    title: "深層頭皮淨化配方",
    description: "針對頭皮屑、油脂過剩與毛囊堵塞問題。使用珍貴草本精華，溫和去除老廢角質，平衡頭皮油脂分泌，讓頭皮重新呼吸。",
    icon: <Droplets className="w-6 h-6 text-primary" />,
    tags: ["控油", "去屑", "潔淨"]
  },
  {
    title: "髮根強健滋養配方",
    description: "專為落髮、稀疏髮質設計。富含人參、何首烏等滋養成分，深入毛囊提供營養，強健髮根，促進健康生長循環。",
    icon: <Leaf className="w-6 h-6 text-primary" />,
    tags: ["固髮", "滋養", "活化"]
  }
];

export default function Features() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
            獨家技術
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            沐璿兩大草本配方
          </h2>
          <p className="text-muted-foreground text-lg">
            結合傳統草本智慧與現代萃取技術，為不同頭皮問題量身打造的天然解方。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="border-none shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {feature.tags.map(tag => (
                            <span key={tag} className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground rounded-md">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-foreground/80 font-medium">
                <ShieldCheck className="text-primary w-5 h-5" />
                <span>SGS 安全認證</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/80 font-medium">
                <Sparkles className="text-primary w-5 h-5" />
                <span>無化學添加</span>
              </div>
            </div>
          </div>

          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
              <LazyImage 
                src={ingredientsImg} 
                alt="Natural Ingredients" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                width={1024}
                height={1024}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-serif text-2xl italic">"源自大自然的治癒力量"</p>
              </div>
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-4 border-2 border-primary/20 rounded-[2rem] -z-10 translate-x-4 translate-y-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

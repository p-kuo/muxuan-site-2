import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import heroBg from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere.png";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-background z-10" />
        <img 
          src={heroBg} 
          alt="Herbal Spa Background" 
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6 text-center">
        <div className="bg-black/30 backdrop-blur-[2px] rounded-3xl p-6 md:bg-transparent md:backdrop-blur-none md:p-0 md:rounded-none border border-white/10 md:border-none mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 text-primary mb-6"
          >
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wider">天然・安全・有效</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-md"
          >
            尋找安全又有效的
            <br className="hidden md:block" />
            <span className="text-white">天然護髮？</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-4 md:mb-10 font-light leading-relaxed shadow-black/20 drop-shadow-sm"
          >
            在沐璿，我們提供「安全、天然、有效」的草本護髮方案，<br/>
            從根本改善頭皮問題，恢復髮絲健康與活力。
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white border-none text-lg h-12 px-8"
            onClick={() => scrollTo("contact")}
          >
            預約體驗
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto bg-white/80 hover:bg-white text-primary border-white/90 backdrop-blur-md text-lg h-12 px-8 font-medium shadow-lg shadow-white/20"
            onClick={() => scrollTo("services")}
          >
            了解草本護髮
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

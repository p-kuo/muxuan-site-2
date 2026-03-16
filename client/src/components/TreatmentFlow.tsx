import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Wind } from "lucide-react";

const treatmentSteps = [
  {
    number: "第一道",
    icon: <FlaskConical className="w-8 h-8 text-primary" />,
    title: "草本精華液頭皮按摩",
    description:
      "以薑、酒、中藥所提煉的精華液按摩頭皮，讓草本成分與頭皮充分接觸，同時舒緩頭部與肩頸的緊繃感。",
  },
  {
    number: "第二道",
    icon: <Wind className="w-8 h-8 text-primary" />,
    title: "草本泥蒸氣敷護",
    description:
      "將草本泥覆蓋整個頭皮，再以蒸氣輔助草本養護，讓頭皮在溫和的草本環境中充分放鬆，完整享受古法草本頭療體驗。",
  },
];

export default function TreatmentFlow() {
  return (
    <section className="py-20 md:py-32 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
            療程步驟
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            草本頭療療程流程
          </h2>
          <p className="text-muted-foreground text-lg">
            兩道古法草本工序，給頭皮最溫和而專業的養護體驗。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-primary/20 z-0" />

          {treatmentSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-primary tracking-widest">{step.number}</span>
                    <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-justify">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

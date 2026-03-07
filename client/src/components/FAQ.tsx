import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Q1：草本護髮真的有效嗎？",
    answer: "我們自 2012 年以來，已協助無數客戶改善頭皮屑、掉髮、白髮、油脂失衡與敏感不適等狀況。\n天然草本植物富含多種活性營養素，能溫和調理頭皮環境、強化毛囊健康。草本護理著重「循序修復、深層養護」，雖然見效較為自然、漸進，但效果穩定且持久。"
  },
  {
    question: "Q2：草本護髮能幫助生髮嗎？",
    answer: "草本醫學研究與臨床經驗均指出：天然草本成分能促進頭皮微循環、減緩過度落髮、活化毛囊生長力。\n若持續調理，可有效改善長期掉髮問題，並提升整體頭皮健康度，是安全且可長期維持的生髮輔助方式。"
  },
  {
    question: "Q3：草本護髮與化學染劑有何不同？",
    answer: "沐璿草本護髮 不含 PPD、不含 PTD，沒有刺激性氣味，也不會破壞頭髮鱗片或引發頭皮敏感。\n在上色的同時，草本成分能滋養頭皮、強化髮絲，使顏色自然柔和、服貼持久。這也是許多敏弱肌與長期染髮者選擇草本護髮的主要原因。"
  },
  {
    question: "Q4：多久需要做一次護理？",
    answer: "依個人頭皮狀況而定：\n\n特殊狀況（如嚴重油脂、落髮、敏感）：建議每週調理一次。\n一般保養：每月一次即可。\n\n初期可採密集調理，加速穩定頭皮；當狀況改善後，可逐步延長保養週期。"
  },
  {
    question: "Q5：一次護理的價格多少？",
    answer: "我們會依您的頭皮狀況與頭髮長度，提供客製化的專屬課程建議。\n一次護理的價格根據頭髮長度與密度而定，範圍為 $800 - $1550，特長另計，將由專業頭皮護理師於現場為您評估並報價。"
  },
  {
    question: "Q6：一次頭皮護理需要多久？",
    answer: "首次護理：約 1.5 小時\n第二次加強護理：約 1 小時\n\n時間包括頭皮檢測、草本調理、護理程序與專業諮詢，確保每位客戶都能獲得最完整的護理體驗。"
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            常見問與答 (FAQs)
          </h2>
          <p className="text-muted-foreground text-lg">
            為您解答關於草本護髮的疑問
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

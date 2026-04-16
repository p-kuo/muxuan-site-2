import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock, CalendarX, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const locations = [
  {
    city: "台北店",
    address: "台北市忠孝東路一段108號",
    phone: "02-23967893",
    hours: "早上8:30 - 下午3:30",
    closed: "星期日、星期一",
    directions: [
      "華山市場2樓",
      "阜杭豆漿對面"
    ],
    mapUrl: "https://maps.app.goo.gl/kiGMjQ2J4wPozSEHA"
  },
  {
    city: "台北林森店",
    address: "台北市林森北路5巷10號",
    phone: "",
    hours: "早上10:00 - 下午6:00（最後預約）",
    closed: "星期日",
    directions: ["善導寺捷運站1號、3號、6號出口"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=台北市林森北路5巷10號"
  },
  {
    city: "嘉義店",
    address: "嘉義市吳鳳南路15-1號",
    phone: "05-2222166",
    hours: "早上9:00 - 下午6:00",
    closed: "星期日、星期一",
    directions: [
      "垂楊路摩斯漢堡附近"
    ],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=嘉義市吳鳳南路15-1號"
  },
  {
    city: "嘉義縣府店",
    address: "嘉義縣祥和一路東段78號",
    phone: "05-3628586",
    hours: "早上9:00 - 下午6:00",
    closed: "星期日、星期一",
    directions: [],
    mapUrl: "https://www.google.com/maps/place/%E6%B2%90%E7%92%BF%E8%8D%89%E6%9C%AC%E8%AD%B7%E9%AB%AE%E4%B8%AD%E5%BF%83~%E5%98%89%E7%BE%A9%E7%B8%A3%E5%BA%9C%E5%BA%97/@23.4581828,119.0785232,9z/data=!4m10!1m2!2m1!1z5rKQ55K_6I2J5pys6K236auu5Lit5b-D!3m6!1s0x346e9a34b0ebf949:0xa407e3774983da79!8m2!3d23.4581828!4d120.2980056!15sChjmspDnkr_ojYnmnKzorbfpq67kuK3lv4MiA4gBAVofIh3mspAg55K_IOiNieacrCDorbcg6auuIOS4reW_g5IBDGJlYXV0eV9zYWxvbpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSSmNFb3RjblYzUlJBQuABAPoBBAgAEAw!16s%2Fg%2F11f313w21f?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    city: "新加坡店",
    address: "BLK 530 Bedok North Street 3, #01-646",
    phone: "+65 6538 9589",
    hours: "9:00am - 6:00pm",
    closed: "星期二",
    directions: [
      "從 勿洛轉運站 (Bedok Interchange)：搭乘 225G 或 225W，5 站後於 CC 下車。",
      "從 勿洛北地鐵站 (Bedok North MRT) B 出口：搭乘 137，3 站後於 CC 下車。"
    ],
    mapUrl: "https://maps.app.goo.gl/twR7wuCQXdkb6vDg7"
  }
];

export default function Locations() {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const handleHighlight = () => {
      setHighlight(true);
      setTimeout(() => setHighlight(false), 2500);
    };

    window.addEventListener('trigger-phone-highlight', handleHighlight);
    return () => window.removeEventListener('trigger-phone-highlight', handleHighlight);
  }, []);

  return (
    <section id="locations" className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            服務據點
          </h2>
          <p className="text-muted-foreground text-lg">
            歡迎蒞臨體驗最純淨的草本護髮
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {locations.map((loc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="h-full"
            >
              <Card className={`bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col ${highlight ? 'ring-2 ring-primary ring-offset-4' : ''}`}>
                <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-8 bg-primary rounded-full" />
                    <h3 className="text-2xl font-bold text-foreground">{loc.city}</h3>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    {/* Top fields */}
                    <div className="space-y-5">
                      {/* Address */}
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span className="text-foreground font-medium leading-relaxed">
                          {loc.address}
                        </span>
                      </div>

                      {/* Phone */}
                      {loc.phone && (
                        <div className={`flex items-center gap-3 text-muted-foreground transition-all duration-300 rounded-lg ${highlight ? 'bg-primary/10 scale-105 p-2 -ml-2' : ''}`}>
                          <Phone className={`w-5 h-5 shrink-0 ${highlight ? 'text-primary animate-bounce' : 'text-primary'}`} />
                          <span className={`font-medium tracking-wide ${highlight ? 'text-primary font-bold text-lg' : ''}`}>{loc.phone}</span>
                        </div>
                      )}

                      {/* Hours */}
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-5 h-5 text-primary shrink-0" />
                        <span className="whitespace-pre-line">{loc.hours}</span>
                      </div>

                      {/* Closed Days */}
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <CalendarX className="w-5 h-5 text-primary shrink-0" />
                        <span>公休：{loc.closed}</span>
                      </div>
                    </div>

                    {/* Directions Box — mt-auto keeps it aligned at the same height across cards */}
                    {loc.directions && loc.directions.length > 0 && (
                      <div className="mt-auto pt-4 text-sm bg-stone-50 p-4 rounded-lg border border-stone-100">
                        <div className="flex items-center gap-2 mb-3 text-stone-600 font-bold shrink-0">
                          <Navigation className="w-4 h-4" />
                          <p>交通指引：</p>
                        </div>
                        <div className="space-y-2 text-stone-500">
                          {loc.directions.map((line, i) => (
                            <p key={i} className="leading-snug pl-3 -indent-3 text-[13px]">• {line}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full mt-2 border-primary/20 text-primary hover:bg-primary/5 shrink-0"
                  >
                    <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer">
                      查看地圖
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

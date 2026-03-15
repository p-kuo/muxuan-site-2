import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, CalendarX, Navigation, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const locations = [
  {
    name: "沐璿草本護髮中心(台北店)",
    city: "台北店",
    streetAddress: "忠孝東路一段108號",
    addressLocality: "台北市",
    addressRegion: "台北市",
    addressCountry: "TW",
    phone: "02-23967893",
    hours: "早上9:00 - 下午6:00",
    closed: "星期日、星期一",
    openingHours: ["Tu-Sa 09:00-18:00"],
    directions: ["華山市場2樓", "阜杭豆漿對面"],
    mapUrl: "https://maps.app.goo.gl/kiGMjQ2J4wPozSEHA",
  },
  {
    name: "沐璿草本護髮中心(嘉義市店)",
    city: "嘉義市店",
    streetAddress: "吳鳳南路15-1號",
    addressLocality: "嘉義市",
    addressRegion: "嘉義市",
    addressCountry: "TW",
    phone: "05-2222166",
    hours: "早上9:00 - 下午6:00",
    closed: "星期日、星期一",
    openingHours: ["Tu-Sa 09:00-18:00"],
    directions: ["垂楊路摩斯漢堡附近"],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=嘉義市吳鳳南路15-1號",
  },
  {
    name: "沐璿草本護髮中心(嘉義縣府店)",
    city: "嘉義縣府店",
    streetAddress: "祥和一路東段78號",
    addressLocality: "嘉義縣",
    addressRegion: "嘉義縣",
    addressCountry: "TW",
    phone: "05-3628586",
    hours: "早上9:00 - 下午6:00",
    closed: "星期日、星期一",
    openingHours: ["Tu-Sa 09:00-18:00"],
    directions: [],
    mapUrl: "https://www.google.com/maps/place/%E6%B2%90%E7%92%BF%E8%8D%89%E6%9C%AC%E8%AD%B7%E9%AB%AE%E4%B8%AD%E5%BF%83~%E5%98%89%E7%BE%A9%E7%B8%A3%E5%BA%9C%E5%BA%97/@23.4581828,119.0785232,9z/data=!4m10!1m2!2m1!1z5rKQ55K_6I2J5pys6K236auu5Lit5b-D!3m6!1s0x346e9a34b0ebf949:0xa407e3774983da79!8m2!3d23.4581828!4d120.2980056!15sChjmspDnkr_ojYnmnKzorbfpq67kuK3lv4MiA4gBAVofIh3mspAg55K_IOiNieacrCDorbcg6auuIOS4reW_g5IBDGJlYXV0eV9zYWxvbpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSSmNFb3RjblYzUlJBQuABAPoBBAgAEAw!16s%2Fg%2F11f313w21f?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "沐璿草本護髮中心(新加坡店)",
    city: "新加坡店",
    streetAddress: "BLK 530 Bedok North Street 3, #01-646",
    addressLocality: "Bedok",
    addressRegion: "Singapore",
    addressCountry: "SG",
    phone: "+65 6538 9589",
    hours: "9:00am - 6:00pm",
    closed: "星期二",
    openingHours: ["Mo 09:00-18:00", "We-Su 09:00-18:00"],
    directions: [
      "從 勿洛轉運站 (Bedok Interchange)：搭乘 225G 或 225W，5 站後於 CC 下車。",
      "從 勿洛北地鐵站 (Bedok North MRT) B 出口：搭乘 137，3 站後於 CC 下車。",
    ],
    mapUrl: "https://maps.app.goo.gl/twR7wuCQXdkb6vDg7",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": locations.map((loc) => ({
    "@type": "BeautySalon",
    name: loc.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.streetAddress,
      addressLocality: loc.addressLocality,
      addressRegion: loc.addressRegion,
      addressCountry: loc.addressCountry,
    },
    telephone: loc.phone,
    openingHours: loc.openingHours,
    url: "https://muxuantw.com",
    hasMap: loc.mapUrl,
    image: "https://muxuantw.com/og-image.png",
    priceRange: "$$",
    currenciesAccepted: loc.addressCountry === "SG" ? "SGD" : "TWD",
    paymentAccepted: "Cash, Credit Card",
    description: "天然草本護髮中心，提供頭皮護理、草本染髮、落髮調理等服務。",
  })),
};

export default function LocationsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 });

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "locations-jsonld";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.getElementById("locations-jsonld")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/40 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">首頁</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">分店資訊</span>
            </div>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              全台及海外
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              全台及海外服務據點
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              歡迎蒞臨體驗最純淨的草本護髮，我們在台北、嘉義與新加坡等地恭候您的光臨。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Location Cards */}
      <section className="py-20 md:py-28 bg-stone-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {locations.map((loc, index) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-8 bg-primary rounded-full shrink-0" />
                      <div>
                        <h2 className="text-xl font-bold text-foreground leading-tight">
                          {loc.name}
                        </h2>
                      </div>
                    </div>

                    {/* Contact details — wrapped in <address> for semantic HTML + GEO */}
                    <address className="not-italic space-y-4 flex-1">
                      {/* Address */}
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium leading-relaxed">
                          {loc.addressLocality}{loc.streetAddress}
                        </span>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary shrink-0" />
                        <a
                          href={`tel:${loc.phone.replace(/\s/g, "")}`}
                          className="font-medium tracking-wide text-foreground hover:text-primary transition-colors"
                        >
                          {loc.phone}
                        </a>
                      </div>

                      {/* Hours */}
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary shrink-0" />
                        <time className="text-muted-foreground">{loc.hours}</time>
                      </div>

                      {/* Closed days */}
                      <div className="flex items-center gap-3">
                        <CalendarX className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">公休：{loc.closed}</span>
                      </div>

                      {/* Directions */}
                      {loc.directions.length > 0 && (
                        <div className="text-sm bg-stone-50 p-4 rounded-lg border border-stone-100 mt-2">
                          <div className="flex items-center gap-2 mb-3 text-stone-600 font-bold">
                            <Navigation className="w-4 h-4" />
                            <p>交通指引：</p>
                          </div>
                          <div className="space-y-2 text-stone-500">
                            {loc.directions.map((line, i) => (
                              <p key={i} className="leading-snug pl-3 -indent-3 text-[13px]">
                                • {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </address>

                    {/* Map button */}
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
              預約最近的服務據點
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              致電或到店諮詢，讓我們的專業護理師為您量身設計草本護髮方案。
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg h-12 px-10"
            >
              <a href="https://lin.ee/NxoDqq0" target="_blank" rel="noopener noreferrer">
                立即預約
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

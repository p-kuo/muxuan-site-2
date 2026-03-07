import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "首頁", id: "home" },
  { name: "服務介紹", id: "services" },
  { name: "適合對象", id: "audience" },
  { name: "品牌故事", id: "story" },
  { name: "分店資訊", id: "locations" },
  { name: "常見問題", id: "faq" },
  { name: "聯絡我們", id: "contact" },
];

import logo from "@assets/Untitled_design__15_-removebg-preview_1764006141705.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-border/40 py-2 shadow-sm"
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div 
          className="cursor-pointer flex items-center gap-3"
          onClick={() => scrollToSection("home")}
        >
          <img src={logo} alt="沐璿草本" className="h-12 w-auto object-contain" width={500} height={500} />
          <span className="font-serif text-xl font-bold text-primary hidden sm:block">沐璿草本護髮中心</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                activeSection === item.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {item.name}
            </button>
          ))}
          <Button 
            variant="default" 
            size="sm" 
            className="ml-2 bg-primary hover:bg-primary/90 text-white"
            onClick={() => scrollToSection("contact")}
          >
            立即預約
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] pt-12">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      // Close sheet logic handled by UI component automatically if clicking outside, 
                      // but for links we might need a close handler if we had access to the state control.
                      // For now, simple scroll is fine.
                    }}
                    className="text-left text-lg font-medium py-2 border-b border-border/50 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                <Button 
                  className="mt-4 w-full bg-primary hover:bg-primary/90"
                  onClick={() => scrollToSection("contact")}
                >
                  立即預約
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const scrollNavItems = [
  { name: "服務對象", id: "audience", title: "了解沐璿草本護髮適合哪些服務對象" },
  { name: "常見問題", id: "faq",      title: "草本護髮常見問與答" },
  { name: "聯絡我們", id: "contact",  title: "聯絡沐璿草本護髮中心" },
];

const pageNavItems = [
  { name: "服務介紹", href: "/services",  title: "查看沐璿草本護髮服務介紹" },
  { name: "關於沐璿", href: "/about",     title: "關於沐璿草本護髮中心的品牌故事" },
  { name: "成功案例", href: "/cases",     title: "查看沐璿草本護髮成功調理案例" },
  { name: "分店資訊", href: "/locations", title: "查看沐璿草本護髮全台及海外分店資訊" },
];

import logo from "@assets/Untitled_design__15_-removebg-preview_1764006141705.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [location, navigate] = useLocation();

  const isSubPage = location !== "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isSubPage) return;
      for (const item of scrollNavItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(item.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSubPage]);

  const scrollToSection = (id: string) => {
    if (isSubPage) {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <nav
      aria-label="沐璿草本護髮中心主要導覽"
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b bg-white/70 backdrop-blur-md border-border/20",
        isScrolled ? "py-2 shadow-sm border-border/40" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

        {/* Brand logo — links to homepage */}
        <a
          href="/"
          title="沐璿草本護髮中心 — 回到首頁"
          className="flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            if (isSubPage) {
              navigate("/");
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <img
            src={logo}
            alt="沐璿草本護髮中心標誌"
            className="h-12 w-auto object-contain"
            width={500}
            height={500}
          />
          <span className="font-serif text-xl font-bold text-primary hidden sm:block">
            沐璿草本護髮中心
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <ul role="list" className="flex items-center gap-1 lg:gap-2 list-none m-0 p-0">

            {/* Scroll-to-section items */}
            {scrollNavItems.map((item) => (
              <li key={item.id}>
                <button
                  title={item.title}
                  aria-label={item.title}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    !isSubPage && activeSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {item.name}
                </button>
              </li>
            ))}

            {/* Page-link items with hover underline */}
            {pageNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={item.title}
                  aria-label={item.title}
                  aria-current={location === item.href ? "page" : undefined}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors relative inline-block",
                    "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:bg-primary",
                    "after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left",
                    location === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li>
              <Button
                variant="default"
                size="sm"
                title="立即預約沐璿草本護髮服務"
                aria-label="立即預約沐璿草本護髮服務"
                className="ml-2 bg-primary hover:bg-primary/90 text-white"
                onClick={() => scrollToSection("contact")}
              >
                立即預約
              </Button>
            </li>
          </ul>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="開啟導覽選單">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] pt-12">
              <nav aria-label="行動版導覽選單">
                <ul role="list" className="flex flex-col gap-4 list-none m-0 p-0">
                  {scrollNavItems.map((item) => (
                    <li key={item.id}>
                      <button
                        title={item.title}
                        onClick={() => scrollToSection(item.id)}
                        className="w-full text-left text-lg font-medium py-2 border-b border-border/50 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}

                  {pageNavItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        title={item.title}
                        aria-current={location === item.href ? "page" : undefined}
                        className={cn(
                          "block text-lg font-medium py-2 border-b border-border/50 transition-colors",
                          location === item.href ? "text-primary" : "hover:text-primary"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}

                  <li>
                    <Button
                      title="立即預約沐璿草本護髮服務"
                      className="mt-4 w-full bg-primary hover:bg-primary/90"
                      onClick={() => scrollToSection("contact")}
                    >
                      立即預約
                    </Button>
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}

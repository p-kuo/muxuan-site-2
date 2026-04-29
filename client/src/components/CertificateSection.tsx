/**
 * CertificateSection
 *
 * Displays two heavy-metal lab certificate cards on the Services page.
 * Each card looks like a physical document. Clicking it opens a modal
 * showing pages 1 and 2 of the certificate full-size.
 */
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, ShieldCheck, FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ── Certificate data ──────────────────────────────────────────────────────────

type CertId = "tiaoli" | "jinghua";

interface Cert {
  id: CertId;
  productName: string;
  reportNo: string;
  lab: string;
  date: string;
  thumb: string;
  pages: string[];
  altThumb: string;
  altP1: string;
  altP2: string;
}

const CERTS: Cert[] = [
  {
    id: "tiaoli",
    productName: "調理植物",
    reportNo: "M61-250900831",
    lab: "台美檢驗科技股份有限公司",
    date: "2025 年 9 月 22 日",
    thumb: "/assets/certs/cert-tiaoli-thumb.webp",
    pages: [
      "/assets/certs/cert-tiaoli-p1.webp",
      "/assets/certs/cert-tiaoli-p2.webp",
    ],
    altThumb: "調理植物草本配方重金屬檢驗報告封面縮圖 — 台美檢驗科技，報告日期2025年9月22日",
    altP1: "調理植物草本配方重金屬檢驗報告第一頁 — 砷鉛鎘汞均未檢出，台美檢驗科技股份有限公司",
    altP2: "調理植物草本配方重金屬檢驗報告第二頁 — 檢驗方法與備註，台美檢驗科技股份有限公司",
  },
  {
    id: "jinghua",
    productName: "淨化植物",
    reportNo: "M61-250900833",
    lab: "台美檢驗科技股份有限公司",
    date: "2025 年 9 月 22 日",
    thumb: "/assets/certs/cert-jinghua-thumb.webp",
    pages: [
      "/assets/certs/cert-jinghua-p1.webp",
      "/assets/certs/cert-jinghua-p2.webp",
    ],
    altThumb: "淨化植物草本配方重金屬檢驗報告封面縮圖 — 台美檢驗科技，報告日期2025年9月22日",
    altP1: "淨化植物草本配方重金屬檢驗報告第一頁 — 砷鉛鎘汞均未檢出，台美檢驗科技股份有限公司",
    altP2: "淨化植物草本配方重金屬檢驗報告第二頁 — 檢驗方法與備註，台美檢驗科技股份有限公司",
  },
];

// ── Modal ─────────────────────────────────────────────────────────────────────

function CertModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [handleKey]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.productName} 重金屬檢驗報告`}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-2xl border border-border/20 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm leading-tight">
                {cert.productName}・重金屬檢驗報告
              </p>
              <p className="text-xs text-muted-foreground">{cert.lab}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
            aria-label="關閉"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable pages */}
        <div className="overflow-y-auto flex-1 p-4 space-y-3 bg-muted/20">
          {cert.pages.map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-border/40 shadow-sm bg-white">
              <img
                src={src}
                alt={i === 0 ? cert.altP1 : cert.altP2}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border/50 bg-muted/30 shrink-0 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground leading-snug">
            報告由{cert.lab}出具・報告編號：{cert.reportNo}・{cert.date}
          </p>
          <a
            href={cert.pages[0]}
            download={`${cert.reportNo}-${cert.productName}-p1.webp`}
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            下載
          </a>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

// ── Certificate card ──────────────────────────────────────────────────────────

function CertCard({ cert, onOpen }: { cert: Cert; onOpen: () => void }) {
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ y: -4, rotate: 0.6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full text-left bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-border/40 overflow-hidden cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={`查看${cert.productName}重金屬檢驗報告`}
    >
      {/* Top accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

      <div className="p-5">
        {/* Lab seal row */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <FlaskConical className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground leading-tight">
            化妝品重金屬<br />檢驗報告
          </span>
        </div>

        {/* Product name */}
        <p className="font-serif font-bold text-foreground text-lg mb-1 leading-tight">
          {cert.productName}
        </p>
        <p className="text-xs text-muted-foreground mb-4">{cert.reportNo}</p>

        {/* Thumbnail */}
        <div className="relative rounded-lg overflow-hidden border border-border/30 mb-4 aspect-[3/4] bg-muted/20">
          <img
            src={cert.thumb}
            alt={cert.altThumb}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              查看完整報告
            </span>
          </div>
        </div>

        {/* Lab + date */}
        <p className="text-[11px] text-muted-foreground mb-1">{cert.lab}</p>
        <p className="text-[11px] text-muted-foreground mb-4">{cert.date}</p>

        {/* Result badge */}
        <div className="flex items-center gap-1.5 bg-primary/8 border border-primary/20 rounded-full px-3 py-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-xs font-semibold text-primary">砷・鉛・鎘・汞：未檢出</span>
        </div>
      </div>

      {/* CTA row */}
      <div className="px-5 pb-4">
        <span className="text-xs font-semibold text-primary group-hover:underline inline-flex items-center gap-1">
          查看完整報告 ↗
        </span>
      </div>
    </motion.button>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function CertificateSection() {
  const [open, setOpen] = useState<CertId | null>(null);
  const activeCert = CERTS.find((c) => c.id === open) ?? null;

  return (
    <>
      <section className="py-16 bg-[#f9f7f4]" aria-label="成分安全認證">
        <div className="container mx-auto px-4 md:px-6">
          {/* Heading */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-3 border-primary/30 text-primary bg-primary/5 px-3 py-1"
            >
              實驗室檢驗認證
            </Badge>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
              成分安全・經實驗室認證
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              沐璿草本配方通過台灣合格檢驗機構檢測，砷、鉛、鎘、汞四項重金屬均未檢出，安心有保障。
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <CertCard cert={cert} onOpen={() => setOpen(cert.id)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeCert && (
          <CertModal cert={activeCert} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

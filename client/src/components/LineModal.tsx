/**
 * LineModal — store-picker popup for LINE friend-add.
 *
 * Usage:
 *   1. Wrap your app with <LineModalProvider> (already done in App.tsx).
 *   2. Call openLineModal() from useLineModal() anywhere to open it.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

// ─── Context ────────────────────────────────────────────────────────────────

interface LineModalCtx {
  openLineModal: () => void;
}

const LineModalContext = createContext<LineModalCtx>({ openLineModal: () => {} });

export function useLineModal() {
  return useContext(LineModalContext);
}

// ─── Store tiles config ──────────────────────────────────────────────────────

const LINE_TILES = [
  {
    id: "chiayi",
    name: "沐璿嘉義",
    subtitle: "嘉義市店・嘉義縣府店",
    qrSrc: "/assets/line-qr-chiayi.png",
    url: "https://lin.ee/NxoDqq0",
  },
  {
    id: "taipei",
    name: "沐璿台北",
    subtitle: "華山店・林森店",
    qrSrc: "/assets/line-qr-taipei.png",
    url: "", // To be added later
  },
] as const;

// ─── QR placeholder SVG ─────────────────────────────────────────────────────

function QrPlaceholder() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-foreground/25"
      aria-hidden="true"
    >
      {/* Top-left finder */}
      <rect x="8" y="8" width="26" height="26" rx="3" fill="currentColor" />
      <rect x="13" y="13" width="16" height="16" rx="1" fill="white" />
      <rect x="17" y="17" width="8" height="8" fill="currentColor" />
      {/* Top-right finder */}
      <rect x="66" y="8" width="26" height="26" rx="3" fill="currentColor" />
      <rect x="71" y="13" width="16" height="16" rx="1" fill="white" />
      <rect x="75" y="17" width="8" height="8" fill="currentColor" />
      {/* Bottom-left finder */}
      <rect x="8" y="66" width="26" height="26" rx="3" fill="currentColor" />
      <rect x="13" y="71" width="16" height="16" rx="1" fill="white" />
      <rect x="17" y="75" width="8" height="8" fill="currentColor" />
      {/* Data dots */}
      <rect x="40" y="8"  width="5" height="5" fill="currentColor" />
      <rect x="49" y="8"  width="5" height="5" fill="currentColor" />
      <rect x="58" y="8"  width="5" height="5" fill="currentColor" />
      <rect x="40" y="17" width="5" height="5" fill="currentColor" />
      <rect x="54" y="17" width="5" height="5" fill="currentColor" />
      <rect x="8"  y="40" width="5" height="5" fill="currentColor" />
      <rect x="17" y="40" width="5" height="5" fill="currentColor" />
      <rect x="26" y="40" width="5" height="5" fill="currentColor" />
      <rect x="8"  y="49" width="5" height="5" fill="currentColor" />
      <rect x="22" y="49" width="5" height="5" fill="currentColor" />
      <rect x="40" y="40" width="5" height="5" fill="currentColor" />
      <rect x="49" y="40" width="5" height="5" fill="currentColor" />
      <rect x="58" y="40" width="5" height="5" fill="currentColor" />
      <rect x="67" y="40" width="5" height="5" fill="currentColor" />
      <rect x="80" y="40" width="5" height="5" fill="currentColor" />
      <rect x="40" y="49" width="5" height="5" fill="currentColor" />
      <rect x="54" y="49" width="5" height="5" fill="currentColor" />
      <rect x="71" y="49" width="5" height="5" fill="currentColor" />
      <rect x="40" y="58" width="5" height="5" fill="currentColor" />
      <rect x="49" y="58" width="5" height="5" fill="currentColor" />
      <rect x="63" y="58" width="5" height="5" fill="currentColor" />
      <rect x="80" y="58" width="5" height="5" fill="currentColor" />
      <rect x="40" y="67" width="5" height="5" fill="currentColor" />
      <rect x="54" y="67" width="5" height="5" fill="currentColor" />
      <rect x="76" y="67" width="5" height="5" fill="currentColor" />
      <rect x="40" y="80" width="5" height="5" fill="currentColor" />
      <rect x="49" y="80" width="5" height="5" fill="currentColor" />
      <rect x="58" y="80" width="5" height="5" fill="currentColor" />
      <rect x="76" y="80" width="5" height="5" fill="currentColor" />
    </svg>
  );
}

function QrImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <QrPlaceholder />;
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-full h-full object-contain"
    />
  );
}

// ─── LINE logo SVG ───────────────────────────────────────────────────────────

function LineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#00B900" />
      <path
        d="M39 22.3C39 15.5 32.3 10 24 10S9 15.5 9 22.3c0 6.1 5.4 11.2 12.7 12.2.5.1 1.2.3 1.3.8.2.4.1 1.1 0 1.5l-.2 1.3c-.1.4-.4 1.7 1.5.9s10-5.9 13.6-10.1c2.5-2.7 3.7-5.5 3.7-6.6h-.6z"
        fill="white"
      />
      <path d="M20.5 19.5H19v5h1.5v-5zM29 19.5h-1.5v2.8L25.3 19.5H24v5h1.5v-2.8l2.2 2.8H29v-5zM22.5 23v-3.5H21v5h3.5V23h-2z" fill="#00B900" />
    </svg>
  );
}

// ─── Modal content (rendered in a portal) ───────────────────────────────────

function LineModalContent({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="選擇門市加入 LINE"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-2xl border border-primary/10 w-full max-w-[520px] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors z-10"
          aria-label="關閉"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="pt-8 pb-5 px-6 text-center border-b border-border/50">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#00B900]/10 mb-3">
            <LineIcon className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-xl font-bold text-foreground">
            加入沐璿 LINE 好友
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            請選擇離您較近的門市帳號，加入官方 LINE
          </p>
        </div>

        {/* Tiles */}
        <div className="p-6">
          <div className="relative grid grid-cols-2 gap-6">
            {/* Vertical divider */}
            <div className="absolute left-1/2 top-2 bottom-2 -translate-x-1/2 w-px bg-border/60 pointer-events-none" />

            {LINE_TILES.map((tile) => (
              <div key={tile.id} className="flex flex-col items-center text-center">
                {/* QR frame */}
                <div className="w-36 h-36 border-2 border-primary/15 rounded-xl bg-muted/30 p-2 mb-3">
                  <QrImage src={tile.qrSrc} alt={`${tile.name} LINE QR碼`} />
                </div>

                <p className="font-bold text-foreground text-sm leading-tight">{tile.name}</p>
                <p className="text-xs text-muted-foreground mb-3 mt-0.5">{tile.subtitle}</p>

                {tile.url ? (
                  <a
                    href={tile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#00B900] hover:bg-[#00B900]/85 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                  >
                    掃我加好友
                  </a>
                ) : (
                  <span className="inline-flex items-center text-xs text-muted-foreground px-4 py-2 rounded-full border border-border bg-muted/50">
                    即將開放
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Singapore disclaimer */}
          <p className="text-center text-xs text-muted-foreground/70 italic mt-5">
            *For Singapore reservations, please contact the outlet directly
          </p>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function LineModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openLineModal = useCallback(() => setIsOpen(true), []);
  const closeLineModal = useCallback(() => setIsOpen(false), []);

  return (
    <LineModalContext.Provider value={{ openLineModal }}>
      {children}
      <AnimatePresence>
        {isOpen && <LineModalContent onClose={closeLineModal} />}
      </AnimatePresence>
    </LineModalContext.Provider>
  );
}

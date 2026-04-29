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
    qrSrc: "/assets/line-qr-chiayi.webp",
    url: "https://lin.ee/NxoDqq0",
  },
  {
    id: "taipei",
    name: "沐璿台北",
    qrSrc: "/assets/line-qr-taipei.webp",
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

// ─── Official LINE icon SVG ──────────────────────────────────────────────────
// Matches the LINE brand: green rounded-square + white speech-bubble

function LineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect width="100" height="100" rx="22" fill="#06C755" />
      {/* Speech bubble body */}
      <path
        d="M50 18C32.3 18 18 30.1 18 45c0 9.5 5.8 17.8 14.6 22.8-.4 1.5-2.5 9.3-2.8 10.5-.4 1.5.6 1.5 1.2 1.1 0.5-.3 12.9-8.5 18.1-11.9 1.6.2 3.2.3 4.9.3 17.7 0 32-12.1 32-27C82 30.1 67.7 18 50 18z"
        fill="white"
      />
      {/* L */}
      <path d="M34 37.5h3.5v11.5h6.5V52H34z" fill="#06C755" />
      {/* I */}
      <path d="M46.5 37.5H50V52h-3.5z" fill="#06C755" />
      {/* N */}
      <path d="M53 37.5h3.3l5.2 9V37.5H65V52h-3.2l-5.3-9V52H53z" fill="#06C755" />
      {/* E */}
      <path d="M68 37.5h9.5V41H71.5v3h5.5v3.2h-5.5v1.6h6V52H68z" fill="#06C755" />
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
          <img
            src="/assets/line logo.png"
            alt="LINE"
            className="w-12 h-12 object-contain mx-auto mb-3"
          />
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
                <div className="w-44 h-44 border border-border/30 rounded-2xl bg-white shadow-sm p-2.5 mb-3">
                  <QrImage src={tile.qrSrc} alt={`${tile.name} LINE QR碼`} />
                </div>

                <p className="font-bold text-foreground text-sm leading-tight mb-3">{tile.name}</p>

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

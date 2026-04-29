/**
 * AnnouncementBar — sitewide first-timer promo strip.
 *
 * Dismissable (×); re-appears after 1 day via localStorage timestamp.
 * Clicking "立即預約" opens the LINE store-picker modal.
 */
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLineModal } from "@/components/LineModal";

const STORAGE_KEY = "muxuan_bar_dismissed_at";
const HIDE_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day

function shouldShow(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    return Date.now() - Number(raw) > HIDE_DURATION_MS;
  } catch {
    return true;
  }
}

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const { openLineModal } = useLineModal();

  useEffect(() => {
    setVisible(shouldShow());
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  }

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="announcement-bar"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="bg-primary text-white py-2 px-4">
            <div className="container mx-auto flex items-center justify-center gap-3 relative">
              {/* Desktop copy */}
              <p className="hidden sm:block text-sm text-center leading-snug">
                🌿 新客首次體驗・草本護髮特惠{" "}
                <span className="font-bold text-base">$700 元</span>
              </p>

              {/* Mobile copy */}
              <p className="sm:hidden text-sm text-center leading-snug">
                🌿 首次體驗優惠{" "}
                <span className="font-bold">$700</span>
              </p>

              {/* Book now — opens LINE modal */}
              <button
                onClick={openLineModal}
                className="flex-shrink-0 text-sm font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                aria-label="立即預約首次體驗優惠"
              >
                <span className="hidden sm:inline">立即預約 ›</span>
                <span className="sm:hidden">預約 ›</span>
              </button>

              {/* Dismiss */}
              <button
                onClick={dismiss}
                className="absolute right-0 p-2 hover:opacity-70 transition-opacity"
                aria-label="關閉優惠公告"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

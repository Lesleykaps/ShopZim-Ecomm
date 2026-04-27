"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/lib/toast";
import { X, Check, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="fixed left-4 bottom-24 md:bottom-6 z-[60] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              "pointer-events-auto flex items-center gap-3 pl-3 pr-4 py-3 rounded-card shadow-card text-sm font-medium glass text-ink"
            )}
          >
            <span
              className={cn(
                "w-7 h-7 rounded-pill flex items-center justify-center shrink-0",
                t.variant === "success" && "bg-lime text-ink",
                t.variant === "info" && "bg-red-50 text-red-500",
                t.variant === "error" && "bg-red-500 text-white",
                (!t.variant || t.variant === "neutral") && "bg-page text-ink"
              )}
            >
              {t.variant === "success" ? (
                <Check size={14} strokeWidth={3} />
              ) : t.variant === "info" ? (
                <Heart size={14} className="fill-red-500" />
              ) : (
                <Check size={14} />
              )}
            </span>
            <span>{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="opacity-50 hover:opacity-100 ml-1"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

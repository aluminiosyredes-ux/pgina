import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    const tooltipTimer = setTimeout(() => setTooltip(false), 6000);
    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola, me comunico desde la web. Quisiera consultar sobre sus servicios."
  )}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center gap-2 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 shadow-2xl"
              >
                <span className="text-sm text-white font-medium whitespace-nowrap">
                  ¿Necesitás ayuda?
                </span>
                <button
                  onClick={() => setTooltip(false)}
                  className="text-zinc-500 hover:text-white transition-colors ml-1"
                  aria-label="Cerrar"
                >
                  <X size={12} />
                </button>
                {/* Arrow */}
                <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#111] border-r border-t border-white/10 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            onClick={() => setTooltip(false)}
            className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-300 group"
          >
            {/* Ping ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
            <MessageCircle size={26} className="text-white fill-white relative z-10" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

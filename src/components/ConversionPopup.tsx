import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Wrench, Calculator, Zap } from "lucide-react";
import { Link } from "wouter";
import { WHATSAPP_NUMBER } from "../config";
import { track } from "../lib/analytics";

const STORAGE_KEY = "ayr_popup_dismissed";
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

function shouldShow(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const ts = Number(raw);
    return Date.now() - ts > COOLDOWN_MS;
  } catch {
    return true;
  }
}

function dismiss() {
  try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
}

export default function ConversionPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!shouldShow()) return;
    const t = setTimeout(() => {
      setVisible(true);
      track("popup_shown");
    }, 10_000);
    return () => clearTimeout(t);
  }, []);

  function close() {
    dismiss();
    track("popup_dismissed");
    setVisible(false);
  }

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera cotizar un servicio.")}`;

  function handleCTA(action: string) {
    track("popup_cta", { action });
    close();
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/60"
            style={{ backdropFilter: "blur(6px)" }}
            onClick={close}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-5 pointer-events-none"
          >
            <div
              className="pointer-events-all relative w-full max-w-sm rounded-3xl overflow-hidden"
              style={{
                background: "rgba(10,10,12,0.96)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset",
              }}
            >
              {/* Top accent gradient */}
              <div
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.8) 30%, rgba(6,182,212,0.8) 70%, transparent 100%)" }}
              />

              {/* Ambient glow */}
              <div
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)", filter: "blur(20px)" }}
              />

              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all text-zinc-600 hover:text-white hover:bg-white/[0.08]"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <X size={12} />
              </button>

              <div className="relative px-7 pt-8 pb-7">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto"
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    border: "1px solid rgba(245,158,11,0.25)",
                    boxShadow: "0 0 30px rgba(245,158,11,0.1)",
                  }}
                >
                  <Zap size={24} className="text-amber-400" />
                </motion.div>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-center mb-2"
                >
                  <p className="text-[10px] font-black tracking-[0.2em] uppercase text-amber-400 mb-2">
                    ¿Podemos ayudarte?
                  </p>
                  <h2 className="text-xl font-black text-white leading-tight tracking-tight">
                    ¿Necesitas ayuda<br />para cotizar?
                  </h2>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28, duration: 0.4 }}
                  className="text-zinc-500 text-xs text-center leading-relaxed mb-6"
                >
                  Respondemos en minutos. Regiones de Arica, Iquique y Antofagasta.
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.4 }}
                  className="flex flex-col gap-2.5"
                >
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCTA("whatsapp")}
                    className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-white font-bold text-xs tracking-widest uppercase transition-all"
                    style={{
                      background: "linear-gradient(135deg, #25D366, #1fba58)",
                      boxShadow: "0 8px 24px rgba(37,211,102,0.25)",
                    }}
                  >
                    <MessageCircle size={14} />
                    WhatsApp directo
                  </a>

                  <Link
                    href="/asistencia"
                    onClick={() => handleCTA("asistencia")}
                    className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all text-zinc-300 hover:text-white"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Wrench size={14} className="text-cyan-400" />
                    Asistencia Técnica
                  </Link>

                  <Link
                    href="/redes"
                    onClick={close}
                    className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all text-zinc-300 hover:text-white"
                    style={{
                      background: "rgba(245,158,11,0.06)",
                      border: "1px solid rgba(245,158,11,0.15)",
                    }}
                  >
                    <Calculator size={14} className="text-amber-400" />
                    Cotización Rápida
                  </Link>
                </motion.div>

                {/* Dismiss link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className="text-center mt-4"
                >
                  <button
                    onClick={close}
                    className="text-[10px] text-zinc-700 hover:text-zinc-500 transition-colors tracking-widest uppercase"
                  >
                    No por ahora
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

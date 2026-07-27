import { motion } from "framer-motion";
import { MapPin, Truck } from "lucide-react";

export default function CoverageBanner() {
  return (
    <section className="relative bg-[#070707] overflow-hidden">
      <div className="h-[1.5px] bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 120% at 50% 50%, rgba(245,158,11,0.03) 0%, transparent 65%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-2 md:py-3">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Card — Instalaciones */}
          <div className="group relative rounded-2xl border border-white/[0.07] bg-[#1c1c1c] hover:border-white/[0.13] hover:bg-[#222222] transition-all duration-500 overflow-hidden">
            <div className="h-[1.5px] bg-gradient-to-r from-transparent via-white/18 to-transparent" />
            <div className="flex items-center gap-5 px-6 py-2.5 md:py-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center group-hover:border-white/[0.14] transition-all duration-500">
                <MapPin size={16} className="text-zinc-300" />
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[0.28em] uppercase text-zinc-600 mb-1.5">
                  Instalaciones presenciales
                </p>
                <p className="text-lg md:text-xl font-black text-white tracking-tight leading-none">
                  Antofagasta <span className="text-zinc-600">&amp;</span> Iquique
                </p>
                <p className="text-[11px] text-zinc-600 mt-1.5 tracking-wide">
                  Norte de Chile · Equipo técnico certificado
                </p>
              </div>
            </div>
          </div>

          {/* Card — Todo Chile */}
          <div
            className="group relative rounded-2xl border border-amber-500/18 bg-[#1c1c1c] hover:border-amber-500/32 hover:bg-[#0d0b08] transition-all duration-500 overflow-hidden"
            style={{ boxShadow: "0 0 50px rgba(245,158,11,0.03)" }}
          >
            <div className="h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/45 to-transparent" />
            <div className="flex items-center gap-5 px-6 py-2.5 md:py-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl border border-amber-500/28 bg-amber-500/10 flex items-center justify-center group-hover:border-amber-500/45 group-hover:bg-amber-500/15 transition-all duration-500">
                <Truck size={16} className="text-amber-400" />
              </div>
              <div>
                <p
                  className="text-[9px] font-bold tracking-[0.28em] uppercase mb-1.5"
                  style={{ color: "rgba(245,158,11,0.48)" }}
                >
                  Ventas y envíos a
                </p>
                <p
                  className="text-lg md:text-xl font-black tracking-tight leading-none"
                  style={{ color: "#F59E0B" }}
                >
                  Todo Chile 🇨🇱
                </p>
                <p
                  className="text-[11px] mt-1.5 tracking-wide"
                  style={{ color: "rgba(245,158,11,0.38)" }}
                >
                  Cualquier región · Envío a domicilio
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import { smoothScrollTo } from "../lib/scroll";
import { WHATSAPP_NUMBER } from "../config";
import { track } from "../lib/analytics";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#151515]">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-amber-600/4 rounded-full blur-[100px]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0.2)} className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Soluciones premium para tu hogar y empresa
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.35)}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.9] mb-6"
        >
          Calidad que
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
            transforma
          </span>
          <br />
          espacios.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.5)}
          className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed mb-10"
        >
          Redes de seguridad, sistemas roller, carpintería de aluminio y domótica inteligente.
          Diseñamos el entorno que mereces, con la precisión que exiges.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.65)} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola,%20quisiera%20cotizar%20ahora.")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { source: "hero_cta" })}
            className="group flex items-center gap-2 px-8 py-4 bg-amber-500 text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105"
          >
            Consultar por WhatsApp
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#redes"
            onClick={(e) => { e.preventDefault(); smoothScrollTo("#redes"); }}
            className="flex items-center gap-2 px-8 py-4 border border-white/10 text-white font-semibold text-sm tracking-widest uppercase rounded hover:border-white/30 hover:bg-white/5 transition-all duration-300"
          >
            Ver servicios
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.8)}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "+500", label: "Proyectos" },
            { value: "15+", label: "Años de experiencia" },
            { value: "100%", label: "Garantía" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-zinc-500 tracking-wider uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "../config";

export default function InstagramBanner() {
  return (
    <section className="py-10 bg-[#151515]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
          className="group relative flex flex-col sm:flex-row items-center gap-5 sm:gap-7 px-6 py-5 md:px-8 md:py-6 rounded-2xl border border-white/[0.06] bg-[#1a1a1a] hover:border-rose-500/20 transition-all duration-500 overflow-hidden cursor-pointer"
        >
          {/* Faint gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/[0.04] via-purple-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-rose-500/0 via-rose-500/20 to-rose-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Icon */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/12 to-purple-600/8 border border-rose-500/12 flex items-center justify-center flex-shrink-0 group-hover:from-rose-500/20 group-hover:to-purple-600/14 group-hover:border-rose-500/22 transition-all duration-400">
            <FaInstagram size={20} className="text-rose-400" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center sm:text-left relative z-10">
            <p className="text-[8px] font-black tracking-[0.28em] uppercase text-rose-400/60 mb-1">Proyectos reales · Instalaciones</p>
            <h3 className="text-[15px] font-black text-white tracking-tight leading-snug mb-0.5">
              Seguinos en Instagram
            </h3>
            <p className="text-xs text-zinc-500">
              <span className="text-zinc-400">{INSTAGRAM_HANDLE}</span>
              {" "}— trabajos, proyectos y novedades del equipo.
            </p>
          </div>

          {/* CTA pill */}
          <div className="relative z-10 flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-500/15 text-rose-400/80 text-[10px] font-black tracking-[0.2em] uppercase group-hover:border-rose-500/30 group-hover:text-rose-400 group-hover:bg-rose-500/5 transition-all duration-300">
            Ver perfil
            <ArrowUpRight size={11} className="group-hover:translate-x-px group-hover:-translate-y-px transition-transform duration-200" />
          </div>
        </motion.a>
      </div>
    </section>
  );
}

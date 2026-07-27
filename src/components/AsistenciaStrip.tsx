import { motion } from "framer-motion";
import { Link } from "wouter";
import { Wrench, MessageCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";

export default function AsistenciaStrip() {
  return (
    <section className="py-5 bg-[#111111] border-y border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
          className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/[0.05] bg-[#1c1c1c] px-6 py-5 hover:border-white/[0.09] transition-all duration-400 overflow-hidden"
        >
          {/* Subtle left accent line */}
          <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-zinc-600/0 via-zinc-500/40 to-zinc-600/0" />

          {/* Left — icon + copy */}
          <div className="flex items-center gap-4 pl-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-800/80 border border-zinc-700/40 flex items-center justify-center flex-shrink-0">
              <Wrench size={15} className="text-zinc-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-black text-white tracking-tight">Asistencia Técnica Premium</span>
                <span className="hidden sm:inline text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-zinc-700/50 text-zinc-500">Incluida</span>
              </div>
              <p className="text-[11px] text-zinc-600 leading-snug">
                Atención personalizada para todos nuestros clientes.
              </p>
            </div>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-2 flex-shrink-0 pl-3 sm:pl-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Necesito asistencia técnica.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-[10px] font-bold tracking-widest uppercase rounded-lg hover:bg-[#25D366]/16 hover:border-[#25D366]/35 transition-all duration-300"
            >
              <MessageCircle size={11} /> WhatsApp
            </a>
            <Link
              href="/asistencia"
              className="group/btn flex items-center gap-1.5 px-3.5 py-2 border border-zinc-700/50 text-zinc-400 text-[10px] font-bold tracking-widest uppercase rounded-lg hover:border-zinc-500/60 hover:text-white transition-all duration-300"
            >
              Ver soporte
              <ArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

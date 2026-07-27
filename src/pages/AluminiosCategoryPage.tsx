import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  MessageCircle, ArrowLeft, ArrowRight, Check,
  ShieldCheck, Zap, ChevronRight,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";
import { aluminiosCategories } from "../data/aluminiosCategories";
import { aluminiosPageConfigs } from "../data/aluminiosPageConfigs";
import AsistenciaStrip from "../components/AsistenciaStrip";

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export default function AluminiosCategoryPage() {
  const [location] = useLocation();
  const slug = location.split("/").filter(Boolean).pop() ?? "";
  const cfg = aluminiosPageConfigs[slug];

  if (!cfg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-zinc-500 gap-4">
        <p className="text-lg font-black text-white">Categoría no encontrada.</p>
        <Link href="/aluminios" className="text-xs font-bold tracking-widest uppercase text-zinc-300 hover:text-white">
          ← Volver a Carpintería en Aluminio
        </Link>
      </div>
    );
  }

  const otherLines = aluminiosCategories.filter((c) => c.slug !== slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
    >

      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex items-end pb-16 overflow-hidden bg-[#1c1c1c]">
        <div className="absolute inset-0">
          <img
            src="/images/aluminio.png"
            alt={cfg.heroTitle}
            className="w-full h-full object-cover object-center"
            style={{ filter: cfg.heroBrightness }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-[#030303]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/95 via-[#030303]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/50 via-transparent to-transparent" />
          <div className={`absolute top-0 right-0 w-[700px] h-[700px] ${cfg.heroGlow} rounded-full blur-[200px] pointer-events-none`} />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-32">

          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-12"
          >
            <Link
              href="/aluminios"
              className="group inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-300 text-[10px] font-bold tracking-[0.22em] uppercase transition-colors duration-300"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
              Carpintería en Aluminio
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-3xl"
          >
            {/* Tag */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-3 h-px bg-zinc-700" />
              <span className={`text-[9px] font-black tracking-[0.28em] uppercase ${cfg.accentColor}`}>
                {cfg.heroTag}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-8xl xl:text-[100px] font-black text-white tracking-tighter leading-[0.88] mb-6">
              {cfg.heroTitle}<br />
              <span className="text-zinc-500">{cfg.heroTitleAccent.replace(".", "")}</span>
              <span className="text-white">.</span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-3">
              {cfg.heroParagraph}
            </p>
            <p className="text-zinc-600 text-sm mb-10">{cfg.heroSub}</p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={wa(cfg.waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1fba58] text-white font-black text-[11px] tracking-[0.2em] uppercase rounded-xl transition-all shadow-xl shadow-green-500/20 hover:scale-[1.02]"
              >
                <MessageCircle size={15} />
                Cotizar ahora
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/aluminios"
                className="flex items-center gap-2.5 px-7 py-4 border border-white/8 text-zinc-400 font-bold text-[11px] tracking-[0.18em] uppercase rounded-xl hover:border-white/16 hover:text-white transition-all"
              >
                <ArrowLeft size={13} /> Ver todas las líneas
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#030303] to-transparent" />
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-zinc-700" />
              <span className="text-[9px] font-black tracking-[0.28em] uppercase text-zinc-600">Galería de proyectos</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[0.92]">
              {cfg.galleryHeadline}<br />
              <span className="text-zinc-600">{cfg.galleryHeadlineAccent}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {cfg.gallery.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
                className={`group relative overflow-hidden rounded-2xl bg-zinc-900 ${(i === 0 || i === 3) ? "md:row-span-2" : ""}`}
                style={{ minHeight: (i === 0 || i === 3) ? "480px" : "240px" }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[9px] font-black tracking-[0.22em] uppercase text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.caption}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-[#111111] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-zinc-700/60" />
              <span className={`text-[9px] font-black tracking-[0.28em] uppercase ${cfg.accentColor} opacity-70`}>
                {cfg.benefitsTag}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[0.92]">
              {cfg.benefitsHeadline}<br />
              <span className="text-zinc-600">{cfg.benefitsHeadlineAccent}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cfg.benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                  className={`relative rounded-2xl border ${b.border} ${b.glow} bg-[#1a1a1a] p-7 overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="relative">
                    <div className={`w-11 h-11 rounded-xl ${b.glow} border ${b.border} flex items-center justify-center mb-5`}>
                      <Icon size={20} className={b.color} />
                    </div>
                    <h3 className="text-lg font-black text-white tracking-tight mb-3 leading-tight">{b.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4">{b.desc}</p>
                    <p className="text-[11px] text-zinc-700 leading-relaxed border-t border-white/[0.04] pt-4">{b.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VARIANTS ── */}
      <section className="py-20 bg-[#202020]">
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-zinc-700" />
              <span className="text-[9px] font-black tracking-[0.28em] uppercase text-zinc-600">Opciones disponibles</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
              {cfg.variantsHeadline}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cfg.variants.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                className={`group flex flex-col rounded-2xl border ${v.accentBorder} ${v.accent} bg-[#1a1a1a] overflow-hidden transition-all duration-400 hover:brightness-110`}
              >
                <div className={`h-[1px] bg-gradient-to-r from-transparent ${v.accentBorder.replace("border-", "via-").replace("/18", "/35").replace("/20", "/40").replace("/15", "/30").replace("/22", "/40")} to-transparent`} />

                <div className="flex flex-col flex-1 p-6 gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-black text-white tracking-tight leading-tight">{v.name}</h3>
                    <span className={`flex-shrink-0 text-[8px] font-bold px-2 py-0.5 rounded-full border ${v.accentBorder} ${cfg.accentColor} whitespace-nowrap tracking-wider`}>
                      {v.tag}
                    </span>
                  </div>

                  <p className="text-[12px] text-zinc-600 leading-relaxed flex-1">{v.desc}</p>

                  <ul className="flex flex-col gap-2">
                    {v.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <div className={`w-3.5 h-3.5 rounded-full ${cfg.accentGlow} border ${cfg.accentBorder} flex items-center justify-center flex-shrink-0`}>
                          <Check size={8} className={cfg.accentColor} />
                        </div>
                        <span className="text-[11px] text-zinc-500">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={wa(v.waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366]/8 border border-[#25D366]/18 text-[#25D366] text-[10px] font-bold tracking-[0.18em] uppercase rounded-xl hover:bg-[#25D366]/16 hover:border-[#25D366]/30 transition-all duration-300"
                  >
                    <MessageCircle size={11} /> Cotizar ahora
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 bg-[#111111] overflow-hidden border-t border-white/[0.04]">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] ${cfg.heroGlow} rounded-full blur-[200px] pointer-events-none opacity-60`} />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Zap size={12} className="text-amber-500" />
              <span className="text-[9px] font-black tracking-[0.28em] uppercase text-amber-600">Relevamiento sin costo</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-6">
              {cfg.ctaHeadline}<br />
              <span className="text-zinc-600">{cfg.ctaHeadlineAccent}</span>
            </h2>

            <p className="text-zinc-500 text-base leading-relaxed max-w-lg mx-auto mb-10">
              {cfg.ctaBody}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={wa(cfg.waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-9 py-4 bg-[#25D366] hover:bg-[#1fba58] text-white font-black text-[11px] tracking-[0.2em] uppercase rounded-xl transition-all shadow-2xl shadow-green-500/15 hover:scale-[1.02]"
              >
                <MessageCircle size={15} />
                Consultar por WhatsApp
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <div className="flex items-center gap-2 px-5 py-4 border border-white/6 rounded-xl">
                <ShieldCheck size={13} className="text-zinc-600" />
                <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-zinc-600">Garantía incluida</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OTHER LINES ── */}
      <section className="py-14 bg-[#151515] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-7"
          >
            <p className="text-[9px] font-bold tracking-[0.24em] uppercase text-zinc-700 mb-1">Seguir explorando</p>
            <h3 className="text-xl font-black text-white tracking-tight">Otras líneas de aluminio.</h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {otherLines.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link
                    href={`/aluminios/${c.slug}`}
                    className={`group flex flex-col items-center gap-2.5 p-4 rounded-2xl border ${c.border} ${c.hoverBorder} bg-[#1c1c1c] text-center transition-all duration-300 hover:bg-[#111]`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${c.iconBg} border ${c.border} flex items-center justify-center`}>
                      <Icon size={15} className={c.color} />
                    </div>
                    <span className="text-[11px] font-black text-white leading-tight tracking-tight">{c.title}</span>
                    <ChevronRight size={10} className={`${c.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AsistenciaStrip />

    </motion.div>
  );
}

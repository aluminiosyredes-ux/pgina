import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import {
  MessageCircle, ArrowLeft, ChevronRight, ShoppingCart,
  ArrowRight, Check, ShieldCheck, Truck,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";
import AsistenciaStrip from "../components/AsistenciaStrip";
import {
  rollerCategories,
  getRollerCategoryBySlug,
  type RollerProduct,
  type RollerCategory,
} from "../data/rollerCategories";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  cat,
  index,
}: {
  product: RollerProduct;
  cat: RollerCategory;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
      className={`group flex flex-col rounded-2xl border ${cat.border} ${cat.hoverBorder} bg-[#1a1a1a] transition-all duration-300 hover:bg-[#222222]`}
    >
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[13px] font-black text-white leading-tight tracking-tight">{product.name}</h3>
          <span className={`flex-shrink-0 text-[8px] font-bold px-2 py-0.5 rounded-full border ${product.tagColor} whitespace-nowrap tracking-wider`}>
            {product.tag}
          </span>
        </div>

        <p className="text-[11px] text-zinc-600 leading-relaxed flex-1">{product.desc}</p>

        {product.features && product.features.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <div className={`w-3.5 h-3.5 rounded-full ${cat.iconBg} border ${cat.border} flex items-center justify-center flex-shrink-0`}>
                  <Check size={8} className={cat.color} />
                </div>
                <span className="text-[10px] text-zinc-500">{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-1.5 pt-3 border-t border-white/[0.04]">
          <a
            href={wa(product.waMsg ?? cat.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#25D366]/8 border border-[#25D366]/18 text-[#25D366] text-[9px] font-bold tracking-[0.18em] uppercase rounded-xl hover:bg-[#25D366]/15 hover:border-[#25D366]/30 transition-all duration-300"
          >
            <MessageCircle size={10} /> Consultar por WhatsApp
          </a>
          {product.mlLink && (
            <a
              href={product.mlLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-400/8 border border-amber-500/18 text-amber-400 text-[9px] font-bold tracking-[0.18em] uppercase rounded-xl hover:bg-amber-400/14 hover:border-amber-500/30 transition-all duration-300"
            >
              <ShoppingCart size={10} /> Ver en MercadoLibre
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── FEATURED PRODUCT CARD ────────────────────────────────────────────────────

function FeaturedProductCard({
  product,
  cat,
}: {
  product: RollerProduct;
  cat: RollerCategory;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative rounded-3xl overflow-hidden border border-white/[0.07] bg-[#1c1c1c] hover:border-white/[0.12] transition-all duration-500"
      style={{ boxShadow: "0 0 60px rgba(0,0,0,0.6)" }}
    >
      <div className={`h-[2px] bg-gradient-to-r from-transparent ${cat.color.replace("text-", "via-")}/50 to-transparent`} />

      <div className="grid grid-cols-1 md:grid-cols-[360px_1fr]">
        <div className={`relative flex items-center justify-center ${cat.glowBg} border-b md:border-b-0 md:border-r border-white/[0.05] min-h-[240px] md:min-h-[320px] overflow-hidden`}>
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="relative z-10 w-48 md:w-56 h-auto object-contain drop-shadow-2xl"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          )}
          {product.brand && (
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg border border-white/[0.08] bg-black/60 backdrop-blur-sm">
              <p className="text-[9px] font-black tracking-[0.22em] uppercase text-zinc-400">{product.brand}</p>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full border ${product.tagColor} tracking-wider`}>
              {product.tag}
            </span>
          </div>
        </div>

        <div className="flex flex-col p-7 md:p-8 gap-5">
          <div>
            <p className={`text-[9px] font-black tracking-[0.26em] uppercase ${cat.color} mb-2`}>
              Producto destacado
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-2">
              {product.name}
            </h3>
            <p className="text-[13px] text-zinc-500 leading-relaxed">{product.desc}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${cat.iconBg} border ${cat.border} flex items-center justify-center flex-shrink-0`}>
                    <Check size={9} className={cat.color} />
                  </div>
                  <span className="text-[11px] text-zinc-400 leading-tight">{f}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/18 bg-emerald-500/6">
              <ShieldCheck size={11} className="text-emerald-400" />
              <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-emerald-400">Garantía incluida</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/18 bg-amber-500/6">
              <Truck size={11} className="text-amber-400" />
              <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-amber-400">Envío a todo Chile</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 mt-auto">
            {product.mlLink && (
              <a
                href={product.mlLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-[10px] tracking-[0.2em] uppercase rounded-xl transition-all shadow-lg shadow-amber-500/15 hover:scale-[1.02]"
              >
                <ShoppingCart size={12} />
                Comprar en MercadoLibre
                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            )}
            <a
              href={wa(product.waMsg ?? cat.waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366]/10 border border-[#25D366]/22 text-[#25D366] font-bold text-[10px] tracking-[0.18em] uppercase rounded-xl hover:bg-[#25D366]/18 hover:border-[#25D366]/35 transition-all"
            >
              <MessageCircle size={12} /> Consultar disponibilidad
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── OTHER CATEGORIES ─────────────────────────────────────────────────────────

function OtherCategories({ currentSlug }: { currentSlug: string }) {
  const others = rollerCategories.filter((c) => c.slug !== currentSlug);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
      {others.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link
              href={`/roller/${c.slug}`}
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
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function RollerSubPage() {
  const params = useParams<{ slug: string }>();
  const cat = getRollerCategoryBySlug(params.slug ?? "");

  if (!cat) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-zinc-500 gap-4">
        <p className="text-lg font-black text-white">Categoría no encontrada.</p>
        <Link href="/roller" className="text-xs font-bold tracking-widest uppercase text-amber-400 hover:text-amber-300">
          ← Volver a Cortinas Roller
        </Link>
      </div>
    );
  }

  const CatIcon = cat.icon;

  return (
    <motion.div {...pageTransition}>

      {/* ── HERO ── */}
      <section className="relative min-h-[62vh] flex items-end pb-12 overflow-hidden bg-[#151515]">
        {/* Cinematic background — same cortina.png as main Roller page */}
        <div className="absolute inset-0">
          <img
            src="/images/cortina.png"
            alt="Cortinas Roller"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.42) saturate(0.80)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/88 via-[#080808]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/40 via-transparent to-transparent" />
          {/* Per-category color accent */}
          <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${cat.glowBg} rounded-full blur-[140px] pointer-events-none opacity-80`} />
        </div>
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-8"
          >
            <Link
              href="/roller"
              className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors duration-300"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Cortinas Roller
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${cat.iconBg} border ${cat.border} flex items-center justify-center`}>
                <CatIcon size={18} className={cat.color} />
              </div>
              <span className={`text-[10px] font-black tracking-[0.22em] uppercase ${cat.color}`}>{cat.tag}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-5">
              {cat.title.includes(" ")
                ? <>{cat.title.split(" ").slice(0, -1).join(" ")}<br /><span className="text-zinc-500">{cat.title.split(" ").slice(-1)[0]}.</span></>
                : <>{cat.title}.</>
              }
            </h1>

            <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-xl">
              {cat.heroDesc}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={wa(cat.waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#1fba58] text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-green-500/20"
              >
                <MessageCircle size={14} /> Consultar ahora
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/roller"
                className="flex items-center gap-2 px-6 py-3.5 border border-white/10 text-white font-bold text-xs tracking-widest uppercase rounded-xl hover:border-white/20 hover:bg-white/4 transition-all"
              >
                <ArrowLeft size={13} /> Ver todas las líneas
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#030303] to-transparent" />
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      {cat.products.some((p) => p.featured && p.imageUrl) && (
        <section className="py-12 bg-[#111111]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="w-4 h-px bg-amber-500/40" />
              <span className="text-[10px] font-bold tracking-[0.24em] text-zinc-500 uppercase">Producto destacado</span>
            </motion.div>
            <div className="flex flex-col gap-5">
              {cat.products
                .filter((p) => p.featured && p.imageUrl)
                .map((product) => (
                  <FeaturedProductCard key={product.name} product={product} cat={cat} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRODUCTS ── */}
      {cat.products.filter((p) => !p.featured).length > 0 && (
        <section className="py-14 bg-[#0f0f0f]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex items-end justify-between gap-4 mb-8 flex-wrap"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-px bg-zinc-700" />
                  <span className="text-[10px] font-bold tracking-[0.22em] text-zinc-500 uppercase">Soluciones disponibles</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {cat.products.filter((p) => !p.featured).length} opciones en esta línea
                  <span className="text-zinc-600 font-light">.</span>
                </h2>
              </div>
              <a
                href={wa(cat.waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-2 px-4 py-2.5 border ${cat.border} ${cat.hoverBorder} text-[10px] font-black tracking-widest uppercase rounded-xl transition-all text-zinc-500 hover:text-white`}
              >
                <MessageCircle size={11} className={cat.color} />
                Consultar todo
                <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.products
                .filter((p) => !p.featured)
                .map((product, i) => (
                  <ProductCard key={product.name} product={product} cat={cat} index={i} />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OTHER LINES ── */}
      <section className="py-10 bg-[#151515] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-zinc-600 mb-1">Seguir explorando</p>
            <h3 className="text-xl font-black text-white tracking-tight">Otras líneas de cortinas roller.</h3>
          </motion.div>
          <OtherCategories currentSlug={cat.slug} />
        </div>
      </section>

      <AsistenciaStrip />

      {/* ── CTA ── */}
      <section className="py-10 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl border ${cat.border} ${cat.glowBg} bg-[#1e1e1e] p-7 md:p-9`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center">
              <div>
                <p className={`text-[10px] font-black tracking-[0.2em] uppercase ${cat.color} mb-2`}>¿Te interesa?</p>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{cat.title}.</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Asesoramiento sin costo. Diseñamos la solución ideal para tu espacio y presupuesto.
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <a
                  href={wa(cat.waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1fba58] text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-green-500/20"
                >
                  <MessageCircle size={14} /> Consultar por WhatsApp
                </a>
                <Link
                  href="/roller"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/10 text-white font-semibold text-xs tracking-widest uppercase rounded-xl hover:border-white/20 hover:bg-white/4 transition-all"
                >
                  Ver todas las líneas
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}

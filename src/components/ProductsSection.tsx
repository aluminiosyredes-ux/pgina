import { useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Tag } from "lucide-react";
import { getProductsByCategory, CATEGORY_LABELS } from "../lib/products";
import type { ProductCategory } from "../lib/products";
import { WHATSAPP_NUMBER } from "../config";

const ACCENT: Record<ProductCategory, { border: string; text: string; bg: string; dot: string }> = {
  redes:     { border: "rgba(96,165,250,0.18)",   text: "text-blue-400",   bg: "rgba(96,165,250,0.07)",   dot: "bg-blue-400"   },
  roller:    { border: "rgba(245,158,11,0.18)",   text: "text-amber-400",  bg: "rgba(245,158,11,0.07)",   dot: "bg-amber-400"  },
  aluminios: { border: "rgba(161,161,170,0.18)",  text: "text-zinc-300",   bg: "rgba(161,161,170,0.07)",  dot: "bg-zinc-300"   },
  domotica:  { border: "rgba(192,132,252,0.18)",  text: "text-purple-400", bg: "rgba(192,132,252,0.07)",  dot: "bg-purple-400" },
};

interface Props {
  category: ProductCategory;
  title?: string;
}

export default function ProductsSection({ category, title }: Props) {
  const products = useMemo(() => getProductsByCategory(category), [category]);
  const accent = ACCENT[category];

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-[#0c0c0c]">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-600">
              {CATEGORY_LABELS[category]}
            </p>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {title ?? "Productos disponibles"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/50"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${accent.border}`,
              }}
            >
              {/* Ambient hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent.bg.replace("0.07","0.12")} 0%, transparent 70%)` }}
              />

              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1a1a]">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Tag size={32} className="text-zinc-800" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Category badge */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase"
                  style={{ background: accent.bg, border: `1px solid ${accent.border}`, color: accent.text.replace("text-", "") }}
                >
                  {CATEGORY_LABELS[category]}
                </div>
              </div>

              {/* Content */}
              <div className="relative flex flex-col flex-1 p-4 gap-3">
                <div className="flex-1">
                  <h3 className="text-white font-black text-sm leading-tight mb-1.5">{product.name}</h3>
                  {product.description && (
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{product.description}</p>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1.5">
                  {product.price === 0 ? (
                    <span className="text-zinc-400 text-sm font-bold">
                      {product.priceLabel || "Consultar precio"}
                    </span>
                  ) : (
                    <>
                      <span className={`${accent.text} text-base font-black`}>
                        {new Intl.NumberFormat("es-CL", {
                          style: "currency",
                          currency: "CLP",
                          maximumFractionDigits: 0,
                        }).format(product.price)}
                      </span>
                      {product.priceLabel && (
                        <span className="text-zinc-600 text-[10px]">{product.priceLabel}</span>
                      )}
                    </>
                  )}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(product.whatsappMessage || `Hola, quisiera consultar sobre: ${product.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white font-bold text-[11px] tracking-widest uppercase transition-all bg-[#25D366] hover:bg-[#1fba58] shadow-lg shadow-green-500/10"
                >
                  <MessageCircle size={12} />
                  Consultar por WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

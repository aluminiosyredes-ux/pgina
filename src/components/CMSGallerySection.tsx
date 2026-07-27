import { useMemo } from "react";
import { motion } from "framer-motion";
import { getCMSImages } from "../lib/cms";
import type { CMSCategory } from "../lib/cms";

interface FallbackImage {
  src: string;
  ratio?: string;
  alt?: string;
}

interface Props {
  category: CMSCategory;
  fallback?: FallbackImage[];
  title?: string;
  className?: string;
}

export default function CMSGallerySection({ category, fallback = [], title, className = "" }: Props) {
  const cmsImages = useMemo(() => getCMSImages(category), [category]);
  const hasImages = cmsImages.length > 0;

  if (!hasImages && fallback.length === 0) return null;

  const ASPECT_CYCLE = [
    "aspect-[4/3]",
    "aspect-[4/3]",
    "aspect-[16/9] sm:col-span-2",
    "aspect-[4/3]",
    "aspect-[4/3]",
  ];

  return (
    <section className={`py-16 bg-[#111111] ${className}`}>
      <div className="max-w-5xl mx-auto px-6">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-8"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-600 mb-1">Galería</p>
            <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
          </motion.div>
        )}

        {hasImages ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {cmsImages.map((img, i) => {
              const aspect = ASPECT_CYCLE[i % ASPECT_CYCLE.length];
              const isWide = aspect.includes("col-span-2");
              return (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: (i % 5) * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] shadow-2xl shadow-black/60 ${aspect} ${isWide ? "sm:col-span-2" : ""}`}
                >
                  <img
                    src={img.dataUrl}
                    alt={img.alt || img.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  {img.alt && (
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <p className="text-white text-xs font-semibold">{img.alt}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {fallback.map((item, i) => {
              const aspect = item.ratio ?? ASPECT_CYCLE[i % ASPECT_CYCLE.length];
              const isWide = aspect.includes("col-span-2");
              return (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] shadow-2xl shadow-black/60 ${aspect} ${isWide ? "sm:col-span-2" : ""}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

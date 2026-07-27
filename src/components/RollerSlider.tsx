import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    img: "https://www.factorydirectblinds.com/cdn/shop/files/charcoal-modern-fabric-blackout-roller-shades-cozy-bedroom_63eb2cb7-92f8-48c4-8e5f-582392fdbee2.webp?v=1778916130&width=1200",
    category: "Roller Blackout",
    desc: "Bloqueo total de luz para dormitorios y salas multimedia. Tela de alta densidad fabricada a medida.",
    accent: "#a1a1aa",
  },
  {
    img: "https://m.media-amazon.com/images/I/41wg8F12PVL.jpg",
    category: "Roller Zebra",
    desc: "Franjas alternas traslúcidas y opacas para control gradual de luz y privacidad con un solo movimiento.",
    accent: "#f59e0b",
  },
  {
    img: "https://www.berissablinds.com/cdn/shop/files/2_800a026a-4bd7-40d1-927c-29c4e23c14c6.jpg?v=1771925667&width=1445",
    category: "Roller Sunscreen",
    desc: "Filtra el calor y el deslumbramiento solar manteniendo la vista al exterior durante todo el día.",
    accent: "#fbbf24",
  },
  {
    img: "https://blindsmagic.com/cdn/shop/files/1_929e9738-f1a1-4dda-9608-c507a55e54c3.jpg?v=1713237209&width=1600",
    category: "Cortinas Motorizadas",
    desc: "Control inteligente desde tu smartphone, voz o control remoto. Compatible con Alexa y Google Home.",
    accent: "#c084fc",
  },
  {
    img: "https://m.media-amazon.com/images/I/81CtCRAGw6L.jpg",
    category: "Cortinas Dúo",
    desc: "Doble tela que regula la luz de forma gradual con elegancia. Mecanismo silencioso, disponible motorizado.",
    accent: "#38bdf8",
  },
];

export default function RollerSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const slide = SLIDES[current];

  return (
    <section className="py-10 bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-6 px-2">
          <p className="text-[10px] font-black tracking-[0.28em] uppercase text-zinc-600 mb-1">Galería</p>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Nuestras líneas de <span className="text-amber-400">cortinas roller</span>
          </h2>
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/9] bg-zinc-900 group">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img
                src={slide.img}
                alt={slide.category}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute bottom-14 left-6 md:bottom-10"
              >
                <p
                  className="text-[9px] font-black tracking-[0.32em] uppercase mb-1"
                  style={{ color: slide.accent }}
                >
                  {slide.category}
                </p>
                <p className="text-white/90 text-sm font-medium leading-snug max-w-md">{slide.desc}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
            style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
            style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Ir a slide ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === current ? slide.accent : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

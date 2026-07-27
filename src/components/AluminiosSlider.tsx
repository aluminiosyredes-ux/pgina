import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    img: "/images/carpinteria%20aluminio1.png",
    category: "Divisiones de Oficinas",
    desc: "Soluciones en aluminio y vidrio que crean espacios funcionales, modernos y con estilo.",
  },
  {
    img: "/images/carpinteria%20aluminio2.png",
    category: "Ventanales Correderos",
    desc: "Diseñados para brindar amplitud, iluminación natural y una conexión perfecta con el exterior.",
  },
  {
    img: "/images/carpinteria%20aluminio3.png",
    category: "Ventanas Correderas",
    desc: "Ideales para conectar espacios como cocinas o áreas de servicio, combinando funcionalidad y diseño.",
  },
  {
    img: "/images/carpinteria%20aluminio4.png",
    category: "Cierre de Balcón",
    desc: "Sistemas de aluminio y vidrio que maximizan la vista, la iluminación natural y el confort.",
  },
  {
    img: "/images/carpinteria%20aluminio5.png",
    category: "Cierre de Balcón",
    desc: "Sistemas de aluminio y vidrio que maximizan la vista, la iluminación natural y el confort.",
  },
  {
    img: "/images/carpinteria%20aluminio6.png",
    category: "Trabajo Realizado",
    desc: "Cerramiento de balcón instalado en Antofagasta — aluminio y vidrio con vista al mar.",
  },
];

export default function AluminiosSlider() {
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
            Nuestros trabajos en <span className="text-zinc-400">aluminio</span>
          </h2>
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/9] bg-zinc-900 group">
          {/* Slides */}
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
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              {/* Barra inferior que tapa el texto de la imagen y muestra el nuestro */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 60%, transparent)" }}>
                <p className="text-[9px] font-black tracking-[0.3em] uppercase text-amber-400 mb-0.5">{slide.category}</p>
                <p className="text-white text-sm font-medium leading-snug max-w-lg">{slide.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next arrows */}
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

          {/* Dot indicators */}
          <div className="absolute bottom-5 right-6 flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Ir a slide ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === current ? "#f59e0b" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

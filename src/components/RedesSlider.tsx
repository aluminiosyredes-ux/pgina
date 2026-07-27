import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/images/1.png",
    label: "Protección para niños y mascotas",
    sub: "Red instalada en balcón de departamento",
  },
  {
    src: "/images/2.png",
    label: "Tranquilidad para toda la familia",
    sub: "Disfruta tu terraza sin preocupaciones",
  },
  {
    src: "/images/3.png",
    label: "Protege también a tus mascotas",
    sub: "Malla invisible de alta resistencia",
  },
  {
    src: "/images/4.png",
    label: "Instalación profesional sin obra",
    sub: "Terminación impecable en balcones y ventanas",
  },
  {
    src: "/images/5.png",
    label: "Tu balcón, seguro y hermoso",
    sub: "Sin perder la vista ni la estética",
  },
];

export default function RedesSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  const next = useCallback(() => {
    const idx = (current + 1) % slides.length;
    setDirection(1);
    setCurrent(idx);
  }, [current]);

  const prev = useCallback(() => {
    const idx = (current - 1 + slides.length) % slides.length;
    setDirection(-1);
    setCurrent(idx);
  }, [current]);

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="bg-[#0a0a0a] py-10">
      <div className="max-w-5xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <p className="text-[10px] font-bold tracking-widest uppercase text-blue-400 mb-1.5">
            Galería de instalaciones
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Protección que <span className="text-blue-400">se ve bien.</span>
          </h2>
        </motion.div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] md:aspect-[21/9] bg-black">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
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
                src={slides[current].src}
                alt={slides[current].label}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200 backdrop-blur-sm"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200 backdrop-blur-sm"
            aria-label="Siguiente"
          >
            <ChevronRight size={18} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current + "-caption"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 z-10 px-5 py-4 bg-gradient-to-t from-black/80 to-transparent"
            >
              <p className="text-white font-bold text-sm md:text-base leading-tight">
                {slides[current].label}
              </p>
              <p className="text-zinc-400 text-xs mt-0.5">
                {slides[current].sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-blue-400"
                  : "w-2 h-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

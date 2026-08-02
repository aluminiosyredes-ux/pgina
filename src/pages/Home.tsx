import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Shield, Layers, Box, Cpu, ChevronRight, MessageCircle, Star, Quote, ArrowRight, CreditCard, Wifi, Video, Wrench, MapPin, Truck, } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { WHATSAPP_NUMBER, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "../config";
import { LogoMark } from "../components/LogoMark";
import { useSEO } from "../hooks/useSEO";
import { SEO } from "../lib/seoData";
import MercadoLibreSection from "../components/MercadoLibreSection";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 },
};

const HERO_SLIDES = [
  {
    eyebrow: "Soluciones Premium",
    pre:  "",
    word: "Mallas de Seguridad en Antofagasta",
    post: "",
    accent: "from-amber-400 via-yellow-300 to-amber-500",
    accentRgb: "245,158,11",
    sub:  "Instalación profesional de mallas de seguridad para balcones, ventanas y terrazas, con protección para niños y mascotas.",
    cta:  { label: "Ver servicios", href: "#servicios", scroll: true },
    cta2: { label: "WhatsApp", wa: true },
  },

  {
    eyebrow: "Redes de Seguridad",
    pre:  "Protección que da ",
    word: "tranquilidad.",
    post: "",
    accent: "from-blue-400 via-sky-300 to-blue-500",
    accentRgb: "96,165,250",
    sub:  "Instalamos redes certificadas para balcones, escaleras y espacios industriales. Sin obra, con garantía total.",
    cta:  { label: "Cotizar redes", href: "/redes", scroll: false },
    cta2: { label: "WhatsApp", wa: true },
  },
  {
    eyebrow: "Cortinas Roller",
    pre:  "Diseño que ",
    word: "transforma",
    post: " tu hogar.",
    accent: "from-amber-400 via-orange-300 to-amber-500",
    accentRgb: "251,146,60",
    sub:  "Blackout, screen y traslúcidas fabricadas a medida. Con motorización inteligente integrada a tu smartphone.",
    cta:  { label: "Ver cortinas", href: "/roller", scroll: false },
    cta2: { label: "WhatsApp", wa: true },
  },
  {
    eyebrow: "Carpintería de Aluminio",
    pre:  "Aluminio de ",
    word: "precisión",
    post: " artesanal.",
    accent: "from-zinc-300 via-white to-zinc-400",
    accentRgb: "212,212,216",
    sub:  "Ventanas, puertas y cerramientos fabricados a medida. Terminación perfecta y materiales de primera línea.",
    cta:  { label: "Ver aluminios", href: "/aluminios", scroll: false },
    cta2: { label: "WhatsApp", wa: true },
  },
  {
    eyebrow: "Domótica & Automatización",
    pre:  "Tu hogar, ",
    word: "inteligente.",
    post: "",
    accent: "from-purple-400 via-violet-300 to-indigo-400",
    accentRgb: "192,132,252",
    sub:  "Control de iluminación, seguridad y clima desde tu smartphone. Compatible con Alexa, Google Home y HomeKit.",
    cta:  { label: "Ver domótica", href: "/domotica", scroll: false },
    cta2: { label: "WhatsApp", wa: true },
  },
] as const;

const SLIDE_DURATION = 5000;

const services = [
  {
    href: "/redes", icon: Shield, title: "Mallas de Seguridad",
    desc: "Mallas de seguridad en Antofagasta para balcones, ventanas, terrazas y departamentos. Protección certificada para niños, mascotas e instalaciones en altura.",
    tag: "Cotizador incluido", tagColor: "text-blue-400 bg-blue-500/15 border-blue-500/20",
    iconBg: "bg-blue-500/20 border border-blue-500/30", iconColor: "text-blue-400",
    image: "/images/1.png",
    hoverGlow: "from-blue-600/25 to-transparent",
    accentBar: "bg-blue-500",
  },
  {
    href: "/roller", icon: Layers, title: "Cortinas Roller",
    desc: "Screen, blackout y traslúcida fabricadas a medida. Con o sin motorización.",
    tag: "Smart Home", tagColor: "text-amber-400 bg-amber-500/15 border-amber-500/20",
    iconBg: "bg-amber-500/20 border border-amber-500/30", iconColor: "text-amber-400",
    image: "/images/roller.png",
    hoverGlow: "from-amber-600/25 to-transparent",
    accentBar: "bg-amber-500",
  },
  {
    href: "/aluminios", icon: Box, title: "Carpintería de Aluminio",
    desc: "Ventanas DVH, puertas, cerramientos y frentes a medida. Calidad premium.",
    tag: "A medida", tagColor: "text-zinc-200 bg-zinc-400/15 border-zinc-400/20",
    iconBg: "bg-zinc-400/20 border border-zinc-400/30", iconColor: "text-zinc-200",
    image: "/images/aluminio.png",
    hoverGlow: "from-zinc-400/20 to-transparent",
    accentBar: "bg-zinc-400",
  },
  {
    href: "/domotica", icon: Cpu, title: "Domótica",
    desc: "Automatización inteligente del hogar. Alexa, Google Home y Apple HomeKit.",
    tag: "Inteligente", tagColor: "text-purple-400 bg-purple-500/15 border-purple-500/20",
    iconBg: "bg-purple-500/20 border border-purple-500/30", iconColor: "text-purple-400",
    image: "/images/domotica.png",
    hoverGlow: "from-purple-600/25 to-transparent",
    accentBar: "bg-purple-500",
  },
];

const testimonials = [
  {
    name: "Diego F.", role: "Arquitecto · Antofagasta",
    text: "La calidad de los aluminios es de primer nivel y los plazos siempre se cumplen. Son mis proveedores de confianza.",
    service: "Aluminios", color: "text-zinc-300 bg-zinc-400/8 border-zinc-400/12",
  },
  {
    name: "Sofía M.", role: "Dueña de local · Iquique",
    text: "El sistema de rollers motorizados transformó mi local. El equipo fue muy profesional y puntual.",
    service: "Roller", color: "text-amber-400 bg-amber-500/8 border-amber-500/12",
  },
];

/* ── Architectural background lines ── */
function ArchLines() {
  const line = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } };
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {/* Horizontal centerline */}
      <motion.line x1="0" y1="50%" x2="100%" y2="50%"
        stroke="white" strokeWidth="0.4" strokeOpacity="0.06"
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        style={{ transformOrigin: "50% 50%" }}
      />
      {/* Vertical centerline */}
      <motion.line x1="50%" y1="0" x2="50%" y2="100%"
        stroke="white" strokeWidth="0.4" strokeOpacity="0.06"
        initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        style={{ transformOrigin: "50% 50%" }}
      />
      {/* Diagonal construction lines */}
      <motion.line x1="0" y1="0" x2="100%" y2="100%"
        stroke="white" strokeWidth="0.3" strokeOpacity="0.03"
        variants={line} initial="hidden" animate="visible"
        transition={{ duration: 2.2, delay: 0.8, ease: "easeOut" }}
      />
      <motion.line x1="100%" y1="0" x2="0" y2="100%"
        stroke="white" strokeWidth="0.3" strokeOpacity="0.03"
        variants={line} initial="hidden" animate="visible"
        transition={{ duration: 2.2, delay: 0.9, ease: "easeOut" }}
      />
      {/* Horizontal thirds */}
      <motion.line x1="0" y1="33.33%" x2="100%" y2="33.33%"
        stroke="white" strokeWidth="0.25" strokeOpacity="0.04"
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.0, ease: [0.22, 1, 0.36, 1] as const }}
        style={{ transformOrigin: "0 33.33%" }}
      />
      <motion.line x1="0" y1="66.66%" x2="100%" y2="66.66%"
        stroke="white" strokeWidth="0.25" strokeOpacity="0.04"
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
        style={{ transformOrigin: "0 66.66%" }}
      />
      {/* Vertical thirds */}
      <motion.line x1="33.33%" y1="0" x2="33.33%" y2="100%"
        stroke="white" strokeWidth="0.25" strokeOpacity="0.04"
        initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
        style={{ transformOrigin: "33.33% 0" }}
      />
      <motion.line x1="66.66%" y1="0" x2="66.66%" y2="100%"
        stroke="white" strokeWidth="0.25" strokeOpacity="0.04"
        initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.3, ease: [0.22, 1, 0.36, 1] as const }}
        style={{ transformOrigin: "66.66% 0" }}
      />
    </svg>
  );
}

/* ── Corner bracket marks ── */
function CornerBrackets() {
  const sz = 28;
  const stroke = "rgba(255,255,255,0.18)";
  const sw = 0.8;
  const brackets = [
    { top: 20, left: 24, points: `${sz},0 0,0 0,${sz}` },
    { top: 20, right: 24, points: `0,0 ${sz},0 ${sz},${sz}` },
    { bottom: 20, left: 24, points: `${sz},${sz} 0,${sz} 0,0` },
    { bottom: 20, right: 24, points: `0,${sz} ${sz},${sz} ${sz},0` },
  ];
  return (
    <>
      {brackets.map((b, i) => (
        <motion.svg
          key={i}
          width={sz} height={sz}
          viewBox={`0 0 ${sz} ${sz}`}
          className="absolute"
          style={{ top: b.top, bottom: b.bottom, left: b.left, right: b.right }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.0 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <polyline points={b.points} fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="square" />
        </motion.svg>
      ))}
    </>
  );
}

/* ── Expanding rings ── */
function LogoRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-none border border-white/[0.04]"
          style={{ width: 88 + i * 80, height: 88 + i * 80 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.7, 0], scale: [0.7, 1.3, 1.6] }}
          transition={{
            duration: 3.5,
            delay: 0.6 + i * 0.6,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeOut",
          }}
        />
      ))}
      {/* Static subtle halo */}
      <motion.div
        className="absolute rounded-none border border-white/[0.05]"
        style={{ width: 140, height: 140 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <motion.div
        className="absolute rounded-none border border-white/[0.03]"
        style={{ width: 200, height: 200 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.0 }}
      />
    </div>
  );
}

export default function Home() {
  useSEO(SEO.home);

  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(1);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (next: number, direction: number) => {
    setDir(direction);
    setSlide(next);
    setProgress(0);
  };

  const next = () => goTo((slide + 1) % HERO_SLIDES.length, 1);
  const prev = () => goTo((slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length, -1);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSlide(s => (s + 1) % HERO_SLIDES.length);
      setDir(1);
      setProgress(0);
    }, SLIDE_DURATION);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [slide]);

  useEffect(() => {
    setProgress(0);
    const step = 50;
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + (step / SLIDE_DURATION) * 100, 100));
    }, step);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [slide]);

  const s = HERO_SLIDES[slide];

  return (
    <motion.div {...pageTransition}>
      {/* ── CINEMATIC HERO ── */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden bg-[#070707]">

        {/* Layer 0 — hero image */}
        <div className="absolute inset-0">
          <img src="/images/24.png" alt="Aluminios & Redes" className="w-full h-full object-cover" style={{ filter: "brightness(0.68) saturate(0.9)", objectPosition: "right center" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.48) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 38%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0) 75%)" }} />
        </div>

        {/* Layer 1 — deep atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Focal radial spotlight on logo position */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.022) 0%, transparent 65%)" }} />
          {/* Subtle warm accent below */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px]"
            style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.018) 0%, transparent 70%)" }} />
        </div>

        {/* Layer 2 — architectural lines (SVG) */}
        <ArchLines />

        {/* Layer 3 — giant ghost logo as background texture */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.2 }}
        >
          <div style={{ opacity: 0.028 }}>
            <LogoMark size={520} />
          </div>
        </motion.div>

        {/* Layer 4 — corner precision brackets */}
        <CornerBrackets />

        {/* Layer 5 — fine grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Layer 6 — main content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">

          {/* ── HERO SLIDER ── */}
          <div className="relative w-full max-w-2xl flex flex-col items-center">

            {/* Slide content */}
            <div className="relative w-full overflow-hidden" style={{ minHeight: 200 }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={slide}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 40, filter: "blur(6px)" }),
                    center: { opacity: 1, x: 0, filter: "blur(0px)" },
                    exit: (d: number) => ({ opacity: 0, x: d * -40, filter: "blur(4px)" }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Eyebrow */}
                  <span
                    className="inline-flex items-center gap-1.5 text-[9px] font-black tracking-[0.28em] uppercase px-3 py-1.5 rounded-full mb-2"
                    style={{
                      background: `rgba(${s.accentRgb},0.1)`,
                      border: `1px solid rgba(${s.accentRgb},0.25)`,
                      color: `rgb(${s.accentRgb})`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `rgb(${s.accentRgb})` }} />
                    {s.eyebrow}
                  </span>

                  {/* Headline */}
                  <h1 className="text-[28px] sm:text-[46px] lg:text-[54px] font-black tracking-tight text-white leading-[1.04] mb-2">
                    {s.pre}
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${s.accent}`}>
                      {s.word}
                    </span>
                    {s.post}
                  </h1>

                  {/* Subtitle */}
                  <p className="max-w-lg text-zinc-500 text-[13px] md:text-[14px] mb-4 leading-relaxed">
                    {s.sub}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    {s.cta.scroll ? (
                      <button
                        onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                        className="group flex items-center gap-2 px-8 py-3.5 text-black font-bold text-xs tracking-widest uppercase rounded transition-all duration-300 shadow-lg hover:scale-105"
                        style={{
                          background: `rgb(${s.accentRgb})`,
                          boxShadow: `0 8px 24px rgba(${s.accentRgb},0.25)`,
                        }}
                      >
                        {s.cta.label}
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <Link
                        href={s.cta.href}
                        className="group flex items-center gap-2 px-8 py-3.5 text-black font-bold text-xs tracking-widest uppercase rounded transition-all duration-300 shadow-lg hover:scale-105"
                        style={{
                          background: `rgb(${s.accentRgb})`,
                          boxShadow: `0 8px 24px rgba(${s.accentRgb},0.25)`,
                        }}
                      >
                        {s.cta.label}
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-8 py-3.5 border border-white/8 text-white/70 font-semibold text-xs tracking-widest uppercase rounded hover:border-white/20 hover:text-white hover:bg-white/4 transition-all duration-300"
                    >
                      <MessageCircle size={13} /> WhatsApp
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Controls row ── */}
            <div className="flex items-center gap-4 mt-3">
              {/* Prev */}
              <button
                onClick={prev}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <ChevronRight size={12} className="text-white/40 rotate-180" />
              </button>

              {/* Dots + progress */}
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > slide ? 1 : -1)}
                    className="relative overflow-hidden rounded-full transition-all duration-300"
                    style={{
                      width: i === slide ? 28 : 6,
                      height: 6,
                      background: i === slide ? `rgba(${s.accentRgb},0.25)` : "rgba(255,255,255,0.12)",
                      border: i === slide ? `1px solid rgba(${s.accentRgb},0.4)` : "none",
                    }}
                  >
                    {i === slide && (
                      <motion.div
                        className="absolute inset-0 rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: progress / 100 }}
                        transition={{ duration: 0.05, ease: "linear" }}
                        style={{ background: `rgb(${s.accentRgb})`, transformOrigin: "left" }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={next}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <ChevronRight size={12} className="text-white/40" />
              </button>
            </div>
          </div>

          {/* ── Logo + Wordmark — compact horizontal row ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex items-center gap-4 mt-1 mb-1"
          >
            {/* Mini logo with single sonar ring */}
            <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 80, height: 80 }}>
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="absolute border border-white/[0.06] pointer-events-none rounded-sm"
                  style={{ width: 80 + i * 24, height: 80 + i * 24 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.7, 0], scale: [0.7, 1.2, 1.5] }}
                  transition={{ duration: 3.5, delay: 1 + i * 0.8, repeat: Infinity, repeatDelay: 2, ease: "easeOut" }}
                />
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.82, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const }}
                className="relative z-10"
              >
                <LogoMark size={72} />
              </motion.div>
            </div>

            {/* Thin vertical divider */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/15 to-transparent" />

            {/* Wordmark */}
            <div className="text-left">
              <div className="flex items-baseline gap-2">
                <span className="text-[15px] sm:text-[18px] font-black tracking-[0.22em] text-white uppercase leading-none">
                  Aluminios
                </span>
                <span className="text-[12px] font-thin text-white/20 leading-none">&</span>
                <span className="text-[15px] sm:text-[18px] font-black tracking-[0.22em] text-white uppercase leading-none">
                  Redes
                </span>
              </div>
              <p className="text-[8px] tracking-[0.45em] text-white/20 uppercase mt-1.5">
                Regiones de Arica · Iquique · Antofagasta
              </p>
            </div>
          </motion.div>


        </div>


      </section>

      {/* ── SEO: Soluciones para el hogar (visible) ── */}
      <section className="py-12 bg-[#0f0f0f] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Soluciones para tu hogar en Antofagasta</h2>
            <p className="text-zinc-400">Ofrecemos mallas y redes de seguridad, ventanales de aluminio, cierres de balcones, cortinas roller y sistemas de domótica con instalación profesional.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/redes" className="group block p-5 rounded-xl bg-[#0b0b0b] border border-white/6 hover:border-white/12 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Mallas de Seguridad (Redes de Seguridad)</h3>
              <p className="text-zinc-400 text-sm mb-3">Mallas de seguridad y redes de alta resistencia para balcones, terrazas, ventanas y protección de niños y mascotas.</p>
              <div className="text-xs font-bold uppercase text-blue-400 flex items-center gap-2">Ver mallas y redes <ChevronRight size={12} /></div>
            </Link>

            <Link href="/aluminios" className="group block p-5 rounded-xl bg-[#0b0b0b] border border-white/6 hover:border-white/12 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Ventanales de aluminio</h3>
              <p className="text-zinc-400 text-sm mb-3">Fabricación e instalación de ventanales, cierres de balcones y soluciones en aluminio.</p>
              <div className="text-xs font-bold uppercase text-blue-400 flex items-center gap-2">Ver aluminios <ChevronRight size={12} /></div>
            </Link>

            <Link href="/roller" className="group block p-5 rounded-xl bg-[#0b0b0b] border border-white/6 hover:border-white/12 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Cortinas roller</h3>
              <p className="text-zinc-400 text-sm mb-3">Cortinas roller a medida, blackout, sunscreen y sistemas motorizados.</p>
              <div className="text-xs font-bold uppercase text-blue-400 flex items-center gap-2">Ver cortinas <ChevronRight size={12} /></div>
            </Link>

            <Link href="/domotica" className="group block p-5 rounded-xl bg-[#0b0b0b] border border-white/6 hover:border-white/12 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Domótica</h3>
              <p className="text-zinc-400 text-sm mb-3">Automatización del hogar con iluminación inteligente, cortinas motorizadas y control desde dispositivos inteligentes.</p>
              <div className="text-xs font-bold uppercase text-blue-400 flex items-center gap-2">Ver domótica <ChevronRight size={12} /></div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SEO: Sección local adicional (mallas y redes) ── */}
      <section className="py-8 bg-[#0f0f0f] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Mallas y redes de seguridad en Antofagasta</h2>
            <p className="text-zinc-400 max-w-3xl mx-auto">En Aluminios y Redes instalamos mallas y redes de seguridad de alta resistencia en Antofagasta para balcones, terrazas, ventanas y protección de mascotas. Nuestras soluciones están diseñadas para entregar seguridad, durabilidad y una instalación profesional adaptada a las condiciones del norte de Chile.</p>
            <div className="mt-4">
              <Link href="/redes" className="inline-block px-5 py-2 rounded-md bg-amber-500 text-black font-bold">Conoce nuestras mallas y redes de seguridad</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-[#111111] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">¿Por qué elegir nuestras mallas de seguridad?</h2>
            <p className="text-zinc-400 mb-4">En Antofagasta entregamos mallas de seguridad Antofagasta instaladas profesionalmente para balcones, ventanas, terrazas y departamentos. Nuestro equipo prioriza la protección para balcones y ventanas, la comodidad de tu familia y la seguridad de niños y mascotas.</p>
            <p className="text-zinc-400">Elegimos materiales resistentes a la intemperie y ofrecemos una instalación limpia y rápida, cuidando cada detalle para que tus espacios queden protegidos sin perder la vista ni la estética.</p>
          </div>
        </div>
      </section>

      {/* ── COVERAGE BANNER ── */}
      <section className="relative bg-[#070707] overflow-hidden">
        {/* Amber glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(245,158,11,0.08) 0%, transparent 65%)" }} />
        {/* Top separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />

        <div className="max-w-5xl mx-auto px-6 py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] items-stretch">

              {/* Left — Instalaciones */}
              <div className="flex items-center gap-5 px-0 md:pr-10 py-4">
                <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/10 bg-white/[0.04]">
                  <MapPin size={22} className="text-white/70" />
                </div>
                <div>
                  <p className="text-[9px] font-bold tracking-[0.28em] uppercase text-zinc-600 mb-2">Instalaciones presenciales</p>
                  <p className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
                    Regiones de Arica, Iquique y Antofagasta
                  </p>
                  <p className="text-xs text-zinc-600 mt-1.5 tracking-wide">Norte de Chile · Cobertura regional</p>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="hidden md:block bg-gradient-to-b from-transparent via-white/[0.08] to-transparent mx-0" />

              {/* Right — Envíos */}
              <div className="flex items-center gap-5 px-0 md:pl-10 py-4 border-t border-white/[0.05] md:border-t-0">
                <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center border border-amber-500/30 bg-amber-500/8">
                  <Truck size={22} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-[9px] font-bold tracking-[0.28em] uppercase mb-2" style={{ color: "rgba(245,158,11,0.5)" }}>
                    Ventas y envíos
                  </p>
                  <p className="text-2xl md:text-3xl font-black tracking-tight leading-none" style={{ color: "#F59E0B" }}>
                    Todo Chile 🇨🇱
                  </p>
                  <p className="text-xs mt-1.5 tracking-wide" style={{ color: "rgba(245,158,11,0.38)" }}>
                    Comprá desde cualquier región del país
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom sub-line */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <div className="flex items-center justify-center gap-3 py-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/35" />
              <p className="text-[9px] font-semibold tracking-[0.32em] uppercase text-zinc-700">
                Empresa consolidada · +15 años en el rubro · Equipo técnico certificado
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/35" />
            </div>
          </motion.div>
        </div>

        {/* Bottom separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </section>

      {/* ── SERVICE HUB ── */}
      <section className="py-7 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-3">Nuestros servicios</p>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Todo para tu espacio,<br /><span className="text-zinc-500">en un solo lugar.</span>
              </h2>
              <p className="hidden md:block text-zinc-500 text-sm max-w-xs text-right leading-relaxed">
                Cuatro servicios especializados, un equipo de confianza.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.href} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const }}>
                  <Link href={s.href} className="group relative block rounded-xl overflow-hidden border border-white/6 hover:border-white/12 transition-all duration-500 shadow-lg hover:shadow-2xl" style={{ height: "272px" }}>

                    {/* Background image with subtle zoom on hover */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      style={{ backgroundImage: `url(${s.image})` }}
                    />

                    {/* Base cinematic overlay — always present */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/20" />

                    {/* Colored glow that intensifies on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${s.hoverGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-600`} />

                    {/* Bottom accent bar */}
                    <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${s.accentBar} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6">
                      {/* Top row */}
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 rounded-xl ${s.iconBg} backdrop-blur-sm flex items-center justify-center flex-shrink-0`}>
                          <Icon size={17} className={s.iconColor} />
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.tagColor} backdrop-blur-sm`}>{s.tag}</span>
                      </div>

                      {/* Bottom text */}
                      <div>
                        <h3 className="text-[17px] font-black text-white mb-2 leading-tight tracking-tight">{s.title}</h3>
                        <p className="text-zinc-400 text-xs leading-relaxed mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-400">{s.desc}</p>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-white/40 group-hover:text-amber-400 transition-colors duration-300">
                          Ver más <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <MercadoLibreSection />

      {/* ── PAGOS + CONTACT CARDS ── */}
      <section className="pb-7 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">

          {/* ── Pagos Online card ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-3.5"
          >
            <Link href="/pagos"
              className="group relative flex items-center justify-between rounded-xl border border-white/6 hover:border-amber-500/20 bg-[#1c1c1c] hover:bg-[#222222] overflow-hidden p-6 transition-all duration-500 shadow-lg hover:shadow-amber-500/5"
            >
              {/* Subtle texture */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              {/* Amber glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/4 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-500 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Left — icon + text */}
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/15 transition-colors duration-300">
                  <CreditCard size={20} className="text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-[15px] font-black text-white tracking-tight">Pagos Online</h3>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border text-amber-400 bg-amber-500/10 border-amber-500/20">Seguro</span>
                  </div>
                  <p className="text-xs text-zinc-500">Paga de forma rápida y segura.</p>
                </div>
              </div>

              {/* Right — CTA */}
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-zinc-600 group-hover:text-amber-400 transition-colors duration-300 relative z-10 flex-shrink-0">
                <span className="hidden sm:inline">Pagar ahora</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-white/5 bg-[#1e1e1e] hover:border-green-500/20 hover:bg-[#222222] p-5 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={16} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Consultar por WhatsApp</p>
                  <p className="text-xs text-zinc-500">Respondemos al instante</p>
                </div>
              </div>
              <ArrowRight size={14} className="text-zinc-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </a>
            <Link href="/contacto"
              className="group flex items-center justify-between rounded-xl border border-white/5 bg-[#1e1e1e] hover:border-white/12 hover:bg-[#222222] p-5 transition-all duration-300">
              <div>
                <p className="text-sm font-bold text-white">Ver información de contacto</p>
                <p className="text-xs text-zinc-500">Teléfono, Instagram y horarios</p>
              </div>
              <ArrowRight size={14} className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ASISTENCIA CARD ── */}
      <section className="py-3 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Link href="/asistencia"
              className="group relative flex items-center justify-between rounded-xl border border-white/6 hover:border-green-500/20 bg-[#1c1c1c] hover:bg-[#222222] overflow-hidden p-6 transition-all duration-500 shadow-lg hover:shadow-green-500/5"
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 group-hover:from-green-500/3 to-transparent transition-all duration-500 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-green-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              {/* Left */}
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/15 transition-colors duration-300">
                  <Wrench size={19} className="text-green-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-black text-white tracking-tight">Asistencia Técnica</h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border text-green-400 bg-green-500/10 border-green-500/20">Premium</span>
                  </div>
                  <p className="text-sm text-zinc-400">Soporte profesional y acompañamiento postventa.</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-zinc-600 group-hover:text-green-400 transition-colors duration-300 relative z-10 flex-shrink-0">
                <span className="hidden sm:inline">Asistencia Técnica</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}

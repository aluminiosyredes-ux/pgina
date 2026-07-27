import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MessageCircle, Lock, Scan } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Link, useLocation } from "wouter";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "../config";
import { LogoMark } from "./LogoMark";

const services = [
  { label: "Redes de Seguridad", href: "/redes", sub: "Con cotizador online" },
  { label: "Cortinas Roller", href: "/roller", sub: "Screen · Blackout · Motor" },
  { label: "Aluminios", href: "/aluminios", sub: "DVH · Puertas · Cerramientos" },
  { label: "Domótica", href: "/domotica", sub: "Hogar inteligente" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const isServicesActive = services.some((s) => location === s.href);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* ── TOP CONTACT BAR — floating glass buttons ── */}
        <div className="bg-black/50 backdrop-blur-lg border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between gap-3">

            {/* ── Floating round buttons — left ── */}
            <div className="flex items-center gap-2.5">
              {/* WhatsApp */}
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.93 }}
                className="group relative w-8 h-8 rounded-full bg-[#25D366]/12 border border-[#25D366]/28 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/22 hover:border-[#25D366]/55 hover:shadow-[0_0_18px_rgba(37,211,102,0.30)] transition-all duration-300"
              >
                <MessageCircle size={14} />
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full border border-[#25D366]/18 scale-100 group-hover:scale-[1.35] group-hover:opacity-0 transition-all duration-500" />
              </motion.a>

              {/* Instagram */}
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.27, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.93 }}
                className="group relative w-8 h-8 rounded-full bg-rose-500/8 border border-rose-500/22 flex items-center justify-center text-rose-400 hover:bg-rose-500/18 hover:border-rose-500/48 hover:shadow-[0_0_18px_rgba(244,63,94,0.26)] transition-all duration-300"
              >
                <FaInstagram size={14} />
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full border border-rose-500/16 scale-100 group-hover:scale-[1.35] group-hover:opacity-0 transition-all duration-500" />
              </motion.a>

              {/* Labels — desktop only */}
              <div className="hidden lg:flex items-center gap-3 pl-1">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#25D366]/60 hover:text-[#25D366]/90 transition-colors duration-200"
                >
                  WhatsApp
                </a>
                <span className="text-zinc-700">·</span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold tracking-[0.18em] uppercase text-rose-400/50 hover:text-rose-400/80 transition-colors duration-200"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* Coverage text + admin link — right */}
            <div className="flex items-center gap-3">
              <p className="hidden sm:block text-[9px] font-medium tracking-[0.18em] uppercase text-zinc-700 truncate">
                Reg. Arica · Iquique · Antofagasta &nbsp;·&nbsp; Envíos Chile
              </p>
              <Link
                href="/admin"
                className="flex items-center gap-1 px-2 py-1 rounded text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-all duration-200 group"
                aria-label="Administración"
              >
                <Lock size={10} className="group-hover:text-amber-500/70 transition-colors duration-200" />
                <span className="text-[9px] font-medium tracking-[0.15em] uppercase hidden sm:inline">Admin</span>
              </Link>
            </div>

          </div>
        </div>

        {/* ── MAIN NAVBAR ── */}
        <div className={`transition-all duration-500 ${
          scrolled ? "bg-black/92 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "bg-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <LogoMark size={30} className="opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="hidden sm:flex items-baseline gap-1.5">
              <span className="font-black tracking-[0.1em] text-white text-[13px] uppercase">Aluminios</span>
              <span className="font-thin text-[11px]" style={{ color: "#F59E0B", opacity: 0.7 }}>&amp;</span>
              <span className="font-black tracking-[0.1em] text-white text-[13px] uppercase">Redes</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`relative px-3 py-2 text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${
                location === "/" ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Inicio
              {location === "/" && (
                <motion.span layoutId="nav-indicator" className="absolute bottom-0 left-3 right-3 h-px bg-amber-500 rounded-full" />
              )}
            </Link>

            {/* Servicios dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 180)}
                className={`flex items-center gap-1 px-3 py-2 text-xs font-medium tracking-widest uppercase transition-colors duration-300 relative ${
                  isServicesActive ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                Servicios
                <ChevronDown size={12} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                {isServicesActive && (
                  <motion.span layoutId="nav-indicator" className="absolute bottom-0 left-3 right-3 h-px bg-amber-500 rounded-full" />
                )}
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full left-0 mt-2 w-60 rounded-2xl border border-white/8 bg-black/96 backdrop-blur-xl shadow-2xl overflow-hidden"
                  >
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className={`flex items-start gap-3 px-5 py-3.5 transition-all duration-200 ${
                          location === s.href
                            ? "bg-white/5 border-l-2 border-amber-500"
                            : "hover:bg-white/4 border-l-2 border-transparent"
                        }`}
                      >
                        <div>
                          <div className={`text-xs font-semibold ${location === s.href ? "text-white" : "text-zinc-300"}`}>
                            {s.label}
                          </div>
                          <div className="text-xs text-zinc-500 mt-0.5">{s.sub}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contacto"
              className={`relative px-3 py-2 text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${
                location === "/contacto" ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Contacto
              {location === "/contacto" && (
                <motion.span layoutId="nav-indicator" className="absolute bottom-0 left-3 right-3 h-px bg-amber-500 rounded-full" />
              )}
            </Link>

            <Link
              href="/pagos"
              className={`relative px-3 py-2 text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${
                location === "/pagos" ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Pagos
              {location === "/pagos" && (
                <motion.span layoutId="nav-indicator" className="absolute bottom-0 left-3 right-3 h-px bg-amber-500 rounded-full" />
              )}
            </Link>

            <Link
              href="/asistencia"
              className={`relative px-3 py-2 text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${
                location === "/asistencia" ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Asistencia Técnica
              {location === "/asistencia" && (
                <motion.span layoutId="nav-indicator" className="absolute bottom-0 left-3 right-3 h-px bg-amber-500 rounded-full" />
              )}
            </Link>

            <Link
              href="/medicion-ia"
              className={`relative flex items-center gap-1.5 px-3 py-2 text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                location === "/medicion-ia" ? "text-amber-400" : "text-amber-500/70 hover:text-amber-400"
              }`}
            >
              <Scan size={12} />
              Medición IA
              {location === "/medicion-ia" && (
                <motion.span layoutId="nav-indicator" className="absolute bottom-0 left-3 right-3 h-px bg-amber-500 rounded-full" />
              )}
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-green-400 border border-green-500/20 rounded hover:bg-green-500/8 transition-all duration-300"
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
            <Link
              href="/redes"
              className="px-5 py-2 text-xs font-bold tracking-widest uppercase bg-amber-500 text-black rounded hover:bg-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
            >
              Cotizar
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2" aria-label="Menú">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="fixed top-[100px] left-0 right-0 z-40 bg-black/97 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col gap-1 md:hidden"
          >
            <Link
              href="/"
              className={`px-3 py-3 rounded-lg text-sm font-medium uppercase tracking-widest transition-all ${
                location === "/" ? "text-white bg-white/5" : "text-zinc-400"
              }`}
            >
              Inicio
            </Link>
            <p className="px-3 pt-3 pb-1 text-xs text-zinc-600 font-bold tracking-widest uppercase">Servicios</p>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={`px-3 py-3 pl-5 rounded-lg text-sm font-medium tracking-wide transition-all ${
                  location === s.href ? "text-amber-400 bg-amber-500/8" : "text-zinc-400"
                }`}
              >
                {s.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className={`px-3 py-3 rounded-lg text-sm font-medium uppercase tracking-widest transition-all ${
                location === "/contacto" ? "text-white bg-white/5" : "text-zinc-400"
              }`}
            >
              Contacto
            </Link>
            <Link
              href="/pagos"
              className={`px-3 py-3 rounded-lg text-sm font-medium uppercase tracking-widest transition-all ${
                location === "/pagos" ? "text-amber-400 bg-amber-500/8" : "text-zinc-400"
              }`}
            >
              Pagos
            </Link>
            <Link
              href="/asistencia"
              className={`px-3 py-3 rounded-lg text-sm font-medium uppercase tracking-widest transition-all ${
                location === "/asistencia" ? "text-white bg-white/5" : "text-zinc-400"
              }`}
            >
              Asistencia Técnica
            </Link>
            <Link
              href="/medicion-ia"
              className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${
                location === "/medicion-ia" ? "text-amber-400 bg-amber-500/8" : "text-amber-500/70"
              }`}
            >
              <Scan size={15} /> Medición IA
            </Link>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold tracking-widest uppercase bg-[#25D366] text-white rounded"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold tracking-widest uppercase border border-white/8 text-zinc-400 rounded hover:border-rose-500/25 hover:text-rose-400 transition-all"
              >
                <FaInstagram size={14} /> Instagram
              </a>
              <Link
                href="/redes"
                className="px-5 py-3 text-xs font-bold tracking-widest uppercase bg-amber-500 text-black rounded text-center hover:bg-amber-400 transition-all"
              >
                Cotizar redes
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

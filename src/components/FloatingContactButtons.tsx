import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "../config";
import { track } from "../lib/analytics";

export default function FloatingContactButtons() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
    }

    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola, me comunico desde la web. Quisiera consultar sobre sus servicios."
  )}`;

  function handleWA() { track("whatsapp_click", { source: "floating_button" }); }
  function handleIG() { track("instagram_click", { source: "floating_button" }); }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
          className="fixed bottom-6 right-6 z-40 flex flex-row gap-3"
        >
          {/* WhatsApp */}
          <FloatBtn
            href={waHref}
            label="WhatsApp"
            delay={0}
            color="green"
            icon={<MessageCircle size={isMobile ? 50 : 46} className="text-white fill-white" />}
            bgClass="bg-[#25D366]"
            shadowClass="shadow-[#25D366]/40 whatsapp-enhanced"
            hoverBgClass="hover:bg-[#1ebe5d]"
            pingClass="bg-[#25D366]"
            labelClass="bg-[#25D366] text-white"
            onClick={handleWA}
            size={isMobile ? 95 : 82}
            bubbleText={"💬 ¡Cotiza Gratis!"}
          />

          {/* Instagram */}
          <FloatBtn
            href={INSTAGRAM_URL}
            label="Instagram"
            delay={0.12}
            color="rose"
            icon={<FaInstagram size={17} className="text-white" />}
            bgClass="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600"
            shadowClass="shadow-rose-500/35"
            hoverBgClass=""
            pingClass="bg-rose-500"
            labelClass="bg-gradient-to-r from-rose-500 to-purple-600 text-white"
            onClick={handleIG}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface FloatBtnProps {
  href: string;
  label: string;
  delay: number;
  color: string;
  icon: React.ReactNode;
  bgClass: string;
  shadowClass: string;
  hoverBgClass: string;
  pingClass: string;
  labelClass: string;
  onClick?: () => void;
  size?: number; // width/height in px, optional
  onHover?: () => void;
  onLeave?: () => void;
  bubbleText?: string;
}

function FloatBtn({ href, label, delay, icon, bgClass, shadowClass, hoverBgClass, pingClass, labelClass, onClick, size, onHover, onLeave, bubbleText }: FloatBtnProps) {
  const [hovered, setHovered] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const bubbleTimerRef = useRef<number | null>(null);
  const lastScrollY = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);

  const btnSize = size ?? 40; // default 40px (w-10 h-10)

  useEffect(() => {
    if (!bubbleText) return;

    // Show on first load for 5s
    setBubbleVisible(true);
    if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = window.setTimeout(() => setBubbleVisible(false), 5000);

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;

    function onVisibility() {
      if (document.visibilityState === 'visible' && isMobile) {
        setBubbleVisible(true);
        if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
        bubbleTimerRef.current = window.setTimeout(() => setBubbleVisible(false), 3000);
      }
    }

    function onScroll() {
      const y = window.scrollY;
      // detect scroll up
      if (isMobile && y < lastScrollY.current - 5) {
        setBubbleVisible(true);
        if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
        bubbleTimerRef.current = window.setTimeout(() => setBubbleVisible(false), 3000);
      }
      lastScrollY.current = y;
    }

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('scroll', onScroll);
      if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
    };
  }, [bubbleText]);

  useEffect(() => {
    if (hovered) {
      setBubbleVisible(true);
      if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
    } else {
      // hide shortly after mouse leaves
      if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
      bubbleTimerRef.current = window.setTimeout(() => setBubbleVisible(false), 400);
    }
  }, [hovered]);

  function handleMouseEnter() {
    setHovered(true);
    if (onHover) onHover();
  }

  function handleMouseLeave() {
    setHovered(false);
    if (onLeave) onLeave();
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Label tooltip — slides up on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className={`absolute bottom-[52px] left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg ${labelClass}`}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Bubble tooltip for WhatsApp (if provided) */}
      {bubbleText && (
        <div className={`wa-bubble ${bubbleVisible ? 'show' : ''}`} role="status" aria-hidden={!bubbleVisible}>
          <span className="wa-bubble-text">{bubbleText}</span>
          <span className="wa-bubble-arrow" aria-hidden="true" />
        </div>
      )}

      {/* Main button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onClick={onClick}
        // keep existing classes, but set explicit size to scale ~30% when requested
        className={`relative rounded-full flex items-center justify-center shadow-xl ${bgClass} ${shadowClass} ${hoverBgClass} hover:scale-110 hover:shadow-2xl transition-all duration-300`}
        style={{ width: `${btnSize}px`, height: `${btnSize}px` }}
      >
        {/* Ping ring */}
        <span className={`absolute inset-0 rounded-full ${pingClass} animate-ping opacity-[0.18]`} />
        <span className="relative z-10">{icon}</span>
      </a>
    </motion.div>
  );
}

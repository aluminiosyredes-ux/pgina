import type { LucideIcon } from "lucide-react";
import {
  Sun, Shield, Eye, Thermometer, Leaf,
  Cpu, Wifi, Mic, Clock, Home,
  Layers, Moon, Sliders, Contrast,
  Zap, Globe, Timer, Radio,
  Star, Package, Wrench, Gem,
} from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  tall?: boolean;
}

export interface PageBenefit {
  icon: LucideIcon;
  title: string;
  desc: string;
  detail: string;
  color: string;
  glow: string;
  border: string;
}

export interface PageVariant {
  name: string;
  tag: string;
  desc: string;
  accent: string;
  accentBorder: string;
  features: string[];
  waMsg: string;
}

export interface RollerPageConfig {
  slug: string;
  hideVariants?: boolean;
  heroTag: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroParagraph: string;
  heroSub: string;
  heroGlow: string;
  heroBrightness: string;
  accentColor: string;
  accentBorder: string;
  accentGlow: string;
  galleryHeadline: string;
  galleryHeadlineAccent: string;
  gallery: GalleryImage[];
  benefitsHeadline: string;
  benefitsHeadlineAccent: string;
  benefitsTag: string;
  benefits: PageBenefit[];
  variantsHeadline: string;
  variants: PageVariant[];
  ctaHeadline: string;
  ctaHeadlineAccent: string;
  ctaBody: string;
  waMsg: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUNSCREEN
// ─────────────────────────────────────────────────────────────────────────────

export const sunscreenConfig: RollerPageConfig = {
  slug: "sunscreen",
  hideVariants: true,
  heroTag: "Control solar · Apertura 1% — 10%",
  heroTitle: "Roller",
  heroTitleAccent: "Sunscreen.",
  heroParagraph: "Filtra el deslumbramiento y el calor solar sin perder la vista al exterior. Luz natural perfecta, todo el día.",
  heroSub: "Disponible en apertura 1%, 5% y 10%. Más de 60 colores a medida.",
  heroGlow: "bg-amber-500/[0.05]",
  heroBrightness: "brightness(0.35) saturate(0.70)",
  accentColor: "text-amber-400",
  accentBorder: "border-amber-500/20",
  accentGlow: "bg-amber-500/[0.06]",
  galleryHeadline: "Proyectos",
  galleryHeadlineAccent: "propios.",
  gallery: [
    {
      src: "/images/Screen1.jpeg",
      alt: "Instalación roller sunscreen — proyecto propio",
      caption: "Proyecto propio",
      tall: true,
    },
    {
      src: "/images/Screen2.jpg",
      alt: "Roller sunscreen instalado — control solar",
      caption: "Control solar real",
    },
    {
      src: "/images/Screen3.jpeg",
      alt: "Roller sunscreen — instalación profesional",
      caption: "Instalación profesional",
    },
    {
      src: "/images/Screen4.jpg",
      alt: "Roller sunscreen — resultado final premium",
      caption: "Resultado final",
      tall: true,
    },
  ],
  benefitsTag: "Por qué sunscreen",
  benefitsHeadline: "La luz justa.",
  benefitsHeadlineAccent: "Siempre.",
  benefits: [
    {
      icon: Sun,
      title: "Control solar inteligente",
      desc: "Reduce el calor y el deslumbramiento entre un 60% y 99% según apertura, sin cortar la conexión visual con el exterior.",
      detail: "Apertura 1%: máxima privacidad. Apertura 10%: luz abundante con control.",
      color: "text-amber-400",
      glow: "bg-amber-500/[0.05]",
      border: "border-amber-500/15",
    },
    {
      icon: Eye,
      title: "Vista al exterior preservada",
      desc: "A diferencia del blackout, la tela screen mantiene la visibilidad hacia afuera durante el día, con total privacidad desde el exterior.",
      detail: "Ideal para living, comedor, oficina y cualquier espacio con ventanales.",
      color: "text-sky-400",
      glow: "bg-sky-500/[0.05]",
      border: "border-sky-500/15",
    },
    {
      icon: Leaf,
      title: "Eficiencia energética",
      desc: "La tela screen reduce la ganancia de calor solar hasta un 55%, disminuyendo la necesidad de aire acondicionado y protegiendo muebles del UV.",
      detail: "Menor consumo energético, mayor durabilidad de tu mobiliario.",
      color: "text-emerald-400",
      glow: "bg-emerald-500/[0.05]",
      border: "border-emerald-500/15",
    },
  ],
  variantsHeadline: "Elige tu apertura.",
  variants: [
    {
      name: "Screen 5% — Arena",
      tag: "Más popular",
      desc: "El equilibrio perfecto. Apertura 5% en tono arena: reduce calor y deslumbramiento manteniendo una vista nítida al exterior de día.",
      accent: "bg-amber-500/[0.06]",
      accentBorder: "border-amber-500/20",
      features: ["Apertura 5%", "Reduce calor solar", "Vista clara al exterior", "+60 colores"],
      waMsg: "Hola, quisiera cotizar cortina roller screen 5% arena.",
    },
    {
      name: "Screen 1% — Negro",
      tag: "Alta privacidad",
      desc: "Apertura mínima del 1% para máxima protección visual. Tono negro que aporta sofisticación y filtra casi toda la radiación solar.",
      accent: "bg-zinc-500/[0.06]",
      accentBorder: "border-zinc-500/20",
      features: ["Apertura 1%", "Máxima privacidad", "Alta filtración UV", "Estética arquitectónica"],
      waMsg: "Hola, quisiera cotizar cortina roller screen 1% negro.",
    },
    {
      name: "Screen 10% — Gris",
      tag: "Luminoso",
      desc: "Mayor paso de luz natural con apertura 10%. Ideal para espacios que necesitan luminosidad pero sin el deslumbramiento directo.",
      accent: "bg-zinc-400/[0.04]",
      accentBorder: "border-zinc-400/15",
      features: ["Apertura 10%", "Luz natural abundante", "Control deslumbramiento", "Versátil"],
      waMsg: "Hola, quisiera cotizar cortina roller screen 10% gris.",
    },
  ],
  ctaHeadline: "Luz perfecta en",
  ctaHeadlineAccent: "cada ventana.",
  ctaBody: "Medición, fabricación a medida e instalación en las regiones de Arica, Iquique y Antofagasta. Sin intermediarios.",
  waMsg: "Hola, quisiera cotizar cortinas roller sunscreen.",
};

// ─────────────────────────────────────────────────────────────────────────────
// MOTORIZADAS
// ─────────────────────────────────────────────────────────────────────────────

export const motorizadasConfig: RollerPageConfig = {
  slug: "motorizadas",
  heroTag: "Smart Home · WiFi · Sin hub",
  heroTitle: "Cortinas",
  heroTitleAccent: "Motorizadas.",
  heroParagraph: "Motor silencioso integrado. Control desde tu smartphone, voz o botón. Compatible con Alexa, Google Home y Apple HomeKit.",
  heroSub: "Sin cableado adicional. Instalación profesional en cualquier tipo de ventana.",
  heroGlow: "bg-purple-500/[0.06]",
  heroBrightness: "brightness(0.30) saturate(0.55)",
  accentColor: "text-purple-400",
  accentBorder: "border-purple-500/20",
  accentGlow: "bg-purple-500/[0.06]",
  galleryHeadline: "Automatización",
  galleryHeadlineAccent: "sin límites.",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop",
      alt: "Control inteligente del hogar",
      caption: "Control desde cualquier lugar",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=900&q=85&fit=crop",
      alt: "Smart home moderno",
      caption: "Integración total",
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85&fit=crop",
      alt: "Tecnología y diseño",
      caption: "Motor ultra silencioso",
    },
    {
      src: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=1200&q=85&fit=crop",
      alt: "Hogar inteligente contemporáneo",
      caption: "Escenas automáticas",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=85&fit=crop",
      alt: "Control móvil inteligente",
      caption: "App Tuya / Smart Life",
    },
    {
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=85&fit=crop",
      alt: "Tecnología del futuro",
      caption: "Alexa & Google Home",
    },
  ],
  benefitsTag: "Por qué motorizar",
  benefitsHeadline: "Tu hogar,",
  benefitsHeadlineAccent: "inteligente.",
  benefits: [
    {
      icon: Wifi,
      title: "WiFi integrado · Sin hub",
      desc: "Motor con conectividad WiFi nativa. Se conecta directamente a tu red doméstica sin necesidad de puente o hub adicional.",
      detail: "Compatible con Tuya, Smart Life, Alexa, Google Home y Apple HomeKit.",
      color: "text-purple-400",
      glow: "bg-purple-500/[0.05]",
      border: "border-purple-500/15",
    },
    {
      icon: Mic,
      title: "Control por voz",
      desc: "Di el comando y tus cortinas se mueven. Integración nativa con los principales asistentes de voz del mercado sin configuraciones complejas.",
      detail: "'Alexa, cierra las cortinas del dormitorio.' Así de simple.",
      color: "text-sky-400",
      glow: "bg-sky-500/[0.05]",
      border: "border-sky-500/15",
    },
    {
      icon: Clock,
      title: "Programación horaria",
      desc: "Configurá apertura y cierre automático según el horario que prefieras. Ahorrá energía, simulá presencia y despertá con luz natural.",
      detail: "Múltiples escenas, grupos de cortinas y rutinas diarias desde la app.",
      color: "text-emerald-400",
      glow: "bg-emerald-500/[0.05]",
      border: "border-emerald-500/15",
    },
  ],
  variantsHeadline: "Elige tu combo.",
  variants: [
    {
      name: "Motor Tuya WiFi",
      tag: "Solo motor",
      desc: "Motor WiFi de alta precisión para instalar en tus cortinas roller existentes o nuevas. Ultra silencioso, instalación profesional incluida.",
      accent: "bg-purple-500/[0.06]",
      accentBorder: "border-purple-500/20",
      features: ["WiFi integrado", "Alexa & Google Home", "App Tuya / Smart Life", "Ultra silencioso"],
      waMsg: "Hola, quisiera cotizar motor WiFi Tuya para cortina roller.",
    },
    {
      name: "Combo Motor + Blackout",
      tag: "Más completo",
      desc: "Motor WiFi más tela blackout a medida en un solo servicio. Oscurecimiento total con automatización completa. La solución ideal para dormitorios.",
      accent: "bg-zinc-500/[0.06]",
      accentBorder: "border-zinc-500/20",
      features: ["Motor + tela incluida", "100% oscurecimiento", "Instalación profesional", "Garantía total"],
      waMsg: "Hola, quisiera cotizar combo motor WiFi con tela blackout.",
    },
    {
      name: "Combo Motor + Screen",
      tag: "Para oficinas",
      desc: "Motor WiFi más tela screen de tu elección. Control por horario o sensor de luz. Ideal para espacios de trabajo y livings con ventanales.",
      accent: "bg-amber-500/[0.05]",
      accentBorder: "border-amber-500/15",
      features: ["Motor + tela screen", "Control por horario", "Sensor de luz opcional", "Para oficinas y livings"],
      waMsg: "Hola, quisiera cotizar combo motor WiFi con tela screen.",
    },
  ],
  ctaHeadline: "Automatiza tu espacio",
  ctaHeadlineAccent: "hoy mismo.",
  ctaBody: "Instalación profesional en las regiones de Arica, Iquique y Antofagasta. Compatible con cualquier cortina roller, nueva o existente.",
  waMsg: "Hola, quisiera cotizar cortinas roller motorizadas.",
};

// ─────────────────────────────────────────────────────────────────────────────
// DÚO
// ─────────────────────────────────────────────────────────────────────────────

export const duoConfig: RollerPageConfig = {
  slug: "duo",
  heroTag: "Día / Noche · Doble tela",
  heroTitle: "Cortinas",
  heroTitleAccent: "Dúo.",
  heroParagraph: "Doble tela que alterna franjas opacas y traslúcidas. Regulá la luz de forma gradual con un solo movimiento. Elegancia y funcionalidad en perfecta armonía.",
  heroSub: "Mecanismo de precisión silencioso. Versión cadena o motorizada.",
  heroGlow: "bg-sky-500/[0.05]",
  heroBrightness: "brightness(0.33) saturate(0.65)",
  accentColor: "text-sky-400",
  accentBorder: "border-sky-500/20",
  accentGlow: "bg-sky-500/[0.06]",
  galleryHeadline: "Luz que se",
  galleryHeadlineAccent: "gradúa.",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&q=85&fit=crop",
      alt: "Dormitorio elegante con cortina dúo",
      caption: "Luz gradual perfecta",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=900&q=85&fit=crop",
      alt: "Interior minimalista con luz difusa",
      caption: "Privacidad diurna",
    },
    {
      src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=85&fit=crop",
      alt: "Sala de estar moderna nórdica",
      caption: "Estética nórdica",
    },
    {
      src: "https://images.unsplash.com/photo-1567225557594-88d73398c928?w=1200&q=85&fit=crop",
      alt: "Habitación de lujo con luz controlada",
      caption: "Ambiente sofisticado",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=85&fit=crop",
      alt: "Living contemporáneo iluminado",
      caption: "Control total",
    },
    {
      src: "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=900&q=85&fit=crop",
      alt: "Espacio residencial premium",
      caption: "Fabricado a medida",
    },
  ],
  benefitsTag: "Por qué dúo",
  benefitsHeadline: "El control total",
  benefitsHeadlineAccent: "de la luz.",
  benefits: [
    {
      icon: Contrast,
      title: "Doble tela integrada",
      desc: "Un único sistema que combina franjas opacas y traslúcidas alineables. Pasás de luz difusa suave a privacidad total con un solo movimiento.",
      detail: "Sin necesidad de dos cortinas separadas ni rieles dobles.",
      color: "text-sky-400",
      glow: "bg-sky-500/[0.05]",
      border: "border-sky-500/15",
    },
    {
      icon: Sliders,
      title: "Regulación gradual",
      desc: "Elegís el punto exacto de luz: desde máxima apertura hasta oscurecimiento casi total. Control milimétrico del ambiente en cualquier momento del día.",
      detail: "Ideal para livings, dormitorios y espacios que cambian de uso durante el día.",
      color: "text-purple-400",
      glow: "bg-purple-500/[0.05]",
      border: "border-purple-500/15",
    },
    {
      icon: Layers,
      title: "Diseño moderno premium",
      desc: "Acabado textil sofisticado con mecanismo de cadena silencioso o motor WiFi. Estética contemporánea que eleva cualquier espacio interior.",
      detail: "Disponible en combinaciones blanco/lino, gris/blanco y más de 20 paletas.",
      color: "text-amber-400",
      glow: "bg-amber-500/[0.05]",
      border: "border-amber-500/15",
    },
  ],
  variantsHeadline: "Elige tu combinación.",
  variants: [
    {
      name: "Dúo Blanco / Lino",
      tag: "Más elegante",
      desc: "Combinación clásica de franjas blancas opacas con franjas lino traslúcidas. Acabado premium, mecanismo silencioso de alta precisión. La elección más versátil.",
      accent: "bg-sky-500/[0.05]",
      accentBorder: "border-sky-500/18",
      features: ["Doble tela integrada", "Control gradual de luz", "Mecanismo silencioso", "Fabricación a medida"],
      waMsg: "Hola, quisiera cotizar cortina dúo blanco/lino.",
    },
    {
      name: "Dúo Motorizado",
      tag: "Smart · WiFi",
      desc: "Sistema dúo con motor WiFi integrado. Control desde app, voz o control remoto. Ideal para ventanas altas o de difícil acceso.",
      accent: "bg-purple-500/[0.05]",
      accentBorder: "border-purple-500/18",
      features: ["Motor WiFi integrado", "Control por voz", "Alexa & Google Home", "Ventanas altas"],
      waMsg: "Hola, quisiera cotizar cortina dúo motorizada.",
    },
    {
      name: "Dúo Gris / Blanco",
      tag: "Nórdico",
      desc: "Estética moderna en gris y blanco. Perfecta para ambientes nórdicos y minimalistas. Misma funcionalidad excepcional, otra paleta.",
      accent: "bg-zinc-400/[0.04]",
      accentBorder: "border-zinc-400/15",
      features: ["Tono gris + blanco", "Estética nórdica", "Luz difusa suave", "A medida"],
      waMsg: "Hola, quisiera cotizar cortina dúo gris/blanco.",
    },
  ],
  ctaHeadline: "Elegancia y luz,",
  ctaHeadlineAccent: "en equilibrio.",
  ctaBody: "La cortina dúo combina lo mejor del diseño escandinavo con funcionalidad real. Presupuesto sin costo.",
  waMsg: "Hola, quisiera cotizar cortinas dúo.",
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────

export const automatizacionConfig: RollerPageConfig = {
  slug: "automatizacion",
  heroTag: "Smart Home · Escenas · Grupos",
  heroTitle: "Automatización",
  heroTitleAccent: "Roller.",
  heroParagraph: "Integrá tus cortinas a tu ecosistema inteligente. Escenas automáticas, programaciones horarias y control grupal desde una sola app.",
  heroSub: "Compatible con Alexa, Google Home, Apple HomeKit y Tuya. Sin hub.",
  heroGlow: "bg-emerald-500/[0.05]",
  heroBrightness: "brightness(0.28) saturate(0.50)",
  accentColor: "text-emerald-400",
  accentBorder: "border-emerald-500/20",
  accentGlow: "bg-emerald-500/[0.06]",
  galleryHeadline: "El hogar que",
  galleryHeadlineAccent: "te anticipa.",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=85&fit=crop",
      alt: "Control inteligente del hogar",
      caption: "Ecosistema inteligente",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=85&fit=crop",
      alt: "Tecnología smart home",
      caption: "Automatización total",
    },
    {
      src: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=900&q=85&fit=crop",
      alt: "Apartamento automatizado moderno",
      caption: "Control sin límites",
    },
    {
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=85&fit=crop",
      alt: "Control desde smartphone",
      caption: "Desde cualquier lugar",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85&fit=crop",
      alt: "Circuitos tecnológicos modernos",
      caption: "Integración nativa",
    },
    {
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=85&fit=crop",
      alt: "Código y tecnología moderna",
      caption: "Programmación avanzada",
    },
  ],
  benefitsTag: "Por qué automatizar",
  benefitsHeadline: "Rutinas que",
  benefitsHeadlineAccent: "trabajan por vos.",
  benefits: [
    {
      icon: Home,
      title: "Integración ecosistema completo",
      desc: "Conectá tus cortinas al mismo ecosistema que tu iluminación, termostato y seguridad. Todo desde una sola app o pantalla de control.",
      detail: "Compatible con Alexa, Google Home, Apple HomeKit, Tuya y Samsung SmartThings.",
      color: "text-emerald-400",
      glow: "bg-emerald-500/[0.05]",
      border: "border-emerald-500/15",
    },
    {
      icon: Timer,
      title: "Programaciones automáticas",
      desc: "Configurá el amanecer y el atardecer de tus cortinas. Apertura progresiva matutina, cierre automático al anochecer, simulación de presencia.",
      detail: "Rutinas semanales, estacionales y por zona geográfica disponibles.",
      color: "text-sky-400",
      glow: "bg-sky-500/[0.05]",
      border: "border-sky-500/15",
    },
    {
      icon: Radio,
      title: "Control grupal e individual",
      desc: "Mové todas las cortinas de una habitación, un piso entero o la casa completa con un solo comando. O ajustá cada una por separado.",
      detail: "Escenas personalizadas: 'Cine', 'Buenos días', 'Salir de casa', etc.",
      color: "text-purple-400",
      glow: "bg-purple-500/[0.05]",
      border: "border-purple-500/15",
    },
  ],
  variantsHeadline: "Elige tu integración.",
  variants: [
    {
      name: "Alexa / Google Home",
      tag: "Control por voz",
      desc: "Conectamos tus cortinas motorizadas con tu asistente de voz favorito. Comandos naturales, rutinas diarias y escenas automatizadas.",
      accent: "bg-emerald-500/[0.05]",
      accentBorder: "border-emerald-500/18",
      features: ["Amazon Alexa", "Google Home", "Apple HomeKit", "Rutinas automáticas"],
      waMsg: "Hola, quisiera integrar mis cortinas con Alexa/Google Home.",
    },
    {
      name: "Programación Horaria",
      tag: "Programable",
      desc: "Cortinas que se abren y cierran solas en el horario que vos definís. Ahorrá energía, protegé tus muebles y despertá con luz natural.",
      accent: "bg-sky-500/[0.05]",
      accentBorder: "border-sky-500/18",
      features: ["Horarios personalizados", "Ahorro energético", "Simulación de presencia", "Multi-zona"],
      waMsg: "Hola, quisiera configurar programación horaria para mis cortinas.",
    },
    {
      name: "Control Multi-zona",
      tag: "Toda la casa",
      desc: "Instalación y configuración de múltiples cortinas motorizadas en distintas habitaciones con control unificado desde una sola app.",
      accent: "bg-purple-500/[0.05]",
      accentBorder: "border-purple-500/18",
      features: ["Múltiples habitaciones", "Control unificado", "Escenas por zona", "Instalación profesional"],
      waMsg: "Hola, quisiera consultar automatización multi-zona para toda mi casa.",
    },
  ],
  ctaHeadline: "Tu casa, en",
  ctaHeadlineAccent: "modo automático.",
  ctaBody: "Instalamos y configuramos todo tu ecosistema de cortinas inteligentes. Asesoramiento gratuito en las regiones de Arica, Iquique y Antofagasta.",
  waMsg: "Hola, quisiera consultar automatización de cortinas roller.",
};

// ─────────────────────────────────────────────────────────────────────────────
// PREMIUM
// ─────────────────────────────────────────────────────────────────────────────

export const zebraConfig: RollerPageConfig = {
  slug: "zebra",
  heroTag: "Día / Noche · Doble tela",
  heroTitle: "Roller",
  heroTitleAccent: "Zebra.",
  heroParagraph: "Franjas traslúcidas y opacas que se intercalan con precisión. Controlá la luz de forma gradual, desde total privacidad hasta máxima luminosidad.",
  heroSub: "Disponible en cadena o motorizado. Fabricación 100% a medida.",
  heroGlow: "bg-amber-400/[0.06]",
  heroBrightness: "brightness(0.32) saturate(0.60)",
  accentColor: "text-amber-300",
  accentBorder: "border-amber-400/22",
  accentGlow: "bg-amber-400/[0.06]",
  hideVariants: true,
  galleryHeadline: "Luz que obedece",
  galleryHeadlineAccent: "tu ritmo.",
  gallery: [
    {
      src: "/images/zebra1.jpg",
      alt: "Roller Zebra instalado — proyecto residencial",
      caption: "Control de luz gradual",
      tall: true,
    },
    {
      src: "/images/zebra3.jfif",
      alt: "Roller Zebra en espacio contemporáneo",
      caption: "Doble tela premium",
    },
    {
      src: "/images/zebra4.jfif",
      alt: "Detalle Roller Zebra — franjas traslúcidas",
      caption: "Fabricación a medida",
    },
  ],
  benefitsTag: "Por qué roller zebra",
  benefitsHeadline: "Un sistema,",
  benefitsHeadlineAccent: "mil ambientes.",
  benefits: [
    {
      icon: Contrast,
      title: "Control gradual de luz",
      desc: "Las franjas traslúcidas y opacas se alinean o desalinean con precisión milimétrica. Pasás de luz difusa suave a privacidad casi total con un solo movimiento.",
      detail: "Sin necesidad de dos cortinas separadas. Un solo riel, total funcionalidad.",
      color: "text-amber-300",
      glow: "bg-amber-400/[0.05]",
      border: "border-amber-400/18",
    },
    {
      icon: Layers,
      title: "Diseño contemporáneo premium",
      desc: "El efecto visual de las franjas aporta profundidad y elegancia a cualquier espacio. Acabado textil de alto estándar disponible en múltiples combinaciones de color.",
      detail: "Ideal para livings, comedores, dormitorios y oficinas de diseño.",
      color: "text-zinc-300",
      glow: "bg-zinc-500/[0.05]",
      border: "border-zinc-500/15",
    },
    {
      icon: Sliders,
      title: "Privacidad sin perder luminosidad",
      desc: "Con las franjas alineadas conseguís privacidad diurna total. Al desalinearlas, la luz entra de forma difusa y cálida. El equilibrio perfecto para cada momento del día.",
      detail: "A diferencia del blackout, conserva siempre un ambiente luminoso y agradable.",
      color: "text-emerald-400",
      glow: "bg-emerald-500/[0.05]",
      border: "border-emerald-500/15",
    },
  ],
  variantsHeadline: "Elige tu combinación.",
  variants: [
    {
      name: "Zebra Blanco / Lino",
      tag: "Más popular",
      desc: "La combinación clásica de franjas blancas opacas con franjas lino traslúcidas. Estética cálida y contemporánea que integra cualquier paleta de interiores.",
      accent: "bg-amber-400/[0.06]",
      accentBorder: "border-amber-400/22",
      features: ["Franjas blanco + lino", "Luz difusa cálida", "Estética premium", "Fabricación a medida"],
      waMsg: "Hola, quisiera cotizar cortina roller zebra blanco/lino.",
    },
    {
      name: "Zebra Gris / Blanco",
      tag: "Minimalista",
      desc: "Tono gris moderno intercalado con franjas blancas. Perfecta para ambientes nórdicos y minimalistas que buscan neutralidad y sofisticación.",
      accent: "bg-zinc-400/[0.04]",
      accentBorder: "border-zinc-400/15",
      features: ["Franjas gris + blanco", "Estética nórdica", "Luz difusa suave", "A medida"],
      waMsg: "Hola, quisiera cotizar cortina roller zebra gris/blanco.",
    },
    {
      name: "Zebra Motorizada",
      tag: "Smart · WiFi",
      desc: "Sistema zebra con motor WiFi integrado. Control desde app, voz o control remoto. Ideal para ventanas altas o espacios donde el diseño es protagonista.",
      accent: "bg-emerald-500/[0.04]",
      accentBorder: "border-emerald-500/15",
      features: ["Motor WiFi integrado", "Alexa & Google Home", "Control por voz", "Instalación profesional"],
      waMsg: "Hola, quisiera cotizar cortina roller zebra motorizada.",
    },
  ],
  ctaHeadline: "Luz y privacidad",
  ctaHeadlineAccent: "en perfecto equilibrio.",
  ctaBody: "Fabricación a medida, instalación profesional en las regiones de Arica, Iquique y Antofagasta. Medición sin costo.",
  waMsg: "Hola, quisiera cotizar cortinas roller zebra.",
};

export const rollerPageConfigs: Record<string, RollerPageConfig> = {
  sunscreen: sunscreenConfig,
  motorizadas: motorizadasConfig,
  duo: duoConfig,
  automatizacion: automatizacionConfig,
  zebra: zebraConfig,
};

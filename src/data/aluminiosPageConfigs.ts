import type { LucideIcon } from "lucide-react";
import {
  Sun, Thermometer, Maximize2, Eye,
  Wind, Shield, Layers,
  LayoutGrid, Lightbulb, Move,
  Sliders, Star, Package, Wrench,
  Trees, Droplets, Zap,
  Frame, Globe, ShieldCheck,
} from "lucide-react";

export interface AlGalleryImage {
  src: string;
  alt: string;
  caption: string;
  tall?: boolean;
}

export interface AlBenefit {
  icon: LucideIcon;
  title: string;
  desc: string;
  detail: string;
  color: string;
  glow: string;
  border: string;
}

export interface AlVariant {
  name: string;
  tag: string;
  desc: string;
  accent: string;
  accentBorder: string;
  features: string[];
  waMsg: string;
}

export interface AluminiosPageConfig {
  slug: string;
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
  gallery: AlGalleryImage[];
  benefitsTag: string;
  benefitsHeadline: string;
  benefitsHeadlineAccent: string;
  benefits: AlBenefit[];
  variantsHeadline: string;
  variants: AlVariant[];
  ctaHeadline: string;
  ctaHeadlineAccent: string;
  ctaBody: string;
  waMsg: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// VENTANALES
// ─────────────────────────────────────────────────────────────────────────────

export const ventanalesConfig: AluminiosPageConfig = {
  slug: "ventanales",
  heroTag: "Piso a techo · DVH · Slim",
  heroTitle: "Ventanales de",
  heroTitleAccent: "Aluminio.",
  heroParagraph: "Grandes paños de vidrio con perfiles de aluminio de precisión. Luz natural máxima, integración visual total con el exterior y estética arquitectónica impecable.",
  heroSub: "Fabricación a medida. DVH 4/9/4 o 4/12/4. Perfil slim minimalista.",
  heroGlow: "bg-zinc-400/[0.05]",
  heroBrightness: "brightness(0.30) saturate(0.60)",
  accentColor: "text-zinc-300",
  accentBorder: "border-zinc-500/20",
  accentGlow: "bg-zinc-500/[0.06]",
  galleryHeadline: "Arquitectura y",
  galleryHeadlineAccent: "luz natural.",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop",
      alt: "Living moderno con ventanales piso a techo",
      caption: "Luz natural total",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=85&fit=crop",
      alt: "Interior contemporáneo con ventanal",
      caption: "Integración interior-exterior",
    },
    {
      src: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=900&q=85&fit=crop",
      alt: "Arquitectura moderna con fachada de vidrio",
      caption: "Perfil slim arquitectónico",
    },
    {
      src: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=85&fit=crop",
      alt: "Casa moderna con ventanales",
      caption: "Proyectos residenciales",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=85&fit=crop",
      alt: "Espacio luminoso contemporáneo",
      caption: "Aislación DVH",
    },
    {
      src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=85&fit=crop",
      alt: "Interior minimalista con grandes ventanas",
      caption: "Fabricación a medida",
    },
  ],
  benefitsTag: "Por qué ventanales de aluminio",
  benefitsHeadline: "Luz, vista",
  benefitsHeadlineAccent: "y arquitectura.",
  benefits: [
    {
      icon: Sun,
      title: "Máxima luz natural",
      desc: "Perfiles slim que minimizan el marco y maximizan el paso de luz. Los ventanales de piso a techo transforman cualquier espacio, haciéndolo más amplio y luminoso.",
      detail: "Ideal para livings, comedores, dormitorios y espacios de trabajo con vista.",
      color: "text-zinc-300",
      glow: "bg-zinc-500/[0.05]",
      border: "border-zinc-500/15",
    },
    {
      icon: Thermometer,
      title: "Aislación DVH certificada",
      desc: "Doble vidriado hermético con cámara de aire que reduce la transferencia térmica en hasta un 60% respecto al vidrio simple. Menos frío, menos calor, menos ruido.",
      detail: "DVH 4/9/4 estándar o 4/12/4 para mayor performance. Sellado perimetral total.",
      color: "text-sky-400",
      glow: "bg-sky-500/[0.05]",
      border: "border-sky-500/15",
    },
    {
      icon: Maximize2,
      title: "Integración interior-exterior",
      desc: "El ventanal no solo deja pasar la luz: crea una continuidad visual entre el interior y el entorno que eleva el valor estético y funcional del espacio.",
      detail: "Disponible en perfiles natural, blanco, negro lacado y colores especiales.",
      color: "text-amber-400",
      glow: "bg-amber-500/[0.05]",
      border: "border-amber-500/15",
    },
  ],
  variantsHeadline: "Elige tu sistema.",
  variants: [
    {
      name: "Ventanal Fijo DVH — Piso a Techo",
      tag: "Más solicitado",
      desc: "Perfil slim con doble vidriado hermético. Bloqueo de ruido, aislación térmica y máxima transparencia visual. El más elegante y eficiente.",
      accent: "bg-zinc-500/[0.06]",
      accentBorder: "border-zinc-500/20",
      features: ["DVH 4/9/4 o 4/12/4", "Perfil slim minimalista", "Sellado perimetral", "Fabricación a medida"],
      waMsg: "Hola, quisiera cotizar ventanal fijo DVH piso a techo.",
    },
    {
      name: "Ventanal Proyectante",
      tag: "Residencial",
      desc: "Apertura hacia el exterior con sellado reforzado. Ventilación controlada sin comprometer la seguridad. Ideal para departamentos en altura.",
      accent: "bg-sky-500/[0.05]",
      accentBorder: "border-sky-500/18",
      features: ["Apertura proyectante", "Seguridad en altura", "Sellado reforzado", "Compatible DVH"],
      waMsg: "Hola, quisiera cotizar ventanal proyectante de aluminio.",
    },
    {
      name: "Ventanal Abatible",
      tag: "Versátil",
      desc: "Apertura total hacia el interior para fácil limpieza y máxima ventilación. Cierre multipunto disponible, lacado al horno.",
      accent: "bg-amber-500/[0.04]",
      accentBorder: "border-amber-500/15",
      features: ["Apertura total", "Cierre multipunto", "Lacado al horno", "DVH opcional"],
      waMsg: "Hola, quisiera cotizar ventanal abatible de aluminio.",
    },
  ],
  ctaHeadline: "Abrí tu espacio",
  ctaHeadlineAccent: "a la luz.",
  ctaBody: "Relevamiento sin costo, fabricación a medida e instalación profesional en las regiones de Arica, Iquique y Antofagasta.",
  waMsg: "Hola, quisiera cotizar ventanales de aluminio.",
};

// ─────────────────────────────────────────────────────────────────────────────
// CIERRES DE TERRAZA
// ─────────────────────────────────────────────────────────────────────────────

export const cierresTerrazaConfig: AluminiosPageConfig = {
  slug: "cierres-terraza",
  heroTag: "Outdoor · Balcones · Galerías",
  heroTitle: "Cierres de",
  heroTitleAccent: "Terraza.",
  heroParagraph: "Cerramos balcones, terrazas y galerías con aluminio y vidrio de calidad. Protección total del viento, lluvia y frío sin sacrificar la vista ni la luminosidad.",
  heroSub: "Para departamentos, casas y edificios. Con o sin apertura.",
  heroGlow: "bg-sky-500/[0.05]",
  heroBrightness: "brightness(0.28) saturate(0.55)",
  accentColor: "text-sky-400",
  accentBorder: "border-sky-500/20",
  accentGlow: "bg-sky-500/[0.06]",
  galleryHeadline: "Terrazas que",
  galleryHeadlineAccent: "se viven todo el año.",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85&fit=crop",
      alt: "Terraza moderna con cierre de vidrio",
      caption: "Vista sin obstáculos",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=900&q=85&fit=crop",
      alt: "Balcón contemporáneo cerrado",
      caption: "Protección total",
    },
    {
      src: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=900&q=85&fit=crop",
      alt: "Espacio exterior protegido",
      caption: "Todo el año aprovechable",
    },
    {
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85&fit=crop",
      alt: "Galería exterior de lujo",
      caption: "Diseño panorámico",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1560449017-4c77a88fc4ca?w=900&q=85&fit=crop",
      alt: "Terraza minimalista con vidrio",
      caption: "Sin obra mayor",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=900&q=85&fit=crop",
      alt: "Cierre de terraza moderno",
      caption: "Instalación limpia",
    },
  ],
  benefitsTag: "Por qué cerrar tu terraza",
  benefitsHeadline: "Tu terraza,",
  benefitsHeadlineAccent: "todo el año.",
  benefits: [
    {
      icon: Wind,
      title: "Protección total del clima",
      desc: "Cierra el viento, la lluvia, el polvo y el frío con una estructura de aluminio y vidrio templado. Tu terraza o balcón se convierte en un espacio habitable en cualquier temporada.",
      detail: "Certificado para edificios y condominios. Sin daño a la estructura existente.",
      color: "text-sky-400",
      glow: "bg-sky-500/[0.05]",
      border: "border-sky-500/15",
    },
    {
      icon: Eye,
      title: "Vista panorámica preservada",
      desc: "Los sistemas de vidrio templado o DVH mantienen la visibilidad total hacia el exterior. Sin perder la vista que hizo elegir ese departamento o casa.",
      detail: "Vidrio 6mm templado estándar o DVH para mayor aislación térmica y acústica.",
      color: "text-zinc-300",
      glow: "bg-zinc-500/[0.05]",
      border: "border-zinc-500/15",
    },
    {
      icon: Shield,
      title: "Sin obra mayor",
      desc: "Instalación limpia y eficiente que no requiere demolición ni permisos de obra mayor en la mayoría de los casos. Compatible con todos los tipos de edificios.",
      detail: "Aprobado por administraciones de edificios y condominios en las regiones de Arica, Iquique y Antofagasta.",
      color: "text-emerald-400",
      glow: "bg-emerald-500/[0.05]",
      border: "border-emerald-500/15",
    },
  ],
  variantsHeadline: "Elige tu sistema.",
  variants: [
    {
      name: "Cierre Corredera — Balcón",
      tag: "Más popular",
      desc: "Paños de vidrio templado correderos en perfil de aluminio. Apertura total o parcial según prefieras. Ideal para departamentos y balcones urbanos.",
      accent: "bg-sky-500/[0.06]",
      accentBorder: "border-sky-500/20",
      features: ["Vidrio templado 6mm", "Apertura corredera", "Sin obra mayor", "Para edificios"],
      waMsg: "Hola, quisiera cotizar cierre de balcón sistema corredera.",
    },
    {
      name: "Cerramiento Fijo con Ventilación",
      tag: "Protección total",
      desc: "Estructura fija con secciones de ventilación controlada. Para terrazas y galerías que requieren máxima protección sin perder aireación natural.",
      accent: "bg-zinc-500/[0.05]",
      accentBorder: "border-zinc-500/18",
      features: ["Estructura fija", "Ventilación controlada", "DVH disponible", "A medida"],
      waMsg: "Hola, quisiera cotizar cerramiento de terraza fijo con ventilación.",
    },
    {
      name: "Galería Aluminio + Policarbonato",
      tag: "Liviano",
      desc: "Perfil de aluminio con cubierta de policarbonato alveolar. Ultra liviana, resistente a la lluvia y con excelente transmisión de luz natural.",
      accent: "bg-amber-500/[0.04]",
      accentBorder: "border-amber-500/15",
      features: ["Policarbonato alveolar", "100% impermeable", "Muy liviano", "Instalación rápida"],
      waMsg: "Hola, quisiera cotizar galería de aluminio con policarbonato.",
    },
  ],
  ctaHeadline: "Aprovechá tu terraza",
  ctaHeadlineAccent: "los 365 días.",
  ctaBody: "Relevamiento sin costo en tu domicilio. Fabricamos e instalamos en las regiones de Arica, Iquique y Antofagasta.",
  waMsg: "Hola, quisiera cotizar un cierre de terraza o balcón.",
};

// ─────────────────────────────────────────────────────────────────────────────
// DIVISIONES INTERIORES
// ─────────────────────────────────────────────────────────────────────────────

export const divisionesConfig: AluminiosPageConfig = {
  slug: "divisiones",
  heroTag: "Oficinas · Residencial · Modular",
  heroTitle: "Divisiones",
  heroTitleAccent: "Interiores.",
  heroParagraph: "Mamparas y tabiques de aluminio y vidrio que rediseñan espacios sin obra pesada. Luminosidad, diseño y funcionalidad en un solo sistema modular.",
  heroSub: "Para oficinas, locales y hogares. Instalación limpia y rápida.",
  heroGlow: "bg-purple-500/[0.05]",
  heroBrightness: "brightness(0.28) saturate(0.50)",
  accentColor: "text-purple-400",
  accentBorder: "border-purple-500/20",
  accentGlow: "bg-purple-500/[0.06]",
  galleryHeadline: "Espacios que se",
  galleryHeadlineAccent: "reinventan.",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&fit=crop",
      alt: "Oficina moderna con divisiones de vidrio",
      caption: "Ambientes de trabajo premium",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85&fit=crop",
      alt: "Mampara de vidrio contemporánea",
      caption: "Sin perder luminosidad",
    },
    {
      src: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=900&q=85&fit=crop",
      alt: "División interior arquitectónica",
      caption: "Diseño modular",
    },
    {
      src: "https://images.unsplash.com/photo-1497366754035-f200581393ab?w=1200&q=85&fit=crop",
      alt: "Sala de reunión con vidrio",
      caption: "Privacidad visual",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85&fit=crop",
      alt: "Espacio de trabajo con luz natural",
      caption: "Sin obra pesada",
    },
    {
      src: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=900&q=85&fit=crop",
      alt: "Interior contemporáneo dividido",
      caption: "Fabricación a medida",
    },
  ],
  benefitsTag: "Por qué divisiones de aluminio",
  benefitsHeadline: "Rediseñá el espacio",
  benefitsHeadlineAccent: "sin demoler.",
  benefits: [
    {
      icon: LayoutGrid,
      title: "Sin obra pesada",
      desc: "Los sistemas de aluminio y vidrio se instalan en pocas horas sin demolición, sin escombros y sin permisos de construcción. El espacio queda listo de inmediato.",
      detail: "Ideal para reformas de oficinas, locales comerciales y residencias.",
      color: "text-purple-400",
      glow: "bg-purple-500/[0.05]",
      border: "border-purple-500/15",
    },
    {
      icon: Lightbulb,
      title: "Luminosidad conservada",
      desc: "El vidrio templado mantiene la circulación de luz natural entre ambientes. Espacios divididos que siguen sintiéndose amplios, abiertos y conectados visualmente.",
      detail: "Disponible en vidrio claro, satinado o laminado según el nivel de privacidad deseado.",
      color: "text-amber-400",
      glow: "bg-amber-500/[0.05]",
      border: "border-amber-500/15",
    },
    {
      icon: Move,
      title: "Modular y ampliable",
      desc: "Los módulos se pueden ampliar, mover o reconfigurar en el futuro. Una inversión que se adapta a los cambios del espacio y la empresa.",
      detail: "Sistema compatible entre distintos proyectos. Reutilizable y reciclable.",
      color: "text-sky-400",
      glow: "bg-sky-500/[0.05]",
      border: "border-sky-500/15",
    },
  ],
  variantsHeadline: "Elige tu tipo de división.",
  variants: [
    {
      name: "Mampara de Vidrio — Oficina",
      tag: "Corporativo",
      desc: "División modular con perfil slim y vidrio templado 8mm. Separa ambientes con elegancia manteniendo la luz y la visibilidad. Ideal para salas de reunión.",
      accent: "bg-purple-500/[0.06]",
      accentBorder: "border-purple-500/20",
      features: ["Perfil aluminio slim", "Vidrio templado 8mm", "Modular y ampliable", "Sin obra pesada"],
      waMsg: "Hola, quisiera cotizar mamparas de vidrio para oficina.",
    },
    {
      name: "Tabique Mixto Aluminio",
      tag: "Mixto",
      desc: "Panel sólido en la parte inferior y vidrio en la superior. Privacidad parcial con paso de luz. Perfecto para oficinas que necesitan separación sin aislamiento total.",
      accent: "bg-zinc-500/[0.05]",
      accentBorder: "border-zinc-500/18",
      features: ["Panel inferior sólido", "Vidrio superior", "Alta privacidad", "Diseño premium"],
      waMsg: "Hola, quisiera cotizar tabique mixto de aluminio.",
    },
    {
      name: "División Residencial",
      tag: "Residencial",
      desc: "Mampara de vidrio para separar ambientes en casa: baños, vestidores, cocinas abiertas. Diseño minimalista que no sacrifica luminosidad.",
      accent: "bg-amber-500/[0.04]",
      accentBorder: "border-amber-500/15",
      features: ["Para uso residencial", "Vidrio templado", "Diseño minimalista", "A medida"],
      waMsg: "Hola, quisiera cotizar división residencial de aluminio y vidrio.",
    },
  ],
  ctaHeadline: "Transforma tu espacio",
  ctaHeadlineAccent: "sin demoler.",
  ctaBody: "Diseñamos, fabricamos e instalamos tu división interior en las regiones de Arica, Iquique y Antofagasta. Relevamiento sin costo.",
  waMsg: "Hola, quisiera cotizar divisiones interiores de aluminio.",
};

// ─────────────────────────────────────────────────────────────────────────────
// PROYECTOS PREMIUM
// ─────────────────────────────────────────────────────────────────────────────

export const premiumAlConfig: AluminiosPageConfig = {
  slug: "premium",
  heroTag: "Línea exclusiva · Alto estándar",
  heroTitle: "Proyectos",
  heroTitleAccent: "Premium.",
  heroParagraph: "Para proyectos residenciales, comerciales y de edificio que exigen lo mejor. Perfiles de importación, vidrios de alta prestación y gestión integral de inicio a fin.",
  heroSub: "Coordinación con arquitectos, constructoras y diseñadores.",
  heroGlow: "bg-amber-400/[0.06]",
  heroBrightness: "brightness(0.27) saturate(0.55)",
  accentColor: "text-amber-300",
  accentBorder: "border-amber-400/22",
  accentGlow: "bg-amber-400/[0.06]",
  galleryHeadline: "Proyectos que",
  galleryHeadlineAccent: "no admiten mediocridad.",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&fit=crop",
      alt: "Arquitectura de lujo contemporánea",
      caption: "Proyectos de alto estándar",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85&fit=crop",
      alt: "Interior premium arquitectónico",
      caption: "Materiales de importación",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=85&fit=crop",
      alt: "Espacio contemporáneo de lujo",
      caption: "Gestión integral",
    },
    {
      src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=85&fit=crop",
      alt: "Fachada moderna premium",
      caption: "Acabados arquitectónicos",
      tall: true,
    },
    {
      src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=900&q=85&fit=crop",
      alt: "Dormitorio premium moderno",
      caption: "Garantía extendida",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=85&fit=crop",
      alt: "Residencia de alto estándar",
      caption: "Obras terminadas",
    },
  ],
  benefitsTag: "Por qué elegir premium",
  benefitsHeadline: "Sin compromiso",
  benefitsHeadlineAccent: "en ningún detalle.",
  benefits: [
    {
      icon: Globe,
      title: "Perfiles y vidrios de importación",
      desc: "Trabajamos con los mejores fabricantes de perfiles de aluminio europeos y vidrios de alta prestación: laminados, DVH triple, con coating low-e y filtro UV.",
      detail: "Mayor durabilidad, mejor performance térmica y estética superior a los perfiles estándar.",
      color: "text-amber-300",
      glow: "bg-amber-400/[0.05]",
      border: "border-amber-400/18",
    },
    {
      icon: ShieldCheck,
      title: "Gestión integral de obra",
      desc: "Un solo interlocutor para todo el proyecto: relevamiento, diseño, fabricación, instalación y garantía. Coordinamos con el arquitecto, el constructor y el cliente.",
      detail: "Entrega con obra terminada y limpia. Sin imprevistos.",
      color: "text-zinc-300",
      glow: "bg-zinc-500/[0.05]",
      border: "border-zinc-500/15",
    },
    {
      icon: Star,
      title: "Garantía extendida",
      desc: "Garantía extendida de materiales y mano de obra con soporte prioritario postventa. Para edificios, condominios y proyectos comerciales de cualquier escala.",
      detail: "Certificaciones y documentación técnica para todos los proyectos.",
      color: "text-emerald-400",
      glow: "bg-emerald-500/[0.05]",
      border: "border-emerald-500/15",
    },
  ],
  variantsHeadline: "Servicios exclusivos.",
  variants: [
    {
      name: "Frente de Local — Vidrio Templado",
      tag: "Comercial",
      desc: "Fachada comercial con vidrio templado 10mm y perfil de aluminio estructural. Diseño moderno, máxima visibilidad y resistencia. Incluye puerta con cierre antipánico.",
      accent: "bg-amber-400/[0.06]",
      accentBorder: "border-amber-400/22",
      features: ["Vidrio templado 10mm", "Perfil estructural", "Puerta antipánico", "Diseño a medida"],
      waMsg: "Hola, quisiera cotizar frente de local con vidrio templado.",
    },
    {
      name: "Sistema DVH Triple — Alto Rendimiento",
      tag: "Alta prestación",
      desc: "Triple vidriado hermético para proyectos con exigencias máximas de aislación. Ideal para climas extremos o alta contaminación acústica.",
      accent: "bg-zinc-400/[0.05]",
      accentBorder: "border-zinc-400/18",
      features: ["Triple vidriado", "Máxima aislación", "Climas extremos", "Alto rendimiento acústico"],
      waMsg: "Hola, quisiera cotizar sistema DVH triple para proyecto premium.",
    },
    {
      name: "Proyecto Integral con Gestión Completa",
      tag: "Servicio VIP",
      desc: "Relevamiento, diseño, fabricación, instalación y garantía extendida en un solo servicio. Para edificios, condominios y proyectos comerciales exigentes.",
      accent: "bg-emerald-500/[0.04]",
      accentBorder: "border-emerald-500/15",
      features: ["Gestión integral", "Garantía extendida", "Equipo certificado", "Entrega obra terminada"],
      waMsg: "Hola, quisiera consultar servicio integral de carpintería premium.",
    },
  ],
  ctaHeadline: "Tu proyecto merece",
  ctaHeadlineAccent: "lo mejor.",
  ctaBody: "Asesoramiento especializado sin costo para proyectos residenciales, comerciales y de edificio en el norte de Chile.",
  waMsg: "Hola, quisiera consultar sobre proyectos premium de aluminio.",
};

export const aluminiosPageConfigs: Record<string, AluminiosPageConfig> = {
  ventanales: ventanalesConfig,
  "cierres-terraza": cierresTerrazaConfig,
  divisiones: divisionesConfig,
  premium: premiumAlConfig,
};

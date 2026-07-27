import type { LucideIcon } from "lucide-react";
import { Square, Wind, LayoutGrid, Maximize2, Star, Building2 } from "lucide-react";

export interface AluminiosProduct {
  icon: LucideIcon;
  name: string;
  desc: string;
  tag: string;
  tagColor: string;
  mlLink?: string;
  waMsg?: string;
  imageUrl?: string;
  featured?: boolean;
  brand?: string;
  features?: string[];
}

export interface AluminiosCategory {
  id: string;
  slug: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  sub: string;
  heroDesc: string;
  color: string;
  border: string;
  hoverBorder: string;
  iconBg: string;
  glowBg: string;
  products: AluminiosProduct[];
  waMsg: string;
  bg: string;
}

export const aluminiosCategories: AluminiosCategory[] = [
  {
    id: "ventanales",
    slug: "ventanales",
    icon: Square,
    tag: "Máxima luminosidad",
    title: "Ventanales de Aluminio",
    sub: "Grandes paños de vidrio para espacios modernos.",
    heroDesc: "Ventanales de piso a techo con perfiles de aluminio de precisión. Maximizan la entrada de luz natural, integran el interior con el exterior y elevan la estética arquitectónica de cualquier espacio residencial o comercial.",
    color: "text-zinc-300",
    border: "border-zinc-500/15",
    hoverBorder: "hover:border-zinc-400/28",
    iconBg: "bg-zinc-500/10",
    glowBg: "bg-zinc-500/[0.06]",
    bg: "bg-[#0f0f0f]",
    waMsg: "Hola, quisiera cotizar ventanales de aluminio.",
    products: [
      {
        icon: Square,
        name: "Ventanal Fijo DVH — Piso a Techo",
        desc: "Perfil de aluminio slim con doble vidriado hermético. Máxima luz natural, aislación térmica y acústica. Fabricado a medida para cada vano.",
        tag: "Más solicitado",
        tagColor: "text-zinc-200 border-zinc-400/25 bg-zinc-400/8",
        features: ["DVH 4/9/4 o 4/12/4", "Perfil slim minimalista", "Sellado perimetral total", "Fabricación a medida"],
        waMsg: "Hola, quisiera cotizar ventanal fijo DVH piso a techo.",
      },
      {
        icon: Square,
        name: "Ventanal Proyectante",
        desc: "Sistema de apertura proyectante hacia el exterior. Ventilación controlada sin sacrificar seguridad. Ideal para departamentos en altura.",
        tag: "Residencial",
        tagColor: "text-zinc-400 border-zinc-500/22 bg-zinc-500/8",
        features: ["Apertura proyectante", "Seguridad en altura", "Sellado reforzado", "Compatible DVH"],
        waMsg: "Hola, quisiera cotizar ventanal proyectante.",
      },
      {
        icon: Square,
        name: "Ventanal Abatible",
        desc: "Apertura total hacia el interior. Fácil limpieza y excelente ventilación. Disponible con cierre multipunto y perfil lacado.",
        tag: "Versátil",
        tagColor: "text-zinc-300 border-zinc-500/18 bg-zinc-500/6",
        features: ["Apertura total", "Cierre multipunto", "Lacado al horno", "DVH opcional"],
        waMsg: "Hola, quisiera cotizar ventanal abatible.",
      },
    ],
  },
  {
    id: "cierres-terraza",
    slug: "cierres-terraza",
    icon: Wind,
    tag: "Outdoor",
    title: "Cierres de Terraza",
    sub: "Protección total para balcones y terrazas.",
    heroDesc: "Cerramos balcones, terrazas y galerías con sistemas de aluminio y vidrio que protegen del viento, lluvia y frío sin sacrificar la vista. Soluciones residenciales, de edificio y comerciales con o sin apertura.",
    color: "text-sky-400",
    border: "border-sky-500/15",
    hoverBorder: "hover:border-sky-400/28",
    iconBg: "bg-sky-500/10",
    glowBg: "bg-sky-500/[0.06]",
    bg: "bg-[#111111]",
    waMsg: "Hola, quisiera cotizar un cierre de terraza o balcón.",
    products: [
      {
        icon: Wind,
        name: "Cierre de Balcón — Sistema Corredera",
        desc: "Paños de vidrio correderos en perfil de aluminio. Apertura total o parcial, protección del viento sin oscurecer el ambiente. Ideal para departamentos.",
        tag: "Más popular",
        tagColor: "text-sky-400 border-sky-500/25 bg-sky-500/8",
        features: ["Vidrio templado 6mm", "Apertura corredera", "Sin obra mayor", "Certificado edificios"],
        waMsg: "Hola, quisiera cotizar cierre de balcón sistema corredera.",
      },
      {
        icon: Wind,
        name: "Cerramiento de Terraza — Fijo con Ventilación",
        desc: "Estructura fija con secciones de ventilación controlada. Para terrazas y galerías que requieren protección total sin perder ventilación natural.",
        tag: "Protección total",
        tagColor: "text-sky-300 border-sky-500/20 bg-sky-500/6",
        features: ["Estructura fija", "Secciones de ventilación", "DVH disponible", "A medida"],
        waMsg: "Hola, quisiera cotizar cerramiento de terraza fijo con ventilación.",
      },
      {
        icon: Wind,
        name: "Galería Aluminio + Policarbonato",
        desc: "Combinación de perfil de aluminio con cubierta de policarbonato alveolar. Liviana, resistente a la lluvia y con excelente transmisión de luz.",
        tag: "Ligero",
        tagColor: "text-sky-400 border-sky-500/18 bg-sky-500/5",
        features: ["Policarbonato alveolar", "Cubierta impermeable", "Ultra liviano", "Instalación rápida"],
        waMsg: "Hola, quisiera cotizar galería de aluminio con policarbonato.",
      },
    ],
  },
  {
    id: "divisiones",
    slug: "divisiones",
    icon: LayoutGrid,
    tag: "Diseño interior",
    title: "Divisiones Interiores",
    sub: "Tabiques, mamparas y divisiones con aluminio y vidrio.",
    heroDesc: "Divisiones interiores de aluminio y vidrio para oficinas, locales y residencias. Modulares, elegantes y fáciles de instalar. Permiten gestionar el espacio sin obra pesada, manteniendo luminosidad y diseño.",
    color: "text-purple-400",
    border: "border-purple-500/15",
    hoverBorder: "hover:border-purple-400/28",
    iconBg: "bg-purple-500/10",
    glowBg: "bg-purple-500/[0.06]",
    bg: "bg-[#0f0f0f]",
    waMsg: "Hola, quisiera cotizar divisiones interiores de aluminio.",
    products: [
      {
        icon: LayoutGrid,
        name: "Mampara de Vidrio — Oficina",
        desc: "División modular con perfil de aluminio y vidrio templado. Separa ambientes manteniendo la luz natural y la visibilidad. Ideal para oficinas y salas de reunión.",
        tag: "Corporativo",
        tagColor: "text-purple-400 border-purple-500/25 bg-purple-500/8",
        features: ["Perfil aluminio slim", "Vidrio templado 8mm", "Modular y ampliable", "Sin obra pesada"],
        waMsg: "Hola, quisiera cotizar mamparas de vidrio para oficina.",
      },
      {
        icon: LayoutGrid,
        name: "Tabique Mixto Aluminio + Sólido",
        desc: "Combinación de panel sólido en parte inferior y vidrio en parte superior. Privacidad y luz en el mismo módulo.",
        tag: "Mixto",
        tagColor: "text-purple-300 border-purple-500/20 bg-purple-500/6",
        features: ["Panel inferior sólido", "Vidrio superior", "Alta privacidad", "Diseño premium"],
        waMsg: "Hola, quisiera cotizar tabique mixto aluminio.",
      },
      {
        icon: LayoutGrid,
        name: "División Residencial",
        desc: "Mampara de vidrio para separar ambientes en casa. Baños, vestidores, cocinas abiertas. Sin perder luminosidad.",
        tag: "Residencial",
        tagColor: "text-purple-400 border-purple-500/18 bg-purple-500/5",
        features: ["Para uso residencial", "Vidrio templado", "Diseño minimalista", "A medida"],
        waMsg: "Hola, quisiera cotizar división residencial de aluminio y vidrio.",
      },
    ],
  },
  {
    id: "premium",
    slug: "premium",
    icon: Star,
    tag: "Línea exclusiva",
    title: "Proyectos Premium",
    sub: "Carpintería de alto estándar para proyectos exigentes.",
    heroDesc: "Para proyectos residenciales, comerciales o de edificio que exigen lo mejor. Perfiles de importación, vidrios de alta prestación y un equipo técnico especializado que gestiona el proyecto de inicio a fin.",
    color: "text-amber-300",
    border: "border-amber-400/18",
    hoverBorder: "hover:border-amber-300/32",
    iconBg: "bg-amber-400/10",
    glowBg: "bg-amber-400/[0.06]",
    bg: "bg-[#0f0f0f]",
    waMsg: "Hola, quisiera consultar sobre proyectos premium de aluminio.",
    products: [
      {
        icon: Star,
        name: "Frente de Local Vidrio Templado",
        desc: "Fachada comercial con vidrio templado 10mm y perfil de aluminio estructural. Diseño moderno, máxima visibilidad y resistencia. Incluye puerta con cierre antipánico.",
        tag: "Comercial",
        tagColor: "text-amber-300 border-amber-400/25 bg-amber-400/8",
        features: ["Vidrio templado 10mm", "Perfil estructural", "Puerta antipánico", "Diseño a medida"],
        waMsg: "Hola, quisiera cotizar frente de local con vidrio templado.",
      },
      {
        icon: Star,
        name: "Sistema DVH Triple — Alto Rendimiento",
        desc: "Triple vidriado hermético para proyectos que requieren aislación máxima. Ideal para zonas con temperaturas extremas o alta contaminación acústica.",
        tag: "Alta prestación",
        tagColor: "text-amber-400 border-amber-500/20 bg-amber-500/6",
        features: ["Triple vidriado", "Máxima aislación", "Para climas extremos", "Alto rendimiento acústico"],
        waMsg: "Hola, quisiera cotizar sistema DVH triple para proyecto premium.",
      },
      {
        icon: Star,
        name: "Proyecto Integral con Gestión Completa",
        desc: "Relevamiento, diseño, fabricación, instalación y garantía extendida en un solo servicio. Para edificios, condominios y proyectos comerciales exigentes.",
        tag: "Servicio VIP",
        tagColor: "text-amber-300 border-amber-400/20 bg-amber-400/6",
        features: ["Gestión integral", "Garantía extendida", "Equipo certificado", "Entrega con obra terminada"],
        waMsg: "Hola, quisiera consultar servicio integral de carpintería de aluminio.",
      },
    ],
  },
];

export function getAluminiosCategoryBySlug(slug: string): AluminiosCategory | undefined {
  return aluminiosCategories.find((c) => c.slug === slug);
}

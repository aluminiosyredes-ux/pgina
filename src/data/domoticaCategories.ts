import type { LucideIcon } from "lucide-react";
import {
  Lightbulb, Shield, Layers, Mic, Key, Zap,
  Wifi, Lock, Camera, Smartphone, Home, Cpu,
} from "lucide-react";

export interface DomoticaProduct {
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

export interface DomoticaCategory {
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
  gradFrom: string;
  products: DomoticaProduct[];
  waMsg: string;
  bg: string;
  image?: string;
}

export const domoticaCategories: DomoticaCategory[] = [
  {
    id: "iluminacion",
    slug: "iluminacion",
    icon: Lightbulb,
    tag: "Smart Home",
    title: "Interruptores, Enchufes y Relés",
    sub: "Control inteligente de cada punto eléctrico de tu hogar.",
    heroDesc: "Interruptores táctiles, enchufes monitoreados y relés inteligentes controlados desde tu smartphone. Automatización, programación horaria y compatibilidad con los principales ecosistemas.",
    color: "text-yellow-400",
    border: "border-yellow-500/12",
    hoverBorder: "hover:border-yellow-500/25",
    iconBg: "bg-yellow-500/10",
    glowBg: "bg-yellow-500/[0.06]",
    gradFrom: "from-yellow-600/8",
    products: [
      {
        icon: Lightbulb,
        name: "Ampolletas RGB Megabright E27 WiFi – Set x3",
        desc: "Tres ampolletas inteligentes listas para transformar cualquier ambiente. 16 millones de colores, control total desde app, compatible con Alexa y Google Home. Sin hub requerido.",
        tag: "Set x3 · En stock",
        tagColor: "text-yellow-400 border-yellow-500/25 bg-yellow-500/8",
        mlLink: "https://www.mercadolibre.cl/ampolletas-inteligentes-megabright-e27-led-rgb-wifi-set-x3-control-app/p/MLC26794063",
        imageUrl: "/images/megabright-rgb-x3.webp",
        featured: true,
        brand: "Megabright",
        features: [
          "16 millones de colores RGB",
          "Control desde app smartphone",
          "Compatible Alexa y Google Home",
          "Base E27 universal",
          "Escenas y horarios programables",
          "Sin hub ni controlador extra",
        ],
        waMsg: "Hola! Me interesan las Ampolletas RGB Megabright E27 WiFi Set x3. ¿Tienen disponibilidad en Arica, Iquique o Antofagasta?",
      },
      {
        icon: Lightbulb,
        name: "Foco WiFi Inteligente",
        desc: "Control desde app. Temperatura de color ajustable 2700–6500K. Compatible Alexa y Google Home. Base E27 universal.",
        tag: "Más vendido",
        tagColor: "text-yellow-400 border-yellow-500/25 bg-yellow-500/8",
        mlLink: "",
      },
      {
        icon: Zap,
        name: "Tira LED RGB Smart",
        desc: "16 millones de colores. Sincronización con música. Control por voz y app móvil. 5 metros con corte flexible.",
        tag: "Ambiente",
        tagColor: "text-zinc-400 border-zinc-600/30 bg-zinc-700/8",
        mlLink: "",
      },
      {
        icon: Smartphone,
        name: "Dimmer Inteligente WiFi",
        desc: "Reemplaza tu interruptor actual sin cables adicionales. Control de intensidad 1–100%. Compatible con cualquier bombilla.",
        tag: "Sin obras",
        tagColor: "text-zinc-400 border-zinc-600/30 bg-zinc-700/8",
        mlLink: "",
      },
    ],
    waMsg: "Hola! Quisiera consultar sobre iluminación inteligente.",
    bg: "bg-[#0f0f0f]",
    image: "/images/interruptorinteligente1.png",
  },
  {
    id: "cortinas",
    slug: "cortinas",
    icon: Layers,
    tag: "Motorización",
    title: "Cortinas Motorizadas",
    sub: "Automatización de roller y persianas integrada.",
    heroDesc: "Motorizamos tus cortinas roller y persianas venezianas para control desde app, horario programado o integración con tu sistema de hogar inteligente.",
    color: "text-blue-400",
    border: "border-blue-500/12",
    hoverBorder: "hover:border-blue-500/25",
    iconBg: "bg-blue-500/10",
    glowBg: "bg-blue-500/[0.04]",
    gradFrom: "from-blue-600/8",
    products: [
      {
        icon: Layers,
        name: "Motor Roller WiFi",
        desc: "Control por app, voz o interruptor táctil. Motor silencioso de precisión. Compatible con roller screen y blackout.",
        tag: "Silencioso",
        tagColor: "text-blue-400 border-blue-500/25 bg-blue-500/8",
        mlLink: "",
      },
      {
        icon: Zap,
        name: "Motor Persiana Veneciana",
        desc: "Automatización de ángulo e inclinación. Programación horaria con sensor de luminosidad incluido.",
        tag: "Con sensor luz",
        tagColor: "text-zinc-400 border-zinc-600/30 bg-zinc-700/8",
        mlLink: "",
      },
      {
        icon: Wifi,
        name: "Kit Doble Vía",
        desc: "Control de dos cortinas desde una sola app. Sincronización de movimiento y escenas grupales programables.",
        tag: "Kit completo",
        tagColor: "text-zinc-400 border-zinc-600/30 bg-zinc-700/8",
        mlLink: "",
      },
    ],
    waMsg: "Hola! Quisiera consultar sobre cortinas motorizadas.",
    bg: "bg-[#0f0f0f]",
    image: "/images/motorcortina1.png",
  },
  {
    id: "control-voz",
    slug: "control-voz",
    icon: Mic,
    tag: "Voice Control",
    title: "Control por Voz",
    sub: "Comandos naturales con Alexa, Google Home y HomeKit.",
    heroDesc: "Integramos tu hogar con los principales asistentes de voz del mercado. Configuración profesional de rutinas, escenas y automatizaciones por comando.",
    color: "text-purple-400",
    border: "border-purple-500/12",
    hoverBorder: "hover:border-purple-500/25",
    iconBg: "bg-purple-500/10",
    glowBg: "bg-purple-500/[0.05]",
    gradFrom: "from-purple-600/8",
    products: [
      {
        icon: Mic,
        name: "Amazon Echo Dot (5ª Gen)",
        desc: "El altavoz inteligente más popular del mundo. Sonido nítido, control total por voz con Alexa. Compatible con más de 100.000 dispositivos de hogar inteligente.",
        tag: "En stock",
        tagColor: "text-emerald-400 border-emerald-500/25 bg-emerald-500/8",
        mlLink: "https://www.mercadolibre.cl/xd-zh-aalexa-echo-dot-de-quinta-generacion-con-nuevo-/p/MLC2046673916",
        imageUrl: "/images/echo-dot-5.jpg",
        featured: true,
        brand: "Amazon",
        features: [
          "Control por voz con Alexa",
          "Compatible con +100.000 dispositivos",
          "Temperatura ambiente integrada",
          "Rutinas automáticas programables",
          "Envío a todo Chile",
        ],
        waMsg: "Hola! Me interesa el Amazon Echo Dot 5ª Gen. ¿Tienen disponibilidad?",
      },
    ],
    waMsg: "Hola! Quisiera consultar sobre control por voz para mi hogar.",
    bg: "bg-[#151515]",
    image: "/images/controlvoz1.png",
  },
  {
    id: "acceso-inteligente",
    slug: "acceso-inteligente",
    icon: Key,
    tag: "Smart Access",
    title: "Acceso Inteligente",
    sub: "Controlá quién entra y cuándo sin llaves físicas.",
    heroDesc: "Cerraduras electrónicas, videoporteros y sistemas de control de acceso que eliminan las llaves físicas y te dan control total desde el smartphone.",
    color: "text-amber-400",
    border: "border-amber-500/12",
    hoverBorder: "hover:border-amber-500/25",
    iconBg: "bg-amber-500/10",
    glowBg: "bg-amber-500/[0.04]",
    gradFrom: "from-amber-600/8",
    products: [
      {
        icon: Lock,
        name: "Cerradura Smart WiFi",
        desc: "Apertura por PIN, huella digital, tarjeta RFID o app. Historial de accesos. Instalación sin modificar la puerta existente.",
        tag: "Sin llave",
        tagColor: "text-amber-400 border-amber-500/25 bg-amber-500/8",
        mlLink: "",
      },
      {
        icon: Camera,
        name: "Videoportero WiFi HD",
        desc: "Cámara frontal gran angular 170°. Audio bidireccional en tiempo real. Apertura remota desde cualquier parte del mundo.",
        tag: "HD + audio",
        tagColor: "text-zinc-400 border-zinc-600/30 bg-zinc-700/8",
        mlLink: "",
      },
      {
        icon: Shield,
        name: "Control de Acceso RFID",
        desc: "Para edificios, oficinas y locales. Registro de entrada/salida con timestamp. Panel de administración web incluido.",
        tag: "Empresarial",
        tagColor: "text-zinc-400 border-zinc-600/30 bg-zinc-700/8",
        mlLink: "",
      },
    ],
    waMsg: "Hola! Quisiera consultar sobre acceso inteligente.",
    bg: "bg-[#0f0f0f]",
    image: "/images/cerradurainteligente3.png",
  },
  {
    id: "automatizacion",
    slug: "automatizacion",
    icon: Zap,
    tag: "Automation",
    title: "Automatización del Hogar",
    sub: "Escenas inteligentes que anticipan tus necesidades.",
    heroDesc: "Diseñamos y configuramos secuencias de automatización completas para tu hogar. Desde escenas simples hasta sistemas multi-zona de alta complejidad.",
    color: "text-cyan-400",
    border: "border-cyan-500/12",
    hoverBorder: "hover:border-cyan-500/25",
    iconBg: "bg-cyan-500/10",
    glowBg: "bg-cyan-500/[0.04]",
    gradFrom: "from-cyan-600/8",
    products: [
      {
        icon: Zap,
        name: "Escenas Personalizadas",
        desc: "Configuramos secuencias automatizadas para mañana, noche, llegada a casa, ausencia, cine y modo entretenimiento.",
        tag: "Servicio",
        tagColor: "text-cyan-400 border-cyan-500/25 bg-cyan-500/8",
      },
      {
        icon: Cpu,
        name: "Programación Horaria",
        desc: "Timers inteligentes por horario, presencia o condición climática. Ajuste estacional automático sin intervención manual.",
        tag: "AI Scheduling",
        tagColor: "text-zinc-400 border-zinc-600/30 bg-zinc-700/8",
      },
      {
        icon: Home,
        name: "Sistema Multi-Zona",
        desc: "Hasta 64 zonas independientes con control centralizado. Dashboard en tiempo real y reportes de consumo energético.",
        tag: "Residencial",
        tagColor: "text-zinc-400 border-zinc-600/30 bg-zinc-700/8",
      },
    ],
    waMsg: "Hola! Quisiera consultar sobre automatización del hogar.",
    bg: "bg-[#151515]",
    image: "/images/inteligente1.png",
  },
];

export function getCategoryBySlug(slug: string): DomoticaCategory | undefined {
  return domoticaCategories.find((c) => c.slug === slug);
}

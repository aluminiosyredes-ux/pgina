import type { LucideIcon } from "lucide-react";
import { Moon, Sun, Cpu, Layers, Zap, Star } from "lucide-react";

export interface RollerProduct {
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

export interface RollerCategory {
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
  products: RollerProduct[];
  waMsg: string;
  bg: string;
}

export const rollerCategories: RollerCategory[] = [
  {
    id: "blackout",
    slug: "blackout",
    icon: Moon,
    tag: "Oscurecimiento total",
    title: "Roller Blackout",
    sub: "Bloqueo total de luz para dormitorios y multimedia.",
    heroDesc: "Tela de alta densidad que bloquea el 100% de la luz solar. Perfecta para dormitorios, salas de cine en casa y espacios que requieren privacidad absoluta. Fabricada a medida con cassette ocultador opcional.",
    color: "text-zinc-300",
    border: "border-zinc-500/15",
    hoverBorder: "hover:border-zinc-400/28",
    iconBg: "bg-zinc-500/10",
    glowBg: "bg-zinc-500/[0.06]",
    bg: "bg-[#0f0f0f]",
    waMsg: "Hola, quisiera cotizar cortinas roller blackout.",
    products: [
      {
        icon: Moon,
        name: "Blackout Premium — Blanco Marfil",
        desc: "Tela blackout en blanco marfil con acabado satinado. Bloqueo total de luz, excelente aislación térmica y sonora. Disponible con sistema de cadena o motorizado.",
        tag: "Más vendido",
        tagColor: "text-zinc-200 border-zinc-400/25 bg-zinc-400/8",
        features: ["100% oscurecimiento", "Aislación térmica y sonora", "Cassette ocultador opcional", "Fabricación a medida"],
        waMsg: "Hola, quisiera cotizar cortinas roller blackout blanco marfil.",
      },
      {
        icon: Moon,
        name: "Blackout Total — Negro Carbón",
        desc: "Oscurecimiento máximo en tono negro carbón mate. Estética arquitectónica y moderna, ideal para home theater y dormitorios minimalistas.",
        tag: "Arquitectónico",
        tagColor: "text-zinc-400 border-zinc-600/22 bg-zinc-600/8",
        features: ["Oscurecimiento 100%", "Tono negro mate", "Estética minimalista", "Disponible motorizado"],
        waMsg: "Hola, quisiera cotizar cortinas roller blackout negro carbón.",
      },
      {
        icon: Moon,
        name: "Blackout — Gris Perla",
        desc: "Equilibrio perfecto entre elegancia y funcionalidad. Tono gris perla neutro que combina con cualquier estilo de interior.",
        tag: "Versátil",
        tagColor: "text-zinc-300 border-zinc-500/18 bg-zinc-500/6",
        features: ["Oscurecimiento total", "Tono neutro versátil", "Combina con todo estilo", "A medida"],
        waMsg: "Hola, quisiera cotizar cortinas roller blackout gris perla.",
      },
    ],
  },
  {
    id: "zebra",
    slug: "zebra",
    icon: Star,
    tag: "Día / Noche",
    title: "Roller Zebra",
    sub: "Franjas alternas para control total de luz y privacidad.",
    heroDesc: "Sistema de doble tela con franjas traslúcidas y opacas intercaladas. Control gradual de luz y privacidad con un solo movimiento. Diseño moderno y sofisticado para cualquier espacio.",
    color: "text-amber-300",
    border: "border-amber-400/18",
    hoverBorder: "hover:border-amber-300/32",
    iconBg: "bg-amber-400/10",
    glowBg: "bg-amber-400/[0.06]",
    bg: "bg-[#111111]",
    waMsg: "Hola, quisiera cotizar cortinas roller zebra.",
    products: [
      {
        icon: Star,
        name: "Zebra Blanco / Lino",
        desc: "Combinación elegante de franjas blancas opacas con franjas lino traslúcidas. Control de luz suave y natural, estética contemporánea premium.",
        tag: "Más popular",
        tagColor: "text-amber-300 border-amber-400/25 bg-amber-400/8",
        features: ["Doble tela integrada", "Control gradual de luz", "Estética premium", "Fabricación a medida"],
        waMsg: "Hola, quisiera cotizar cortina roller zebra blanco/lino.",
      },
      {
        icon: Star,
        name: "Zebra Gris / Blanco",
        desc: "Tono gris moderno con franjas blancas. Ideal para espacios nórdicos y minimalistas que buscan neutralidad y sofisticación.",
        tag: "Minimalista",
        tagColor: "text-amber-400 border-amber-500/20 bg-amber-500/6",
        features: ["Tono neutro versátil", "Estética nórdica", "Luz difusa elegante", "A medida"],
        waMsg: "Hola, quisiera cotizar cortina roller zebra gris/blanco.",
      },
      {
        icon: Star,
        name: "Zebra Motorizada",
        desc: "Sistema zebra con motor WiFi integrado. Control desde app, voz o control remoto. Para ventanas altas o espacios de diseño exigente.",
        tag: "Smart · WiFi",
        tagColor: "text-amber-300 border-amber-400/20 bg-amber-400/6",
        features: ["Motor WiFi integrado", "Control por voz", "Alexa & Google Home", "Instalación profesional"],
        waMsg: "Hola, quisiera cotizar cortina roller zebra motorizada.",
      },
    ],
  },
  {
    id: "sunscreen",
    slug: "sunscreen",
    icon: Sun,
    tag: "Control solar",
    title: "Roller Sunscreen",
    sub: "Filtra la luz manteniendo la vista al exterior.",
    heroDesc: "Las telas screen filtran entre el 1% y el 10% de apertura, reduciendo el calor y el deslumbramiento sin perder la vista al exterior. Ideales para oficinas, livings y comedores con luz directa.",
    color: "text-amber-400",
    border: "border-amber-500/15",
    hoverBorder: "hover:border-amber-400/28",
    iconBg: "bg-amber-500/10",
    glowBg: "bg-amber-500/[0.06]",
    bg: "bg-[#111111]",
    waMsg: "Hola, quisiera cotizar cortinas roller sunscreen.",
    products: [
      {
        icon: Sun,
        name: "Screen 5% — Arena",
        desc: "El más popular. Apertura 5% en tono arena, reduce el calor y deslumbramiento manteniendo visión al exterior de día.",
        tag: "Más popular",
        tagColor: "text-amber-400 border-amber-500/25 bg-amber-500/8",
        features: ["Apertura 5%", "Reduce calor solar", "Vista al exterior", "+60 colores disponibles"],
        waMsg: "Hola, quisiera cotizar cortinas roller screen 5% arena.",
      },
      {
        icon: Sun,
        name: "Screen 1% — Negro",
        desc: "Alta privacidad visual con apertura del 1%. Máxima reducción de calor y deslumbramiento manteniendo vista al exterior en tono negro.",
        tag: "Alta privacidad",
        tagColor: "text-amber-300 border-amber-500/20 bg-amber-500/6",
        features: ["Apertura 1%", "Máxima privacidad", "Vista exterior", "Alta filtración UV"],
        waMsg: "Hola, quisiera cotizar cortinas roller screen 1% negro.",
      },
      {
        icon: Sun,
        name: "Screen 10% — Gris Perla",
        desc: "Mayor entrada de luz natural. Apertura 10% ideal para ambientes que necesitan luminosidad con control de deslumbramiento.",
        tag: "Luminoso",
        tagColor: "text-amber-400 border-amber-500/18 bg-amber-500/5",
        features: ["Apertura 10%", "Luz natural abundante", "Control deslumbramiento", "Moderno y versátil"],
        waMsg: "Hola, quisiera cotizar cortinas roller screen 10% gris perla.",
      },
    ],
  },
  {
    id: "motorizadas",
    slug: "motorizadas",
    icon: Cpu,
    tag: "Smart Home",
    title: "Cortinas Motorizadas",
    sub: "Control inteligente desde smartphone, voz o botón.",
    heroDesc: "Motor silencioso y preciso integrado al riel. Compatible con Alexa, Google Home y Apple HomeKit. Programación horaria, escenas automáticas y control grupal desde una sola app, sin necesidad de hub.",
    color: "text-purple-400",
    border: "border-purple-500/15",
    hoverBorder: "hover:border-purple-400/28",
    iconBg: "bg-purple-500/10",
    glowBg: "bg-purple-500/[0.06]",
    bg: "bg-[#0f0f0f]",
    waMsg: "Hola, quisiera cotizar cortinas roller motorizadas.",
    products: [
      {
        icon: Cpu,
        name: "Motor Tuya WiFi para Roller",
        desc: "Motor silencioso de alta precisión con conectividad WiFi nativa. Control desde app Tuya / Smart Life, compatible con Alexa y Google Home. Sin hub requerido.",
        tag: "WiFi · Sin hub",
        tagColor: "text-purple-400 border-purple-500/25 bg-purple-500/8",
        features: ["WiFi integrado", "Alexa & Google Home", "App Tuya / Smart Life", "Motor ultra silencioso"],
        waMsg: "Hola, quisiera cotizar motor WiFi Tuya para cortina roller.",
      },
      {
        icon: Cpu,
        name: "Combo Motorizado + Blackout",
        desc: "Motor WiFi + tela blackout a medida en un solo servicio. Instalación profesional con garantía total incluida.",
        tag: "Combo completo",
        tagColor: "text-purple-300 border-purple-500/20 bg-purple-500/6",
        features: ["Motor + tela incluida", "Instalación profesional", "Fabricado a medida", "Garantía total"],
        waMsg: "Hola, quisiera cotizar combo motorizado con tela blackout.",
      },
      {
        icon: Cpu,
        name: "Combo Motorizado + Screen",
        desc: "Motor WiFi + tela screen de tu elección. Control automático por horario o por sensor de luz. Ideal para oficinas.",
        tag: "Combo solar",
        tagColor: "text-purple-400 border-purple-500/18 bg-purple-500/5",
        features: ["Motor + tela screen", "Control por horario", "Sensor de luz opcional", "Para oficinas"],
        waMsg: "Hola, quisiera cotizar combo motorizado con tela screen.",
      },
    ],
  },
  {
    id: "duo",
    slug: "duo",
    icon: Layers,
    tag: "Día / Noche",
    title: "Cortinas Dúo",
    sub: "Doble tela, control total de luz y privacidad.",
    heroDesc: "Sistema de doble tela que alterna franjas opacas y traslúcidas. Regulás la luz de forma gradual sin perder elegancia. Mecanismo de precisión silencioso, disponible en versión cadena o motorizada.",
    color: "text-sky-400",
    border: "border-sky-500/15",
    hoverBorder: "hover:border-sky-400/28",
    iconBg: "bg-sky-500/10",
    glowBg: "bg-sky-500/[0.06]",
    bg: "bg-[#111111]",
    waMsg: "Hola, quisiera cotizar cortinas dúo.",
    products: [
      {
        icon: Layers,
        name: "Dúo Premium — Blanco / Lino",
        desc: "Combinación clásica de franjas blancas opacas con franjas lino traslúcidas. Acabado premium, mecanismo silencioso de alta precisión.",
        tag: "Más elegante",
        tagColor: "text-sky-400 border-sky-500/25 bg-sky-500/8",
        features: ["Doble tela integrada", "Control gradual de luz", "Mecanismo silencioso", "Fabricación a medida"],
        waMsg: "Hola, quisiera cotizar cortinas dúo blanco/lino.",
      },
      {
        icon: Layers,
        name: "Dúo Motorizado",
        desc: "Sistema dúo con motor WiFi integrado. Control desde app, voz o control remoto. Ideal para ventanas altas o de difícil acceso.",
        tag: "Smart · WiFi",
        tagColor: "text-sky-300 border-sky-500/20 bg-sky-500/6",
        features: ["Motor WiFi integrado", "Control por voz", "Alexa & Google Home", "Ventanas altas"],
        waMsg: "Hola, quisiera cotizar cortinas dúo motorizadas.",
      },
      {
        icon: Layers,
        name: "Dúo Gris / Blanco",
        desc: "Estética moderna en gris y blanco. Perfecta para ambientes nórdicos y minimalistas. Misma funcionalidad, otra paleta.",
        tag: "Nórdico",
        tagColor: "text-sky-400 border-sky-500/18 bg-sky-500/5",
        features: ["Gris + blanco", "Estética nórdica", "Luz difusa suave", "A medida"],
        waMsg: "Hola, quisiera cotizar cortinas dúo gris/blanco.",
      },
    ],
  },
  {
    id: "automatizacion",
    slug: "automatizacion",
    icon: Zap,
    tag: "Automatización",
    title: "Automatización Roller",
    sub: "Escenas, programaciones y control inteligente.",
    heroDesc: "Integrá tus cortinas a tu ecosistema de hogar inteligente. Programaciones horarias, activación por presencia, control grupal de múltiples cortinas y compatibilidad con los principales protocolos smart home.",
    color: "text-emerald-400",
    border: "border-emerald-500/15",
    hoverBorder: "hover:border-emerald-400/28",
    iconBg: "bg-emerald-500/10",
    glowBg: "bg-emerald-500/[0.06]",
    bg: "bg-[#0f0f0f]",
    waMsg: "Hola, quisiera consultar automatización de cortinas roller.",
    products: [
      {
        icon: Zap,
        name: "Integración Alexa / Google Home",
        desc: "Conectá tus cortinas a tu asistente de voz favorito. Comandos por voz, rutinas diarias automáticas y escenas integradas con el resto del hogar.",
        tag: "Control por voz",
        tagColor: "text-emerald-400 border-emerald-500/25 bg-emerald-500/8",
        features: ["Amazon Alexa", "Google Home", "Apple HomeKit", "Rutinas automáticas"],
        waMsg: "Hola, quisiera integrar mis cortinas con Alexa/Google Home.",
      },
      {
        icon: Zap,
        name: "Programación Horaria",
        desc: "Configurá horarios automáticos de apertura y cierre. Ahorrá energía, protegé tus muebles y simulá presencia cuando no estés.",
        tag: "Programable",
        tagColor: "text-emerald-300 border-emerald-500/20 bg-emerald-500/6",
        features: ["Horarios personalizados", "Ahorro energético", "Simulación de presencia", "Múltiples cortinas"],
        waMsg: "Hola, quisiera configurar programación horaria para mis cortinas.",
      },
    ],
  },
];

export function getRollerCategoryBySlug(slug: string): RollerCategory | undefined {
  return rollerCategories.find((c) => c.slug === slug);
}

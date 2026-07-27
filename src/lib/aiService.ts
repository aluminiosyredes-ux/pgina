/**
 * AI Service — Aluminios & Redes
 *
 * Currently powered by a rule-based engine.
 * To enable real AI: replace `processMessage()` body with an OpenAI API call,
 * passing `context.history` as the messages array.
 *
 * OpenAI-ready interface — do NOT change function signatures.
 */

import { WHATSAPP_NUMBER } from "../config";

// ─── PUBLIC TYPES ─────────────────────────────────────────────────────────────

export interface AIOption {
  label: string;
  value: string;
  emoji?: string;
  href?: string;
  whatsappMsg?: string;
  accent?: string;
}

export interface AIResponse {
  text: string;
  options?: AIOption[];
  /** Pre-filled WhatsApp message. If set, show a prominent WA button. */
  whatsappPreset?: string;
  /** Internal route to suggest navigating to. */
  navigateTo?: string;
}

export interface ChatContext {
  history: { role: "user" | "assistant"; content: string }[];
  topic: string | null;
  subtopic: string | null;
  turn: number;
}

export function emptyContext(): ChatContext {
  return { history: [], topic: null, subtopic: null, turn: 0 };
}

// ─── MAIN ENTRY POINT ─────────────────────────────────────────────────────────

/**
 * Process a user message and return a response.
 * Replace the body of this function with an OpenAI call to add real AI.
 *
 * Example OpenAI swap:
 * ```ts
 * const completion = await openai.chat.completions.create({
 *   model: "gpt-4o-mini",
 *   system: SYSTEM_PROMPT,
 *   messages: context.history,
 * });
 * return { text: completion.choices[0].message.content };
 * ```
 */
export async function processMessage(
  userInput: string,
  context: ChatContext
): Promise<AIResponse> {
  await delay(600 + Math.random() * 500);
  return ruleEngine(userInput.trim().toLowerCase(), context);
}

// ─── RULE ENGINE ──────────────────────────────────────────────────────────────

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

type FlowFn = (ctx: ChatContext) => AIResponse;

const FLOWS: Record<string, FlowFn> = {

  // ── BIENVENIDA ──────────────────────────────────────────────────────────────
  welcome: () => ({
    text: "¡Hola! Soy el asistente de **Aluminios & Redes** 👋\n\nPuedo ayudarte a conocer nuestros servicios, precios y a conectarte con nuestro equipo.\n\n¿Con qué puedo ayudarte hoy?",
    options: [
      { label: "Redes de Seguridad", value: "redes",      emoji: "🛡️", accent: "rgba(96,165,250,0.15)" },
      { label: "Cortinas Roller",    value: "roller",     emoji: "🪟", accent: "rgba(245,158,11,0.15)" },
      { label: "Aluminios",          value: "aluminios",  emoji: "🔲", accent: "rgba(161,161,170,0.15)" },
      { label: "Domótica",           value: "domotica",   emoji: "💡", accent: "rgba(192,132,252,0.15)" },
      { label: "Asistencia Técnica", value: "asistencia", emoji: "🔧", accent: "rgba(6,182,212,0.15)"  },
    ],
  }),

  // ── REDES ────────────────────────────────────────────────────────────────────
  redes: () => ({
    text: "Instalamos **redes de seguridad certificadas** para:\n\n• 🏠 Balcones y ventanas residenciales\n• 🚶 Escaleras, rampas y pasillos\n• 🏭 Industria y espacios comerciales\n• 🐾 Protección para mascotas y niños\n\nFabricadas en polipropileno UV estabilizado de alta densidad. ¿Para qué espacio necesitás la red?",
    options: [
      { label: "Balcón / Ventana",     value: "redes_balcon",     emoji: "🏠" },
      { label: "Escalera / Pasillo",   value: "redes_escalera",   emoji: "🚶" },
      { label: "Industrial",           value: "redes_industrial", emoji: "🏭" },
      { label: "Ver precios",          value: "redes_precios",    emoji: "💲" },
      { label: "Cotizar por WhatsApp", value: "wa_redes",         emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
  }),

  redes_balcon: () => ({
    text: "Para **balcones y ventanas** usamos malla de 2mm con malla cuadrada o hexagonal según la necesidad.\n\nEl proceso:\n1. Medición sin cargo en tu domicilio\n2. Fabricación a medida\n3. Instalación en el día\n4. Garantía de 2 años\n\nEs la solución preferida por familias con niños y mascotas en las regiones de Arica, Iquique y Antofagasta.",
    options: [
      { label: "Ver precios",          value: "redes_precios",  emoji: "💲" },
      { label: "Agendar medición",     value: "wa_redes_balcon",emoji: "📅", accent: "rgba(37,211,102,0.15)" },
      { label: "¿Qué materiales?",     value: "redes_material", emoji: "🔬" },
    ],
    whatsappPreset: "Hola! Quiero cotizar redes de seguridad para balcón/ventana.",
  }),

  redes_escalera: () => ({
    text: "Para **escaleras y pasillos** instalamos redes con tensores de acero inoxidable que garantizan la tensión constante incluso con cambios de temperatura extremos (¡muy común en el norte!).\n\nIdeal para:\n• Escaleras de edificios\n• Rampas de acceso\n• Entrepiso industrial",
    options: [
      { label: "Ver precios",       value: "redes_precios",       emoji: "💲" },
      { label: "Cotizar proyecto",  value: "wa_redes_escalera",   emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Quiero cotizar redes de seguridad para escalera/pasillo.",
  }),

  redes_industrial: () => ({
    text: "Para uso **industrial y comercial** fabricamos redes con malla de alta resistencia, desde 3mm de diámetro.\n\nAplicaciones:\n• Protección de maquinaria\n• Cierre de bodegas y patios\n• Instalaciones mineras\n• Centros logísticos\n\nTrabajamos con empresas de toda la región.",
    options: [
      { label: "Cotizar proyecto industrial", value: "wa_redes_industrial", emoji: "💬", accent: "rgba(37,211,102,0.15)" },
      { label: "Ver precios",                value: "redes_precios",        emoji: "💲" },
    ],
    whatsappPreset: "Hola! Necesito cotizar redes de seguridad para uso industrial/comercial.",
  }),

  redes_precios: () => ({
    text: "**Precios referenciales de redes** (instalación incluida):\n\n• Malla estándar residencial: desde **$8.000/m²**\n• Malla premium certificada: desde **$12.000/m²**\n• Industrial alta resistencia: cotización personalizada\n\n⚡ Medición sin cargo en tu domicilio. Los precios finales dependen de las medidas exactas y tipo de fijación.",
    options: [
      { label: "Cotizar mis medidas", value: "wa_redes",      emoji: "💬", accent: "rgba(37,211,102,0.15)" },
      { label: "Ver la página",       value: "ir_redes",      emoji: "🌐", href: "/redes" },
      { label: "Otro servicio",       value: "welcome",       emoji: "↩️" },
    ],
    whatsappPreset: "Hola! Quiero cotizar redes de seguridad. ¿Pueden darme un presupuesto?",
  }),

  redes_material: () => ({
    text: "Usamos **polipropileno UV estabilizado** de alta densidad:\n\n✅ Resistente a rayos UV sin decoloración\n✅ Soporta temperaturas extremas (norte de Chile)\n✅ Alta resistencia a impactos y tensión\n✅ No tóxico, seguro para niños y mascotas\n✅ Certificado bajo normas vigentes\n\nTensores en acero inoxidable AISI 316.",
    options: [
      { label: "Ver precios",    value: "redes_precios",  emoji: "💲" },
      { label: "Cotizar ahora",  value: "wa_redes",       emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Me interesa cotizar redes de seguridad.",
  }),

  // ── ROLLER ───────────────────────────────────────────────────────────────────
  roller: () => ({
    text: "Fabricamos e instalamos **cortinas roller a medida** con más de 30 telas disponibles:\n\n🌑 **Blackout** — oscurecimiento total\n☀️ **Sunscreen** — filtro solar sin perder visión\n⚡ **Motorizadas** — control remoto o app\n🎭 **Dúo / Zebra** — combinación de opacidades\n\n¿Qué tipo te interesa?",
    options: [
      { label: "Blackout",     value: "roller_blackout",  emoji: "🌑", accent: "rgba(0,0,0,0.4)" },
      { label: "Sunscreen",    value: "roller_sunscreen", emoji: "☀️", accent: "rgba(245,158,11,0.15)" },
      { label: "Motorizadas",  value: "roller_motor",     emoji: "⚡", accent: "rgba(6,182,212,0.15)" },
      { label: "Dúo / Zebra",  value: "roller_duo",       emoji: "🎭" },
      { label: "Ver precios",  value: "roller_precios",   emoji: "💲" },
    ],
  }),

  roller_blackout: () => ({
    text: "Las **Roller Blackout** bloquean el **100% de la luz** exterior.\n\nIdeal para:\n• Dormitorios (sueño profundo)\n• Salas home cinema\n• Oficinas con proyección\n• Turno nocturno (trabajadores minería)\n\nDisponibles en +30 colores. Instalación con riel aluminio oculto.",
    options: [
      { label: "Ver precios",        value: "roller_precios",   emoji: "💲" },
      { label: "Cotizar Blackout",   value: "wa_roller_black",  emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Me interesan las cortinas Roller Blackout. ¿Pueden cotizarme?",
  }),

  roller_sunscreen: () => ({
    text: "Las **Roller Sunscreen** filtran entre el **3% y el 10%** de la luz solar sin perder visibilidad exterior.\n\nVentajas:\n• Reducen el calor (clave en las regiones de Arica, Iquique y Antofagasta)\n• Protegen muebles y pisos del UV\n• Mantienen la vista exterior\n• Ahorro en aire acondicionado",
    options: [
      { label: "Ver precios",       value: "roller_precios",    emoji: "💲" },
      { label: "Cotizar Sunscreen", value: "wa_roller_sun",     emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Me interesan cortinas Roller Sunscreen. ¿Me pueden cotizar?",
  }),

  roller_motor: () => ({
    text: "Las **cortinas motorizadas** se controlan por:\n\n📱 App para smartphone\n🎮 Control remoto\n🗣️ Voz — Alexa, Google Home, Siri\n⏰ Programación horaria automática\n\nInstalación limpia sin cables visibles. Compatibles con sistemas de domótica existentes.",
    options: [
      { label: "Ver precios",          value: "roller_precios",  emoji: "💲" },
      { label: "Ver Domótica",         value: "domotica",        emoji: "💡" },
      { label: "Cotizar Motorizada",   value: "wa_roller_motor", emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Me interesan las cortinas Roller Motorizadas. ¿Me pueden cotizar?",
  }),

  roller_duo: () => ({
    text: "Las **cortinas Dúo / Zebra** tienen dos capas que se alternan para controlar desde transparencia total hasta oscurecimiento parcial.\n\nPerfectas para living y comedores donde querés luz natural con privacidad.",
    options: [
      { label: "Ver precios",   value: "roller_precios",  emoji: "💲" },
      { label: "Cotizar Dúo",   value: "wa_roller_duo",   emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Me interesan las cortinas Roller Dúo/Zebra. ¿Me pueden cotizar?",
  }),

  roller_precios: () => ({
    text: "**Precios referenciales Roller** (fabricación + instalación):\n\n• Sunscreen / Blackout estándar: desde **$35.000/unidad**\n• Roller Dúo / Zebra: desde **$65.000/unidad**\n• Motorizada estándar: desde **$95.000/unidad**\n• Motorizada con app: desde **$130.000/unidad**\n\n⚡ Precio final según ancho y alto exacto.",
    options: [
      { label: "Cotizar a medida",  value: "wa_roller",   emoji: "💬", accent: "rgba(37,211,102,0.15)" },
      { label: "Ver la página",     value: "ir_roller",   emoji: "🌐", href: "/roller" },
      { label: "Otro servicio",     value: "welcome",     emoji: "↩️" },
    ],
    whatsappPreset: "Hola! Quiero cotizar cortinas Roller. ¿Pueden darme un presupuesto?",
  }),

  // ── ALUMINIOS ────────────────────────────────────────────────────────────────
  aluminios: () => ({
    text: "Fabricamos **carpintería en aluminio** para uso residencial y comercial:\n\n🪟 Ventanas DVH (doble vidriado hermético)\n🚪 Puertas corredizas y batientes\n🏠 Cerramientos de balcón y terraza\n🏢 Frentes de locales comerciales\n\n¿Qué tipo de proyecto tenés?",
    options: [
      { label: "Ventanas / DVH",        value: "aluminios_ventanas",  emoji: "🪟" },
      { label: "Cierre de balcón",      value: "aluminios_cierre",    emoji: "🏠" },
      { label: "Puertas corredizas",    value: "aluminios_puertas",   emoji: "🚪" },
      { label: "Local / comercial",     value: "aluminios_comercial", emoji: "🏢" },
      { label: "Ver precios",           value: "aluminios_precios",   emoji: "💲" },
    ],
  }),

  aluminios_ventanas: () => ({
    text: "Las **ventanas DVH** (doble vidriado hermético) ofrecen:\n\n✅ Aislación térmica (ahorro energético)\n✅ Aislación acústica (hasta -40 dB)\n✅ Protección UV incluida en el vidrio\n✅ Sello hermético anti-polvo (clave en el norte)\n\nDisponibles en perfil natural, anodizado y lacado color.",
    options: [
      { label: "Ver precios",      value: "aluminios_precios",    emoji: "💲" },
      { label: "Cotizar ventanas", value: "wa_aluminios_vent",    emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Quiero cotizar ventanas de aluminio DVH.",
  }),

  aluminios_cierre: () => ({
    text: "El **cerramiento de balcón** en aluminio y vidrio templado convierte tu terraza en un espacio habitable todo el año.\n\nCaracterísticas:\n• Vidrio templado 6, 8 o 10mm\n• Sistema corredizo o plegable\n• Sello anti-viento y polvo\n• Garantía 2 años en materiales y mano de obra",
    options: [
      { label: "Ver precios",        value: "aluminios_precios",   emoji: "💲" },
      { label: "Cotizar cierre",     value: "wa_aluminios_cierre", emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Quiero cotizar un cerramiento de balcón/terraza en aluminio.",
  }),

  aluminios_puertas: () => ({
    text: "Las **puertas corredizas y batientes** en aluminio destacan por:\n\n• Rodamientos importados de alta durabilidad\n• Vidrio doble o simple según proyecto\n• Cerradura multilock de seguridad\n• Perfil grueso para mayor rigidez",
    options: [
      { label: "Ver precios",    value: "aluminios_precios",    emoji: "💲" },
      { label: "Cotizar puerta", value: "wa_aluminios_puerta",  emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Quiero cotizar puertas de aluminio.",
  }),

  aluminios_comercial: () => ({
    text: "Para **locales y espacios comerciales** fabricamos:\n\n🏢 Frentes en vidrio templado 10/12mm\n🚪 Puertas automáticas y de seguridad\n📦 Divisiones de ambientes y oficinas\n🏗️ Estructuras modulares personalizadas\n\nRespaldamos con garantía y servicio post-venta.",
    options: [
      { label: "Cotizar proyecto",   value: "wa_aluminios_com",   emoji: "💬", accent: "rgba(37,211,102,0.15)" },
      { label: "Ver precios",        value: "aluminios_precios",  emoji: "💲" },
    ],
    whatsappPreset: "Hola! Tengo un proyecto comercial y quiero cotizar carpintería en aluminio.",
  }),

  aluminios_precios: () => ({
    text: "**Precios referenciales Aluminios** (fabricación + instalación):\n\n• Ventana DVH 1.2×1m: desde **$180.000**\n• Puerta corrediza 2×2m: desde **$320.000**\n• Cerramiento balcón 3 lados: desde **$850.000**\n• Frente comercial: cotización personalizada\n\n⚡ Incluye medición sin cargo y presupuesto detallado.",
    options: [
      { label: "Cotizar mi proyecto", value: "wa_aluminios",   emoji: "💬", accent: "rgba(37,211,102,0.15)" },
      { label: "Ver la página",       value: "ir_aluminios",   emoji: "🌐", href: "/aluminios" },
      { label: "Otro servicio",       value: "welcome",        emoji: "↩️" },
    ],
    whatsappPreset: "Hola! Quiero cotizar carpintería en aluminio.",
  }),

  // ── DOMÓTICA ─────────────────────────────────────────────────────────────────
  domotica: () => ({
    text: "Con la **domótica** controlás tu hogar desde el celular:\n\n💡 Iluminación inteligente\n❄️ Climatización programada\n📷 Seguridad y cámaras IP\n🪟 Cortinas y persianas motorizadas\n🔌 Enchufes y electrodomésticos\n\nCompatible con **Alexa, Google Home y Apple HomeKit**. ¿Qué querés automatizar?",
    options: [
      { label: "Iluminación",       value: "domotica_luz",     emoji: "💡", accent: "rgba(245,158,11,0.15)" },
      { label: "Climatización",     value: "domotica_clima",   emoji: "❄️" },
      { label: "Seguridad",         value: "domotica_seg",     emoji: "📷" },
      { label: "Todo el hogar",     value: "domotica_full",    emoji: "🏠", accent: "rgba(192,132,252,0.15)" },
      { label: "Ver precios",       value: "domotica_precios", emoji: "💲" },
    ],
  }),

  domotica_luz: () => ({
    text: "La **iluminación inteligente** te permite:\n\n• Encender/apagar por voz o app\n• Programar horarios automáticos\n• Crear escenas (cine, relax, trabajo)\n• Dimmerizar la intensidad\n• Detectar presencia y ahorrar energía\n\nInstalación limpia sin cablear de nuevo.",
    options: [
      { label: "Ver precios",          value: "domotica_precios",  emoji: "💲" },
      { label: "Cotizar iluminación",  value: "wa_domotica_luz",   emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Me interesa la domótica de iluminación para mi hogar.",
  }),

  domotica_clima: () => ({
    text: "El **control de climatización inteligente** es fundamental en las regiones de Arica, Iquique y Antofagasta:\n\n• Programá el aire acondicionado antes de llegar\n• Apagado automático cuando salís\n• Control por zona o habitación\n• Compatible con la mayoría de marcas de AC\n• Ahorro de energía del 20-35%",
    options: [
      { label: "Ver precios",        value: "domotica_precios",   emoji: "💲" },
      { label: "Cotizar proyecto",   value: "wa_domotica_clima",  emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Quiero automatizar el clima de mi hogar.",
  }),

  domotica_seg: () => ({
    text: "El sistema de **seguridad inteligente** incluye:\n\n📷 Cámaras IP con visión nocturna\n🔔 Detectores de movimiento y apertura\n📱 Notificación al celular en tiempo real\n🔒 Cerradura inteligente con código o huella\n📹 Grabación en la nube\n\nMonitoreás tu hogar desde cualquier lugar del mundo.",
    options: [
      { label: "Ver precios",     value: "domotica_precios",  emoji: "💲" },
      { label: "Cotizar sistema", value: "wa_domotica_seg",   emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Me interesa un sistema de seguridad inteligente para mi hogar.",
  }),

  domotica_full: () => ({
    text: "El **paquete hogar inteligente completo** incluye:\n\n✅ Iluminación de toda la casa\n✅ Control climatización\n✅ Cámaras + detectores\n✅ Cortinas motorizadas\n✅ Enchufes inteligentes\n✅ Hub central + app personalizada\n\nInstalamos sin obra en 1-2 días. Capacitación incluida.",
    options: [
      { label: "Ver precios",       value: "domotica_precios",  emoji: "💲" },
      { label: "Cotizar proyecto",  value: "wa_domotica_full",  emoji: "💬", accent: "rgba(37,211,102,0.15)" },
    ],
    whatsappPreset: "Hola! Quiero cotizar un sistema de domótica completo para mi hogar.",
  }),

  domotica_precios: () => ({
    text: "**Precios referenciales Domótica**:\n\n• Paquete básico (iluminación): desde **$150.000**\n• Paquete medio (luz + clima): desde **$280.000**\n• Paquete completo hogar: desde **$450.000**\n• Proyectos empresariales: cotización a medida\n\n⚡ Instalamos por etapas según tu presupuesto.",
    options: [
      { label: "Cotizar mi proyecto",  value: "wa_domotica",   emoji: "💬", accent: "rgba(37,211,102,0.15)" },
      { label: "Ver la página",        value: "ir_domotica",   emoji: "🌐", href: "/domotica" },
      { label: "Otro servicio",        value: "welcome",       emoji: "↩️" },
    ],
    whatsappPreset: "Hola! Quiero cotizar domótica para mi hogar.",
  }),

  // ── ASISTENCIA ───────────────────────────────────────────────────────────────
  asistencia: () => ({
    text: "Brindamos **asistencia técnica especializada** para todo lo que instalamos:\n\n🛡️ Redes de seguridad\n🪟 Cortinas roller\n🔲 Carpintería en aluminio\n💡 Sistemas domóticos\n\n¿Qué tipo de asistencia necesitás?",
    options: [
      { label: "Mantenimiento",    value: "asist_mantto",    emoji: "🔧" },
      { label: "Revisión / ajuste",value: "asist_revision",  emoji: "🔍" },
      { label: "Es urgente",       value: "asist_urgente",   emoji: "🚨", accent: "rgba(239,68,68,0.15)" },
      { label: "Agendar visita",   value: "wa_asistencia",   emoji: "📅", accent: "rgba(37,211,102,0.15)" },
    ],
  }),

  asist_mantto: () => ({
    text: "El **mantenimiento preventivo** incluye:\n\n• Revisión y tensado de redes\n• Limpieza y lubricación de rieles roller\n• Sellado de carpintería de aluminio\n• Actualización firmware domótica\n\nRecomendamos hacerlo **una vez al año**. Podés agendar un turno.",
    options: [
      { label: "Agendar mantenimiento", value: "wa_asist_mantto",  emoji: "📅", accent: "rgba(37,211,102,0.15)" },
      { label: "Ver página asistencia", value: "ir_asistencia",    emoji: "🌐", href: "/asistencia" },
    ],
    whatsappPreset: "Hola! Quiero agendar un mantenimiento preventivo.",
  }),

  asist_revision: () => ({
    text: "Para **revisiones y ajustes** de instalaciones existentes:\n\n• Ajuste de tensión en redes\n• Revisión de rieles y mecanismos\n• Sellado de ventanas\n• Reconfiguraciones en domótica\n\nVisita técnica con diagnóstico sin cargo en muchos casos.",
    options: [
      { label: "Agendar revisión", value: "wa_asist_rev",   emoji: "📅", accent: "rgba(37,211,102,0.15)" },
      { label: "Ver página",       value: "ir_asistencia",  emoji: "🌐", href: "/asistencia" },
    ],
    whatsappPreset: "Hola! Necesito una revisión de una instalación.",
  }),

  asist_urgente: () => ({
    text: "⚡ **Urgencias técnicas**\n\nRespondemos por WhatsApp en horario laboral:\n📅 Lunes a Viernes: 8:30 - 19:00\n📅 Sábados: 9:00 - 14:00\n\nEscribinos directamente con:\n• Descripción del problema\n• Fotos si es posible\n• Tu ubicación (Antofagasta / Iquique)",
    options: [
      { label: "WhatsApp urgente", value: "wa_urgente", emoji: "🚨", accent: "rgba(239,68,68,0.2)" },
    ],
    whatsappPreset: "Hola! Tengo una urgencia técnica. Necesito ayuda lo antes posible.",
  }),

  // ── PRECIOS GENERALES ────────────────────────────────────────────────────────
  precios_general: () => ({
    text: "Tenemos precios para todos los servicios. ¿De cuál querés información?",
    options: [
      { label: "Precios Redes",      value: "redes_precios",     emoji: "🛡️" },
      { label: "Precios Roller",     value: "roller_precios",    emoji: "🪟" },
      { label: "Precios Aluminios",  value: "aluminios_precios", emoji: "🔲" },
      { label: "Precios Domótica",   value: "domotica_precios",  emoji: "💡" },
    ],
  }),

  // ── WA BRIDGES ───────────────────────────────────────────────────────────────
  wa_redes:           () => ({ text: "", whatsappPreset: "Hola! Quiero cotizar redes de seguridad." }),
  wa_redes_balcon:    () => ({ text: "", whatsappPreset: "Hola! Quiero cotizar redes para balcón/ventana." }),
  wa_redes_escalera:  () => ({ text: "", whatsappPreset: "Hola! Quiero cotizar redes para escalera." }),
  wa_redes_industrial:() => ({ text: "", whatsappPreset: "Hola! Quiero cotizar redes industriales." }),
  wa_roller:          () => ({ text: "", whatsappPreset: "Hola! Quiero cotizar cortinas Roller." }),
  wa_roller_black:    () => ({ text: "", whatsappPreset: "Hola! Quiero cotizar cortinas Roller Blackout." }),
  wa_roller_sun:      () => ({ text: "", whatsappPreset: "Hola! Quiero cotizar cortinas Roller Sunscreen." }),
  wa_roller_motor:    () => ({ text: "", whatsappPreset: "Hola! Quiero cotizar cortinas Roller Motorizadas." }),
  wa_roller_duo:      () => ({ text: "", whatsappPreset: "Hola! Quiero cotizar cortinas Roller Dúo." }),
  wa_aluminios:       () => ({ text: "", whatsappPreset: "Hola! Quiero cotizar carpintería en aluminio." }),
  wa_aluminios_vent:  () => ({ text: "", whatsappPreset: "Hola! Quiero cotizar ventanas de aluminio DVH." }),
  wa_aluminios_cierre:() => ({ text: "", whatsappPreset: "Hola! Quiero cotizar cierre de balcón en aluminio." }),
  wa_aluminios_puerta:() => ({ text: "", whatsappPreset: "Hola! Quiero cotizar puertas de aluminio." }),
  wa_aluminios_com:   () => ({ text: "", whatsappPreset: "Hola! Tengo un proyecto comercial de aluminios." }),
  wa_domotica:        () => ({ text: "", whatsappPreset: "Hola! Quiero cotizar domótica para mi hogar." }),
  wa_domotica_luz:    () => ({ text: "", whatsappPreset: "Hola! Me interesa la iluminación inteligente." }),
  wa_domotica_clima:  () => ({ text: "", whatsappPreset: "Hola! Quiero automatizar el clima de mi hogar." }),
  wa_domotica_seg:    () => ({ text: "", whatsappPreset: "Hola! Me interesa un sistema de seguridad inteligente." }),
  wa_domotica_full:   () => ({ text: "", whatsappPreset: "Hola! Quiero un sistema de domótica completo." }),
  wa_asistencia:      () => ({ text: "", whatsappPreset: "Hola! Necesito asistencia técnica." }),
  wa_asist_mantto:    () => ({ text: "", whatsappPreset: "Hola! Quiero agendar un mantenimiento preventivo." }),
  wa_asist_rev:       () => ({ text: "", whatsappPreset: "Hola! Necesito una revisión técnica." }),
  wa_urgente:         () => ({ text: "", whatsappPreset: "Hola! Tengo una URGENCIA técnica. Necesito ayuda." }),

  // ── FALLBACK ─────────────────────────────────────────────────────────────────
  default: () => ({
    text: "No entendí bien tu consulta, pero puedo ayudarte con alguno de estos temas:",
    options: [
      { label: "Redes de Seguridad", value: "redes",      emoji: "🛡️" },
      { label: "Cortinas Roller",    value: "roller",     emoji: "🪟" },
      { label: "Aluminios",          value: "aluminios",  emoji: "🔲" },
      { label: "Domótica",           value: "domotica",   emoji: "💡" },
      { label: "Asistencia Técnica", value: "asistencia", emoji: "🔧" },
    ],
  }),
};

// ─── KEYWORD ROUTING ──────────────────────────────────────────────────────────

const KEYWORDS: { patterns: RegExp[]; flow: string }[] = [
  { patterns: [/red(es)?/, /malla/, /balcon/, /balcón/, /escalera/, /protec/], flow: "redes" },
  { patterns: [/roller/, /cortina/, /blackout/, /sunscreen/, /persiana/, /tela/], flow: "roller" },
  { patterns: [/alumin/, /ventana/, /puerta/, /vidrio/, /cierre/, /terraza/, /dvh/], flow: "aluminios" },
  { patterns: [/domot/, /automa/, /smart/, /intelig/, /alexa/, /google home/, /ilumina/], flow: "domotica" },
  { patterns: [/asist/, /técni/, /técni/, /repar/, /manteni/, /visita/, /soporte/, /urgencia/, /urgente/], flow: "asistencia" },
  { patterns: [/precio/, /costo/, /valor/, /cuánto/, /cuanto/, /tarifa/, /presupuesto/], flow: "precios_general" },
  { patterns: [/hola/, /buen(os|as)/, /salud/, /inicio/, /menu/, /menú/], flow: "welcome" },
];

function detectFlow(input: string, ctx: ChatContext): string {
  for (const { patterns, flow } of KEYWORDS) {
    if (patterns.some(p => p.test(input))) {
      // Refine with context
      if (flow === "precios_general" && ctx.topic) {
        return `${ctx.topic}_precios`;
      }
      return flow;
    }
  }
  return ctx.topic ?? "default";
}

function ruleEngine(input: string, ctx: ChatContext): AIResponse {
  const flow = detectFlow(input, ctx);
  const fn = FLOWS[flow] ?? FLOWS.default;
  const resp = fn(ctx);

  // WA bridges — open directly
  if (flow.startsWith("wa_") && resp.whatsappPreset) {
    const url = wa(resp.whatsappPreset);
    if (typeof window !== "undefined") window.open(url, "_blank");
    return {
      text: `Te estoy redirigiendo a **WhatsApp** con el equipo de Aluminios & Redes. Si no se abre automáticamente, tocá el botón abajo 👇`,
      options: [
        { label: "Abrir WhatsApp", value: "_noop", emoji: "💬", whatsappMsg: resp.whatsappPreset, accent: "rgba(37,211,102,0.2)" },
        { label: "Volver al inicio", value: "welcome", emoji: "↩️" },
      ],
    };
  }

  return resp;
}

/**
 * Get response for a flow key directly (used for quick-option clicks).
 */
export async function getFlowResponse(flowKey: string, ctx: ChatContext): Promise<AIResponse> {
  if (flowKey === "_noop") return { text: "" };
  await delay(500 + Math.random() * 400);

  // WA bridges
  if (flowKey.startsWith("wa_") || flowKey.startsWith("ir_")) {
    const fn = FLOWS[flowKey];
    if (fn) {
      const resp = fn(ctx);
      if (resp.whatsappPreset) {
        const url = wa(resp.whatsappPreset);
        if (typeof window !== "undefined") window.open(url, "_blank");
        return {
          text: `Te estoy conectando con nuestro equipo por **WhatsApp** 💬`,
          options: [
            { label: "Abrir WhatsApp", value: "_noop", emoji: "💬", whatsappMsg: resp.whatsappPreset, accent: "rgba(37,211,102,0.2)" },
            { label: "Volver al inicio", value: "welcome", emoji: "↩️" },
          ],
        };
      }
    }
    return FLOWS.default(ctx);
  }

  const fn = FLOWS[flowKey] ?? FLOWS.default;
  return fn(ctx);
}

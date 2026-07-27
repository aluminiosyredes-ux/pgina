import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Check, ChevronRight, MessageCircle, Star, ArrowLeft, Calculator, Info, Ruler, User } from "lucide-react";
import { WHATSAPP_NUMBER, COMPANY_NAME } from "../config";
import { saveQuote } from "../lib/quotes";
import { getPrices } from "../lib/prices";
import AsistenciaStrip from "../components/AsistenciaStrip";
import InstagramBanner from "../components/InstagramBanner";
import MercadoLibreSection from "../components/MercadoLibreSection";
import CMSGallerySection from "../components/CMSGallerySection";
import ProductsSection from "../components/ProductsSection";
import RedesSlider from "../components/RedesSlider";
import { useSEO } from "../hooks/useSEO";
import { SEO } from "../lib/seoData";
import { track } from "../lib/analytics";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

const redOptions = [
  {
    id: "equiplex",
    label: "Malla Equiplex",
    badge: "Más recomendada",
    tagline: "La más resistente del mercado",
    desc: "Malla técnica de alta resistencia con tratamiento UV y anticorrosión. Ideal para balcones de altura, zonas industriales y climas extremos.",
    features: ["Resistencia superior", "Certificada UV", "Garantía extendida"],
    priceMin: 8500,
    priceMax: 11000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=85&auto=format&fit=crop",
    accent: "from-blue-600/30 via-blue-900/20 to-black/80",
    glow: "border-blue-500",
    glowBg: "bg-blue-500/8",
    textAccent: "text-blue-400",
    badgeBg: "bg-blue-500/15 border-blue-500/30 text-blue-300",
  },
  {
    id: "transparente",
    label: "Malla Transparente",
    badge: "Diseño discreto",
    tagline: "Elegante e invisible a la vista",
    desc: "Malla de monofilamento transparente prácticamente invisible. Preserva la estética del espacio y mantiene la visibilidad natural.",
    features: ["Casi invisible", "Liviana y elegante", "Fácil instalación"],
    note: "Uso estético y contención de mascotas pequeñas. No certificada para protección de personas.",
    priceMin: 6500,
    priceMax: 9000,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=85&auto=format&fit=crop",
    accent: "from-zinc-600/20 via-zinc-900/30 to-black/85",
    glow: "border-zinc-400",
    glowBg: "bg-zinc-400/6",
    textAccent: "text-zinc-300",
    badgeBg: "bg-zinc-400/10 border-zinc-400/20 text-zinc-300",
  },
];


function formatCLP(n: number) {
  return "$\u00a0" + Math.round(n).toLocaleString("es-CL");
}

type Step = 0 | 1 | 2;

export default function Redes() {
  useSEO(SEO.redes);
  const [step, setStep] = useState<Step>(0);
  const [selectedType, setSelectedType] = useState<"equiplex" | "transparente" | "">("");
  const [ancho, setAncho] = useState("");
  const [alto, setAlto] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("");

  const rPrices = getPrices().redes;
  const pricedOptions = redOptions.map((opt) => {
    const p = rPrices.find((r) => r.id === opt.id);
    return p ? { ...opt, priceMin: p.priceMin, priceMax: p.priceMax } : opt;
  });
  const selected = pricedOptions.find((r) => r.id === selectedType);
  const anchoNum = parseFloat(ancho.replace(",", ".")) || 0;
  const altoNum = parseFloat(alto.replace(",", ".")) || 0;
  const m2 = anchoNum * altoNum;
  const totalMin = selected ? m2 * selected.priceMin : 0;
  const totalMax = selected ? m2 * selected.priceMax : 0;

  const canGoStep1 = step === 0 && selectedType !== "";
  const MIN_M2 = 5;
  const belowMinimum = m2 > 0 && m2 < MIN_M2;
  const canGoStep2 = step === 1 && m2 >= MIN_M2;

  const handleWhatsApp = () => {
    if (!selected) return;
    track("cotizacion_enviada", { producto: `red_${selected.id}` });
    if (nombre && telefono) {
      saveQuote({
        nombre, telefono, email, ciudad,
        producto: `Red ${selected.label}`,
        medidas: `${anchoNum.toFixed(2)}m × ${altoNum.toFixed(2)}m`,
        totalMin,
        totalMax,
      });
    }
    const msg = [
      `Hola ${COMPANY_NAME}! 👋 Solicito cotización desde la web.`,
      nombre ? `👤 *Nombre:* ${nombre}` : "",
      telefono ? `📱 *Teléfono:* ${telefono}` : "",
      ciudad ? `📍 *Ciudad:* ${ciudad}` : "",
      ``,
      `🔲 *Tipo de malla:* ${selected.label}`,
      `📐 *Ancho:* ${ancho} m`,
      `📏 *Alto:* ${alto} m`,
      `📊 *Área total:* ${m2.toFixed(2)} m²`,
      `💰 *Precio aproximado:* ${formatCLP(totalMin)} – ${formatCLP(totalMax)} CLP`,
      ``,
      `Quedo a la espera. ¡Gracias!`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const reset = () => {
    setStep(0);
    setSelectedType("");
    setAncho("");
    setAlto("");
    setNombre("");
    setTelefono("");
    setEmail("");
    setCiudad("");
  };

  const stepLabels = ["Tipo de malla", "Medidas", "Resumen"];

  return (
    <motion.div {...pageTransition}>

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/23.png" alt="Redes de Seguridad" className="w-full h-full object-cover object-center" style={{ filter: "brightness(0.72) saturate(0.9)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-6">
              <Shield size={12} /> Protección certificada
            </div>
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[0.88] mb-6">
              Redes de<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-sky-400">Seguridad</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-xl">
              Instalamos redes certificadas para balcones, escaleras, espacios industriales y exteriores.
              Materiales de primera línea, instalación sin obra y garantía total.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#cotizador" onClick={(e) => { e.preventDefault(); document.getElementById("cotizador")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-bold text-xs tracking-widest uppercase rounded hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
                Cotizar ahora <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera consultar sobre redes de seguridad.")}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 border border-white/10 text-white font-semibold text-xs tracking-widest uppercase rounded hover:border-white/25 hover:bg-white/5 transition-all">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
            <div className="flex items-center gap-10 pt-8 border-t border-white/6">
              {[{ v: "+500", l: "Instalaciones" }, { v: "15+", l: "Años" }, { v: "100%", l: "Garantía" }].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-black text-white">{s.v}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {false && (
      <section className="py-14 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}>
            {/* Header */}
            <div className="flex items-start justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-px bg-yellow-500/50" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">Disponible también en MercadoLibre</span>
                </div>
                <p className="text-zinc-600 text-sm">Compra segura mediante MercadoLibre y Mercado Pago.</p>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Product 1 */}
              <motion.a
                href="https://www.mercadolibre.cl/malla-para-balcon-ventanas--2m-alto-x-5m--seguridad-ninos/up/MLCU55904712?pdp_filters=item_id%3AMLC1346337377"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                className="group relative flex flex-col rounded-2xl border border-zinc-800/70 bg-[#1e1e1e] overflow-hidden hover:border-yellow-500/25 transition-all duration-400 shadow-lg hover:shadow-yellow-500/5"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src="/images/1.png" alt="Malla para balcón 2m × 5m" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/20 to-transparent" />
                  <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full border border-yellow-500/30 bg-black/70 text-yellow-400 backdrop-blur-sm">
                    <Shield size={8} /> Compra Segura
                  </span>
                </div>
                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-1">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-600 mb-1.5">2 m alto × 5 m</p>
                    <h3 className="text-base font-black text-white leading-tight tracking-tight">
                      Malla para Balcón<br /><span className="text-zinc-400 font-light">y Ventanas.</span>
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-2 mb-5">
                    Protección para niños y mascotas. Con garantía Mercado Pago.
                  </p>
                  <div className="mt-auto flex items-center gap-2 px-4 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-[10px] tracking-widest uppercase rounded-xl transition-all duration-300 justify-center group-hover:shadow-lg group-hover:shadow-yellow-400/15">
                    Comprar en MercadoLibre
                    <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.a>

              {/* Product 2 */}
              <motion.a
                href="https://www.mercadolibre.cl/malla-seguridad-balcon-espesor-09mm23m-x-8m-certificada/up/MLCU426149242?pdp_filters=item_id%3AMLC2618807376"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] as const }}
                className="group relative flex flex-col rounded-2xl border border-zinc-800/70 bg-[#1e1e1e] overflow-hidden hover:border-yellow-500/25 transition-all duration-400 shadow-lg hover:shadow-yellow-500/5"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src="/images/3.png" alt="Malla Certificada 2.3m × 8m" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/20 to-transparent" />
                  <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full border border-yellow-500/30 bg-black/70 text-yellow-400 backdrop-blur-sm">
                    <Shield size={8} /> Compra Segura
                  </span>
                  <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full border border-blue-500/30 bg-black/70 text-blue-400 backdrop-blur-sm">
                    <Star size={8} /> Certificada
                  </span>
                </div>
                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-1">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-600 mb-1.5">2.3 m × 8 m · 0.9 mm</p>
                    <h3 className="text-base font-black text-white leading-tight tracking-tight">
                      Malla Certificada<br /><span className="text-zinc-400 font-light">Espesor Profesional.</span>
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-2 mb-5">
                    Malla de alta resistencia certificada. Máxima protección para balcones.
                  </p>
                  <div className="mt-auto flex items-center gap-2 px-4 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-[10px] tracking-widest uppercase rounded-xl transition-all duration-300 justify-center group-hover:shadow-lg group-hover:shadow-yellow-400/15">
                    Comprar en MercadoLibre
                    <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.a>

            </div>
          </motion.div>
        </div>
      </section>
      )}

      <RedesSlider />

      {/* TIPOS DE RED */}
      <section className="py-16 bg-[#0a0a0a] border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <p className="text-[9px] font-black tracking-[0.3em] uppercase text-blue-400/70 mb-3">¿Cuál es la diferencia?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Nuestros dos tipos de red.
            </h2>
            <p className="text-zinc-500 text-sm mt-3 max-w-lg mx-auto">
              Cada red está diseñada para un uso específico. Conoce cuál es la indicada para tu proyecto.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Equiplex */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-2xl border border-blue-500/15 bg-[#0d0d14] overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <img src="/images/1.png" alt="Red Equiplex" className="w-full h-full object-cover object-center" style={{ filter: "brightness(0.65) saturate(0.85)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-300 text-[10px] font-black tracking-widest uppercase">
                    <Star size={9} /> Más recomendada
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-white mb-1">Red Equiplex</h3>
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Poliamida de multifilamento trenzado</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  La Red Equiplex es una malla técnica de alta resistencia fabricada en poliamida de multifilamento trenzado. Su estructura trenzada le otorga una resistencia superior a los impactos y a la deformación, siendo la opción certificada para la protección de personas, niños y mascotas en alturas y espacios abiertos.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { t: "¿Para qué sirve?", d: "Protección de balcones, terrazas, escaleras, vanos y espacios industriales donde se requiere máxima seguridad." },
                    { t: "Material", d: "Poliamida de multifilamento trenzado. Alta resistencia a la tensión, impactos y condiciones climáticas extremas." },
                    { t: "¿A quién está dirigida?", d: "Familias con niños o mascotas, edificios, condominios, industrias y proyectos que requieren certificación." },
                  ].map((item) => (
                    <div key={item.t} className="rounded-xl bg-white/[0.03] border border-white/[0.05] px-4 py-3">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">{item.t}</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Certificada para personas", "Multifilamento trenzado", "Alta resistencia", "Liviana y flexible", "Garantía extendida"].map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/8 border border-blue-500/15 text-blue-400 font-semibold">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Transparente */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              className="rounded-2xl border border-zinc-700/20 bg-[#0d0d0d] overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <img src="/images/3.png" alt="Red Transparente" className="w-full h-full object-cover object-center" style={{ filter: "brightness(0.65) saturate(0.7)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-300 text-[10px] font-black tracking-widest uppercase">
                    Diseño discreto
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-white mb-1">Red Transparente</h3>
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">Monofilamento de nylon transparente</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  La Red Transparente está fabricada en nylon monofilamento de alta claridad. Al ser prácticamente invisible, conserva la estética y la vista del espacio. Es ideal para quienes buscan contener mascotas pequeñas o proteger objetos sin alterar el diseño de su hogar o negocio.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { t: "¿Para qué sirve?", d: "Contención de mascotas pequeñas, protección de objetos y separación de espacios con mínimo impacto visual." },
                    { t: "Material", d: "Nylon monofilamento transparente. Liviano, limpio y casi invisible a la vista." },
                    { t: "Importante", d: "No está certificada para contención de personas. Se recomienda Red Equiplex si hay riesgo de caída de personas." },
                  ].map((item) => (
                    <div key={item.t} className={`rounded-xl border px-4 py-3 ${item.t === "Importante" ? "bg-amber-500/5 border-amber-500/15" : "bg-white/[0.03] border-white/[0.05]"}`}>
                      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${item.t === "Importante" ? "text-amber-400" : "text-zinc-400"}`}>{item.t}</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Casi invisible", "Liviana", "Fácil instalación", "Estética premium", "Para mascotas"].map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-500/8 border border-zinc-500/15 text-zinc-400 font-semibold">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* COTIZADOR — positioned immediately after hero */}
      <section id="cotizador" className="py-8 bg-[#0f0f0f] scroll-mt-16">
        <div className="max-w-2xl mx-auto px-6">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">
              <Calculator size={11} /> Cotizador online
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1.5">
              Tu presupuesto <span className="text-zinc-500">en 3 pasos.</span>
            </h2>
            <p className="text-zinc-600 text-sm">Sin costo ni compromiso.</p>
          </motion.div>

          {/* Step indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center justify-center mb-6 gap-0">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < step ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : i === step ? "bg-blue-500/15 border-2 border-blue-500 text-blue-400"
                    : "bg-white/4 border border-white/10 text-zinc-600"
                  }`}>
                    {i < step ? <Check size={13} /> : i + 1}
                  </div>
                  <span className={`text-[10px] font-semibold tracking-wider uppercase hidden sm:block transition-colors ${
                    i === step ? "text-white" : i < step ? "text-blue-500/60" : "text-zinc-700"
                  }`}>{label}</span>
                </div>
                {i < 2 && (
                  <div className={`w-16 sm:w-24 h-px mx-1 mb-5 transition-all duration-500 ${i < step ? "bg-blue-600/50" : "bg-white/6"}`} />
                )}
              </div>
            ))}
          </motion.div>

          {/* Steps */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
            <AnimatePresence mode="wait">

              {/* STEP 0 — Tipo de red */}
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}>
                  <p className="text-zinc-400 text-sm mb-5 text-center">Seleccioná el tipo de malla que necesitás</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pricedOptions.map((opt) => (
                      <button key={opt.id} onClick={() => setSelectedType(opt.id as "equiplex" | "transparente")}
                        className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 border-2 ${
                          selectedType === opt.id
                            ? `${opt.glow} shadow-lg`
                            : "border-white/6 hover:border-white/15"
                        }`}
                        style={{ minHeight: "300px" }}>
                        <div className="absolute inset-0">
                          <img src={opt.image} alt={opt.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                          <div className={`absolute inset-0 bg-gradient-to-t ${opt.accent}`} />
                          <div className="absolute inset-0 bg-black/40" />
                        </div>
                        <div className="relative z-10 p-5 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-auto">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase ${opt.badgeBg}`}>
                              {opt.id === "equiplex" && <Star size={9} />}
                              {opt.badge}
                            </span>
                            {selectedType === opt.id && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                                <Check size={12} className="text-white" />
                              </motion.div>
                            )}
                          </div>
                          <div className="mt-auto">
                            <h3 className="text-xl font-black text-white mb-1 tracking-tight">{opt.label}</h3>
                            <p className={`text-xs font-semibold mb-3 ${opt.textAccent}`}>{opt.tagline}</p>
                            <p className="text-zinc-300/80 text-xs leading-relaxed mb-4">{opt.desc}</p>
                            <div className="space-y-1.5">
                              {opt.features.map((f) => (
                                <div key={f} className="flex items-center gap-2">
                                  <div className={`w-1 h-1 rounded-full ${opt.id === "equiplex" ? "bg-blue-400" : "bg-zinc-400"}`} />
                                  <span className="text-xs text-zinc-300">{f}</span>
                                </div>
                              ))}
                            </div>
                            {"note" in opt && opt.note && (
                              <div className="mt-3 flex items-start gap-2 rounded-xl border border-zinc-700/50 bg-zinc-900/60 px-3 py-2.5 backdrop-blur-sm">
                                <Info size={11} className="text-zinc-500 mt-0.5 shrink-0" />
                                <p className="text-[10px] leading-relaxed text-zinc-400">{opt.note}</p>
                              </div>
                            )}
                            <div className="mt-4 pt-3 border-t border-white/8 flex items-baseline gap-1 flex-wrap">
                              <span className="text-xs text-zinc-500">Desde</span>
                              <span className={`text-base font-black ${opt.textAccent}`}>{formatCLP(opt.priceMin)}</span>
                              <span className="text-xs text-zinc-500">–</span>
                              <span className={`text-base font-black ${opt.textAccent}`}>{formatCLP(opt.priceMax)}</span>
                              <span className="text-xs text-zinc-500">/ m²</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button disabled={!canGoStep1} onClick={() => setStep(1)}
                      className="flex items-center gap-2 px-7 py-3 bg-blue-600 text-white text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-blue-500 transition-all disabled:opacity-25 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20">
                      Continuar <ChevronRight size={13} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 1 — Medidas */}
              {step === 1 && (
                <motion.div key="step1b" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}>
                  {selected && (
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-xs font-semibold ${selected.badgeBg}`}>
                      <Check size={10} /> {selected.label}
                    </div>
                  )}
                  <p className="text-zinc-400 text-sm mb-6">Ingresá las medidas del área a proteger</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: "Ancho", value: ancho, setter: setAncho, placeholder: "ej: 3.5" },
                      { label: "Alto", value: alto, setter: setAlto, placeholder: "ej: 2.2" },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-xs font-semibold text-zinc-400 tracking-wider uppercase mb-2">{field.label}</label>
                        <div className="relative">
                          <input
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.1"
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full bg-[#222222] border border-white/8 rounded-xl px-4 py-4 text-xl font-bold text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/4 transition-all"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-600 font-medium">m</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <AnimatePresence>
                    {m2 > 0 && (
                      <motion.div key="preview2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
                        className={`rounded-xl border p-4 flex items-center justify-between mb-3 transition-colors duration-300 ${belowMinimum ? "border-red-500/30 bg-red-500/5" : "border-white/6 bg-[#1a1a1a]"}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${belowMinimum ? "bg-red-500/10" : "bg-blue-500/10"}`}>
                            <Ruler size={16} className={belowMinimum ? "text-red-400" : "text-blue-400"} />
                          </div>
                          <div>
                            <div className="text-xs text-zinc-500">Área calculada</div>
                            <div className="text-white font-bold text-sm">{anchoNum.toFixed(1)} × {altoNum.toFixed(1)} m</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-black transition-colors ${belowMinimum ? "text-red-400" : "text-white"}`}>{m2.toFixed(2)}</div>
                          <div className="text-xs text-zinc-500">m²</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {belowMinimum && (
                      <motion.div key="minwarn2" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/20 bg-red-500/6 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span className="text-xs text-red-400 font-medium">Instalación mínima: 5 m²</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {!belowMinimum && m2 > 0 && <div className="mb-6" />}
                  <div className="flex justify-between items-center">
                    <button onClick={() => setStep(0)} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors">
                      <ArrowLeft size={12} /> Volver
                    </button>
                    <button disabled={!canGoStep2} onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-7 py-3 bg-blue-600 text-white text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-blue-500 transition-all disabled:opacity-25 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20">
                      Ver resumen <ChevronRight size={13} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — Resumen */}
              {step === 2 && selected && (
                <motion.div key="step2b" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}>
                  <div className="rounded-2xl border border-white/8 bg-[#1a1a1a] overflow-hidden mb-4">
                    <div className={`px-6 py-4 border-b border-white/5 ${selected.glowBg}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${selected.textAccent}`}>Cotización estimada</div>
                          <div className="text-white font-black text-lg">{selected.label}</div>
                        </div>
                        <div className={`px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase ${selected.badgeBg}`}>
                          {selected.badge}
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-5 space-y-3">
                      {[
                        { label: "Ancho", value: `${ancho} m` },
                        { label: "Alto", value: `${alto} m` },
                        { label: "Área total", value: `${m2.toFixed(2)} m²` },
                        { label: "Precio por m²", value: `${formatCLP(selected.priceMin)} – ${formatCLP(selected.priceMax)}` },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between text-sm">
                          <span className="text-zinc-500">{row.label}</span>
                          <span className="text-zinc-200 font-semibold">{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mx-6 mb-6 rounded-xl bg-[#151515] border border-white/6 px-6 py-5 text-center">
                      <div className="text-xs text-zinc-600 uppercase tracking-widest font-semibold mb-2">Valor total aproximado</div>
                      <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
                        className={`font-black tracking-tight mb-1 ${selected.textAccent}`}
                      >
                        <span className="text-3xl md:text-4xl">{formatCLP(totalMin)}</span>
                        <span className="text-xl md:text-2xl text-zinc-500 mx-2">–</span>
                        <span className="text-3xl md:text-4xl">{formatCLP(totalMax)}</span>
                      </motion.div>
                      <div className="text-xs text-zinc-600">CLP · Precio referencial aproximado</div>
                    </div>
                    <div className="px-6 pb-4">
                      <p className="text-xs text-zinc-600 text-center leading-relaxed">
                        Precio referencial sin visita técnica. El valor final puede variar según instalación y accesorios.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-zinc-600/70 bg-[#131313] px-7 py-6 mb-5 shadow-xl">
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/[0.08]">
                      <div className="w-11 h-11 rounded-xl bg-zinc-700/80 border border-zinc-600/50 flex items-center justify-center flex-shrink-0">
                        <Info size={20} className="text-zinc-200" />
                      </div>
                      <span className="text-sm font-black text-zinc-200 tracking-widest uppercase">Información importante</span>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Los valores entregados por el cotizador son aproximados.",
                        "Para generar un presupuesto final es necesaria una visita en terreno o videollamada.",
                        "Los valores incluyen instalación en las regiones de Arica, Iquique y Antofagasta.",
                        "La instalación debe ser coordinada directamente con la empresa.",
                      ].map((line) => (
                        <li key={line} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-[7px] flex-shrink-0" />
                          <p className="text-base text-zinc-300 leading-relaxed">{line}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Contact form */}
                  <div className="rounded-xl border border-white/[0.07] bg-[#1a1a1a] p-5 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <User size={13} className="text-blue-400" />
                      <p className="text-xs font-black tracking-widest uppercase text-zinc-300">Tus datos de contacto</p>
                      <span className="text-[9px] text-zinc-600 ml-auto">* requerido para guardar</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "Nombre", value: nombre, setter: setNombre, placeholder: "Tu nombre", type: "text", req: true },
                        { label: "Teléfono", value: telefono, setter: setTelefono, placeholder: "+56 9 ...", type: "tel", req: true },
                        { label: "Email", value: email, setter: setEmail, placeholder: "correo@email.com", type: "email", req: false },
                        { label: "Ciudad", value: ciudad, setter: setCiudad, placeholder: "Arica / Iquique / Antofagasta", type: "text", req: false },
                      ].map(({ label, value, setter, placeholder, type, req }) => (
                        <div key={label}>
                          <label className="block text-[9px] font-bold tracking-widest uppercase text-zinc-500 mb-1.5">
                            {label} {req && <span className="text-blue-500">*</span>}
                          </label>
                          <input
                            type={type}
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                            placeholder={placeholder}
                            className="w-full bg-[#222] border border-white/[0.07] rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/40 transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    onClick={handleWhatsApp}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={!nombre || !telefono}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#1fba58] text-white font-black text-sm tracking-widest uppercase rounded-xl transition-all shadow-xl shadow-green-500/20 mb-3 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <MessageCircle size={18} />
                    Solicitar cotización por WhatsApp
                    <ChevronRight size={14} className="opacity-70" />
                  </motion.button>
                  <div className="flex justify-between items-center">
                    <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-white transition-colors">
                      <ArrowLeft size={12} /> Volver
                    </button>
                    <button onClick={reset} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                      Nueva cotización
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <MercadoLibreSection />

      <ProductsSection category="redes" title="Productos de Redes" />

      {false && (
      <CMSGallerySection
        category="redes"
        fallback={[
          { src: "/images/1.png", ratio: "aspect-[4/3]" },
          { src: "/images/2.png", ratio: "aspect-[4/3]" },
          { src: "/images/3.png", ratio: "aspect-[16/9] sm:col-span-2" },
          { src: "/images/4.png", ratio: "aspect-[4/3]" },
          { src: "/images/5.png", ratio: "aspect-[4/3]" },
        ]}
      />
      )}

      <InstagramBanner />

      <AsistenciaStrip />

      {/* WhatsApp CTA */}
      <section className="py-9 bg-[#151515]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-2xl border border-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent p-6 md:p-8 text-center">
            <MessageCircle size={30} className="text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white mb-2">¿Preferís hablar directo?</h3>
            <p className="text-zinc-400 text-sm mb-6 max-w-sm mx-auto">Escribinos por WhatsApp y te atendemos al instante.</p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera consultar sobre redes de seguridad.")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#25D366] text-white font-bold text-xs tracking-widest uppercase rounded hover:bg-[#1fba58] transition-all shadow-lg shadow-green-500/20">
              <MessageCircle size={14} /> Chatear por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

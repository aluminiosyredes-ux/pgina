import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, Upload, Scan, Ruler, MessageCircle, ChevronRight,
  RotateCcw, Shield, Zap, Eye, CheckCircle2, AlertCircle,
  Sparkles, FileText, AreaChart,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../config";
import { useSEO } from "../hooks/useSEO";
import { getPrices } from "../lib/prices";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

const BASE = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
const API_BASE = `${BASE}/api`;


function fmt(n: number, decimals = 2) {
  return n.toFixed(decimals).replace(".", ",");
}
function fmtCLP(n: number) {
  return Math.round(n).toLocaleString("es-CL");
}

type Step = "upload" | "measure" | "result";

interface AnalysisResult {
  ancho: number;
  alto: number;
  tipo_espacio: string;
  observaciones: string;
  recomendacion_red: string;
  superficie_protegida: number;
  priceMin: number;
  priceMax: number;
  confidence: number;
  source: "gemini" | "simulado";
}

const ESPACIO_ICONS: Record<string, string> = {
  "Balcón": "🏠",
  "Terraza": "🌿",
  "Ventana": "🪟",
  "Escalera": "🪜",
  "Patio": "🏡",
  "Cierre Perimetral": "🔒",
  "Espacio Industrial": "🏭",
  "Otro": "📐",
};


function getPriceRange(recomendacion_red: string, superficie: number) {
  const esTransparente = recomendacion_red.toLowerCase().includes("transparent");
  const redes = getPrices().redes;
  const item = esTransparente
    ? redes.find((r) => r.id === "transparente")
    : redes.find((r) => r.id === "equiplex");
  const min = item?.priceMin ?? (esTransparente ? 6_500 : 8_500);
  const max = item?.priceMax ?? (esTransparente ? 9_000 : 11_000);
  return { priceMin: superficie * min, priceMax: superficie * max };
}

async function resizeToBase64(file: File, maxPx = 1280): Promise<{ data: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (w > maxPx || h > maxPx) {
        if (w > h) { h = Math.round(h * maxPx / w); w = maxPx; }
        else { w = Math.round(w * maxPx / h); h = maxPx; }
      }
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
      resolve({ data: dataUrl.split(",")[1], mimeType: "image/jpeg" });
    };
    img.onerror = reject;
    img.src = url;
  });
}

function simulateFallback(anchoVal: number, altoVal: number, imgW: number, imgH: number): AnalysisResult {
  const ratio = imgW > 0 && imgH > 0 ? imgW / imgH : (anchoVal > 0 && altoVal > 0 ? anchoVal / altoVal : 1.8);
  const noise = 0.97 + Math.random() * 0.06;
  const ancho = anchoVal > 0 ? anchoVal * noise : (altoVal > 0 ? altoVal * ratio * noise : 3.2);
  const alto = altoVal > 0 ? altoVal * (0.97 + Math.random() * 0.06) : ancho / ratio;
  const sup = ancho * alto;
  const recomendacion_red = "Red Equiplex Premium";
  const { priceMin, priceMax } = getPriceRange(recomendacion_red, sup);
  return {
    ancho, alto,
    tipo_espacio: "Balcón",
    observaciones: "Estimación basada en las medidas ingresadas. Para mayor precisión, asegúrate de tener buena conexión al analizar con Gemini.",
    recomendacion_red,
    superficie_protegida: sup,
    priceMin,
    priceMax,
    confidence: 70 + Math.floor(Math.random() * 10),
    source: "simulado",
  };
}

export default function MedicionIAPage() {
  useSEO({
    title: "Medición IA V2 | Aluminios & Redes",
    description: "Fotografía tu balcón, terraza o ventana y obtén análisis automático con Gemini Vision: tipo de espacio, red recomendada, dimensiones estimadas y cotización instantánea.",
  });

  const [step, setStep] = useState<Step>("upload");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imgNaturalSize, setImgNaturalSize] = useState({ w: 0, h: 0 });
  const [anchoInput, setAnchoInput] = useState("");
  const [altoInput, setAltoInput] = useState("");
  const [barandaInput, setBarandaInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedRed, setSelectedRed] = useState<"equiplex" | "transparente" | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setImgNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
    setImageUrl(url);
    setImageFile(file);
    setStep("measure");
    setResult(null);
    setErrorMsg(null);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleAnalyze = async () => {
    if (!imageFile || !imageUrl) return;
    const a = parseFloat(anchoInput.replace(",", ".")) || 0;
    const h = parseFloat(altoInput.replace(",", ".")) || 0;
    const b = parseFloat(barandaInput.replace(",", ".")) || 0;

    setAnalyzing(true);
    setErrorMsg(null);

    try {
      const { data, mimeType } = await resizeToBase64(imageFile);
      const body: Record<string, string> = { imageBase64: data, mimeType };
      if (a > 0) body.ancho = String(a);
      if (h > 0) body.alto = String(h);
      if (b > 0) body.baranda = String(b);

      const res = await fetch(`${API_BASE}/medicion/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);

      const json = await res.json() as {
        ancho: number; alto: number;
        tipo_espacio: string; observaciones: string;
        recomendacion_red: string; superficie_protegida: number; confianza: number;
      };

      const { priceMin, priceMax } = getPriceRange(json.recomendacion_red, json.superficie_protegida);

      const iaResult = {
        ancho: json.ancho,
        alto: json.alto,
        tipo_espacio: json.tipo_espacio,
        observaciones: json.observaciones,
        recomendacion_red: json.recomendacion_red,
        superficie_protegida: json.superficie_protegida,
        priceMin,
        priceMax,
        confidence: json.confianza,
        source: "gemini" as "gemini",
      };
      setResult(iaResult);
      setSelectedRed(json.recomendacion_red.toLowerCase().includes("transparent") ? "transparente" : "equiplex");
      setStep("result");
    } catch {
      const fallback = simulateFallback(a, h, imgNaturalSize.w, imgNaturalSize.h);
      setResult(fallback);
      setSelectedRed("equiplex");
      setStep("result");
      setErrorMsg("No se pudo conectar con Gemini. Se muestra estimación local.");
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setStep("upload");
    setImageUrl(null);
    setImageFile(null);
    setImgNaturalSize({ w: 0, h: 0 });
    setAnchoInput(""); setAltoInput(""); setBarandaInput("");
    setResult(null); setErrorMsg(null); setAnalyzing(false); setSelectedRed(null);
  };

  const barandaLine = barandaInput ? `\nAltura baranda: ${barandaInput} m` : "";
  const waMsg = (() => {
    if (!result || !selectedRed) return "";
    const redes = getPrices().redes;
    const sup = result.superficie_protegida;
    const isEq = selectedRed === "equiplex";
    const item = redes.find((r) => r.id === selectedRed);
    const pMin = item?.priceMin ?? (isEq ? 8_500 : 6_500);
    const pMax = item?.priceMax ?? (isEq ? 11_000 : 9_000);
    const label = isEq ? "Red Equiplex Premium" : "Red Transparente";
    return `Hola! Utilicé la Medición IA V2 de Aluminios & Redes.\n\n📍 *Tipo de espacio:* ${result.tipo_espacio}\n📏 *Ancho:* ${fmt(result.ancho)} m  ·  *Alto:* ${fmt(result.alto)} m\n📐 *Superficie protegida:* ${fmt(sup)} m²${barandaLine}\n🎯 *Confianza IA:* ${result.confidence}%\n\n✅ *Red seleccionada:* ${label}\n💰 *Precio estimado:* $${fmtCLP(sup * pMin)} – $${fmtCLP(sup * pMax)} CLP\n\nMe gustaría recibir una cotización definitiva.`;
  })();

  return (
    <motion.div {...pageTransition}>

      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden bg-[#080808]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/medicion IA.png')" }} />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.15) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.6) 20%, transparent 50%)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-36 w-full">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/8">
                <Sparkles size={10} className="text-amber-400" />
                <span className="text-[9px] font-black tracking-[0.3em] uppercase text-amber-400">Gemini Vision · IA Real</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                <span className="text-[9px] font-black tracking-[0.2em] uppercase text-zinc-400">V2 Premium</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.92] mb-5">
              Medición<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                Inteligente
              </span>
              <span className="text-zinc-400"> con IA.</span>
            </h1>

            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-lg mb-8">
              Fotografía tu espacio. Gemini detecta el tipo, estima las dimensiones
              y recomienda la red ideal para tu proyecto.
            </p>

            <div className="flex flex-wrap gap-5 text-[11px] text-zinc-500 font-semibold tracking-wide">
              {[
                { icon: Camera, label: "Cámara o galería" },
                { icon: Zap, label: "Análisis en segundos" },
                { icon: Shield, label: "Cotización automática" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={12} className="text-amber-500/70" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN TOOL ── */}
      <section className="py-14 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6">

          {/* Steps */}
          <div className="flex items-center gap-3 mb-10">
            {(["upload", "measure", "result"] as Step[]).map((s, i) => {
              const labels = ["Foto", "Medidas", "Resultado"];
              const active = step === s;
              const done = (step === "measure" && i === 0) || (step === "result" && i <= 1);
              return (
                <div key={s} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${
                      done ? "bg-amber-500 text-black" :
                      active ? "bg-amber-500/20 border-2 border-amber-500/60 text-amber-400" :
                      "bg-white/5 border border-white/10 text-zinc-600"
                    }`}>
                      {done ? <CheckCircle2 size={13} /> : i + 1}
                    </div>
                    <span className={`text-xs font-bold tracking-widest uppercase hidden sm:inline transition-colors ${active ? "text-white" : done ? "text-amber-400/60" : "text-zinc-700"}`}>
                      {labels[i]}
                    </span>
                  </div>
                  {i < 2 && <div className={`h-px flex-1 w-10 transition-all duration-500 ${done ? "bg-amber-500/50" : "bg-white/6"}`} />}
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">

            {/* ── STEP 1: UPLOAD ── */}
            {step === "upload" && (
              <motion.div key="upload"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
              >
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFileChange} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Cámara */}
                  <motion.button
                    whileHover={{ scale: 1.012, y: -2 }} whileTap={{ scale: 0.988 }}
                    onClick={() => cameraInputRef.current?.click()}
                    className="group relative flex flex-col items-center justify-center gap-6 rounded-3xl border border-amber-500/20 bg-[#111] hover:border-amber-500/40 hover:bg-[#151515] transition-all duration-300 p-14 text-center overflow-hidden"
                    style={{ minHeight: 240 }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(245,158,11,0.05) 0%, transparent 70%)" }} />
                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/18 group-hover:border-amber-500/35 transition-all duration-300">
                      <Camera size={26} className="text-amber-400" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-base font-black text-white mb-1.5">Abrir Cámara</p>
                      <p className="text-xs text-zinc-500 leading-relaxed">Toma una foto directamente<br />desde tu celular</p>
                    </div>
                  </motion.button>

                  {/* Galería */}
                  <motion.button
                    whileHover={{ scale: 1.012, y: -2 }} whileTap={{ scale: 0.988 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/8 bg-[#111] hover:border-white/18 hover:bg-[#151515] transition-all duration-300 p-14 text-center overflow-hidden"
                    style={{ minHeight: 240 }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.025) 0%, transparent 70%)" }} />
                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/8 transition-all duration-300">
                      <Upload size={26} className="text-zinc-300" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-base font-black text-white mb-1.5">Subir desde Galería</p>
                      <p className="text-xs text-zinc-500 leading-relaxed">Selecciona una imagen<br />existente en tu dispositivo</p>
                    </div>
                  </motion.button>
                </div>

                {/* Tipos de espacio */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <p className="text-[9px] font-black tracking-[0.26em] uppercase text-zinc-600 mb-3">Espacios que analizamos</p>
                  <div className="flex flex-wrap gap-2">
                    {["Balcón", "Terraza", "Ventana", "Escalera", "Patio", "Cierre Perimetral", "Espacio Industrial", "Otro"].map((tipo) => (
                      <span key={tipo} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/6 bg-white/3 text-[10px] font-semibold text-zinc-500">
                        <span>{ESPACIO_ICONS[tipo]}</span> {tipo}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: MEDIDAS ── */}
            {step === "measure" && imageUrl && (
              <motion.div key="measure"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-5"
              >
                {/* Preview */}
                <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#111] relative" style={{ minHeight: 320 }}>
                  <img src={imageUrl} alt="Vista previa" className="w-full h-full object-contain" style={{ maxHeight: 460 }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/65 backdrop-blur-sm">
                    <Eye size={10} className="text-amber-400" />
                    <span className="text-[9px] font-bold tracking-widest text-zinc-300 uppercase">Vista previa</span>
                  </div>
                  {/* Analyzing overlay */}
                  <AnimatePresence>
                    {analyzing && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/75 backdrop-blur-sm"
                      >
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                          className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center"
                        >
                          <Sparkles size={28} className="text-amber-400" />
                        </motion.div>
                        <div className="text-center">
                          <p className="text-sm font-black text-white mb-1">Analizando con Gemini…</p>
                          <p className="text-[10px] text-zinc-500">Detectando tipo de espacio y dimensiones</p>
                        </div>
                        {/* Scan line */}
                        <motion.div
                          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
                          animate={{ top: ["20%", "80%", "20%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Panel de medidas */}
                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl border border-white/8 bg-[#111] p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Ruler size={15} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black tracking-[0.24em] uppercase text-amber-400/80">Opcional</p>
                        <p className="text-sm font-black text-white">Medidas conocidas</p>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      Si conoces las medidas, ingrésalas para mayor precisión. Puedes analizar solo con la foto.
                    </p>

                    {/* Inputs */}
                    {[
                      { label: "Ancho", placeholder: "ej: 3.20", value: anchoInput, onChange: setAnchoInput },
                      { label: "Alto", placeholder: "ej: 1.45", value: altoInput, onChange: setAltoInput },
                    ].map(({ label, placeholder, value, onChange }) => (
                      <div key={label}>
                        <label className="block text-[9px] font-bold tracking-widest uppercase text-zinc-600 mb-2">
                          {label} <span className="text-zinc-700">(metros)</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number" inputMode="decimal" min="0.1" max="50" step="0.01"
                            value={value} onChange={(e) => onChange(e.target.value)}
                            placeholder={placeholder}
                            className="w-full bg-[#181818] border border-white/8 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-amber-500/35 pr-9 transition-all"
                          />
                          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 font-bold">m</span>
                        </div>
                      </div>
                    ))}

                    {/* Baranda */}
                    <div>
                      <label className="block text-[9px] font-bold tracking-widest uppercase text-zinc-600 mb-2">
                        Altura baranda <span className="text-zinc-700">(metros · opcional)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number" inputMode="decimal" min="0.1" max="20" step="0.01"
                          value={barandaInput} onChange={(e) => setBarandaInput(e.target.value)}
                          placeholder="ej: 1.10"
                          className="w-full bg-[#181818] border border-white/5 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-700 focus:outline-none focus:border-white/14 pr-9 transition-all"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 font-bold">m</span>
                      </div>
                    </div>

                    {/* Analizar */}
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={handleAnalyze}
                      disabled={analyzing || !imageUrl}
                      className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                      style={{
                        background: analyzing ? "rgba(245,158,11,0.2)" : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                        color: analyzing ? "#F59E0B" : "#000",
                        boxShadow: analyzing ? "none" : "0 8px 28px rgba(245,158,11,0.22)",
                      }}
                    >
                      {analyzing ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
                            <Scan size={13} />
                          </motion.div>
                          Analizando…
                        </>
                      ) : (
                        <>
                          <Sparkles size={13} />
                          Analizar Imagen
                        </>
                      )}
                    </motion.button>

                    <button onClick={reset}
                      className="flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-zinc-700 hover:text-zinc-400 transition-colors"
                    >
                      <RotateCcw size={9} /> Cambiar imagen
                    </button>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.015] p-4 flex gap-3">
                    <AlertCircle size={13} className="text-amber-500/40 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-zinc-700 leading-relaxed">
                      Fotografía el espacio de frente con buena iluminación para mejores resultados.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: RESULTADO ── */}
            {step === "result" && result && imageUrl && (() => {
              return (
                <motion.div key="result"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}
                  className="flex flex-col gap-5"
                >
                  {/* Fallback notice */}
                  {errorMsg && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/20 bg-amber-500/5"
                    >
                      <AlertCircle size={13} className="text-amber-400 flex-shrink-0" />
                      <p className="text-xs text-amber-400/80">{errorMsg}</p>
                    </motion.div>
                  )}

                  {/* Source + confianza */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border w-fit ${
                      result.source === "gemini"
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-zinc-700/30 bg-zinc-800/30"
                    }`}>
                      <Sparkles size={11} className={result.source === "gemini" ? "text-emerald-400" : "text-zinc-500"} />
                      <span className={`text-[9px] font-black tracking-widest uppercase ${
                        result.source === "gemini" ? "text-emerald-400" : "text-zinc-500"
                      }`}>
                        {result.source === "gemini" ? "Gemini Vision · Análisis Real" : "Estimación local"}
                      </span>
                    </div>

                    {/* Confidence bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold tracking-wider text-zinc-600 uppercase">Confianza</span>
                      <div className="flex items-center gap-2">
                        <div className="w-28 h-1.5 rounded-full bg-white/8 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.confidence}%` }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full"
                            style={{ background: result.confidence >= 80 ? "#10b981" : result.confidence >= 65 ? "#f59e0b" : "#6b7280" }}
                          />
                        </div>
                        <span className={`text-sm font-black ${result.confidence >= 80 ? "text-emerald-400" : result.confidence >= 65 ? "text-amber-400" : "text-zinc-500"}`}>
                          {result.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Image + tipo espacio */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#111] relative" style={{ minHeight: 260 }}>
                      <img src={imageUrl} alt="Análisis" className="w-full h-full object-contain" style={{ maxHeight: 340 }} />
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }} />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-sm border border-amber-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-[9px] font-black tracking-widest uppercase text-amber-300">Analizada</span>
                      </div>
                    </div>

                    {/* Tipo de espacio + dimensiones */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      className="rounded-2xl border border-amber-500/20 bg-[#111] p-6 flex flex-col gap-4"
                      style={{ background: "linear-gradient(135deg, #111 0%, #0f0d08 100%)" }}
                    >
                      {/* Dimensiones */}
                      <div>
                        <p className="text-[9px] font-black tracking-[0.26em] uppercase text-zinc-600 mb-3">Dimensiones estimadas</p>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: "Ancho", val: fmt(result.ancho), unit: "m" },
                            { label: "Alto", val: fmt(result.alto), unit: "m" },
                            { label: "Área", val: fmt(result.superficie_protegida), unit: "m²" },
                          ].map(({ label, val, unit }, i) => (
                            <motion.div key={label}
                              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                              className="rounded-xl bg-white/[0.03] border border-white/5 p-3 text-center"
                            >
                              <p className="text-[8px] text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
                              <p className="text-base font-black text-white leading-none">{val}</p>
                              <p className="text-[9px] text-zinc-500 mt-0.5">{unit}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Observaciones + precio por m² */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Observaciones */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.14 }}
                      className="md:col-span-2 rounded-2xl border border-white/8 bg-[#111] p-5 flex flex-col gap-3"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                          <FileText size={13} className="text-blue-400" />
                        </div>
                        <p className="text-[9px] font-black tracking-[0.26em] uppercase text-zinc-500">Observaciones</p>
                      </div>
                      <p className="text-[12px] text-zinc-300 leading-relaxed">
                        {result.observaciones || "Sin observaciones adicionales."}
                      </p>
                    </motion.div>

                  </div>

                  {/* Precios por red */}
                  {(() => {
                    const redes = getPrices().redes;
                    const eq  = redes.find((r) => r.id === "equiplex");
                    const tr  = redes.find((r) => r.id === "transparente");
                    const eqMin = eq?.priceMin ?? 8_500;
                    const eqMax = eq?.priceMax ?? 11_000;
                    const trMin = tr?.priceMin ?? 6_500;
                    const trMax = tr?.priceMax ?? 9_000;
                    const sup   = result.superficie_protegida;
                    const redes2 = [
                      {
                        id: "equiplex",
                        label: "Red Equiplex Premium",
                        desc: "Acero galvanizado · Recubrimiento PVC",
                        pMin: eqMin, pMax: eqMax,
                        totalMin: sup * eqMin, totalMax: sup * eqMax,
                        border: "border-amber-500/20",
                        bg: "linear-gradient(135deg,#111 0%,#0f0d08 100%)",
                        dot: "bg-amber-400",
                        color: "text-amber-400",
                      },
                      {
                        id: "transparente",
                        label: "Red Transparente",
                        desc: "Nylon transparente · Estética premium",
                        pMin: trMin, pMax: trMax,
                        totalMin: sup * trMin, totalMax: sup * trMax,
                        border: "border-sky-500/20",
                        bg: "linear-gradient(135deg,#111 0%,#080d10 100%)",
                        dot: "bg-sky-400",
                        color: "text-sky-400",
                      },
                    ];
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.18 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        {redes2.map((r, i) => {
                          const isSelected = selectedRed === r.id;
                          const isRecommended = result.recomendacion_red.toLowerCase().includes(r.id === "transparente" ? "transparent" : "equiplex");
                          return (
                            <motion.button
                              key={r.id}
                              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                              onClick={() => setSelectedRed(r.id as "equiplex" | "transparente")}
                              className={`rounded-2xl border p-5 flex flex-col gap-3 text-left w-full transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? `${r.border} ring-2 ${r.id === "equiplex" ? "ring-amber-400/60" : "ring-sky-400/60"}`
                                  : "border-white/8 opacity-70 hover:opacity-90"
                              }`}
                              style={{ background: r.bg }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${r.dot}`} />
                                  <p className="text-xs font-black text-white">{r.label}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  {isRecommended && (
                                    <span className="text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">IA recomienda</span>
                                  )}
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                    isSelected
                                      ? `border-current ${r.id === "equiplex" ? "bg-amber-400 border-amber-400" : "bg-sky-400 border-sky-400"}`
                                      : "border-zinc-700"
                                  }`}>
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                                  </div>
                                </div>
                              </div>
                              <p className="text-[10px] text-zinc-600">{r.desc}</p>
                              <div className="h-px bg-white/[0.05]" />
                              <div className="flex items-baseline justify-between">
                                <div>
                                  <p className="text-[8px] text-zinc-600 uppercase tracking-widest mb-1">Precio por m²</p>
                                  <p className={`text-sm font-black ${r.color}`}>${fmtCLP(r.pMin)} – ${fmtCLP(r.pMax)}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-[8px] text-zinc-600 uppercase tracking-widest mb-1">Total · {fmt(sup)} m²</p>
                                  <p className="text-base font-black text-white">${fmtCLP(r.totalMin)} – ${fmtCLP(r.totalMax)}</p>
                                </div>
                              </div>
                              <p className="text-[9px] text-zinc-700">CLP · Sin IVA · Instalación incluida</p>
                            </motion.button>
                          );
                        })}
                      </motion.div>
                    );
                  })()}

                  {/* Disclaimer */}
                  <div className="rounded-xl border border-white/5 bg-white/[0.015] p-4 flex gap-3">
                    <AlertCircle size={12} className="text-zinc-700 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-zinc-700 leading-relaxed">
                      Estimación preliminar basada en IA. El presupuesto final requiere visita técnica o videollamada con nuestro equipo.
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col gap-3 pt-1">
                    {!selectedRed && (
                      <p className="text-[10px] text-zinc-500 text-center">
                        ← Selecciona una red para continuar
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {selectedRed ? (
                        <div key="wa-active" className="flex-1 flex flex-col gap-2">
                          <motion.button
                            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              if (imageUrl) {
                                const a = document.createElement("a");
                                a.href = imageUrl;
                                a.download = imageFile?.name ?? "espacio.jpg";
                                a.click();
                              }
                              setTimeout(() => {
                                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`, "_blank", "noopener,noreferrer");
                              }, 300);
                            }}
                            className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-black text-sm tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer"
                            style={{ background: "#25D366", color: "#fff", boxShadow: "0 8px 32px rgba(37,211,102,0.24)" }}
                          >
                            <MessageCircle size={16} />
                            Cotizar {selectedRed === "equiplex" ? "Red Equiplex" : "Red Transparente"} por WhatsApp
                            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          </motion.button>
                          {imageUrl && (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                              <AlertCircle size={11} className="text-amber-500/70 flex-shrink-0" />
                              <p className="text-[10px] text-zinc-500">La foto se descargará automáticamente. Adjúntala en el chat de WhatsApp que se abrirá.</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-black text-sm tracking-[0.14em] uppercase opacity-40 cursor-not-allowed"
                          style={{ background: "#25D366", color: "#fff" }}
                        >
                          <MessageCircle size={16} />
                          Solicitar Cotización por WhatsApp
                        </div>
                      )}
                      <button onClick={reset}
                        className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/8 text-zinc-400 hover:border-white/18 hover:text-white font-bold text-xs tracking-widest uppercase transition-all duration-300"
                      >
                        <RotateCcw size={13} /> Nueva medición
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="py-16 bg-[#080808] border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-[9px] font-black tracking-[0.3em] uppercase text-amber-500/60 mb-3">¿Cómo funciona?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Gemini Vision analiza tu espacio.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                n: "01", icon: Camera,
                title: "Fotografía el espacio",
                desc: "Toma una foto de frente a tu balcón, terraza, ventana o escalera. Cualquier celular sirve.",
                color: "text-amber-400", border: "border-amber-500/15", bg: "bg-amber-500/5",
              },
              {
                n: "02", icon: Ruler,
                title: "Ingresa medidas (opcional)",
                desc: "Si conoces el ancho, alto o altura de baranda, agrégalos. Si no, Gemini estimará solo con la foto.",
                color: "text-blue-400", border: "border-blue-500/15", bg: "bg-blue-500/5",
              },
              {
                n: "03", icon: Sparkles,
                title: "Gemini detecta y cotiza",
                desc: "Identifica el tipo de espacio, recomienda la red ideal con precio estimado y nivel de seguridad.",
                color: "text-emerald-400", border: "border-emerald-500/15", bg: "bg-emerald-500/5",
              },
            ].map(({ n, icon: Icon, title, desc, color, border, bg }, i) => (
              <motion.div key={n}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`rounded-2xl border ${border} ${bg} p-6 flex flex-col gap-4`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl border ${border} bg-black/40 flex items-center justify-center`}>
                    <Icon size={17} className={color} />
                  </div>
                  <span className={`text-4xl font-black ${color} opacity-15`}>{n}</span>
                </div>
                <div>
                  <p className="text-sm font-black text-white mb-1.5">{title}</p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </motion.div>
  );
}

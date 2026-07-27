import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ImageIcon, Upload, Trash2, Edit3, X, Check, MoveUp, MoveDown,
  HardDrive, Shield, Layers, Box, Cpu, AlertTriangle, Eye,
} from "lucide-react";
import {
  getCMSImages,
  saveCMSImage,
  updateCMSImage,
  deleteCMSImage,
  reorderCMSImages,
  getStorageUsage,
  compressImage,
} from "../../lib/cms";

import type {
  CMSImage,
  CMSCategory,
} from "../../lib/cms";

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const CATEGORIES: { key: CMSCategory; label: string; icon: React.ElementType; accent: string; accentBg: string; accentBorder: string; dot: string }[] = [
  { key: "redes",     label: "Redes",     icon: Shield, accent: "text-blue-400",   accentBg: "rgba(96,165,250,0.1)",  accentBorder: "rgba(96,165,250,0.25)",  dot: "bg-blue-400"   },
  { key: "roller",    label: "Roller",    icon: Layers, accent: "text-amber-400",  accentBg: "rgba(245,158,11,0.1)",  accentBorder: "rgba(245,158,11,0.25)",  dot: "bg-amber-400"  },
  { key: "aluminios", label: "Aluminios", icon: Box,    accent: "text-zinc-300",   accentBg: "rgba(161,161,170,0.1)", accentBorder: "rgba(161,161,170,0.22)", dot: "bg-zinc-300"   },
  { key: "domotica",  label: "Domótica",  icon: Cpu,    accent: "text-purple-400", accentBg: "rgba(192,132,252,0.1)", accentBorder: "rgba(192,132,252,0.25)", dot: "bg-purple-400" },
];

// ─── STORAGE BAR ─────────────────────────────────────────────────────────────

function StorageBar() {
  const { usedMB, percent } = getStorageUsage();
  const color = percent > 80 ? "from-red-500 to-red-400" : percent > 60 ? "from-amber-500 to-amber-400" : "from-cyan-500 to-emerald-400";

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <HardDrive size={12} className="text-zinc-500 flex-shrink-0" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-zinc-600 uppercase tracking-widest">Almacenamiento local</span>
          <span className="text-[9px] text-zinc-400 font-mono">{usedMB} MB / 4.5 MB</span>
        </div>
        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }} animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${color}`}
          />
        </div>
      </div>
      {percent > 80 && <AlertTriangle size={12} className="text-amber-400 flex-shrink-0" />}
    </div>
  );
}

// ─── IMAGE CARD ───────────────────────────────────────────────────────────────

function ImageCard({
  img, index, total, onDelete, onAltChange, onMoveUp, onMoveDown,
}: {
  img: CMSImage; index: number; total: number;
  onDelete: (id: string) => void;
  onAltChange: (id: string, alt: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}) {
  const [editingAlt, setEditingAlt] = useState(false);
  const [altVal, setAltVal] = useState(img.alt);
  const [preview, setPreview] = useState(false);

  function saveAlt() {
    onAltChange(img.id, altVal);
    setEditingAlt(false);
  }

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.22 }}
        className="group relative rounded-2xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={img.dataUrl}
            alt={img.alt || img.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <button
              onClick={() => setPreview(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
            >
              <Eye size={16} className="text-white" />
            </button>
          </div>
          {/* Index badge */}
          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[9px] font-black text-zinc-400"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
            #{index + 1}
          </div>
        </div>

        {/* Info + controls */}
        <div className="p-3">
          <p className="text-zinc-400 text-[10px] truncate mb-2">{img.name}</p>

          {editingAlt ? (
            <div className="flex items-center gap-1.5 mb-2">
              <input
                value={altVal}
                onChange={e => setAltVal(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") saveAlt(); if (e.key === "Escape") setEditingAlt(false); }}
                placeholder="Texto alternativo…"
                autoFocus
                className="flex-1 bg-[#1c1c1c] border border-white/[0.1] rounded-lg px-2 py-1 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/40 transition-all"
              />
              <button onClick={saveAlt} className="w-6 h-6 rounded-lg flex items-center justify-center bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors">
                <Check size={10} />
              </button>
              <button onClick={() => setEditingAlt(false)} className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/[0.04] text-zinc-500 hover:text-white transition-colors">
                <X size={10} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingAlt(true)}
              className="flex items-center gap-1.5 w-full mb-2 px-2 py-1.5 rounded-lg text-left transition-all hover:bg-white/[0.04]"
              style={{ border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <Edit3 size={9} className="text-zinc-600 flex-shrink-0" />
              <span className="text-[10px] text-zinc-600 truncate">{img.alt || "Añadir descripción…"}</span>
            </button>
          )}

          <div className="flex items-center gap-1">
            <button onClick={() => onMoveUp(img.id)} disabled={index === 0}
              className="w-6 h-6 rounded-lg flex items-center justify-center transition-all disabled:opacity-25 disabled:cursor-not-allowed text-zinc-600 hover:text-white hover:bg-white/[0.06]"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <MoveUp size={9} />
            </button>
            <button onClick={() => onMoveDown(img.id)} disabled={index === total - 1}
              className="w-6 h-6 rounded-lg flex items-center justify-center transition-all disabled:opacity-25 disabled:cursor-not-allowed text-zinc-600 hover:text-white hover:bg-white/[0.06]"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <MoveDown size={9} />
            </button>
            <div className="flex-1" />
            <button onClick={() => onDelete(img.id)}
              className="w-6 h-6 rounded-lg flex items-center justify-center transition-all text-zinc-600 hover:text-red-400 hover:bg-red-500/[0.08]"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <Trash2 size={9} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Preview lightbox */}
      <AnimatePresence>
        {preview && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
              onClick={() => setPreview(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-8 pointer-events-none"
            >
              <div className="relative max-w-3xl w-full pointer-events-all">
                <img src={img.dataUrl} alt={img.alt} className="w-full rounded-2xl shadow-2xl" />
                <button
                  onClick={() => setPreview(false)}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm border border-white/10"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function AdminContenido() {
  const [tab, setTab] = useState<CMSCategory>("redes");
  const [images, setImages] = useState<CMSImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const catCfg = CATEGORIES.find(c => c.key === tab)!;

  function refresh() {
    setImages(getCMSImages(tab));
  }

  useEffect(() => { refresh(); }, [tab]);

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (!arr.length) return;
    setUploading(true);
    const existing = getCMSImages(tab);
    let order = existing.length;
    for (const file of arr) {
      try {
        const dataUrl = await compressImage(file, 1200, 0.82);
        saveCMSImage({
          category: tab,
          dataUrl,
          name: file.name.replace(/\.[^/.]+$/, ""),
          alt: "",
          order: order++,
        });
      } catch {
        // skip unreadable file
      }
    }
    setUploading(false);
    refresh();
  }, [tab]);

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) processFiles(e.target.files);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
  }

  function handleDelete(id: string) {
    deleteCMSImage(id);
    refresh();
  }

  function handleAltChange(id: string, alt: string) {
    updateCMSImage(id, { alt });
    refresh();
  }

  function handleMove(id: string, direction: "up" | "down") {
    const idx = images.findIndex(i => i.id === id);
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === images.length - 1) return;
    const newList = [...images];
    const swap = direction === "up" ? idx - 1 : idx + 1;
    [newList[idx], newList[swap]] = [newList[swap], newList[idx]];
    const ids = newList.map(i => i.id);
    reorderCMSImages(tab, ids);
    refresh();
  }

  function handleClearAll() {
    images.forEach(img => deleteCMSImage(img.id));
    refresh();
  }

  const countByCategory = useMemo(() =>
    Object.fromEntries(CATEGORIES.map(c => [c.key, getCMSImages(c.key).length])),
    [images, tab]
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ImageIcon size={16} className="text-cyan-400" />
            <h2 className="text-white font-black text-lg tracking-tight">Gestión de Contenido</h2>
          </div>
          <p className="text-zinc-600 text-xs">Sube y administra las imágenes de cada sección del sitio.</p>
        </div>
        <StorageBar />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {CATEGORIES.map(({ key, label, icon: Icon, accent, accentBg, accentBorder }) => {
          const isActive = tab === key;
          const count = countByCategory[key] ?? 0;
          return (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all`}
              style={{
                background: isActive ? accentBg : "transparent",
                border: isActive ? `1px solid ${accentBorder}` : "1px solid rgba(255,255,255,0.06)",
                color: isActive ? accent.replace("text-", "") : "rgb(82,82,91)",
              }}
            >
              <Icon size={12} />
              {label}
              {count > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[8px] font-black"
                  style={{ background: isActive ? accentBg : "rgba(255,255,255,0.06)" }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="relative rounded-2xl cursor-pointer transition-all duration-300"
        style={{
          background: dragOver ? catCfg.accentBg : "rgba(255,255,255,0.015)",
          border: dragOver ? `2px dashed ${catCfg.accentBorder.replace("0.25", "0.6")}` : `2px dashed rgba(255,255,255,0.08)`,
          backdropFilter: "blur(12px)",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
          <motion.div
            animate={{ y: dragOver ? -4 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: catCfg.accentBg, border: `1px solid ${catCfg.accentBorder}` }}
          >
            {uploading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Upload size={22} className={catCfg.accent} />
              </motion.div>
            ) : (
              <Upload size={22} className={catCfg.accent} />
            )}
          </motion.div>
          <p className="text-white font-bold text-sm mb-1">
            {uploading ? "Procesando imágenes…" : "Arrastrá o hacé clic para subir"}
          </p>
          <p className="text-zinc-600 text-xs">
            JPG, PNG, WEBP · Múltiples archivos · Se comprimen automáticamente
          </p>
        </div>
      </div>

      {/* Images grid */}
      <AnimatePresence mode="wait">
        {images.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <ImageIcon size={24} className="text-zinc-700" />
            </div>
            <p className="text-zinc-600 text-sm font-bold">Sin imágenes en esta galería</p>
            <p className="text-zinc-700 text-xs mt-1">Las imágenes que subas aparecerán automáticamente en el sitio.</p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase">
                {images.length} imagen{images.length !== 1 ? "es" : ""} · <span className="text-zinc-600">se muestran en orden</span>
              </p>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase text-zinc-600 hover:text-red-400 transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Trash2 size={9} /> Eliminar todas
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {images.map((img, i) => (
                  <ImageCard
                    key={img.id}
                    img={img}
                    index={i}
                    total={images.length}
                    onDelete={handleDelete}
                    onAltChange={handleAltChange}
                    onMoveUp={(id) => handleMove(id, "up")}
                    onMoveDown={(id) => handleMove(id, "down")}
                  />
                ))}
              </AnimatePresence>
            </div>

            <div className="pt-2 px-4 py-3 rounded-xl"
              style={{ background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.1)" }}>
              <p className="text-[10px] text-zinc-600 leading-relaxed">
                <span className="text-cyan-400 font-bold">Tip:</span>{" "}
                Las imágenes se muestran automáticamente en la sección <span className="text-zinc-300 font-bold">{catCfg.label}</span> del sitio.
                Si no hay imágenes subidas, se muestran las predeterminadas.
                Cambiá el orden usando las flechas en cada tarjeta.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

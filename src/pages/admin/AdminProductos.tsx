import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Plus, Edit3, Trash2, X, Check, Eye, EyeOff,
  MessageCircle, Tag, Upload, ChevronDown,
} from "lucide-react";
import {
  getAllProductsAdmin,
  saveProduct,
  updateProduct,
  deleteProduct,
  toggleProductActive,
  compressImage,
  CATEGORY_LABELS,
  DEFAULT_WA_MESSAGES,
} from "../../lib/products";

import type {
  Product,
  ProductCategory,
} from "../../lib/products";

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const CATS: { key: ProductCategory; label: string; accent: string; accentBg: string; accentBorder: string }[] = [
  { key: "redes",     label: "Redes",     accent: "text-blue-400",   accentBg: "rgba(96,165,250,0.09)",  accentBorder: "rgba(96,165,250,0.25)"  },
  { key: "roller",    label: "Roller",    accent: "text-amber-400",  accentBg: "rgba(245,158,11,0.09)",  accentBorder: "rgba(245,158,11,0.25)"  },
  { key: "aluminios", label: "Aluminios", accent: "text-zinc-300",   accentBg: "rgba(161,161,170,0.09)", accentBorder: "rgba(161,161,170,0.22)" },
  { key: "domotica",  label: "Domótica",  accent: "text-purple-400", accentBg: "rgba(192,132,252,0.09)", accentBorder: "rgba(192,132,252,0.25)" },
];

const EMPTY_FORM: Omit<Product, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  description: "",
  price: 0,
  priceLabel: "",
  category: "redes",
  imageUrl: "",
  whatsappMessage: "",
  active: true,
  order: 0,
};

// ─── PRODUCT FORM MODAL ───────────────────────────────────────────────────────

function ProductModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Omit<Product, "id" | "createdAt" | "updatedAt"> & { id?: string };
  onSave: (data: Omit<Product, "id" | "createdAt" | "updatedAt"> & { id?: string }) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [showCatDrop, setShowCatDrop] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const isEdit = !!initial.id;

  const catCfg = CATS.find(c => c.key === form.category)!;

  function set<K extends keyof typeof form>(key: K, val: typeof form[K]) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  async function handleImage(file: File) {
    setUploading(true);
    try {
      const url = await compressImage(file, 800, 0.85);
      set("imageUrl", url);
    } finally {
      setUploading(false);
    }
  }

  function handleCategoryChange(cat: ProductCategory) {
    setForm(prev => ({
      ...prev,
      category: cat,
      whatsappMessage: prev.whatsappMessage || DEFAULT_WA_MESSAGES[cat],
    }));
    setShowCatDrop(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const msg = form.whatsappMessage || DEFAULT_WA_MESSAGES[form.category];
    onSave({ ...form, whatsappMessage: msg });
  }

  const inputCls = "w-full bg-[#1a1a1a] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-500/40 transition-all";
  const labelCls = "block text-[10px] font-bold tracking-widest uppercase text-zinc-600 mb-1.5";

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-all rounded-2xl"
          style={{ background: "rgba(12,12,14,0.98)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: catCfg.accentBg, border: `1px solid ${catCfg.accentBorder}` }}>
                <Package size={13} className={catCfg.accent} />
              </div>
              <span className="text-white font-black text-sm">{isEdit ? "Editar producto" : "Nuevo producto"}</span>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/[0.06] transition-all">
              <X size={13} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">

            {/* Image upload */}
            <div>
              <label className={labelCls}>Imagen del producto</label>
              <div
                className="relative rounded-xl overflow-hidden cursor-pointer group transition-all"
                style={{ border: "1px dashed rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.015)" }}
                onClick={() => imgRef.current?.click()}
              >
                <input ref={imgRef} type="file" accept="image/*" className="hidden"
                  onChange={e => e.target.files?.[0] && handleImage(e.target.files[0])} />
                {form.imageUrl ? (
                  <div className="relative aspect-[16/9]">
                    <img src={form.imageUrl} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-bold tracking-widest uppercase bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        Cambiar imagen
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 gap-2">
                    {uploading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <Upload size={20} className="text-zinc-600" />
                      </motion.div>
                    ) : (
                      <Upload size={20} className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                    )}
                    <span className="text-zinc-700 text-xs">{uploading ? "Procesando…" : "Subir imagen"}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className={labelCls}>Nombre del producto *</label>
              <input
                value={form.name} onChange={e => set("name", e.target.value)}
                placeholder="Ej: Malla de seguridad premium" required
                className={inputCls}
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelCls}>Descripción</label>
              <textarea
                value={form.description} onChange={e => set("description", e.target.value)}
                placeholder="Descripción breve del producto…" rows={3}
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Price row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Precio (CLP · 0 = consultar)</label>
                <input
                  type="number" min={0} value={form.price}
                  onChange={e => set("price", Number(e.target.value))}
                  placeholder="0" className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Etiqueta de precio</label>
                <input
                  value={form.priceLabel} onChange={e => set("priceLabel", e.target.value)}
                  placeholder="Ej: desde, por m²" className={inputCls}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className={labelCls}>Categoría</label>
              <div className="relative">
                <button type="button" onClick={() => setShowCatDrop(!showCatDrop)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-white transition-all"
                  style={{ background: "#1a1a1a", border: `1px solid ${catCfg.accentBorder}` }}>
                  <span className={`font-bold ${catCfg.accent}`}>{CATEGORY_LABELS[form.category]}</span>
                  <ChevronDown size={12} className={`transition-transform ${showCatDrop ? "rotate-180" : ""} text-zinc-600`} />
                </button>
                <AnimatePresence>
                  {showCatDrop && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.14 }}
                      className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-10 shadow-xl"
                      style={{ background: "#131316", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {CATS.map(c => (
                        <button key={c.key} type="button" onClick={() => handleCategoryChange(c.key)}
                          className={`w-full text-left px-3.5 py-2.5 text-sm transition-all hover:bg-white/[0.04] ${c.accent} ${form.category === c.key ? "font-black" : "font-medium"}`}>
                          {c.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* WhatsApp message */}
            <div>
              <label className={labelCls}>Mensaje WhatsApp</label>
              <textarea
                value={form.whatsappMessage || DEFAULT_WA_MESSAGES[form.category]}
                onChange={e => set("whatsappMessage", e.target.value)}
                rows={2} className={`${inputCls} resize-none`}
              />
            </div>

            {/* Active toggle */}
            <div className="flex items-center justify-between px-3.5 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <p className="text-sm font-bold text-white">Estado</p>
                <p className="text-[11px] text-zinc-600">Visible en el sitio público</p>
              </div>
              <button type="button" onClick={() => set("active", !form.active)}
                className={`relative w-11 h-6 rounded-full transition-all ${form.active ? "bg-emerald-500" : "bg-zinc-800"}`}>
                <motion.div
                  animate={{ x: form.active ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                />
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 pt-1">
              <button type="button" onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-white transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                Cancelar
              </button>
              <button type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase text-white transition-all"
                style={{ background: catCfg.accentBg, border: `1px solid ${catCfg.accentBorder}` }}>
                <Check size={12} className={catCfg.accent} />
                <span className={catCfg.accent}>{isEdit ? "Guardar cambios" : "Crear producto"}</span>
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </>
  );
}

// ─── PRODUCT CARD (ADMIN) ─────────────────────────────────────────────────────

function ProductCard({
  product, onEdit, onDelete, onToggle,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const catCfg = CATS.find(c => c.key === product.category)!;
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${!product.active ? "opacity-50" : ""}`}
      style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${product.active ? catCfg.accentBorder : "rgba(255,255,255,0.05)"}` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-[#1a1a1a]">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Tag size={28} className="text-zinc-800" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Status badge */}
        <div className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase ${product.active ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-zinc-800/80 text-zinc-600 border border-zinc-700/50"}`}>
          {product.active ? "Activo" : "Inactivo"}
        </div>
        {/* Category */}
        <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest"
          style={{ background: catCfg.accentBg, border: `1px solid ${catCfg.accentBorder}` }}>
          <span className={catCfg.accent}>{catCfg.label}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col gap-2.5 flex-1">
        <div>
          <h3 className="text-white font-black text-sm leading-tight">{product.name}</h3>
          {product.description && (
            <p className="text-zinc-600 text-[11px] leading-relaxed mt-1 line-clamp-2">{product.description}</p>
          )}
        </div>

        {/* Price */}
        <div>
          {product.price === 0 ? (
            <span className="text-zinc-500 text-xs font-bold">{product.priceLabel || "Consultar"}</span>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className={`${catCfg.accent} text-sm font-black`}>
                {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(product.price)}
              </span>
              {product.priceLabel && <span className="text-zinc-700 text-[10px]">{product.priceLabel}</span>}
            </div>
          )}
        </div>

        {/* WA preview */}
        <div className="px-2.5 py-1.5 rounded-lg flex items-center gap-1.5"
          style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.12)" }}>
          <MessageCircle size={10} className="text-green-500 flex-shrink-0" />
          <span className="text-[10px] text-zinc-500 truncate">{product.whatsappMessage || DEFAULT_WA_MESSAGES[product.category]}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <button onClick={() => onToggle(product.id)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${product.active ? "text-zinc-500 hover:text-white" : "text-emerald-400"}`}
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            {product.active ? <EyeOff size={10} /> : <Eye size={10} />}
            {product.active ? "Ocultar" : "Publicar"}
          </button>
          <button onClick={() => onEdit(product)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-zinc-500 hover:text-white transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <Edit3 size={10} /> Editar
          </button>
          {confirmDelete ? (
            <button onClick={() => onDelete(product.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-red-400 hover:bg-red-500/10 transition-all ml-auto"
              style={{ border: "1px solid rgba(239,68,68,0.25)" }}>
              <Check size={10} /> Confirmar
            </button>
          ) : (
            <button onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-zinc-600 hover:text-red-400 transition-all ml-auto"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <Trash2 size={10} /> Eliminar
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function AdminProductos() {
  const [tab, setTab] = useState<ProductCategory | "all">("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [modal, setModal] = useState<null | (Omit<Product, "id" | "createdAt" | "updatedAt"> & { id?: string })>(null);

  function refresh() { setProducts(getAllProductsAdmin()); }

  useEffect(() => { refresh(); }, []);

  function handleSave(data: Omit<Product, "id" | "createdAt" | "updatedAt"> & { id?: string }) {
    const { id, ...rest } = data;
    const existing = products.length;
    if (id) {
      updateProduct(id, rest);
    } else {
      saveProduct({ ...rest, order: existing });
    }
    refresh();
    setModal(null);
  }

  function handleDelete(id: string) {
    deleteProduct(id);
    refresh();
  }

  function handleToggle(id: string) {
    toggleProductActive(id);
    refresh();
  }

  function openCreate() {
    const defaultCat: ProductCategory = tab !== "all" ? tab : "redes";
    setModal({
      ...EMPTY_FORM,
      category: defaultCat,
      whatsappMessage: DEFAULT_WA_MESSAGES[defaultCat],
      order: products.filter(p => p.category === defaultCat).length,
    });
  }

  const filtered = tab === "all" ? products : products.filter(p => p.category === tab);
  const countByTab = useCallback((key: ProductCategory | "all") =>
    key === "all" ? products.length : products.filter(p => p.category === key).length,
  [products]);

  const TABS = [
    { key: "all" as const, label: "Todos", accent: "text-zinc-300", accentBg: "rgba(255,255,255,0.05)", accentBorder: "rgba(255,255,255,0.12)" },
    ...CATS.map(c => ({ key: c.key as ProductCategory | "all", label: c.label, accent: c.accent, accentBg: c.accentBg, accentBorder: c.accentBorder })),
  ];

  return (
    <>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Package size={16} className="text-cyan-400" />
              <h2 className="text-white font-black text-lg tracking-tight">Gestión de Productos</h2>
            </div>
            <p className="text-zinc-600 text-xs">
              Administrá el catálogo de productos de cada sección del sitio.
            </p>
          </div>
          <button onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold tracking-widest uppercase text-white transition-all"
            style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.3)" }}>
            <Plus size={13} className="text-cyan-400" />
            <span className="text-cyan-400">Nuevo producto</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {TABS.map(t => {
            const isActive = tab === t.key;
            const count = countByTab(t.key);
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all"
                style={{
                  background: isActive ? t.accentBg : "transparent",
                  border: isActive ? `1px solid ${t.accentBorder}` : "1px solid rgba(255,255,255,0.06)",
                  color: isActive ? undefined : "rgb(82,82,91)",
                }}>
                <span className={isActive ? t.accent : ""}>{t.label}</span>
                {count > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[8px] font-black"
                    style={{ background: isActive ? t.accentBg : "rgba(255,255,255,0.06)" }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <Package size={24} className="text-zinc-700" />
              </div>
              <p className="text-zinc-600 text-sm font-bold">Sin productos en esta categoría</p>
              <p className="text-zinc-700 text-xs mt-1">Hacé clic en "Nuevo producto" para agregar el primero.</p>
            </motion.div>
          ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filtered.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={p => setModal({ ...p })}
                      onDelete={handleDelete}
                      onToggle={handleToggle}
                    />
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-4 px-4 py-3 rounded-xl"
                style={{ background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.1)" }}>
                <p className="text-[10px] text-zinc-600 leading-relaxed">
                  <span className="text-cyan-400 font-bold">Tip:</span>{" "}
                  Los productos activos aparecen automáticamente en la sección pública correspondiente.
                  Podés ocultar un producto sin eliminarlo usando el botón "Ocultar".
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <ProductModal
            initial={modal}
            onSave={handleSave}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

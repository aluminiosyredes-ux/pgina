import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users2,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Bell,
  ChevronRight,
  Settings,
  ArrowLeft,
  Tag,
  DollarSign,
  CalendarClock,
  BarChart3,
  Zap,
  Clock,
  Hammer,
  CalendarDays,
  CheckCircle2,
  ImageIcon,
  Package,
} from "lucide-react";
import { logout, getSession } from "../../lib/auth";
import { getQuotes } from "../../lib/quotes";
import { getInstalaciones } from "../../lib/instalaciones";
import { LogoMark } from "../../components/LogoMark";
import AdminCRM from "./AdminCRM";
import AdminPrecios from "./AdminPrecios";
import AdminInstalaciones from "./AdminInstalaciones";
import AdminCalendario from "./AdminCalendario";
import AdminContenido from "./AdminContenido";
import AdminProductos from "./AdminProductos";
import AdminEstadisticas from "./AdminEstadisticas";

// ─── NAV ─────────────────────────────────────────────────────────────────────

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard",     id: 0 },
  { icon: Users2,          label: "Clientes",      id: 1 },
  { icon: Hammer,          label: "Instalaciones", id: 2 },
  { icon: CalendarDays,    label: "Calendario",    id: 3 },
  { icon: Tag,             label: "Precios",       id: 4 },
  { icon: Package,         label: "Productos",     id: 5 },
  { icon: ImageIcon,       label: "Contenido",     id: 6 },
  { icon: BarChart3,       label: "Estadísticas",  id: 7 },
  { icon: Settings,        label: "Config",        id: 8 },
] as const;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(n);

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-CL", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

// ─── STATUS DOTS ─────────────────────────────────────────────────────────────

const statusDot: Record<string, string> = {
  nueva:      "bg-blue-400",
  contactado: "bg-cyan-400",
  agendado:   "bg-amber-400",
  instalado:  "bg-emerald-400",
  pagado:     "bg-purple-400",
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState(0);

  const session = getSession();
  const quotes = getQuotes();
  const instalaciones = getInstalaciones();

  const newCount      = useMemo(() => quotes.filter((q) => q.estado === "nueva").length,    [quotes]);
  const agendadoCount = useMemo(() => quotes.filter((q) => q.estado === "agendado").length, [quotes]);
  const instPendiente = useMemo(() => instalaciones.filter((i) => i.estado === "pendiente").length, [instalaciones]);
  const instCompletada= useMemo(() => instalaciones.filter((i) => i.estado === "completada").length, [instalaciones]);
  const thisMonth     = useMemo(() => {
    const now = new Date();
    return quotes.filter((q) => {
      const d = new Date(q.fecha);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
  }, [quotes]);

  const facturacion   = useMemo(() =>
    quotes.filter((q) => q.estado === "instalado" || q.estado === "pagado")
          .reduce((acc, q) => acc + q.totalMax, 0),
    [quotes]
  );

  const topProducts = useMemo(() => {
    const map: Record<string, number> = {};
    quotes.forEach((q) => { map[q.producto] = (map[q.producto] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [quotes]);

  const maxProd = topProducts[0]?.[1] ?? 1;

  const recent = useMemo(() => quotes.slice(0, 6), [quotes]);

  function handleLogout() {
    logout();
    navigate("/admin");
  }

  // ─── SIDEBAR ────────────────────────────────────────────────────────────────

  const Sidebar = (
    <motion.aside
      key="sidebar"
      initial={{ x: -270, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -270, opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col"
      style={{
        width: 256,
        background: "rgba(5,5,8,0.98)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Top accent — cyan to amber */}
      <div className="h-[2px] bg-gradient-to-r from-cyan-500/50 via-amber-400/40 to-transparent flex-shrink-0" />

      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <LogoMark size={30} />
        <div>
          <p className="text-white font-black text-[11px] tracking-[0.18em] uppercase leading-none">Aluminios</p>
          <p className="text-[9px] tracking-[0.12em] uppercase leading-none mt-0.5 text-cyan-500/70">
            &amp; Redes · CRM
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
        {NAV.map(({ icon: Icon, label, id }) => {
          const isActive = activeNav === id;
          const badge = id === 1 && newCount > 0 ? newCount : null;
          return (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group w-full"
              style={{
                background: isActive ? "rgba(6,182,212,0.09)" : "transparent",
                border: isActive ? "1px solid rgba(6,182,212,0.2)" : "1px solid transparent",
              }}
            >
              <Icon
                size={15}
                className={isActive ? "text-cyan-400" : "text-zinc-600 group-hover:text-zinc-400 transition-colors"}
              />
              <span
                className={`text-xs font-medium tracking-wide flex-1 ${isActive ? "text-cyan-300" : "text-zinc-500 group-hover:text-zinc-300 transition-colors"}`}
              >
                {label}
              </span>
              {badge && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="px-1.5 py-0.5 rounded-full text-[9px] font-black text-blue-300 animate-pulse"
                  style={{ background: "rgba(96,165,250,0.18)", border: "1px solid rgba(96,165,250,0.3)" }}
                >
                  {badge}
                </motion.span>
              )}
              {isActive && !badge && (
                <ChevronRight size={10} className="text-cyan-500/50" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div
        className="px-3 py-4 flex-shrink-0 flex flex-col gap-1"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all duration-200 group"
          style={{ border: "1px solid transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(6,182,212,0.06)"; e.currentTarget.style.borderColor = "rgba(6,182,212,0.15)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
        >
          <ArrowLeft size={14} className="text-zinc-600 group-hover:text-cyan-400 transition-colors" />
          <span className="text-xs font-medium text-zinc-500 group-hover:text-cyan-400 transition-colors tracking-wide">
            Volver al sitio
          </span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all duration-200 group"
          style={{ border: "1px solid transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.07)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.16)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
        >
          <LogOut size={14} className="text-zinc-600 group-hover:text-red-400 transition-colors" />
          <span className="text-xs font-medium text-zinc-500 group-hover:text-red-400 transition-colors tracking-wide">
            Cerrar sesión
          </span>
        </button>
      </div>
    </motion.aside>
  );

  // ─── STATS DATA ─────────────────────────────────────────────────────────────

  type StatItem = {
    icon: React.ElementType;
    label: string;
    value: string | number;
    sub: string;
    iconClass: string;
    accentBg: string;
    accentBorder: string;
    valueClass: string;
    onClick?: () => void;
    pulse?: boolean;
  };

  const STATS: StatItem[] = [
    {
      icon: TrendingUp,
      label: "Total cotizaciones",
      value: quotes.length,
      sub: `${thisMonth} este mes`,
      iconClass: "text-amber-400",
      accentBg: "rgba(245,158,11,0.08)",
      accentBorder: "rgba(245,158,11,0.2)",
      valueClass: "text-amber-300",
      onClick: () => setActiveNav(1),
    },
    {
      icon: Bell,
      label: "Sin atender",
      value: newCount,
      sub: newCount > 0 ? "Requieren contacto" : "Al día",
      iconClass: "text-blue-400",
      accentBg: "rgba(96,165,250,0.08)",
      accentBorder: newCount > 0 ? "rgba(96,165,250,0.35)" : "rgba(96,165,250,0.15)",
      valueClass: newCount > 0 ? "text-blue-300" : "text-zinc-400",
      onClick: () => setActiveNav(1),
      pulse: newCount > 0,
    },
    {
      icon: CalendarClock,
      label: "Agendadas",
      value: agendadoCount,
      sub: "Pendientes de instalación",
      iconClass: "text-cyan-400",
      accentBg: "rgba(6,182,212,0.07)",
      accentBorder: "rgba(6,182,212,0.18)",
      valueClass: "text-cyan-300",
      onClick: () => setActiveNav(2),
    },
    {
      icon: DollarSign,
      label: "Facturación cerrada",
      value: fmt(facturacion),
      sub: "Instalado + pagado",
      iconClass: "text-emerald-400",
      accentBg: "rgba(52,211,153,0.07)",
      accentBorder: "rgba(52,211,153,0.18)",
      valueClass: "text-emerald-300",
    },
  ];

  // ─── RENDER ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#070709] flex text-white overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div style={{ position: "absolute", top: 0, left: "15%", width: "35%", height: "40%", background: "radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "30%", height: "35%", background: "radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)" }} />
      </div>

      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && Sidebar}
      </AnimatePresence>

      {/* Main */}
      <motion.div
        animate={{ marginLeft: sidebarOpen ? 256 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex flex-col min-h-screen relative z-10"
      >
        {/* Topbar */}
        <header
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{
            background: "rgba(5,5,8,0.9)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all text-zinc-500 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
            <div>
              <h1 className="text-white font-black text-sm tracking-wide">
                {["Dashboard", "Clientes CRM", "Instalaciones", "Calendario", "Precios", "Productos", "Contenido", "Configuración"][activeNav]}
              </h1>
              <p className="text-zinc-600 text-[10px] tracking-widest uppercase">Aluminios &amp; Redes · Admin</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* New quotes alert chip */}
            {newCount > 0 && (
              <motion.button
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                onClick={() => setActiveNav(1)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black text-blue-300 animate-pulse"
                style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.28)" }}
              >
                <Bell size={11} className="animate-none" />
                {newCount} nueva{newCount > 1 ? "s" : ""}
              </motion.button>
            )}

            {/* Session chip */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.15)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400/80 text-[10px] font-bold tracking-widest uppercase">
                {session?.user ?? "admin"}
              </span>
            </div>

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all text-zinc-500 hover:text-cyan-400"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <ArrowLeft size={11} /><span className="hidden sm:inline">Inicio</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all text-zinc-500 hover:text-red-400"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <LogOut size={11} /><span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <AnimatePresence mode="wait">

            {/* ── DASHBOARD ── */}
            {activeNav === 0 && (
              <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
                className="max-w-5xl mx-auto space-y-6">

                {/* Welcome */}
                <div>
                  <h2 className="text-2xl font-black text-white mb-1">
                    Bienvenido,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300">
                      {session?.user ?? "Admin"}
                    </span>
                  </h2>
                  <p className="text-zinc-500 text-sm">Resumen del CRM · Aluminios &amp; Redes</p>
                </div>

                {/* Alert banner */}
                {newCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    onClick={() => setActiveNav(1)}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01]"
                    style={{ background: "rgba(96,165,250,0.07)", border: "1px solid rgba(96,165,250,0.22)" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-blue-300 text-sm font-black">
                        {newCount} cotización{newCount > 1 ? "es nuevas" : " nueva"} sin atender
                      </p>
                      <p className="text-blue-400/50 text-[10px]">Hacé clic para ir al CRM</p>
                    </div>
                    <ChevronRight size={14} className="text-blue-400 flex-shrink-0" />
                  </motion.div>
                )}

                {/* Stats cards */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                  {STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={stat.onClick}
                        className={`rounded-2xl p-5 relative overflow-hidden ${stat.onClick ? "cursor-pointer hover:scale-[1.02] transition-transform" : ""}`}
                        style={{ background: stat.accentBg, border: `1px solid ${stat.accentBorder}`, backdropFilter: "blur(16px)" }}
                      >
                        {/* Pulse ring for alert */}
                        {"pulse" in stat && stat.pulse && (
                          <div className="absolute inset-0 rounded-2xl animate-pulse" style={{ background: "rgba(96,165,250,0.04)" }} />
                        )}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: stat.accentBg, border: `1px solid ${stat.accentBorder}` }}>
                            <Icon size={16} className={stat.iconClass} />
                          </div>
                          {stat.onClick && <ChevronRight size={12} className="text-zinc-700 mt-1" />}
                        </div>
                        <p className={`text-2xl font-black mb-1 ${stat.valueClass}`}>{stat.value}</p>
                        <p className="text-zinc-600 text-[10px] leading-tight tracking-wide">{stat.label}</p>
                        <p className="text-zinc-700 text-[9px] mt-0.5 tracking-wide">{stat.sub}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Middle panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                  {/* Productos más solicitados */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="rounded-2xl p-6"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <BarChart3 size={14} className="text-cyan-400" />
                      <h3 className="text-white font-bold text-sm tracking-wide">Productos más solicitados</h3>
                    </div>
                    {topProducts.length === 0 ? (
                      <p className="text-zinc-700 text-xs text-center py-8">Sin datos aún</p>
                    ) : (
                      <div className="space-y-3">
                        {topProducts.map(([prod, count]) => (
                          <div key={prod}>
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-zinc-400 text-xs truncate pr-4">{prod}</p>
                              <p className="text-zinc-300 text-xs font-black flex-shrink-0">{count}</p>
                            </div>
                            <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(count / maxProd) * 100}%` }}
                                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                                className="h-full rounded-full bg-gradient-to-r from-cyan-500/70 to-amber-400/70"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* Actividad reciente */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="rounded-2xl p-6"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-amber-400" />
                        <h3 className="text-white font-bold text-sm tracking-wide">Actividad reciente</h3>
                      </div>
                      <button
                        onClick={() => setActiveNav(1)}
                        className="text-[10px] font-bold tracking-widest uppercase text-cyan-500/70 hover:text-cyan-400 transition-colors"
                      >
                        Ver todo
                      </button>
                    </div>
                    {recent.length === 0 ? (
                      <p className="text-zinc-700 text-xs text-center py-8">Sin cotizaciones aún</p>
                    ) : (
                      <div className="space-y-2">
                        {recent.map((q) => (
                          <button
                            key={q.id}
                            onClick={() => setActiveNav(1)}
                            className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-left transition-all hover:bg-white/[0.03] group"
                            style={{ border: "1px solid transparent" }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; }}
                          >
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 text-zinc-300"
                              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                              {initials(q.nombre)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-zinc-300 text-xs font-bold truncate">{q.nombre}</p>
                              <p className="text-zinc-600 text-[10px] truncate">{q.producto}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className={`w-1.5 h-1.5 rounded-full ${statusDot[q.estado] ?? "bg-zinc-600"}`} />
                              <span className="text-zinc-600 text-[9px]">{fmtDate(q.fecha)}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Instalaciones row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Instalaciones resumen */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="lg:col-span-2 rounded-2xl p-6 cursor-pointer hover:scale-[1.01] transition-transform"
                    style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.12)" }}
                    onClick={() => setActiveNav(2)}
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <Hammer size={14} className="text-amber-400" />
                      <h3 className="text-white font-bold text-sm tracking-wide">Instalaciones</h3>
                      <ChevronRight size={11} className="text-zinc-700 ml-auto" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: "Total",       value: instalaciones.length, color: "text-white" },
                        { label: "Pendientes",  value: instPendiente,        color: "text-amber-400" },
                        { label: "Completadas", value: instCompletada,       color: "text-emerald-400" },
                        { label: "Canceladas",  value: instalaciones.filter(i => i.estado === "cancelada").length, color: "text-red-400" },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="text-center">
                          <div className={`text-2xl font-black ${color}`}>{value}</div>
                          <div className="text-[10px] text-zinc-600 tracking-widest uppercase mt-0.5">{label}</div>
                        </div>
                      ))}
                    </div>
                    {instalaciones.length === 0 && (
                      <p className="text-zinc-700 text-xs text-center mt-3">Sin instalaciones registradas aún</p>
                    )}
                  </motion.div>

                  {/* Próximas instalaciones */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}
                    className="rounded-2xl p-6 cursor-pointer hover:scale-[1.01] transition-transform"
                    style={{ background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.1)" }}
                    onClick={() => setActiveNav(3)}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarDays size={14} className="text-cyan-400" />
                      <h3 className="text-white font-bold text-sm tracking-wide">Próximas</h3>
                      <ChevronRight size={11} className="text-zinc-700 ml-auto" />
                    </div>
                    {instalaciones
                      .filter(i => i.fecha >= new Date().toISOString().slice(0, 10) && i.estado === "pendiente")
                      .sort((a, b) => a.fecha.localeCompare(b.fecha))
                      .slice(0, 3)
                      .map(inst => (
                        <div key={inst.id} className="flex items-center gap-2 mb-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-zinc-300 text-xs font-bold truncate">{inst.cliente}</p>
                            <p className="text-zinc-600 text-[10px]">{inst.fecha} {inst.hora && `· ${inst.hora}`}</p>
                          </div>
                        </div>
                      ))
                    }
                    {instalaciones.filter(i => i.estado === "pendiente").length === 0 && (
                      <p className="text-zinc-700 text-xs text-center mt-3">Sin próximas instalaciones</p>
                    )}
                  </motion.div>
                </div>

                {/* System status + AI placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Estado del sistema */}
                  <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <h3 className="text-white font-bold text-sm mb-4 tracking-wide">Estado del sistema</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Sitio web", status: "Operativo", ok: true },
                        { label: "Cotizador activo", status: "Operativo", ok: true },
                        { label: "WhatsApp", status: "Activo", ok: true },
                        {
                          label: "Última sesión",
                          status: session?.loginAt
                            ? new Date(session.loginAt).toLocaleString("es-CL", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
                            : "—",
                          ok: null,
                        },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between py-2"
                          style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                          <span className="text-zinc-500 text-xs">{row.label}</span>
                          <div className="flex items-center gap-1.5">
                            {row.ok !== null && (
                              <div className={`w-1.5 h-1.5 rounded-full ${row.ok ? "bg-emerald-400" : "bg-red-400"}`} />
                            )}
                            <span className={`text-xs font-medium ${row.ok === true ? "text-emerald-400" : row.ok === false ? "text-red-400" : "text-zinc-400"}`}>
                              {row.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI placeholder (future) */}
                  <div className="rounded-2xl p-6 relative overflow-hidden"
                    style={{ background: "rgba(6,182,212,0.03)", border: "1px solid rgba(6,182,212,0.1)" }}>
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.06) 0%, transparent 60%)" }} />
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={14} className="text-cyan-400" />
                      <h3 className="text-white font-bold text-sm tracking-wide">Asistente IA</h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black text-cyan-500 tracking-widest uppercase"
                        style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}>
                        Próximamente
                      </span>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                      Análisis automático de leads, scoring de clientes, sugerencias de seguimiento y resumen de notas con IA.
                    </p>
                    <div className="space-y-2">
                      {["Scoring automático de leads", "Resumen de notas con IA", "Sugerencias de contacto", "Predicción de cierre"].map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-cyan-600" />
                          <p className="text-zinc-600 text-[10px]">{f}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── CRM ── */}
            {activeNav === 1 && (
              <motion.div key="crm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
                className="max-w-6xl mx-auto">
                <AdminCRM />
              </motion.div>
            )}

            {/* ── INSTALACIONES ── */}
            {activeNav === 2 && (
              <motion.div key="instalaciones" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
                className="max-w-5xl mx-auto">
                <AdminInstalaciones />
              </motion.div>
            )}

            {/* ── CALENDARIO ── */}
            {activeNav === 3 && (
              <motion.div key="calendario" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
                className="max-w-5xl mx-auto">
                <AdminCalendario />
              </motion.div>
            )}

            {/* ── PRECIOS ── */}
            {activeNav === 4 && (
              <motion.div key="precios" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
                className="max-w-4xl mx-auto">
                <AdminPrecios />
              </motion.div>
            )}

            {/* ── PRODUCTOS ── */}
            {activeNav === 5 && (
              <motion.div key="productos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
                className="max-w-5xl mx-auto">
                <AdminProductos />
              </motion.div>
            )}

            {/* ── CONTENIDO ── */}
            {activeNav === 6 && (
              <motion.div key="contenido" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
                className="max-w-5xl mx-auto">
                <AdminContenido />
              </motion.div>
            )}

            {/* ── ESTADÍSTICAS ── */}
            {activeNav === 7 && (
              <motion.div key="estadisticas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
                className="max-w-6xl mx-auto">
                <AdminEstadisticas />
              </motion.div>
            )}

            {/* ── CONFIG ── */}
            {activeNav === 8 && (
              <motion.div key="config" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
                className="max-w-5xl mx-auto flex flex-col items-center justify-center py-24">
                <Settings size={40} className="text-zinc-800 mb-4" />
                <p className="text-zinc-500 font-bold text-sm">Configuración — próximamente</p>
                <p className="text-zinc-700 text-xs mt-1">Aquí irá la configuración avanzada del CRM</p>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </motion.div>
    </div>
  );
}

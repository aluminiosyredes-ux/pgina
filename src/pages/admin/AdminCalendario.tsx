import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays, Clock, MapPin, Wrench, X, Plus } from "lucide-react";
import { getInstalaciones } from "../../lib/instalaciones";
import type { Instalacion, InstalacionStatus } from "../../lib/instalaciones";

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const STATUS_CFG: Record<InstalacionStatus, { dot: string; text: string; bg: string; border: string; label: string }> = {
  pendiente:  { dot: "bg-amber-400",   text: "text-amber-300",   bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.25)",  label: "Pendiente"  },
  en_camino:  { dot: "bg-cyan-400",    text: "text-cyan-300",    bg: "rgba(6,182,212,0.12)",   border: "rgba(6,182,212,0.25)",   label: "En camino"  },
  completada: { dot: "bg-emerald-400", text: "text-emerald-300", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.25)",  label: "Completada" },
  cancelada:  { dot: "bg-red-400",     text: "text-red-300",     bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)",   label: "Cancelada"  },
};

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function fmtTime(hora: string) {
  if (!hora) return "";
  return hora.slice(0, 5);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function AdminCalendario() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [instalaciones, setInstalaciones] = useState<Instalacion[]>([]);

  useEffect(() => { setInstalaciones(getInstalaciones()); }, []);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  }
  function goToday() {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }

  // Build calendar grid (Monday-based)
  const { days, totalCells } = useMemo(() => {
    const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
    const paddingStart = (firstDow + 6) % 7; // Mon=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalCells = Math.ceil((paddingStart + daysInMonth) / 7) * 7;
    const days: (number | null)[] = [];
    for (let i = 0; i < totalCells; i++) {
      const d = i - paddingStart + 1;
      days.push(d >= 1 && d <= daysInMonth ? d : null);
    }
    return { days, totalCells };
  }, [year, month]);

  // Map instalaciones to days in current month
  const dayMap = useMemo(() => {
    const map: Record<number, Instalacion[]> = {};
    instalaciones.forEach(inst => {
      if (!inst.fecha) return;
      const d = new Date(inst.fecha);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(inst);
      }
    });
    return map;
  }, [instalaciones, year, month]);

  // Selected day installations
  const selectedInst = selectedDay ? (dayMap[selectedDay] ?? []) : [];

  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  // Monthly stats
  const monthTotal = useMemo(() => {
    return Object.values(dayMap).flat().length;
  }, [dayMap]);
  const monthPendiente = useMemo(() => Object.values(dayMap).flat().filter(i => i.estado === "pendiente").length, [dayMap]);
  const monthCompletada = useMemo(() => Object.values(dayMap).flat().filter(i => i.estado === "completada").length, [dayMap]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays size={16} className="text-cyan-400" />
            <h2 className="text-white font-black text-lg tracking-tight">Calendario</h2>
          </div>
          <p className="text-zinc-600 text-xs">Vista mensual de instalaciones agendadas.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Month stats */}
          <div className="hidden sm:flex items-center gap-4 px-4 py-2 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-center">
              <div className="text-white font-black text-base">{monthTotal}</div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest">Total</div>
            </div>
            <div className="w-px h-8 bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-amber-400 font-black text-base">{monthPendiente}</div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest">Pendientes</div>
            </div>
            <div className="w-px h-8 bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-emerald-400 font-black text-base">{monthCompletada}</div>
              <div className="text-[9px] text-zinc-600 uppercase tracking-widest">Completadas</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

        {/* Calendar */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>

          {/* Month nav */}
          <div className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <button onClick={prevMonth}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all hover:bg-white/[0.05]"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <ChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-3">
              <h3 className="text-white font-black text-base tracking-wide">
                {MONTHS[month]} <span className="text-zinc-500">{year}</span>
              </h3>
              <button onClick={goToday}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase text-cyan-400 transition-all hover:bg-cyan-500/10"
                style={{ border: "1px solid rgba(6,182,212,0.2)" }}>
                Hoy
              </button>
            </div>

            <button onClick={nextMonth}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-all hover:bg-white/[0.05]"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 px-3 py-2"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-[9px] font-black tracking-widest uppercase text-zinc-600 py-1">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-px p-3">
            <AnimatePresence>
              {days.map((day, i) => {
                if (!day) {
                  return <div key={`empty-${i}`} className="aspect-square rounded-lg" />;
                }
                const insts = dayMap[day] ?? [];
                const isSelected = selectedDay === day;
                const isTod = isToday(day);
                const hasInsts = insts.length > 0;

                return (
                  <motion.button
                    key={`${year}-${month}-${day}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    onClick={() => setSelectedDay(isSelected ? null : day)}
                    className="aspect-square rounded-xl flex flex-col items-center justify-start pt-2 pb-1.5 px-1 transition-all relative group"
                    style={{
                      background: isSelected
                        ? "rgba(6,182,212,0.12)"
                        : isTod
                          ? "rgba(255,255,255,0.04)"
                          : "transparent",
                      border: isSelected
                        ? "1px solid rgba(6,182,212,0.3)"
                        : isTod
                          ? "1px solid rgba(255,255,255,0.1)"
                          : "1px solid transparent",
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) e.currentTarget.style.background = isTod ? "rgba(255,255,255,0.04)" : "transparent";
                    }}
                  >
                    <span className={`text-xs font-black leading-none mb-1.5 ${
                      isSelected ? "text-cyan-300" :
                      isTod ? "text-white" :
                      "text-zinc-400 group-hover:text-zinc-200"
                    } transition-colors`}>
                      {day}
                    </span>

                    {/* Status dots */}
                    {hasInsts && (
                      <div className="flex flex-wrap gap-0.5 justify-center">
                        {insts.slice(0, 4).map((inst, j) => (
                          <span key={j}
                            className={`w-1.5 h-1.5 rounded-full ${STATUS_CFG[inst.estado].dot}`}
                          />
                        ))}
                        {insts.length > 4 && (
                          <span className="text-[8px] text-zinc-600 font-bold">+{insts.length - 4}</span>
                        )}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 px-5 py-3 flex-wrap"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            {(Object.entries(STATUS_CFG) as [InstalacionStatus, typeof STATUS_CFG[InstalacionStatus]][]).map(([s, c]) => (
              <div key={s} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side panel — selected day */}
        <div className="rounded-2xl flex flex-col"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>

          <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {selectedDay ? (
              <div>
                <p className="text-white font-black text-sm">
                  {selectedDay} de {MONTHS[month]}
                </p>
                <p className="text-zinc-600 text-[10px]">
                  {selectedInst.length === 0
                    ? "Sin instalaciones"
                    : `${selectedInst.length} instalación${selectedInst.length > 1 ? "es" : ""}`}
                </p>
              </div>
            ) : (
              <p className="text-zinc-600 text-sm">Seleccioná un día</p>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {!selectedDay ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <CalendarDays size={28} className="text-zinc-800 mb-3" />
                <p className="text-zinc-700 text-xs">Hacé clic en un día para ver sus instalaciones</p>
              </div>
            ) : selectedInst.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-3xl mb-3 opacity-30">📋</div>
                <p className="text-zinc-600 text-xs">Sin instalaciones para este día</p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {selectedInst
                    .slice()
                    .sort((a, b) => a.hora.localeCompare(b.hora))
                    .map((inst, i) => {
                      const cfg = STATUS_CFG[inst.estado];
                      return (
                        <motion.div
                          key={inst.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="rounded-xl p-4"
                          style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                        >
                          {/* Time */}
                          {inst.hora && (
                            <div className="flex items-center gap-1.5 mb-2">
                              <Clock size={10} className={cfg.text} />
                              <span className={`text-[11px] font-black ${cfg.text}`}>{fmtTime(inst.hora)} hrs</span>
                            </div>
                          )}

                          <p className="text-white font-bold text-sm mb-1">{inst.cliente}</p>
                          <p className="text-zinc-400 text-[11px] mb-2">{inst.producto}</p>

                          <div className="space-y-1">
                            {inst.ciudad && (
                              <div className="flex items-center gap-1.5">
                                <MapPin size={9} className="text-zinc-600" />
                                <span className="text-zinc-500 text-[10px]">{inst.ciudad}</span>
                              </div>
                            )}
                            {inst.tecnico && (
                              <div className="flex items-center gap-1.5">
                                <Wrench size={9} className="text-zinc-600" />
                                <span className="text-zinc-500 text-[10px]">{inst.tecnico}</span>
                              </div>
                            )}
                            {inst.medidas && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-zinc-700 text-[10px]">📐</span>
                                <span className="text-zinc-500 text-[10px]">{inst.medidas}</span>
                              </div>
                            )}
                          </div>

                          {inst.notas && (
                            <p className="mt-2 pt-2 text-[10px] text-zinc-600 leading-relaxed italic"
                              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                              {inst.notas}
                            </p>
                          )}

                          <div className="mt-2 flex items-center justify-end">
                            <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${cfg.text}`}
                              style={{ background: "rgba(0,0,0,0.3)" }}>
                              {cfg.label}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

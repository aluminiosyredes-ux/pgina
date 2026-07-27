import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, RotateCcw, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { processMessage, getFlowResponse, emptyContext, type AIResponse, type ChatContext } from "../lib/aiService";
import { WHATSAPP_NUMBER } from "../config";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  options?: AIResponse["options"];
  timestamp: number;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function uuid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

function RichText({ text }: { text: string }) {
  return (
    <span>
      {text.split(/(\*\*.*?\*\*)/).map((part, i) =>
        part.startsWith("**") && part.endsWith("**")
          ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
          : part.split("\n").map((line, j, arr) => (
              <span key={`${i}-${j}`}>{line}{j < arr.length - 1 && <br />}</span>
            ))
      )}
    </span>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [ctx, setCtx] = useState<ChatContext>(emptyContext());
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll management
  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => scrollToBottom(false), 60);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, messages.length]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollDown(distanceFromBottom > 80);
  };

  // Init welcome message on first open
  useEffect(() => {
    if (open && !hasOpened) {
      setHasOpened(true);
      pushBotResponse({ text: "", options: [] }, true); // trigger welcome flow
    }
  }, [open]);

  // ── Message helpers ──────────────────────────────────────────────────────────

  function pushUserMessage(text: string) {
    setMessages(prev => [...prev, { id: uuid(), role: "user", text, timestamp: Date.now() }]);
  }

  function pushBotResponse(resp: AIResponse, isWelcome = false) {
    if (isWelcome) {
      // Load welcome
      import("../lib/aiService").then(({ getFlowResponse }) => {
        setTyping(true);
        getFlowResponse("welcome", ctx).then(r => {
          setTyping(false);
          setMessages(prev => [...prev, {
            id: uuid(), role: "bot", text: r.text, options: r.options, timestamp: Date.now()
          }]);
        });
      });
      return;
    }
    if (!resp.text && !resp.options) return;
    setMessages(prev => [...prev, {
      id: uuid(), role: "bot", text: resp.text, options: resp.options, timestamp: Date.now()
    }]);
  }

  // ── Input send ───────────────────────────────────────────────────────────────

  async function handleSend() {
    const val = inputVal.trim();
    if (!val || typing) return;
    setInputVal("");

    pushUserMessage(val);

    const newCtx: ChatContext = {
      ...ctx,
      history: [...ctx.history, { role: "user", content: val }],
      turn: ctx.turn + 1,
    };
    setCtx(newCtx);
    setTyping(true);

    const resp = await processMessage(val, newCtx);
    setTyping(false);

    setCtx(c => ({ ...c, history: [...c.history, { role: "assistant", content: resp.text }] }));

    if (resp.text) {
      setMessages(prev => [...prev, {
        id: uuid(), role: "bot", text: resp.text, options: resp.options, timestamp: Date.now()
      }]);
    }
  }

  // ── Option click ─────────────────────────────────────────────────────────────

  async function handleOption(value: string, label: string) {
    if (value === "_noop") return;

    pushUserMessage(label);

    const newCtx: ChatContext = {
      ...ctx,
      history: [...ctx.history, { role: "user", content: label }],
      turn: ctx.turn + 1,
      topic: value.split("_")[0] || ctx.topic,
    };
    setCtx(newCtx);
    setTyping(true);

    const resp = await getFlowResponse(value, newCtx);
    setTyping(false);

    if (!resp.text) return;

    setCtx(c => ({ ...c, history: [...c.history, { role: "assistant", content: resp.text }] }));
    setMessages(prev => [...prev, {
      id: uuid(), role: "bot", text: resp.text, options: resp.options, timestamp: Date.now()
    }]);
  }

  // ── Reset ────────────────────────────────────────────────────────────────────

  function handleReset() {
    setMessages([]);
    setCtx(emptyContext());
    setTyping(false);
    setTimeout(() => pushBotResponse({ text: "", options: [] }, true), 100);
  }

  // ── Time format ──────────────────────────────────────────────────────────────

  function formatTime(ts: number) {
    return new Date(ts).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
  }

  const NAVMAP: Record<string, string> = {
    ir_redes: "/redes", ir_roller: "/roller", ir_aluminios: "/aluminios",
    ir_domotica: "/domotica", ir_asistencia: "/asistencia",
  };

  // ── RENDER ───────────────────────────────────────────────────────────────────

  return (
    <div className="fixed bottom-24 right-4 z-[150] flex flex-col items-end gap-3 sm:bottom-24 sm:right-6">

      {/* ── CHAT PANEL ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-3xl overflow-hidden shadow-2xl"
            style={{
              width: "min(380px, calc(100vw - 2rem))",
              maxHeight: "min(560px, calc(100dvh - 140px))",
              background: "rgba(8,8,11,0.97)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(32px)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 60px rgba(6,182,212,0.04)",
            }}
          >
            {/* Top accent bar */}
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.6) 40%, rgba(245,158,11,0.5) 60%, transparent)" }} />

            {/* ── HEADER ─────────────────────────────────────────────────── */}
            <div className="relative flex items-center justify-between px-4 py-3.5 flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(245,158,11,0.04) 100%)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    animate={{ boxShadow: ["0 0 0 0 rgba(6,182,212,0.4)", "0 0 0 8px rgba(6,182,212,0)"] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(6,182,212,0.08))",
                      border: "1px solid rgba(6,182,212,0.25)",
                    }}
                  >
                    <Sparkles size={15} className="text-cyan-400" />
                  </motion.div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 flex items-center justify-center"
                    style={{ background: "#10b981", borderColor: "rgba(8,8,11,0.97)" }}>
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-300"
                      animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-black text-sm tracking-tight">Asistente A&R</span>
                    <span className="text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded-md"
                      style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
                      IA
                    </span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-semibold tracking-wider">En línea · Responde en segundos</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button onClick={handleReset} title="Reiniciar"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-400 transition-colors hover:bg-white/[0.05]">
                  <RotateCcw size={12} />
                </button>
                <button onClick={() => setOpen(false)} title="Cerrar"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-400 transition-colors hover:bg-white/[0.05]">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── MESSAGES ───────────────────────────────────────────────── */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5"
              style={{ scrollbarWidth: "none", overscrollBehavior: "contain" }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
                      style={{ maxWidth: "88%" }}>

                      {/* Bubble */}
                      {msg.text && (
                        <div
                          className={`px-4 py-3 text-xs leading-relaxed rounded-2xl ${
                            msg.role === "user"
                              ? "text-white rounded-br-sm"
                              : "text-zinc-300 rounded-bl-sm"
                          }`}
                          style={{
                            background: msg.role === "user"
                              ? "linear-gradient(135deg, rgba(6,182,212,0.22), rgba(6,182,212,0.12))"
                              : "rgba(255,255,255,0.04)",
                            border: msg.role === "user"
                              ? "1px solid rgba(6,182,212,0.28)"
                              : "1px solid rgba(255,255,255,0.07)",
                            boxShadow: msg.role === "user" ? "0 2px 12px rgba(6,182,212,0.08)" : "none",
                          }}
                        >
                          <RichText text={msg.text} />
                        </div>
                      )}

                      {/* Timestamp */}
                      <span className="text-[9px] text-zinc-700 px-1 select-none">
                        {formatTime(msg.timestamp)}
                      </span>

                      {/* Options */}
                      {msg.options && msg.options.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-0.5">
                          {msg.options.map(opt => {
                            if (opt.value === "_noop" && opt.whatsappMsg) {
                              return (
                                <a
                                  key={opt.value + opt.label}
                                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(opt.whatsappMsg)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold transition-all hover:brightness-125 active:scale-95"
                                  style={{
                                    background: opt.accent ?? "rgba(37,211,102,0.12)",
                                    border: "1px solid rgba(37,211,102,0.25)",
                                    color: "#d1fae5",
                                  }}
                                >
                                  {opt.emoji && <span className="text-xs leading-none">{opt.emoji}</span>}
                                  {opt.label}
                                </a>
                              );
                            }

                            if (opt.href ?? NAVMAP[opt.value]) {
                              return (
                                <Link
                                  key={opt.value + opt.label}
                                  href={opt.href ?? NAVMAP[opt.value]}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold transition-all hover:brightness-125 active:scale-95 text-zinc-300"
                                  style={{
                                    background: opt.accent ?? "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.09)",
                                  }}
                                >
                                  {opt.emoji && <span className="text-xs leading-none">{opt.emoji}</span>}
                                  {opt.label}
                                </Link>
                              );
                            }

                            return (
                              <button
                                key={opt.value + opt.label}
                                onClick={() => handleOption(opt.value, opt.label)}
                                disabled={typing}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold transition-all hover:brightness-125 active:scale-95 disabled:opacity-40 text-zinc-300"
                                style={{
                                  background: opt.accent ?? "rgba(255,255,255,0.04)",
                                  border: "1px solid rgba(255,255,255,0.09)",
                                }}
                              >
                                {opt.emoji && <span className="text-xs leading-none">{opt.emoji}</span>}
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-500"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Scroll to bottom pill */}
            <AnimatePresence>
              {showScrollDown && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => scrollToBottom()}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-semibold text-zinc-400 transition-all hover:text-white"
                  style={{ background: "rgba(20,20,28,0.95)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <ChevronDown size={10} /> Ver más abajo
                </motion.button>
              )}
            </AnimatePresence>

            {/* ── INPUT ──────────────────────────────────────────────────── */}
            <div className="px-3 pb-3 pt-2.5 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Escribí tu consulta…"
                  disabled={typing}
                  className="flex-1 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none transition-all disabled:opacity-50"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(6,182,212,0.35)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!inputVal.trim() || typing}
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
                  style={{
                    background: inputVal.trim() ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${inputVal.trim() ? "rgba(6,182,212,0.35)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <Send size={13} className={inputVal.trim() ? "text-cyan-400" : "text-zinc-600"} />
                </motion.button>
              </div>
              <p className="text-center text-[9px] text-zinc-800 mt-2 tracking-widest uppercase">
                Aluminios & Redes · Regiones de Arica · Iquique · Antofagasta
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOGGLE BUTTON ──────────────────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-[54px] h-[54px] rounded-2xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #0891b2, #06b6d4)",
          boxShadow: open
            ? "0 4px 20px rgba(6,182,212,0.2)"
            : "0 8px 32px rgba(6,182,212,0.35), 0 2px 8px rgba(0,0,0,0.4)",
          border: "1px solid rgba(6,182,212,0.4)",
        }}
      >
        {/* Pulse ring */}
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{ boxShadow: ["0 0 0 0 rgba(6,182,212,0.5)", "0 0 0 12px rgba(6,182,212,0)"] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.8 }}
          />
        )}

        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={20} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="msg"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageSquare size={20} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge */}
        {!open && !hasOpened && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "#f59e0b", border: "2px solid #08080b" }}
          >
            <span className="text-[8px] font-black text-black">1</span>
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}

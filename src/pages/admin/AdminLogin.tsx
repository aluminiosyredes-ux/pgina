import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, User, AlertCircle, LogIn } from "lucide-react";
import { login, getSession } from "../../lib/auth";
import { LogoMark } from "../../components/LogoMark";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (getSession()) {
    navigate("/admin/dashboard");
  }
}, [navigate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const ok = login(username, password);
      if (ok) {
        navigate("/admin/dashboard");
      } else {
        setError("Usuario o contraseña incorrectos.");
        setLoading(false);
      }
    }, 400);
  }

  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(245,158,11,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(10,10,10,0.95)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow:
              "0 0 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,158,11,0.04)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Top accent bar */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

          <div className="px-8 py-10">
            {/* Logo + title */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-4"
              >
                <LogoMark size={52} />
              </motion.div>
              <h1 className="text-white font-black tracking-[0.2em] text-sm uppercase mb-1">
                Panel Administrativo
              </h1>
              <p className="text-zinc-600 text-xs tracking-widest uppercase">
                Aluminios &amp; Redes
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-7">
              <div className="flex-1 h-px bg-white/[0.05]" />
              <Lock size={10} className="text-zinc-700" />
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Username */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                  Usuario
                </label>
                <div className="relative">
                  <User
                    size={13}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-zinc-700 outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border =
                        "1px solid rgba(245,158,11,0.4)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(245,158,11,0.06)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border =
                        "1px solid rgba(255,255,255,0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    placeholder="admin"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock
                    size={13}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-zinc-700 outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border =
                        "1px solid rgba(245,158,11,0.4)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(245,158,11,0.06)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border =
                        "1px solid rgba(255,255,255,0.08)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  <AlertCircle size={13} className="text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-xs">{error}</p>
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: loading
                    ? "rgba(245,158,11,0.6)"
                    : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  color: "#000",
                  boxShadow: loading
                    ? "none"
                    : "0 4px 24px rgba(245,158,11,0.25)",
                }}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-black/30 border-t-black/80 rounded-full"
                  />
                ) : (
                  <>
                    <LogIn size={13} />
                    Ingresar
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-700 text-[10px] tracking-widest uppercase mt-5">
          Acceso restringido · Solo personal autorizado
        </p>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Truck } from "lucide-react";

const ML_STORE_URL = "https://www.mercadolibre.cl/";

const trust = [
  { icon: ShieldCheck, label: "Compra protegida" },
  { icon: CreditCard,  label: "Pago en cuotas"  },
  { icon: Truck,       label: "Envíos a Chile"  },
];

export default function MercadoLibreSection() {
  return (
    <section className="relative bg-[#0f0f0f] overflow-hidden">

      {/* Top separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 110%, rgba(255,230,0,0.045) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">

        {/* Header text */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <p className="text-[9px] font-black tracking-[0.3em] uppercase text-amber-500/60 mb-4">
            Marketplace oficial
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-4">
            Compra con{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #FFE600 0%, #F7C00A 100%)",
              }}
            >
              total seguridad
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-zinc-500 text-[13px] md:text-sm leading-relaxed">
            También puedes adquirir nuestros productos a través de Mercado Libre
            y acceder a beneficios como protección de compra, pagos en cuotas y
            envíos a todo Chile.
          </p>
        </motion.div>

        {/* Trust pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {trust.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-wide"
              style={{
                background: "rgba(255,230,0,0.05)",
                borderColor: "rgba(255,230,0,0.15)",
                color: "rgba(255,230,0,0.75)",
              }}
            >
              <Icon size={13} />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Main image / banner card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <a
            href={ML_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full"
            style={{ maxWidth: 820 }}
          >
            <div
              className="relative overflow-hidden transition-all duration-500 group-hover:scale-[1.012]"
              style={{
                borderRadius: 28,
                border: "1px solid rgba(255,230,0,0.18)",
                boxShadow:
                  "0 4px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,230,0,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
                background: "linear-gradient(135deg, #1a1a0e 0%, #111110 50%, #0d0d0c 100%)",
              }}
            >
              {/* Grid texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,230,0,0.06) 0%, transparent 70%)",
                }}
              />

              {/* Inner content */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-10 py-10 md:py-12">

                {/* Left — ML logo + wordmark */}
                <div className="flex flex-col items-center md:items-start gap-3 flex-shrink-0">
                  {/* Mercado Libre SVG wordmark */}
                  <img
                    src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.5/mercadolibre/logo__large_plus@2x.png"
                    alt="Mercado Libre"
                    className="h-10 md:h-12 w-auto object-contain select-none"
                    draggable={false}
                    style={{ filter: "brightness(1.05)" }}
                  />
                  <p className="text-[10px] font-semibold tracking-widest uppercase"
                    style={{ color: "rgba(255,230,0,0.45)" }}>
                    Vendedor verificado
                  </p>
                </div>

                {/* Center divider (desktop) */}
                <div
                  className="hidden md:block self-stretch w-px flex-shrink-0"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(255,230,0,0.12), transparent)" }}
                />

                {/* Right — copy + CTA */}
                <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                  <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                    Encontrá nuestros productos en nuestro perfil oficial de Mercado Libre con la seguridad que ofrece la plataforma.
                  </p>
                </div>

              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, #FFE600, transparent)" }}
              />
            </div>
          </a>
        </motion.div>

      </div>

      {/* Bottom separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </section>
  );
}

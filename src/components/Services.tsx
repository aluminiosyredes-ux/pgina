import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Layers, Box, Cpu, ArrowRight } from "lucide-react";

const services = [
  {
    id: "redes",
    icon: Shield,
    title: "Redes de Seguridad",
    subtitle: "Protección certificada",
    description:
      "Instalación profesional de redes de seguridad para balcones, ventanas, escaleras y espacios industriales. Materiales de alta resistencia con certificación de calidad.",
    features: ["Redes para balcones", "Redes para escaleras", "Protección industrial", "Instalación sin obra"],
    gradient: "from-blue-500/10 to-blue-600/5",
    accent: "border-blue-500/20 group-hover:border-blue-400/40",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  {
    id: "roller",
    icon: Layers,
    title: "Roller",
    subtitle: "Confort y diseño",
    description:
      "Sistemas de cortinas roller con motorización opcional. Tela screen, blackout y traslúcida para un control perfecto de la luz y privacidad en cada espacio.",
    features: ["Roller screen", "Roller blackout", "Motorización inteligente", "Medidas personalizadas"],
    gradient: "from-amber-500/10 to-amber-600/5",
    accent: "border-amber-500/20 group-hover:border-amber-400/40",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  {
    id: "aluminios",
    icon: Box,
    title: "Aluminios",
    subtitle: "Precisión artesanal",
    description:
      "Carpintería de aluminio a medida: ventanas, puertas, cerramientos y frentes de locales. Perfiles de primera línea con terminaciones impecables.",
    features: ["Ventanas DVH", "Puertas corredizas", "Cerramientos", "Frentes de locales"],
    gradient: "from-zinc-400/10 to-zinc-500/5",
    accent: "border-zinc-500/20 group-hover:border-zinc-300/40",
    iconColor: "text-zinc-300",
    iconBg: "bg-zinc-400/10",
  },
  {
    id: "domotica",
    icon: Cpu,
    title: "Domótica",
    subtitle: "Hogar inteligente",
    description:
      "Automatización del hogar y la empresa. Control de iluminación, climatización, seguridad y accesos desde tu smartphone o con comandos de voz.",
    features: ["Control de iluminación", "Persianas automáticas", "Alarmas inteligentes", "Control por voz"],
    gradient: "from-purple-500/10 to-purple-600/5",
    accent: "border-purple-500/20 group-hover:border-purple-400/40",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
      id={service.id}
      style={{ scrollMarginTop: "88px" }}
      className={`group relative rounded-2xl border bg-gradient-to-br ${service.gradient} ${service.accent} border bg-[#222222] p-8 flex flex-col gap-6 cursor-default transition-all duration-500 hover:bg-[#111] hover:scale-[1.01] hover:shadow-2xl`}
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center`}>
          <Icon size={22} className={service.iconColor} />
        </div>
        <ArrowRight size={16} className="text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all duration-300 mt-1" />
      </div>

      {/* Text */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-1">{service.subtitle}</p>
        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{service.description}</p>
      </div>

      {/* Features */}
      <ul className="grid grid-cols-2 gap-2 mt-auto">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-zinc-500">
            <span className={`w-1 h-1 rounded-full ${service.iconColor} bg-current flex-shrink-0`} />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-[#151515]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-4">Nuestros servicios</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Todo lo que tu espacio
            <br />
            <span className="text-zinc-500">necesita, en un lugar.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

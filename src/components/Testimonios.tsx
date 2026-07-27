import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonios = [
  {
    name: "Marcela Rodríguez",
    role: "Propietaria, Palermo",
    text: "Instalaron las redes de seguridad en mi balcón con una precisión impecable. El trabajo fue rápido, limpio y el resultado es perfecto. Totalmente recomendables.",
    rating: 5,
    service: "Redes de Seguridad",
  },
  {
    name: "Diego Fernández",
    role: "Arquitecto, Recoleta",
    text: "Trabajé con ellos en varios proyectos de clientes. La calidad de los aluminios es de primer nivel y los plazos siempre se cumplen. Son mis proveedores de confianza.",
    rating: 5,
    service: "Aluminios",
  },
  {
    name: "Sofía Martínez",
    role: "Dueña de local, Belgrano",
    text: "El sistema de rollers motorizados que instalaron transformó mi local. El equipo fue muy profesional y el asesoramiento previo fue excelente.",
    rating: 5,
    service: "Roller",
  },
  {
    name: "Carlos Ibáñez",
    role: "Empresario, San Isidro",
    text: "La automatización del hogar que implementaron superó mis expectativas. Controlo todo desde el celular y el sistema es increíblemente intuitivo.",
    rating: 5,
    service: "Domótica",
  },
  {
    name: "Laura Giménez",
    role: "Administradora, Villa Crespo",
    text: "Contratamos la instalación de redes en un edificio de 8 pisos. El trabajo fue prolijo, los materiales de calidad y el precio muy competitivo.",
    rating: 5,
    service: "Redes de Seguridad",
  },
  {
    name: "Tomás Herrera",
    role: "Interiorista, Puerto Madero",
    text: "Los cerramientos de aluminio que hicieron para mi cliente quedaron de lujo. Detalle, precisión y materiales premium. Un trabajo de categoría.",
    rating: 5,
    service: "Aluminios",
  },
];

export default function Testimonios() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonios" style={{ scrollMarginTop: "88px" }} className="py-32 bg-[#151515]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-4">Testimonios</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Lo que dicen
            <br />
            <span className="text-zinc-500">nuestros clientes.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonios.map((t, i) => (
            <TestimonioCard key={t.name} item={t} index={i} />
          ))}
        </div>

        {/* Bottom trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/2 text-zinc-500 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span>+500 clientes satisfechos en Buenos Aires y GBA</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonioCard({ item, index }: { item: typeof testimonios[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
      className="break-inside-avoid rounded-2xl border border-white/5 bg-[#222222] p-6 flex flex-col gap-4 hover:border-white/10 transition-all duration-300"
    >
      {/* Quote */}
      <Quote size={20} className="text-amber-500/30" />

      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(item.rating)].map((_, i) => (
          <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Text */}
      <p className="text-zinc-300 text-sm leading-relaxed flex-1">"{item.text}"</p>

      {/* Badge */}
      <span className="self-start text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/15">
        {item.service}
      </span>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-zinc-700 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-amber-400">{item.name[0]}</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{item.name}</div>
          <div className="text-xs text-zinc-500">{item.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

import { Link } from "wouter";
import { MapPin, Phone, MessageCircle, Truck, ArrowUpRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { WHATSAPP_NUMBER, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "../config";
import { LogoMark } from "./LogoMark";

const serviceLinks = [
  { label: "Redes de Seguridad", href: "/redes" },
  { label: "Roller", href: "/roller" },
  { label: "Aluminios", href: "/aluminios" },
  { label: "Domótica", href: "/domotica" },
];

const companyLinks = [
  { label: "Inicio", href: "/" },
  { label: "Cotizador", href: "/redes" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-white/5">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-7">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 w-fit group">
              <LogoMark size={30} className="opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-baseline gap-1.5">
                <span className="font-black tracking-[0.12em] text-white text-[13px] uppercase">Aluminios</span>
                <span className="font-thin text-[11px]" style={{ color: "#F59E0B", opacity: 0.65 }}>&amp;</span>
                <span className="font-black tracking-[0.12em] text-white text-[13px] uppercase">Redes</span>
              </div>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mb-5">
              Empresa especializada en redes de seguridad, sistemas roller, carpintería de aluminio y domótica.
              Instalaciones en las regiones de Arica, Iquique y Antofagasta.
            </p>
            <div className="space-y-2.5 mb-4">
              {[
                { icon: MapPin, text: "Regiones de Arica · Iquique · Antofagasta" },
                { icon: Phone, text: "+56 9 5973 7903", href: "tel:+56959737903" },
                { icon: FaInstagram, text: INSTAGRAM_HANDLE, href: INSTAGRAM_URL },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-zinc-400">
                  <Icon size={13} className="text-zinc-600 flex-shrink-0" />
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </div>
              ))}
            </div>
            {/* Shipping highlight */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/6">
              <Truck size={11} className="text-amber-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-amber-400 tracking-wide">Ventas y envíos para todo Chile</span>
            </div>
          </div>

          {/* Service links */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-600 mb-4">Servicios</p>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-500 hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-600 mb-4">Empresa</p>
            <ul className="space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-500 hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Bottom bar */}
        <div className="mt-5 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} Aluminios & Redes · Chile. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: FaInstagram, label: "Instagram", href: INSTAGRAM_URL },
              { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}` },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-7 h-7 rounded-full border border-white/6 flex items-center justify-center text-zinc-600 hover:text-white hover:border-white/15 transition-all duration-200"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

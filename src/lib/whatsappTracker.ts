import { metaTrackCustom } from "./metaPixel";

export function initWhatsAppTracking() {

  document.addEventListener("click", (e) => {

    const element = e.target as HTMLElement;

    const link = element.closest("a");

    if (
      link &&
      link.href &&
      link.href.includes("wa.me")
    ) {

      metaTrackCustom("WhatsAppClick", {
        origen: window.location.pathname,
      });

    }

  });

}
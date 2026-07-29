import { useEffect } from "react";

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterImage?: string;
  ogLocale?: string;
}

function ensureMeta(attrType: "name" | "property", attrName: string, value: string) {
  const selector = `meta[${attrType}="${attrName}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrType, attrName);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setCanonical(href: string) {
  const links = Array.from(document.querySelectorAll("link[rel='canonical']"));
  if (links.length === 0) {
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = href;
    document.head.appendChild(link);
    return;
  }
  // Keep first, update href, remove duplicates
  links.forEach((l, i) => {
    if (i === 0) {
      (l as HTMLLinkElement).href = href;
    } else {
      try { l.parentElement?.removeChild(l); } catch (e) { /* ignore */ }
    }
  });
}

function setLDJson(obj: any) {
  const id = "ld-json-seo";
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(obj, null, 2);
}

export function useSEO(data: SEOData) {
  useEffect(() => {
    const prevTitle = document.title;
    const BASE = "https://aluminiosyredes.cl";

    document.title = data.title;

    // Basic metas
    ensureMeta("name", "description", data.description);
    if (data.keywords) ensureMeta("name", "keywords", data.keywords);

    // Open Graph
    const ogTitle = data.ogTitle ?? data.title;
    const ogDesc = data.ogDescription ?? data.description;
    const ogType = data.ogType ?? "website";
    const ogImage = data.ogImage ?? "/og-default.jpg";
    const ogLocale = data.ogLocale ?? "es_CL";

    ensureMeta("property", "og:title", ogTitle);
    ensureMeta("property", "og:description", ogDesc);
    ensureMeta("property", "og:type", ogType);
    ensureMeta("property", "og:image", ogImage);
    ensureMeta("property", "og:site_name", "Aluminios & Redes");
    ensureMeta("property", "og:locale", ogLocale);

    // og:url -> use canonical if present, otherwise current
    const pageUrl = data.canonical ? `${BASE}${data.canonical}` : window.location.href;
    ensureMeta("property", "og:url", pageUrl);

    // Twitter
    const twitterImg = data.twitterImage ?? ogImage;
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", ogTitle);
    ensureMeta("name", "twitter:description", ogDesc);
    ensureMeta("name", "twitter:image", twitterImg);

    // Canonical handling
    if (data.canonical) {
      setCanonical(`${BASE}${data.canonical}`);
    }

    // JSON-LD: Organization + LocalBusiness (include only confirmed data)
    try {
      const org: any = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Aluminios & Redes",
        url: BASE,
        logo: "/logo-ld.png",
      };

      const localBusiness: any = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Aluminios & Redes",
        url: BASE,
        logo: "/logo-ld.png",
        telephone: "+56 9 5973 7903",
        address: {
          "@type": "PostalAddress",
          // addressLocality / streetAddress not provided — to be completed
        },
        areaServed: ["Arica", "Iquique", "Antofagasta"]
      };

      // Remove empty address fields to avoid invalid schema; keep structure for future completion
      // If address details are unknown, omit address.streetAddress/addressLocality
      setLDJson([org, localBusiness]);
    } catch (e) {
      // don't break rendering if JSON-LD fails
      console.warn("Failed to set JSON-LD SEO", e);
    }

    return () => {
      document.title = prevTitle;
      // Do not remove meta tags on cleanup: they should persist for crawlers and sharing.
    };
  }, []);
}

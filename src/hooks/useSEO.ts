import { useEffect } from "react";

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
}

function updateMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    const [attrName, attrValue] = selector.replace("meta[", "").replace("]", "").split('="');
    el.setAttribute(attrName, attrValue.replace('"', ""));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function useSEO(data: SEOData) {
  useEffect(() => {
    const prevTitle = document.title;
    const BASE = "https://aluminiosyredes.cl";

    document.title = data.title;

    updateMeta('meta[name="description"]', "content", data.description);
    if (data.keywords) updateMeta('meta[name="keywords"]', "content", data.keywords);

    const ogTitle = data.ogTitle ?? data.title;
    const ogDesc = data.ogDescription ?? data.description;

    updateMeta('meta[property="og:title"]', "content", ogTitle);
    updateMeta('meta[property="og:description"]', "content", ogDesc);
    updateMeta('meta[name="twitter:title"]', "content", ogTitle);
    updateMeta('meta[name="twitter:description"]', "content", ogDesc);

    if (data.canonical) {
      let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = `${BASE}${data.canonical}`;
    }

    return () => {
      document.title = prevTitle;
    };
  }, []);
}

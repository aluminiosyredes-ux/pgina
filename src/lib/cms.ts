export type CMSCategory = "redes" | "roller" | "aluminios" | "domotica";

export interface CMSImage {
  id: string;
  category: CMSCategory;
  dataUrl: string;
  name: string;
  alt: string;
  order: number;
  createdAt: string;
}

const KEY = "ayr_cms_gallery";

export function getAllCMSImages(): CMSImage[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as CMSImage[];
  } catch {
    return [];
  }
}

export function getCMSImages(category: CMSCategory): CMSImage[] {
  return getAllCMSImages()
    .filter((img) => img.category === category)
    .sort((a, b) => a.order - b.order);
}

export function saveCMSImage(data: Omit<CMSImage, "id" | "createdAt">): CMSImage {
  const entry: CMSImage = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const all = getAllCMSImages();
  all.push(entry);
  localStorage.setItem(KEY, JSON.stringify(all));
  return entry;
}

export function updateCMSImage(id: string, data: Partial<CMSImage>): void {
  const all = getAllCMSImages().map((img) =>
    img.id === id ? { ...img, ...data } : img
  );
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function deleteCMSImage(id: string): void {
  const all = getAllCMSImages().filter((img) => img.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function reorderCMSImages(category: CMSCategory, orderedIds: string[]): void {
  const all = getAllCMSImages().map((img) => {
    if (img.category !== category) return img;
    const idx = orderedIds.indexOf(img.id);
    return { ...img, order: idx === -1 ? 9999 : idx };
  });
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function getStorageUsage(): { usedBytes: number; usedMB: string; percent: number } {
  const raw = localStorage.getItem(KEY) ?? "";
  const usedBytes = new Blob([raw]).size;
  const limitBytes = 4.5 * 1024 * 1024;
  return {
    usedBytes,
    usedMB: (usedBytes / (1024 * 1024)).toFixed(2),
    percent: Math.min(100, Math.round((usedBytes / limitBytes) * 100)),
  };
}

export async function compressImage(
  file: File,
  maxWidth = 1200,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      let w = img.width;
      let h = img.height;
      if (w > maxWidth) {
        h = Math.round((h * maxWidth) / w);
        w = maxWidth;
      }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas not available")); return; }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image load error")); };
    img.src = url;
  });
}

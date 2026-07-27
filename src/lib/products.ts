import { compressImage } from "./cms";

export type ProductCategory = "redes" | "roller" | "aluminios" | "domotica";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  category: ProductCategory;
  imageUrl: string;
  whatsappMessage: string;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const KEY = "ayr_products";

export function getAllProducts(): Product[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Product[];
  } catch {
    return [];
  }
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return getAllProducts()
    .filter((p) => p.category === category && p.active)
    .sort((a, b) => a.order - b.order);
}

export function getAllProductsAdmin(): Product[] {
  return getAllProducts().sort((a, b) => a.order - b.order);
}

export function saveProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
  const all = getAllProducts();
  const product: Product = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  all.push(product);
  localStorage.setItem(KEY, JSON.stringify(all));
  return product;
}

export function updateProduct(id: string, data: Partial<Product>): void {
  const all = getAllProducts().map((p) =>
    p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
  );
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function deleteProduct(id: string): void {
  const all = getAllProducts().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function toggleProductActive(id: string): void {
  const all = getAllProducts().map((p) =>
    p.id === id ? { ...p, active: !p.active, updatedAt: new Date().toISOString() } : p
  );
  localStorage.setItem(KEY, JSON.stringify(all));
}

export { compressImage };

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  redes: "Redes",
  roller: "Roller",
  aluminios: "Aluminios",
  domotica: "Domótica",
};

export const DEFAULT_WA_MESSAGES: Record<ProductCategory, string> = {
  redes: "Hola, quisiera consultar sobre redes de seguridad.",
  roller: "Hola, quisiera cotizar cortinas roller.",
  aluminios: "Hola, quisiera cotizar carpintería de aluminio.",
  domotica: "Hola, quisiera consultar sobre domótica.",
};

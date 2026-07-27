export interface RedesPriceItem {
  id: string;
  label: string;
  priceMin: number;
  priceMax: number;
}

export interface RangePrice {
  id: string;
  label: string;
  priceMin: number;
  priceMax: number;
}

export interface PriceConfig {
  redes: RedesPriceItem[];
  roller: RangePrice[];
  aluminios: RangePrice[];
}

const PRICES_API = "/api/prices";
const STORAGE_KEY = "ayr_precios";

export const DEFAULTS: PriceConfig = {
  redes: [
    { id: "equiplex",     label: "Malla Equiplex",     priceMin: 8_500, priceMax: 11_000 },
    { id: "transparente", label: "Malla Transparente",  priceMin: 6_500, priceMax:  9_000 },
  ],
  roller: [
    { id: "blackout",   label: "Roller Blackout",       priceMin: 18_000, priceMax: 24_000 },
    { id: "sunscreen",  label: "Roller Sunscreen",       priceMin: 20_000, priceMax: 28_000 },
    { id: "duo",        label: "Cortina Dúo",            priceMin: 28_000, priceMax: 38_000 },
    { id: "motorizada", label: "Cortina Motorizada",     priceMin: 40_000, priceMax: 55_000 },
    { id: "premium",    label: "Colección Premium",      priceMin: 32_000, priceMax: 48_000 },
  ],
  aluminios: [
    { id: "ventanales",        label: "Ventanales de Aluminio",  priceMin: 85_000,  priceMax: 140_000 },
    { id: "cierres-terraza",   label: "Cierres de Terraza",      priceMin: 110_000, priceMax: 180_000 },
    { id: "divisiones",        label: "Divisiones Interiores",   priceMin: 75_000,  priceMax: 120_000 },
    { id: "personalizado",     label: "Proyecto Personalizado",  priceMin: 90_000,  priceMax: 160_000 },
  ],
};

export function getPrices(): PriceConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const saved = JSON.parse(raw) as Partial<PriceConfig>;
    return {
      redes:     saved.redes     ?? DEFAULTS.redes,
      roller:    saved.roller    ?? DEFAULTS.roller,
      aluminios: saved.aluminios ?? DEFAULTS.aluminios,
    };
  } catch {
    return DEFAULTS;
  }
}

export async function syncPricesFromServer(): Promise<void> {
  try {
    const res = await fetch(PRICES_API);
    if (res.ok) {
      const data = await res.json() as PriceConfig;
      if (data?.redes && data?.roller && data?.aluminios) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    }
  } catch {
    // silently fall back to localStorage / DEFAULTS
  }
}

export async function savePrices(config: PriceConfig): Promise<void> {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function resetPrices(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export type QuoteStatus = "nueva" | "contactado" | "agendado" | "instalado" | "pagado";

export interface QuoteEntry {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  ciudad: string;
  producto: string;
  medidas: string;
  totalMin: number;
  totalMax: number;
  fecha: string;
  estado: QuoteStatus;
}

const STORAGE_KEY = "ayr_cotizaciones";

export function saveQuote(
  data: Omit<QuoteEntry, "id" | "fecha" | "estado">
): QuoteEntry {
  const entry: QuoteEntry = {
    ...data,
    id: crypto.randomUUID(),
    fecha: new Date().toISOString(),
    estado: "nueva",
  };
  const all = getQuotes();
  all.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return entry;
}

export function getQuotes(): QuoteEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuoteEntry[]) : [];
  } catch {
    return [];
  }
}

export function updateQuoteStatus(id: string, estado: QuoteStatus): void {
  const all = getQuotes().map((q) => (q.id === id ? { ...q, estado } : q));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function deleteQuote(id: string): void {
  const all = getQuotes().filter((q) => q.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

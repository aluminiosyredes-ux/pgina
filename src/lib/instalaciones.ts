export type InstalacionStatus = "pendiente" | "en_camino" | "completada" | "cancelada";

export interface Instalacion {
  id: string;
  quoteId?: string;
  cliente: string;
  telefono: string;
  ciudad: string;
  producto: string;
  medidas: string;
  fecha: string;
  hora: string;
  tecnico: string;
  notas: string;
  estado: InstalacionStatus;
  createdAt: string;
}

const KEY = "ayr_instalaciones";

export function getInstalaciones(): Instalacion[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Instalacion[];
  } catch {
    return [];
  }
}

export function saveInstalacion(data: Omit<Instalacion, "id" | "createdAt">): Instalacion {
  const entry: Instalacion = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const all = getInstalaciones();
  all.unshift(entry);
  localStorage.setItem(KEY, JSON.stringify(all));
  return entry;
}

export function updateInstalacion(id: string, data: Partial<Instalacion>): void {
  const all = getInstalaciones().map((i) => (i.id === id ? { ...i, ...data } : i));
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function deleteInstalacion(id: string): void {
  const all = getInstalaciones().filter((i) => i.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

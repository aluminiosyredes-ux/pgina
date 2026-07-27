// ─── CRM DATA LAYER ──────────────────────────────────────────────────────────
// Extensible design for future AI integrations:
// - AI summary hooks can call getNotes(quoteId) to feed context
// - AI scoring can read QuoteEntry + notes to rank leads
// - Future: remote sync via API can mirror localStorage data

export interface NoteEntry {
  id: string;
  quoteId: string;
  texto: string;
  fecha: string;
  autor: string;
}

const NOTES_KEY = "ayr_crm_notas";

function getAllNotes(): Record<string, NoteEntry[]> {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? (JSON.parse(raw) as Record<string, NoteEntry[]>) : {};
  } catch {
    return {};
  }
}

export function getNotes(quoteId: string): NoteEntry[] {
  return getAllNotes()[quoteId] ?? [];
}

export function addNote(
  quoteId: string,
  texto: string,
  autor = "Admin"
): NoteEntry {
  const note: NoteEntry = {
    id: crypto.randomUUID(),
    quoteId,
    texto: texto.trim(),
    fecha: new Date().toISOString(),
    autor,
  };
  const all = getAllNotes();
  all[quoteId] = [...(all[quoteId] ?? []), note];
  localStorage.setItem(NOTES_KEY, JSON.stringify(all));
  return note;
}

export function deleteNote(quoteId: string, noteId: string): void {
  const all = getAllNotes();
  all[quoteId] = (all[quoteId] ?? []).filter((n) => n.id !== noteId);
  localStorage.setItem(NOTES_KEY, JSON.stringify(all));
}

// ─── AI INTEGRATION HOOKS (future) ───────────────────────────────────────────
// These are scaffolded for future AI features — currently no-ops.

// export async function generateAISummary(quoteId: string): Promise<string> {
//   const quote = getQuotes().find(q => q.id === quoteId);
//   const notes = getNotes(quoteId);
//   // Call AI API with quote + notes context
//   return "AI summary placeholder";
// }

// export async function scoreLeadAI(quoteId: string): Promise<number> {
//   // Return 0-100 lead score based on product, notes, status history
//   return 50;
// }

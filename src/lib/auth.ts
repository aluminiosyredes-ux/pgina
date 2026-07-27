const SESSION_KEY = "ayr_admin_session";
const ADMIN_USER = "Nico";
const ADMIN_PASS = "Nico1992.";

export interface Session {
  user: string;
  loginAt: number;
}

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const session: Session = { user: username, loginAt: Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

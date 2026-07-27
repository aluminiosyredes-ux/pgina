declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function metaTrack(
  event: string,
  data?: Record<string, any>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, data);
  }
}


export function metaTrackCustom(
  event: string,
  data?: Record<string, any>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", event, data);
  }
}
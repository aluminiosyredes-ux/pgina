import ReactGA from "react-ga4";

const GA_ID = "G-W28P9E4Q44";

export function initGA() {
  ReactGA.initialize(GA_ID);
}

export function trackEvent(
  action: string,
  params?: Record<string, any>
) {
  ReactGA.event(action, params);
}

export function trackPageView(path: string) {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
}
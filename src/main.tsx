import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initGA } from "./lib/googleAnalytics";
import { initWhatsAppTracking } from "./lib/whatsappTracker";

initGA();
initWhatsAppTracking();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
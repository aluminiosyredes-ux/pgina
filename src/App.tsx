import "./index.css";
import { Router, Route, Switch, useLocation, Redirect } from "wouter";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { track } from "./lib/analytics";
import { syncPricesFromServer } from "./lib/prices";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingContactButtons from "./components/FloatingContactButtons";
import ConversionPopup from "./components/ConversionPopup";
import ChatWidget from "./components/ChatWidget";
import CoverageBanner from "./components/CoverageBanner";
import Home from "./pages/Home";
import Redes from "./pages/Redes";
import Roller from "./pages/Roller";
import Aluminios from "./pages/Aluminios";
import Domotica from "./pages/Domotica";
import Contacto from "./pages/Contacto";
import Pagos from "./pages/Pagos";
import Asistencia from "./pages/Asistencia";
import DomoticaSubPage from "./pages/DomoticaSubPage";
import RollerSubPage from "./pages/RollerSubPage";
import RollerCotizador from "./pages/RollerCotizador";
import RollerBlackoutPage from "./pages/RollerBlackoutPage";
import RollerCategoryPage from "./pages/RollerCategoryPage";
import AluminiosSubPage from "./pages/AluminiosSubPage";
import AluminiosCategoryPage from "./pages/AluminiosCategoryPage";
import VentanalesPage from "./pages/VentanalesPage";
import CierresPage from "./pages/CierresPage";
import MedicionIAPage from "./pages/MedicionIAPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

function PageTracker() {
  const [location] = useLocation();
  useEffect(() => {
    track("page_view");
  }, [location]);
  useEffect(() => {
    syncPricesFromServer();
  }, []);
  return null;
}

function AnimatedRoutes() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/redes" component={Redes} />
        <Route path="/roller/cotizador" component={RollerCotizador} />
        <Route path="/roller/blackout" component={RollerBlackoutPage} />
        <Route path="/roller/sunscreen" component={RollerCategoryPage} />
        <Route path="/roller/motorizadas" component={RollerCategoryPage} />
        <Route path="/roller/duo" component={RollerCategoryPage} />
        <Route path="/roller/automatizacion" component={RollerCategoryPage} />
        <Route path="/roller/zebra" component={RollerCategoryPage} />
        <Route path="/roller/:slug" component={RollerSubPage} />
        <Route path="/roller" component={Roller} />
        <Route path="/aluminios/ventanales" component={VentanalesPage} />
        <Route path="/aluminios/cierres-terraza" component={CierresPage} />
        <Route path="/aluminios/divisiones" component={AluminiosCategoryPage} />
        <Route path="/aluminios/premium" component={AluminiosCategoryPage} />
        <Route path="/aluminios/:slug" component={AluminiosSubPage} />
        <Route path="/aluminios" component={Aluminios} />
        <Route path="/domotica/:slug" component={DomoticaSubPage} />
        <Route path="/domotica" component={Domotica} />
        <Route path="/cotizador">
          <Redirect to="/redes" />
        </Route>
        <Route path="/contacto" component={Contacto} />
        <Route path="/pagos" component={Pagos} />
        <Route path="/asistencia" component={Asistencia} />
        <Route path="/medicion-ia" component={MedicionIAPage} />
      </Switch>
    </AnimatePresence>
  );
}

function PublicLayout() {
  const [location] = useLocation();
  const isHome = location === "/";
  return (
    <div className="relative min-h-screen bg-[#121212] text-white flex flex-col">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[520px] z-0"
        style={{
          background: "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(245,158,11,0.07) 0%, rgba(255,255,255,0.03) 45%, transparent 75%)"
        }}
      />
      <PageTracker />
      <Navbar />
      <div className="pt-20 relative z-10">
        {/* {isHome && <CoverageBanner />} */}
      </div>
      <main className="flex-1 relative z-10">
        <AnimatedRoutes />
      </main>
      <Footer />
      <FloatingContactButtons />
      <ConversionPopup />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/admin">
          <AdminLogin />
        </Route>
        <Route path="/admin/dashboard">
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        </Route>
        <Route>
          <PublicLayout />
        </Route>
      </Switch>
    </Router>
  );
}

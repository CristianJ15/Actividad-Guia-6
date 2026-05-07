import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import PaginaRastreo from "./pages/PaginaRastreo";
import { INITIAL_PACKAGES } from "./data/mockData";

function Nav({ packages }) {
  const loc = useLocation();
  return (
    <nav style={{
      background: "#166534",
      padding: "0 32px",
      display: "flex",
      alignItems: "center",
      gap: 32,
      height: 60,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 16 }}>
        <span style={{ fontSize: 22 }}>🚛</span>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.15rem", letterSpacing: 1 }}>
          Cargo<span style={{ color: "#86efac" }}>Flow</span>
        </span>
      </div>
      <Link to="/" style={{
        color: loc.pathname === "/" ? "#86efac" : "#d1fae5",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "0.9rem",
        borderBottom: loc.pathname === "/" ? "2px solid #86efac" : "2px solid transparent",
        paddingBottom: 4
      }}>
        Panel Admin
        <span style={{
          background: "#14532d", color: "#86efac",
          borderRadius: 999, padding: "1px 8px",
          fontSize: "0.72rem", marginLeft: 6
        }}>{packages.length}</span>
      </Link>
      <Link to="/rastreo" style={{
        color: loc.pathname === "/rastreo" ? "#86efac" : "#d1fae5",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "0.9rem",
        borderBottom: loc.pathname === "/rastreo" ? "2px solid #86efac" : "2px solid transparent",
        paddingBottom: 4
      }}>
        Rastreo público
      </Link>
    </nav>
  );
}

export default function App() {
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  return (
    <BrowserRouter>
      <Nav packages={packages} />
      <Routes>
        <Route path="/"        element={<AdminDashboard packages={packages} setPackages={setPackages} />} />
        <Route path="/rastreo" element={<PaginaRastreo  packages={packages} />} />
      </Routes>
    </BrowserRouter>
  );
}
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Badge from "../components/Badge";

const iconoPaquete = L.divIcon({
  html: `<div style="font-size:28px;line-height:1">📦</div>`,
  className: "", iconAnchor: [14, 14]
});

const TIMELINE = ["En bodega", "En ruta", "En reparto", "Entregado"];

function EstadoPaquete({ paquete }) {
  const idx = TIMELINE.indexOf(paquete.estado);
  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: 28, marginBottom: 20,
      boxShadow: "0 2px 12px rgba(22,101,52,0.08)", border: "1px solid #bbf7d0"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <p style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: 600, margin: "0 0 4px" }}>N° DE GUÍA</p>
          <p style={{ color: "#166534", fontFamily: "monospace", fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>{paquete.id}</p>
        </div>
        <Badge estado={paquete.estado} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
        {[
          ["Remitente",    paquete.remitente],
          ["Destinatario", paquete.destinatario],
          ["Ruta",         paquete.ciudad],
          ["Peso",         paquete.peso],
          ["Dimensiones",  paquete.dims],
          ["Fecha",        paquete.fecha],
        ].map(([k, v]) => (
          <div key={k} style={{ background: "#f0fdf4", borderRadius: 8, padding: "10px 14px" }}>
            <p style={{ color: "#64748b", fontSize: "0.72rem", fontWeight: 600, margin: "0 0 3px" }}>{k}</p>
            <p style={{ color: "#1e293b", fontSize: "0.9rem", fontWeight: 600, margin: 0 }}>{v}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div>
        <p style={{ color: "#166534", fontWeight: 700, fontSize: "0.85rem", marginBottom: 16 }}>SEGUIMIENTO DEL ENVÍO</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          {TIMELINE.map((etapa, i) => {
            const completado = i <= idx;
            const actual = i === idx;
            return (
              <div key={etapa} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: completado ? "#16a34a" : "#e2e8f0",
                    border: actual ? "3px solid #86efac" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: actual ? "0 0 0 4px #dcfce7" : "none",
                    transition: "all 0.3s"
                  }}>
                    {completado && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
                  </div>
                  <p style={{ color: completado ? "#16a34a" : "#94a3b8", fontSize: "0.68rem", fontWeight: 700, margin: "6px 0 0", whiteSpace: "nowrap" }}>
                    {etapa}
                  </p>
                </div>
                {i < TIMELINE.length - 1 && (
                  <div style={{ flex: 1, height: 3, background: i < idx ? "#16a34a" : "#e2e8f0", marginBottom: 20, borderRadius: 2 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function PaginaRastreo({ packages }) {
  const [guia, setGuia] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const buscar = () => {
    if (!guia.trim()) return;
    setCargando(true); setResultado(null); setError("");
    setTimeout(() => {
      const encontrado = packages.find(p => p.id.toLowerCase() === guia.trim().toLowerCase());
      if (encontrado) setResultado(encontrado);
      else setError(`No encontramos ningún envío con el número "${guia}"`);
      setCargando(false);
    }, 800);
  };

  return (
    <div style={{ background: "#f0fdf4", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #166534 0%, #15803d 100%)",
        padding: "48px 16px 64px",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: 800, margin: "0 0 8px" }}>
          Rastrea tu envío
        </h1>
        <p style={{ color: "#bbf7d0", margin: "0 0 32px", fontSize: "1rem" }}>
          Ingresa tu número de guía para conocer el estado de tu paquete
        </p>
        <div style={{ display: "flex", gap: 12, maxWidth: 560, margin: "0 auto" }}>
          <input
            value={guia}
            onChange={e => setGuia(e.target.value)}
            onKeyDown={e => e.key === "Enter" && buscar()}
            placeholder="Ej: CFW-2024-001"
            style={{
              flex: 1, padding: "14px 18px", borderRadius: 10,
              border: "none", background: "#fff",
              color: "#1e293b", fontSize: "1rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)", outline: "none"
            }}
          />
          <button onClick={buscar} style={{
            padding: "14px 28px", background: "#f59e0b", color: "#fff",
            border: "none", borderRadius: 10, fontWeight: 800,
            cursor: "pointer", fontSize: "0.95rem",
            boxShadow: "0 4px 12px rgba(245,158,11,0.4)"
          }}>
            {cargando ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "-20px auto 0", padding: "0 16px 48px" }}>
        {error && (
          <div style={{
            background: "#fff", border: "1px solid #fecaca", color: "#dc2626",
            padding: 16, borderRadius: 10, marginBottom: 20,
            boxShadow: "0 2px 8px rgba(220,38,38,0.08)"
          }}>
            ⚠️ {error}
          </div>
        )}

        {resultado && (
          <>
            <EstadoPaquete paquete={resultado} />
            <div style={{
              background: "#fff", borderRadius: 14, padding: 24,
              boxShadow: "0 2px 12px rgba(22,101,52,0.08)", border: "1px solid #bbf7d0"
            }}>
              <h3 style={{ color: "#166534", marginBottom: 14, fontSize: "0.9rem", fontWeight: 700 }}>
                📍 ÚLTIMA UBICACIÓN REGISTRADA
              </h3>
              <MapContainer center={[resultado.lat, resultado.lng]} zoom={12}
                style={{ height: 280, borderRadius: 10 }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap" />
                <Marker position={[resultado.lat, resultado.lng]} icon={iconoPaquete}>
                  <Popup>{resultado.id} — {resultado.estado}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import Badge from "./Badge";
import { ESTADOS } from "../data/mockData";

export default function PaquetesTable({ packages, setPackages }) {
  const [busqueda, setBusqueda] = useState("");

  const filtrados = packages.filter(p =>
    [p.id, p.remitente, p.destinatario, p.ciudad].some(v =>
      v.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  const cambiarEstado = (id, nuevoEstado) => {
    setPackages(packages.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
  };

  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: 28,
      marginBottom: 28, boxShadow: "0 2px 12px rgba(22,101,52,0.08)",
      border: "1px solid #bbf7d0"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h2 style={{ color: "#166534", fontSize: "1rem", fontWeight: 700, margin: 0 }}>
          📋 Paquetes registrados
        </h2>
        <input
          placeholder="🔍  Buscar por guía, remitente..."
          value={busqueda} onChange={e => setBusqueda(e.target.value)}
          style={{
            padding: "7px 14px", borderRadius: 8,
            border: "1.5px solid #bbf7d0", background: "#f0fdf4",
            color: "#1e293b", fontSize: "0.85rem", width: 260, outline: "none"
          }}
        />
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
          <thead>
            <tr style={{ background: "#f0fdf4", borderBottom: "2px solid #bbf7d0" }}>
              {["N° Guía", "Remitente", "Destinatario", "Ruta", "Estado", "Fecha", "Acciones"].map(h => (
                <th key={h} style={{ padding: "11px 14px", color: "#166534", textAlign: "left", fontWeight: 700 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p, i) => (
              <tr key={p.id}
                style={{ borderBottom: "1px solid #f0fdf4", background: i % 2 === 0 ? "#fff" : "#f9fefb" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#f9fefb"}
              >
                <td style={{ padding: "11px 14px", color: "#16a34a", fontFamily: "monospace", fontWeight: 700 }}>{p.id}</td>
                <td style={{ padding: "11px 14px", color: "#1e293b" }}>{p.remitente}</td>
                <td style={{ padding: "11px 14px", color: "#1e293b" }}>{p.destinatario}</td>
                <td style={{ padding: "11px 14px", color: "#64748b" }}>{p.ciudad}</td>
                <td style={{ padding: "11px 14px" }}><Badge estado={p.estado} /></td>
                <td style={{ padding: "11px 14px", color: "#94a3b8" }}>{p.fecha}</td>
                <td style={{ padding: "11px 14px" }}>
                  <select value={p.estado} onChange={e => cambiarEstado(p.id, e.target.value)}
                    style={{
                      background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                      color: "#166534", borderRadius: 6, padding: "4px 8px",
                      fontSize: "0.8rem", fontWeight: 600, cursor: "pointer"
                    }}>
                    {ESTADOS.map(e => <option key={e}>{e}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
                  No se encontraron paquetes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
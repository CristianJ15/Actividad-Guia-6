import PaqueteForm from "../components/PaqueteForm";
import PaquetesTable from "../components/PaquetesTable";
import MapaRepartidores from "../components/MapaRepartidores";

export default function AdminDashboard({ packages, setPackages }) {
  const stats = [
    { label: "Total paquetes", valor: packages.length,                                            color: "#166534", bg: "#dcfce7", icon: "📦" },
    { label: "En ruta",        valor: packages.filter(p => p.estado === "En ruta").length,        color: "#1d4ed8", bg: "#dbeafe", icon: "🚛" },
    { label: "Entregados",     valor: packages.filter(p => p.estado === "Entregado").length,      color: "#16a34a", bg: "#bbf7d0", icon: "✅" },
    { label: "Incidentes",     valor: packages.filter(p => p.estado === "Incidente").length,      color: "#dc2626", bg: "#fee2e2", icon: "⚠️" },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: "#166534", fontSize: "1.5rem", fontWeight: 800 }}>Panel de Administración</h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: 4 }}>Gestión y control de envíos — CargoFlow</p>
      </div>

      {/* Tarjetas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: 12, padding: 20,
            boxShadow: "0 2px 8px rgba(22,101,52,0.07)",
            border: `1px solid ${s.bg}`,
            display: "flex", alignItems: "center", gap: 16
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: s.bg, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 22
            }}>
              {s.icon}
            </div>
            <div>
              <p style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: 600, margin: "0 0 4px" }}>{s.label}</p>
              <p style={{ color: s.color, fontSize: "1.8rem", fontWeight: 800, margin: 0, lineHeight: 1 }}>{s.valor}</p>
            </div>
          </div>
        ))}
      </div>

      <PaqueteForm onAgregar={(nuevo) => setPackages([...packages, nuevo])} />
      <PaquetesTable packages={packages} setPackages={setPackages} />
      <MapaRepartidores />
    </div>
  );
}
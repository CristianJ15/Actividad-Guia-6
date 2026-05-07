export default function Badge({ estado }) {
  const estilos = {
    "En bodega":  { background: "#e2e8f0", color: "#475569" },
    "En ruta":    { background: "#dbeafe", color: "#1d4ed8" },
    "En reparto": { background: "#fef9c3", color: "#a16207" },
    "Entregado":  { background: "#dcfce7", color: "#16a34a" },
    "Incidente":  { background: "#fee2e2", color: "#dc2626" },
  };
  const s = estilos[estado] || { background: "#e5e7eb", color: "#374151" };
  return (
    <span style={{
      ...s,
      padding: "3px 12px",
      borderRadius: 999,
      fontSize: "0.73rem",
      fontWeight: 700,
      whiteSpace: "nowrap",
      border: `1px solid ${s.color}30`
    }}>
      {estado}
    </span>
  );
}
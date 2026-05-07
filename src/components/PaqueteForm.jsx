import { useState } from "react";
import { ESTADOS } from "../data/mockData";

const campoVacio = {
  remitente: "", destinatario: "", ciudad: "",
  peso: "", dims: "", estado: "En bodega"
};

export default function PaqueteForm({ onAgregar }) {
  const [form, setForm] = useState(campoVacio);
  const [errores, setErrores] = useState({});
  const [ok, setOk] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const validar = () => {
    const e = {};
    ["remitente", "destinatario", "ciudad", "peso", "dims"].forEach(c => {
      if (!form[c].trim()) e[c] = "Campo requerido";
    });
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validar();
    if (Object.keys(e2).length) { setErrores(e2); return; }
    onAgregar({
      ...form,
      id: `CFW-${Date.now()}`,
      fecha: new Date().toISOString().slice(0, 10),
      lat: 4.711, lng: -74.072
    });
    setForm(campoVacio);
    setOk(true);
    setTimeout(() => setOk(false), 3000);
  };

  const campos = [
    { name: "remitente",    label: "Remitente" },
    { name: "destinatario", label: "Destinatario" },
    { name: "ciudad",       label: "Ruta (origen → destino)" },
    { name: "peso",         label: "Peso (kg)" },
    { name: "dims",         label: "Dimensiones (cm)" },
  ];

  const inputStyle = (name) => ({
    width: "100%", padding: "9px 12px", borderRadius: 8,
    border: `1.5px solid ${errores[name] ? "#dc2626" : "#bbf7d0"}`,
    background: "#fff", color: "#1e293b", fontSize: "0.9rem",
    boxSizing: "border-box", outline: "none",
    transition: "border 0.2s"
  });

  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: 28,
      marginBottom: 28, boxShadow: "0 2px 12px rgba(22,101,52,0.08)",
      border: "1px solid #bbf7d0"
    }}>
      <h2 style={{ color: "#166534", marginBottom: 20, fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
        📦 Registrar nuevo paquete
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {campos.map(({ name, label }) => (
            <div key={name}>
              <label style={{ color: "#4b5563", fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: 5 }}>
                {label}
              </label>
              <input name={name} value={form[name]} onChange={handleChange} style={inputStyle(name)} />
              {errores[name] && <span style={{ color: "#dc2626", fontSize: "0.72rem" }}>{errores[name]}</span>}
            </div>
          ))}
          <div>
            <label style={{ color: "#4b5563", fontSize: "0.78rem", fontWeight: 600, display: "block", marginBottom: 5 }}>
              Estado inicial
            </label>
            <select name="estado" value={form.estado} onChange={handleChange}
              style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #bbf7d0", background: "#fff", color: "#1e293b", fontSize: "0.9rem" }}>
              {ESTADOS.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <button type="submit" style={{
            padding: "10px 28px", background: "#16a34a", color: "#fff",
            border: "none", borderRadius: 8, fontWeight: 700,
            cursor: "pointer", fontSize: "0.9rem",
            boxShadow: "0 2px 8px rgba(22,163,74,0.3)"
          }}>
            + Registrar paquete
          </button>
          {ok && <span style={{ color: "#16a34a", fontWeight: 600, fontSize: "0.9rem" }}>✓ Paquete registrado exitosamente</span>}
        </div>
      </form>
    </div>
  );
}
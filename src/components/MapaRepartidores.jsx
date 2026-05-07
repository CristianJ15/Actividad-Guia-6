import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MOCK_REPARTIDORES } from "../data/mockData";

const iconoRepartidor = L.divIcon({
  html: `<div style="font-size:26px;line-height:1">🚛</div>`,
  className: "", iconAnchor: [13, 13]
});

export default function MapaRepartidores() {
  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: 28,
      marginBottom: 28, boxShadow: "0 2px 12px rgba(22,101,52,0.08)",
      border: "1px solid #bbf7d0"
    }}>
      <h2 style={{ color: "#166534", fontSize: "1rem", fontWeight: 700, marginBottom: 16 }}>
        🗺️ Ubicación de repartidores en tiempo real
      </h2>
      <MapContainer center={[4.711, -74.072]} zoom={6} style={{ height: 400, borderRadius: 10 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />
        {MOCK_REPARTIDORES.map(r => (
          <Marker key={r.id} position={[r.lat, r.lng]} icon={iconoRepartidor}>
            <Popup>
              <div style={{ fontSize: 13 }}>
                <strong style={{ color: "#166534" }}>{r.nombre}</strong><br />
                📦 Paquetes: <strong>{r.paquetes}</strong><br />
                Estado: <span style={{ color: r.estado === "Activo" ? "#16a34a" : "#f59e0b", fontWeight: 700 }}>{r.estado}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
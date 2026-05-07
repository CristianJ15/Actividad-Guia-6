export const INITIAL_PACKAGES = [
  { id: "CFW-2024-001", remitente: "Almacén Norte", destinatario: "Pedro Gómez",
    ciudad: "Bogotá → Medellín", estado: "En ruta", peso: "3.2 kg",
    dims: "35×25×20", fecha: "2024-06-01", lat: 6.244, lng: -75.574 },
  { id: "CFW-2024-002", remitente: "Distribuidora Sur", destinatario: "María Ruiz",
    ciudad: "Bogotá → Cali", estado: "Entregado", peso: "1.1 kg",
    dims: "20×15×10", fecha: "2024-06-01", lat: 3.451, lng: -76.532 },
  { id: "CFW-2024-003", remitente: "ImportaCo", destinatario: "Andrés Díaz",
    ciudad: "Bogotá → Barranquilla", estado: "En bodega", peso: "5.0 kg",
    dims: "50×40×30", fecha: "2024-05-31", lat: 10.964, lng: -74.796 },
];

export const MOCK_REPARTIDORES = [
  { id: "R-01", nombre: "Carlos Ríos",    lat: 4.711,  lng: -74.072, paquetes: 5, estado: "Activo" },
  { id: "R-02", nombre: "Luisa Mora",     lat: 6.244,  lng: -75.574, paquetes: 3, estado: "Activo" },
  { id: "R-03", nombre: "Felipe Castro",  lat: 3.451,  lng: -76.532, paquetes: 7, estado: "Activo" },
  { id: "R-04", nombre: "Diana Vargas",   lat: 10.964, lng: -74.796, paquetes: 2, estado: "Pausa"  },
];

export const ESTADOS = ["En bodega", "En ruta", "En reparto", "Entregado", "Incidente"];
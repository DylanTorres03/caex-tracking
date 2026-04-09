export interface HistorialEntry {
  ubicacion: string;
  estado: string;
  descripcion: string | null;
  fecha_hora: string;
}

export interface TrackingResponse {
  numero_guia: string;
  estado_actual: string;
  ubicacion_actual: string;
  destinatario: string | null;
  historial: HistorialEntry[];
}

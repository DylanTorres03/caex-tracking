import { findGuiaByNumero } from '../repositories/tracking.repository';
import { TrackingResponse } from '../models/tracking.types';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export async function getTrackingByGuia(
  numeroGuia: string
): Promise<TrackingResponse> {
  const guia = await findGuiaByNumero(numeroGuia);

  if (!guia) {
    throw new NotFoundError(`Guía ${numeroGuia} no encontrada`);
  }

  return {
    numero_guia: guia.numeroGuia,
    estado_actual: guia.estadoActual,
    ubicacion_actual: guia.ubicacionActual,
    destinatario: guia.destinatario,
    historial: guia.historial.map((h) => ({
      ubicacion: h.ubicacion,
      estado: h.estado,
      descripcion: h.descripcion,
      fecha_hora: h.fechaHora.toISOString(),
    })),
  };
}

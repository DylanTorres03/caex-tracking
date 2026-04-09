import { z } from 'zod';

export const HistorialEntrySchema = z.object({
  ubicacion: z.string(),
  estado: z.string(),
  descripcion: z.string().nullable(),
  fecha_hora: z.string().datetime({ offset: true }),
});

export const TrackingResponseSchema = z.object({
  numero_guia: z.string(),
  estado_actual: z.string(),
  ubicacion_actual: z.string(),
  destinatario: z.string().nullable(),
  historial: z.array(HistorialEntrySchema),
});

// Los tipos se derivan del schema — una sola fuente de verdad
export type HistorialEntry = z.infer<typeof HistorialEntrySchema>;
export type TrackingResponse = z.infer<typeof TrackingResponseSchema>;

import { Request, Response } from 'express';
import { getTrackingByGuia, NotFoundError } from '../services/tracking.service';

export async function getTracking(
  req: Request,
  res: Response
): Promise<void> {
  const { guia } = req.params;

  try {
    const data = await getTrackingByGuia(guia);
    res.json(data);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res
        .status(404)
        .json({ error: 'Guía no encontrada', codigo: 'GUIA_NOT_FOUND' });
      return;
    }
    console.error('[tracking] Error interno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token de autorización requerido' });
    return;
  }

  const token = authHeader.slice(7);

  try {
    verifyToken(token);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

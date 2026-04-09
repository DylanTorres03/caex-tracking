import { Router, Request, Response, NextFunction } from 'express';
import { param, validationResult } from 'express-validator';
import { authMiddleware } from '../middleware/auth.middleware';
import { getTracking } from '../controllers/tracking.controller';

const router = Router();

const validateGuia = param('guia')
  .trim()
  .notEmpty()
  .withMessage('El número de guía no puede estar vacío')
  .matches(/^[A-Z0-9-]{3,20}$/i)
  .withMessage(
    'Número de guía inválido. Solo letras, números y guiones (3–20 caracteres)'
  );

function handleValidation(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array()[0].msg });
    return;
  }
  next();
}

router.get(
  '/:guia',
  authMiddleware,
  validateGuia,
  handleValidation,
  getTracking
);

export default router;

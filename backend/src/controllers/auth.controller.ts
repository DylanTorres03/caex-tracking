import { Request, Response } from 'express';
import { generateToken } from '../services/auth.service';

export function login(req: Request, res: Response): void {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    res.status(400).json({ error: 'username y password son requeridos' });
    return;
  }

  const validUser = process.env.AUTH_USER ?? 'admin';
  const validPassword = process.env.AUTH_PASSWORD ?? 'caex2024';

  if (username !== validUser || password !== validPassword) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }

  res.json(generateToken(username));
}

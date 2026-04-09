import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'caex-fallback-secret';

export function generateToken(username: string): {
  token: string;
  expires_in: number;
} {
  const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: '24h' });
  return { token, expires_in: 86400 };
}

export function verifyToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
}

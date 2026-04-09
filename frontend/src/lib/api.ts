import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { TrackingResponseSchema, type TrackingResponse } from '@/types/tracking';

const AUTH_KEY = 'caex_token';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});

// Inyecta el Bearer token en cada request automáticamente
http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await resolveToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);

// Si el token expiró (401), lo borra del storage
http.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem(AUTH_KEY);
    }
    return Promise.reject(error);
  }
);

// ----------------------------------------------------------------

async function resolveToken(): Promise<string> {
  const stored = sessionStorage.getItem(AUTH_KEY);
  if (stored) return stored;

  const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
  const res = await axios.post<{ token: string }>(
    `${baseURL}/api/auth/token`,
    { username: 'admin', password: 'caex2024' }
  );

  sessionStorage.setItem(AUTH_KEY, res.data.token);
  return res.data.token;
}

// ----------------------------------------------------------------

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchTracking(guia: string): Promise<TrackingResponse> {
  try {
    const { data } = await http.get(`/api/tracking/${encodeURIComponent(guia)}`);

    const parsed = TrackingResponseSchema.safeParse(data);
    if (!parsed.success) {
      console.error('[api] Respuesta inesperada:', parsed.error.flatten());
      throw new ApiError('El servidor devolvió una respuesta inesperada.', 500);
    }

    return parsed.data;
  } catch (err) {
    if (err instanceof ApiError) throw err;

    if (axios.isAxiosError(err)) {
      const status = err.response?.status ?? 0;
      const serverMsg = (err.response?.data as { error?: string })?.error;

      if (status === 404) {
        throw new ApiError(
          `La guía "${guia}" no fue encontrada. Verifica el número e intenta de nuevo.`,
          404
        );
      }
      if (status === 400) throw new ApiError(serverMsg ?? 'Número de guía inválido.', 400);
      if (status === 401) throw new ApiError('Sesión expirada. Recarga la página.', 401);

      throw new ApiError(
        serverMsg ?? 'Error al consultar el tracking. Intenta más tarde.',
        status
      );
    }

    throw new ApiError('Error de conexión. Verifica tu red.', 0);
  }
}

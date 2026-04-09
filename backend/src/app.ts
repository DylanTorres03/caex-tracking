import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth.routes';
import trackingRoutes from './routes/tracking.routes';
import { swaggerSpec } from './swagger';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3000'],
}));
app.use(express.json({ limit: '10kb' }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/tracking', trackingRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'caex-tracking-api' }));

app.use((_, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

export default app;

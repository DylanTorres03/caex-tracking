import { Router } from 'express';
import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/token', login);

export default router;

import { Router } from 'express';
import { postLogin, postRefreshToken } from '../controllers';

const router = Router()

router.post('/login', postLogin);

router.post('/refresh_token', postRefreshToken);

export default router
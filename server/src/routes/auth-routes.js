import { Router } from 'express';
import {
  postUserRegister,
  postUserLogin,
  postRefresh,
  postUserLogout,
} from '../controllers/auth-controller.js';

const router = Router();

router.post('/register', postUserRegister);
router.post('/login', postUserLogin);
router.post('/logout', postUserLogout);
router.post('/refresh', postRefresh);

export default router;

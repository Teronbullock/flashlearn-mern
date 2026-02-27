import { Router } from 'express';
import checkAuth from '../middleware/check-auth.js';

import {
  register,
  login,
  logout,
  refreshToken,
  getProfile,
  updateEmail,
  updatePassword,
  deleteAccount,
} from '../controllers/auth.controller.js';


const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', checkAuth, logout);
router.post('/refresh', refreshToken);
router.get('/get-profile', checkAuth, getProfile);
router.put('/update-email', checkAuth, updateEmail);
router.put('/update-password', checkAuth, updatePassword);
router.put('/delete-account', checkAuth, deleteAccount);
export default router;

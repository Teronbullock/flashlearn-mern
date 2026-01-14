import { Router } from "express";
import { body } from "express-validator";
import asyncHandler from "../middleware/asyncHandler.js";
import { getUserProfile, putUpdateUserEmail, putUpdateUserPassword, putRemoveUser } from "../controllers/profile-controller.js";

const router = Router();

router.get('/', asyncHandler(getUserProfile, 400));

router.put(
  '/update-email',
  [
    body('user_email').isEmail().notEmpty(),
    body('user_pass').notEmpty(),
  ],
  asyncHandler(putUpdateUserEmail, 400)
);

router.put(
  '/update-password',
  [
    body('user_old_pass').notEmpty(),
    body('user_pass').notEmpty(),
    body('user_pass_confirm').notEmpty(),
  ],
  asyncHandler(putUpdateUserPassword, 400)
);

router.put('/delete-account',
  [
    body('user_pass').notEmpty(),
  ],
  asyncHandler(putRemoveUser, 400)
);


export default router;
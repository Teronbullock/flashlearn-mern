import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { getUserProfile, putUpdateUserEmail, putUpdateUserPassword, putRemoveUser } from "../controllers/profile-controller.js";

const router = Router();

router.get('/', asyncHandler(getUserProfile, 400));

router.put(
  '/update-email', asyncHandler(putUpdateUserEmail, 400)
);

router.put(
  '/update-password', asyncHandler(putUpdateUserPassword, 400)
);

router.put('/delete-account', asyncHandler(putRemoveUser, 400)
);


export default router;
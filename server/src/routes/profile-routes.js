import { Router } from "express";
import { getUserProfile, putUpdateUserEmail, putUpdateUserPassword, putRemoveUser } from "../controllers/profile-controller.js";

const router = Router();

router.get('/', getUserProfile);
router.put('/update-email', putUpdateUserEmail);
router.put('/update-password', putUpdateUserPassword);
router.put('/delete-account', putRemoveUser);


export default router;
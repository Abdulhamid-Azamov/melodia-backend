import { Router } from "express";

import controller from '../controllers/admin.controller.js';
import authController from '../controllers/auth.controller.js';
import { validator } from '../middlewares/validation-handle.js';
import adminValidate from '../validation/user.validation.js';
import { authGuard } from "../guards/token.guard.js";
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/index.js";

const router = Router();

router
    .post('/', authGuard, roleGuard(Roles.SUPERADMIN), validator(adminValidate.create), controller.create)
    .post('/signin', validator(adminValidate.signIn), authController.signIn)
    .post('/otp', validator(adminValidate.confirmOTP), authController.confirmOtp)
    .post('/signout', authController.signOut)
    .get('/', authGuard, roleGuard(Roles.SUPERADMIN), controller.getAll)
    .get('/:id', authGuard, roleGuard(Roles.SUPERADMIN, 'ADMIN'), controller.get)
    .patch('/password/:id', authGuard, roleGuard(Roles.SUPERADMIN, 'ADMIN'), validator(adminValidate.updatePassword), controller.updatePassword)
    .patch('/:id', authGuard, roleGuard(Roles.SUPERADMIN, 'ADMIN'), validator(adminValidate.update), controller.update)
    .delete('/:id', authGuard, roleGuard(Roles.SUPERADMIN), controller.remove)

export default router;
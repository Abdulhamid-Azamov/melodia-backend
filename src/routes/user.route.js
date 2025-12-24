import { Router } from "express";

import controller from "../controllers/user.controller.js";
import { validator } from '../middlewares/validation-handle.js'
import authController from '../controllers/auth.controller.js'
import userValidation from '../validation/user.validation.js'
import { authGuard } from '../guards/token.guard.js'
import { roleGuard } from "../guards/role.guard.js";
import { Roles } from "../enums/index.js";

const userRoute = Router();

userRoute
    .post('/signup', validator(userValidation.create), controller.signup)
    .post('/signin', validator(userValidation.signIn), authController.signIn)
    .post('/otp', validator(userValidation.confirmOTP), authController.confirmOtp)
    .post('/signout', authController.signOut)
    .get('/', authGuard, controller.getAll)
    .get('/:id', authGuard, controller.get)
    .patch('/:id', authGuard, roleGuard(Roles.SUPERADMIN,Roles.ADMIN),validator(userValidation.update), controller.update)
    .delete('/:id', authGuard, roleGuard(Roles.SUPERADMIN,Roles.ADMIN),controller.remove)


export default userRoute;
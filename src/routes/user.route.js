import { Router } from "express";

import controller from "../controllers/user.controller.js";
import { validator } from '../middlewares/validation-handle.js'
import authController from '../controllers/auth.controller.js'
import userValidation from '../validation/user.validation.js'
import { authGuard } from '../guards/token.guard.js'

const userRoute = Router();

userRoute
    .post('/signup', authGuard, validator(userValidation.create), controller.signup)
    .post('/signin', validator(userValidation.signIn), authController.signIn)
    .post('/otp', validator(userValidation.confirmOTP), authController.confirmOtp)
    .post('/signout', authController.signOut)
    .get('/', authGuard, controller.getAll)
    .get('/:id', authGuard, controller.get)
    .patch('/:id', authGuard, validator(userValidation.update), controller.update)
    .delete('/:id', authGuard, controller.remove)


export default userRoute;
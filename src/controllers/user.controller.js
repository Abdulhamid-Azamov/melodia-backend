import { BaseController } from "./base.controller.js";
import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from "../utils/success-response.js";
import User from "../schemas/user.schema.js";
import { Roles } from "../enums/index.js";
import crypto from '../utils/crypto.js'

class UserController extends BaseController {
    getAll = catchAsync(async (_req, res) => {
        const data = await this.model.find({ role: { $nin: ["SUPERADMIN", "ADMIN"] } })
        return successRes(res, data)
    })

    signup = catchAsync(async (req, res) => {
        if (req.body === undefined) {
            throw new ApiError("Username, email and password are required", 400)
        }

        const { username, email, password } = req.body;
        await this._isExist({ username }, "Username")

        if (email) {
            await this._isExist({ email }, "Email address")
        }

        const hashedPassword = await crypto.hash(password)
        delete req.body.password

        const newUser = await User.create({
            ...req.body,
            hashedPassword,
            role: Roles.USER
        })

        return successRes(res,newUser,201)
    })
}

export default new UserController(User)
import { BaseController } from './base.controller.js';
import Admin from '../schemas/user.schema.js';
import { Roles } from '../enums/index.js';
import crypto from '../utils/crypto.js';
import { catchAsync } from '../middlewares/catch-async.js';
import { ApiError } from '../utils/custom-error.js';
import { successRes } from '../utils/success-response.js';

class AdminController extends BaseController {
    create = catchAsync(async (req, res) => {
        if (req.body === undefined) {
            throw new ApiError('Username, email and password are required', 400)
        }

        const { username, email, password } = req.body;
        await this._isExist({ username }, 'Username');

        if (email) {
            await this._isExist({ email }, 'Email address');
        }

        const hashedPassword = await crypto.hash(password);
        delete req.body.password;

        const newAdmin = await Admin.create({
            ...req.body,
            hashedPassword,
            role: Roles.ADMIN,
        });

        return successRes(res, newAdmin, 201);
    });

    update = catchAsync(async (req, res) => {
        const id = req.params.id;
        const admin = await this._getById(id);

        const { username, email, password } = req.body;

        if (username) {
            const existsUsername = await Admin.findOne({ username });
            if (existsUsername && existsUsername._id.toString() !== id) {
                throw new ApiError('Username already exists', 409);
            }
        }

        if (email) {
            const existsEmail = await Admin.findOne({ email });
            if (existsEmail && existsEmail._id.toString() !== id) {
                throw new ApiError('Email address already exists', 409);
            }
        }

        let hashedPassword = admin.hashedPassword;

        if (password && req.user.role === Roles.SUPERADMIN) {
            hashedPassword = await crypto.hash(password);
            delete req.body.password;
        }

          const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            {
                ...req.body,
                hashedPassword
            },
            { new: true })
        return successRes(res, updatedAdmin);
    })

    updatePassword = catchAsync(async (req, res) => {
        const id = req.params?.id;
        const admin = await this._getById(id);
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword && req.user.role === Roles.ADMIN) {
            throw new ApiError('Old password is required', 400);
        }

        if (oldPassword) {
            const isMatchPass = await crypto.compare(oldPassword, admin.hashedPassword);
            if (!isMatchPass) {
                throw new ApiError('Old password does not match', 400);
            }
            if (oldPassword === newPassword) {
                throw new ApiError('New and old passwords are similar', 400);
            }
        }
        
        const hashedPassword = await crypto.hash(newPassword);
        const updatedAdmin = await Admin.findByIdAndUpdate(id, { hashedPassword }, { new: true });
        return successRes(res, updatedAdmin);
    })

    remove = catchAsync(async (req, res) => {
        const id = req.params.id;
        const admin = await this._getById(id);

        if (admin && admin.role === Roles.SUPERADMIN) {
            throw new ApiError("Super admin can't be deleted", 400);
        }

        await Admin.findByIdAndDelete(id);
        return successRes(res, {});
    });
}

export default new AdminController(Admin);
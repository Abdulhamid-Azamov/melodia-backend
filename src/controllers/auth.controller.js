import { catchAsync } from '../middlewares/catch-async.js';
import { ApiError } from '../utils/custom-error.js';
import { successRes } from '../utils/success-response.js';
import User from '../schemas/user.schema.js';
import crypto from '../utils/crypto.js';
import token from '../utils/token.js';
import { sendMail } from '../utils/mail-service.js'
import { generateOTP } from '../utils/otp-generator.js';
import { getCache ,setCache } from '../helpers/cache-control.js'

class AuthController {
    signIn = catchAsync(async (req, res) => {
        if (req.body === undefined) {
            throw new ApiError('Email and password are required')
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatchPass = await crypto.compare(password, user?.hashedPassword || '');

        if (!user || !isMatchPass) {
            throw new ApiError('Email adress or password invalid', 400);
        }

        const otp = generateOTP();
        setCache(email, otp);
        await sendMail(email, otp);
        return successRes(res, {
            otp
        });
    })

    confirmOtp = catchAsync(async (req, res) => {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError('Email is wrong', 404);
        }

        const cacheData = getCache(email);
        if (!cacheData || cacheData != otp) {
            throw new ApiError('OTP expired or incorrect', 400);
        }

        const payload = { id: user._id, role: user.role, isActive: user.isActive };
        const accessToken = token.getAccess(payload);
        const refreshToken = token.getRefresh(payload, res);
        return successRes(res, {
            user,
            accessToken,
            refreshToken
        });
    })

    signOut = catchAsync(async (req, res) => {
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
            res.clearCookie('refreshToken');
        }
        return successRes(res, {});
    })
}

export default new AuthController();
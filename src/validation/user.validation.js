import Joi from 'joi';

class UserValidator {
    static passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    create(data) {
        const user = Joi.object({
            username: Joi.string().min(3).max(16).required(),
            email: Joi.string().email().required(),
            password: Joi.string().regex(UserValidator.passwordRegex).required(),
            image: Joi.string().optional()
        });
        return user.validate(data);
    }

    update(data) {
        const user = Joi.object({
            username: Joi.string().min(3).max(16).optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().regex(UserValidator.passwordRegex).optional(),
            image: Joi.string().optional()
        });
        return user.validate(data);
    }

    signIn(data) {
        const user = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        return user.validate(data)
    };

    confirmOTP(data) {
        const user = Joi.object({
            email: Joi.string().required(),
            otp: Joi.string().required(),
        });
        return user.validate(data);
    };

    updatePassword(data){
        const user = Joi.object({
            oldPassword: Joi.string().optional(),
            newPassword: Joi.string().regex(UserValidator.passwordRegex).required()
        });
        return user.validate(data);
    };
}

export default new UserValidator();

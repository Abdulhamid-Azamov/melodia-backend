import { ApiError } from "../utils/custom-error.js";

export const validator = schema => (req, _res, next) => {
  const { error } = schema(req.body)
  if (error) {
    const message = error.details.map(err => {
      if (err.path[0] === 'password') {
        return 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character';
      }

      if (err.path[0] === 'username') {
        return 'Username must be at least 3 characters long and not longer than 16';
      }

      return `${err.path.join('.')}: ${err.message.replace(/["']/g, '')}`;
    })
      .join('; ') || 'Validation error';

    return next(new ApiError(message, 422));
  }
  next();
};
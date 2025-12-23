import { Schema, model } from "mongoose";
import { Roles } from '../enums/index.js'

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: [Roles.SUPERADMIN, Roles.ADMIN, Roles.USER] }
}, {
    versionKey: false,
    timestamps: true
});

export default model('User', userSchema);
import User from '../schemas/user.schema.js';
import { Roles } from '../enums/index.js';
import { envConfig } from '../configs/index.js';
import crypto from '../utils/crypto.js';

export async function createSuperAdmin() {
    try {
        const existsSuperAdmin = await User.findOne({ role: Roles.SUPERADMIN });
        if (!existsSuperAdmin) {
            const superAdmin = await User.create({
                username: envConfig.SUPERADMIN.USERNAME,
                role: Roles.SUPERADMIN,
                email: envConfig.SUPERADMIN.EMAIL,
                hashedPassword: await crypto.hash(envConfig.SUPERADMIN.PASSWORD)
            });
            console.log('Super admin created successfully');
        }
    } catch (error) {
        console.error('Error on creating superadmin', error);
    }
};

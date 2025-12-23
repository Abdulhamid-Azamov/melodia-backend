import { createTransport } from 'nodemailer';
import { envConfig } from '../configs/index.js';

export const sendMail = async (user, message) => {
    const transporter = createTransport({
        service: 'gmail',
        host: envConfig.MAIL.HOST,
        port: envConfig.MAIL.PORT,
        secure:true,
        auth: {
            user: envConfig.MAIL.USER,
            pass: envConfig.MAIL.PASS
        }
    });
    const mailOptions = {
        from: envConfig.MAIL.USER,
        to: user,
        subject: 'TEST',
        text: message
    };
    const res = await transporter.sendMail(mailOptions);
    return res;
}
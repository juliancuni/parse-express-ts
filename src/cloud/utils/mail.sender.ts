import { createTransport } from 'nodemailer';
import mailAdapterConfig from '../../config/mail.config';

const { options } = mailAdapterConfig;
const { host, port, user, password } = options;

const transporter = createTransport({
    host,
    port: Number(port),
    secure: false,
    auth: {
        user: user,
        pass: password,
    }
});

export const messageMaker = (to: string, subject: string, html: string) => {
    if (to && subject && html) {
        const message = {
            from: "info@microservices.al",
            to,
            subject,
            html,
        };
        return message;
    }
    return null;
}

const sendMail = async (message: object) => {
    const sendMail = await transporter.sendMail(message);
    return sendMail;
}

export default sendMail;
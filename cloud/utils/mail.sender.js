/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.microservices.al",
    port: 587,
    secure: false,
    auth: {
        user: "info@microservices.al",
        pass: "enlsOos21@",
    }
});

const messageMaker = (to, subject, html) => {
    const message = {
        from: "info@microservices.al",
        to,
        subject,
        html,
    };
    return message;
}

const sendMail = async (from, to, subject, html) => {
    const message = messageMaker(from, to, subject, html);
    const sendMail = await transporter.sendMail(message);
    return sendMail;
}

exports.sendMail = sendMail;

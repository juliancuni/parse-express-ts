
const mailAdapterConfig = {
    module: 'parse-smtp-template',
    options: {
        host: process.env.MAIL_HOST || "mail.microservices.al",
        port: process.env.MAIL_PORT || 587,
        user: process.env.MAIL_USER || "info@microservices.al",
        password: process.env.MAIL_PASS || "enlsOos21@",
        fromAddress: process.env.MAIL_FROM_ADDRESS || "info@microservices.al",
        template: true,
        templatePath: "./mail/templates/mail.html",
        passwordOptions: {
            subject: "Password recovery",
            body: "Custome pasword recovery email body",
            btn: "Recover your password"
            /* --EXTRA PARAMETERS--
            others: {
              extraParameter
            }
            */
        },
        confirmOptions: {
            subject: "E-mail confirmation",
            body: "Custome email confirmation body",
            btn: "confirm your email"
        },
    }
}

export default mailAdapterConfig;
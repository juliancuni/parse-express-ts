
const mailAdapterConfig = {
    module: 'parse-smtp-template',
    options: {
        host: process.env.MAIL_HOST || "smtp.mail.com",
        port: process.env.MAIL_PORT || 587,
        user: process.env.MAIL_USER || "name@domain.com",
        password: process.env.MAIL_PASS || "SecurePassword",
        fromAddress: process.env.MAIL_FROM_ADDRESS || 'app@domain.com',
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
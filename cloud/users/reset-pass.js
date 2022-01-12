/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sendMail = require('../utils/mail.sender');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nanoid = require('nanoid');
// eslint-disable-next-line no-undef
Parse.Cloud.define("requestPassRecovery", async (req) => {
    const email = req.params.email;
    // eslint-disable-next-line no-undef
    const User = new Parse.User();
    const userQuery = new Parse.Query(User);
    userQuery.equalTo("email", email);
    const user = await userQuery.first({ useMasterKey: true });
    console.log(user);
    if (user) {
        const genToken = nanoid.customAlphabet('1234567890AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz', 64);
        console.log(genToken());
        await sendEmailWithToken(email);
        return true;
    }
    throw new Parse.Error(1001, 'Ky email nuk egziston');
});

const sendEmailWithToken = async (email) => {
    const sendEmail = await sendMail.sendMail(email, "Rekuperim Fjalëkalimi", "<h1>Test<h1>")
    return sendEmail;
}
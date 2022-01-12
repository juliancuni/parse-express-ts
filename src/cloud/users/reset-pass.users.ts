// import * as Parse from 'parse/node'
import sendMail, { messageMaker } from "../utils/mail.sender";
import { customAlphabet } from 'nanoid';
import config from '../../config/parse.config';

import fs from 'fs';

Parse.Cloud.define("requestPassRecovery", async (request) => {
    const email = request.params.email;
    const userQuery = new Parse.Query("User");
    userQuery.equalTo("email", email);
    const user = await userQuery.first({ useMasterKey: true });
    if (user) {
        await sendEmailWithToken(user);
        return true;
    }
    throw new Parse.Error(1001, 'Ky email nuk egziston');
});

const sendEmailWithToken = async (user: Parse.Object<Parse.Attributes>) => {
    const genToken = customAlphabet('1234567890AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz', 64);
    const generatedToken = genToken();
    const Token = Parse.Object.extend("Token");
    const newToken = new Token();
    newToken.set("token", generatedToken);
    newToken.set("expires", new Date().setHours(new Date().getHours() + 2));
    newToken.set("user", user);
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    newToken.setACL(acl);
    const savedToken = await newToken.save(null, { useMasterKey: true });
    const subjekt = "Rekuperim Fjalëkalimi";
    const template = makeHmtl(user, subjekt, "./mail/templates/mail.html", generatedToken);
    const message = messageMaker(user.attributes.email, subjekt, template);
    if (message) {
        const sendEmail = await sendMail(message)
        return sendEmail;
    }
    return null;
}

const makeHmtl = (user: Parse.Object<Parse.Attributes>, subject: string, filePath: string, token: string) => {
    const appName = config.appName;
    const username = user.attributes.username;
    const link = `${config.customPages.choosePassword}?token=${token}&username=${username}&app=${appName}`;
    const template = eval('`' + fs.readFileSync(filePath).toString() + '`');
    return template;
}
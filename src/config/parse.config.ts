import mailAdapterConfig from "./mail.config";


const config = {
    databaseURI: process.env.DATABASE_URI || 'mongodb://root:MaTraPaPuPa@server.home:27017/parse?authSource=admin',
    cloud: process.env.CLOUD_CODE_MAIN || './cloud/main.js',
    appId: process.env.APP_ID || 'myAppId',
    appName: process.env.APP_NAME || "MSA",
    masterKey: process.env.MASTER_KEY || 'masterKey',
    serverURL: process.env.SERVER_URL || 'http://0.0.0.0:1337/v1  ',
    publicServerURL: process.env.PUBLIC_SERVER_URL || "",
    allowClientClassCreation: process.env.CLIENT_CLASS_CREATION || false,
    verifyUserEmails: process.env.VERIFY_USERS_EMAILS || true,
    liveQuery: {
        classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
    },
  
    emailAdapter: mailAdapterConfig,
    accountLockout: {
      duration: 3,
      threshold: 5,
      unlockOnPasswordReset: true,
    },
    passwordPolicy: {
      validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-6])(?=.{8,})/,
      doNotAllowUsername: true,
      maxPasswordHistory: 20,
    },
    // liveQuery: {
    //   classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
    // },
    clientKey: process.env.CLIENT_KEY || "",
    dotNetKey: process.env.DOTNET_KEY || "",
    restAPIKey: process.env.RESTAPI_KEY || "",
    javascriptKey: process.env.JS_KEY || "",
  
    customPages: {
      // passwordResetSuccess: process.env.PASS_RESET_SUCCESS_LINK || "http://localhost:3000/auth/resetpassword",
      verifyEmailSuccess: process.env.EMAIL_VERIFIED_LINK || "http://localhost:3000/auth/emailverified",
      // parseFrameURL: process.env.PARSE_FRAME_LINK "http://localhost:3000/auth/parseFrameURL",
      linkSendSuccess: process.env.SEND_LINK_SUCCESS || "http://localhost:3000/auth/linkSendSuccess",
      // linkSendFail: process.env.SEND_LINK_FAIL || "http://localhost:3000/auth/linkSendFail",
      invalidLink: process.env.INVALID_LINK || "http://localhost:3000/auth/invalidlink",
      invalidVerificationLink: process.env.INVALID_VERIFICATION_LINK || "http://localhost:3000/auth/invalidVerificationLink",
      // choosePassword: process.env.PASS_RESET_LINK || "http://localhost:3000/auth/passwordrecovery"
    },
    allowHeaders: ['X-Parse-Installation-Id', 'X-Parse-Client-Key']
  };

export default config;
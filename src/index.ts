import express, { Errback, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router } from './routes';

const ParseServer = require('parse-server').ParseServer;

const config = {
    databaseURI: process.env.DATABASE_URI || 'mongodb://root:MaTraPaPuPa@server.home:27017/parse?authSource=admin',
    cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
    appId: process.env.APP_ID || 'myAppId',
    masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
    serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
    liveQuery: {
        classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
    },
};

const app = express();
app.use(helmet());
app.use(cors());

app.use(router);

app.get("/", (req: Request, res: Response) => {
    res.send("MAIN BACKEND SERVER --- MSA");
});

const mountPath = process.env.PARSE_MOUNT || '/parse';
const api = new ParseServer(config);
app.use(mountPath, api);

const PORT = process.env.SERVER_PORT || 1337;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
}).on('error', (err) => {
    console.log(err)
})

ParseServer.createLiveQueryServer(app);


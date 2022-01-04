import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router } from './routes';
import config from './config/parse.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ParseDashboard = require('parse-dashboard');


const app = express();
app.use(helmet());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
    res.send("MAIN BACKEND SERVER --- MSA");
});

const mountPath = process.env.PARSE_MOUNT || '/v1';
const parseServer = new ParseServer(config);

const options = { allowInsecureHTTP: true };

const dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": process.env.SERVER_URL || "http://localhost:1337/parse",
            "graphQLServerURL": process.env.GQL_SERVER_URL || "http://localhost:1337/graphql",
            "appId": process.env.APP_ID || "myAppId",
            "masterKey": process.env.MASTER_KEY || "myMasterKey",
            "appName": process.env.APP_NAME || "MyApp"
        }
    ]
}, options);

app.use('/dashboard', dashboard);


const parseGraphQLServer = new ParseGraphQLServer(
    parseServer,
    {
        graphQLPath: process.env.GRAPHQL_MOUNT || '/graphql',
        playgroundPath: process.env.PLAYGROUND_MOUNT || '/playground'

    }
);

app.use(mountPath, parseServer.app);

parseGraphQLServer.applyGraphQL(app); // Mounts the GraphQL API
parseGraphQLServer.applyPlayground(app);

const PORT = process.env.SERVER_PORT || 1337;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
}).on('error', (err) => {
    console.log(err)
})

ParseServer.createLiveQueryServer(app);


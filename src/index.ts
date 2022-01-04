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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-origin-Opener-Policy', 'same-origin');
    res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' http://server.home");

    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
});

app.use("/api", router);

// app.get("/", (req: Request, res: Response) => {
//     res.send("MAIN BACKEND SERVER --- MSA");
// });

const mountPath = process.env.PARSE_MOUNT || '/v1';
const parseServer = new ParseServer(config);

const options = { allowInsecureHTTP: true };

const dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": process.env.SERVER_URL || "http://server.home:1337/v1",
            "graphQLServerURL": process.env.GQL_SERVER_URL || "http://server.home:1337/v1/gql",
            "appId": process.env.APP_ID || "nsG24owgbc",
            "masterKey": process.env.MASTER_KEY || "o4py9YQzop",
            "appName": process.env.APP_NAME || "MSA"
        }
    ],
    users: [
        {
            "user": "admin",
            "pass": "pass",
            // "apps": [{ "appId": "nsG24owgbc" }]
        }
    ],
    "trustProxy": 1
}, options);

app.use('/', dashboard);


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


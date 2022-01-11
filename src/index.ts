import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router } from './routes';
import config from './config/parse.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');

const app = express();

app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", process.env.FRONT_END || "https://frontend-dev.apps.microservices.al");
    // res.setHeader('x-powered-by', 'Microservices Albania');
    next();
});

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
    res.send("MAIN BACKEND SERVER --- MSA");
});

const mountPath = process.env.PARSE_MOUNT || '/v1';
const parseServer = new ParseServer(config);

const parseGraphQLServer = new ParseGraphQLServer(
    parseServer,
    {
        graphQLPath: process.env.GRAPHQL_MOUNT || '/graphql',
    }
);

app.use(mountPath, parseServer.app);

parseGraphQLServer.applyGraphQL(app);

const PORT = process.env.SERVER_PORT || 1337;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
}).on('error', (err) => {
    console.log(err)
})

ParseServer.createLiveQueryServer(app);


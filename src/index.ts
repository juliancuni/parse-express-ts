import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router } from './routes';
import config from './config/parse.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');

const app = express();
app.use(helmet());
app.use(cors());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
    res.send("MAIN BACKEND SERVER --- MSA");
});

const mountPath = process.env.PARSE_MOUNT || '/v1';
const parseServer = new ParseServer(config);

const parseGraphQLServer = new ParseGraphQLServer(
    parseServer,
    {
        graphQLPath: '/graphql',
        // playgroundPath: '/playground'

    }
);

app.use(mountPath, parseServer.app);

parseGraphQLServer.applyGraphQL(app); // Mounts the GraphQL API
// parseGraphQLServer.applyPlayground(app); 

const PORT = process.env.SERVER_PORT || 1337;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
}).on('error', (err) => {
    console.log(err)
})

ParseServer.createLiveQueryServer(app);


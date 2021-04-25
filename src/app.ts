import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morganMiddleware from './middleware/morganMiddleware';
import config from './config';
import routes from './routes';
import Logger from './lib/logger';
import { InitializeDB } from './database';
import apiErrorHandler from './error';

const app = express();

/** Initialize Database */
InitializeDB();

/** Middleware */

app.use(morganMiddleware);
app.use(cors({ origin: true }));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(routes);
app.use(apiErrorHandler);
/**
 * Server Activation
 */
app.listen(config.PORT, () => {
    Logger.debug(`App running at ${config.PORT}`);
});

import express from 'express';
import cors from 'cors';
import morganMiddleware from './config/morganMiddleware';
import config from './config';
import routes from './routes';
import Logger from './lib/logger';
import { InitializeDB } from './database';

const app = express();

/** Initialize Database */
InitializeDB();

/** Middleware */
app.use(morganMiddleware);
app.use(cors({ origin: true }));
app.use(express.json());
app.use(routes);

/**
 * Server Activation
 */
app.listen(config.PORT, () => {
    Logger.debug(`App running at ${config.PORT}`);
});

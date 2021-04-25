import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import routes from './routes';
import { InitializeDB } from './database';

const app = express();

/** Initialize Database */
InitializeDB();

/** Middlewares */
app.use(morgan('dev'));
app.use(cors({ origin: true }));
app.use(express.json());
app.use(routes);

/**
 * Server Activation
 */
app.listen(config.PORT, () => {
    console.log(`App running at ${config.PORT}`);
});

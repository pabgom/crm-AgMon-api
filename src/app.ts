import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morganMiddleware from './middleware/morganMiddleware';
import config from './config';
import routes from './routes';
import Logger from './lib/logger';
import { InitializeDB } from './database';
import apiErrorHandler from './error';

const app = express();

/** Initialize Database */
InitializeDB()
    .then(() => {
        /** Middleware */
        app.use(morganMiddleware);
        app.use(helmet());

        var dir = path.join(__dirname, 'public/customer');
        app.use('/public/customer', express.static(dir));

        app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );

        app.use(bodyParser.json());

        // Load Swagger documentation
        // app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

        app.use(routes);
        app.use(apiErrorHandler);

        /**
         * Server Activation
         */
        app.listen(config.PORT, () => {
            Logger.debug(`App running at ${config.PORT}`);
        });
    })
    .catch(err => {
        Logger.error(err);
    });

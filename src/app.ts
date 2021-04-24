import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';

import { createConnection } from 'typeorm';

import routes from './routes';

import { Users, Customer } from './entity';

const app = express();

/** Create Connection to DataBase */
createConnection({
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    entities: [Users, Customer],
    synchronize: true,
    logging: false
});

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

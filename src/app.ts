import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import { createConnection } from 'typeorm';

import routes from './routes';

import { Users, Customer } from './entity';

const app = express();

console.log(config.DB_PASSWORD);
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
 * App Variables
 */

/**
 * Server Activation
 */
console.log(process.env.NODE_ENV);
app.listen(process.env.PORT, () => {
    console.log(`App running at ${process.env.PORT}`);
});

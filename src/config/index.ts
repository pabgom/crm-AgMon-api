import { config } from 'dotenv';
import { Roles } from './roles';

config();

const configurations = {
    PORT: process.env.PORT || 3000,
    INITIAL_USER_NAME: process.env.INITIAL_USER_NAME || 'admin@admin.com',
    INITIAL_USER_PASSWORD: process.env.INITIAL_USER_PASSWORD || 'dummy',
    JWT_SECRETKEY: process.env.JWT_SECRETKEY || '',
    DB_SYNCRONIZE: process.env.DB_SYNCRONIZE || 'false',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: +process.env.DB_PORT || 5433,
    DB_DATABASE: process.env.DB_DATABASE || 'agileMonkeyDb'
};

export default configurations;

export { Roles };

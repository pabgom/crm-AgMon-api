import { config } from 'dotenv';
import { Roles } from './roles';

config();

const configurations = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'http://localhost',
    INITIAL_USER_NAME: process.env.INITIAL_USER_NAME || 'admin',
    INITIAL_USER_EMAIL: process.env.INITIAL_USER_EMAIL || 'admin@admin.com',
    INITIAL_USER_PASSWORD: process.env.INITIAL_USER_PASSWORD || 'dummy',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'default',
    DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE || 'false',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: +process.env.DB_PORT || 5433,
    DB_DATABASE: process.env.DB_DATABASE || 'agileMonkeyDb'
};

export default configurations;

export { Roles };

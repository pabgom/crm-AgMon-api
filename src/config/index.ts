import { config } from 'dotenv';

config();

const configurations = {
    PORT: process.env.PORT || 3000,
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: +process.env.DB_PORT || 5433,
    DB_DATABASE: process.env.DB_DATABASE || 'agileMonkeyDb'
};

export default configurations;

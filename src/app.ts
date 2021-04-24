import express from 'express';
require('dotenv').config();

const app = express();

/** Status Endpoint */
app.get('/', (req, res) => {
    res.status(200).json({ info: 'NodeJs' });
});

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

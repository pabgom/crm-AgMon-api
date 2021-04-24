import express from 'express';

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
app.listen(3000, () => {
    console.log('App running at 3000');
});

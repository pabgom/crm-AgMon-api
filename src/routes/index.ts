import { Router } from 'express';
import userRouter from './../controllers/user.controller';
import customerRouter from './../controllers/customer.controller';

const routes = Router();

/** Assign  */
routes.use('/customers/', customerRouter);
routes.use('/users/', userRouter);

export default routes;

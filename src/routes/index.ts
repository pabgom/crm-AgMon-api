import { Router } from 'express';
import userRouter from './../controllers/user.controller';
import customerRouter from './../controllers/customer.controller';
import HealthController from '../controllers/health.controller';

const routes = Router();

/** Assign controllers to route */
routes.use('/', HealthController);

routes.use('/customers/', customerRouter);
routes.use('/users/', userRouter);

export default routes;

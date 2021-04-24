import { Router } from 'express';
import { getCustomer } from '../services/customers';

/** Route Definition */
const userRouter: Router = Router();

/** Controller Definition */
// GET user
userRouter.get('/', getCustomer);

// GET user/:id
userRouter.get('/:id', getCustomer);

// POST user
userRouter.post('/', getCustomer);

// PUT user/:id
userRouter.put('/:id', getCustomer);

// DELETE user/:id
userRouter.delete('/:id', getCustomer);

export default userRouter;

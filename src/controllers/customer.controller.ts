import { Router } from 'express';
import { getCustomer } from '../services/customers';

/** Route Definition */
const customerRouter: Router = Router();

/** Controller Definition */
// GET customer
customerRouter.get('/', getCustomer);

// GET customer/:id
customerRouter.get('/:id', getCustomer);

// POST customer
customerRouter.post('/', getCustomer);

// PUT customer/:id
customerRouter.put('/:id', getCustomer);

// DELETE customer/:id
customerRouter.delete('/:id', getCustomer);

export default customerRouter;

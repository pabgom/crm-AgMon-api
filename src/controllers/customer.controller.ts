import { Router } from 'express';

import { CustomerService } from './../services';

/** Route Definition */
const customerRouter: Router = Router();

/** Controller Definition */
// GET customer
customerRouter.get('/', CustomerService.getCustomers);

// GET customer/:id
customerRouter.get('/:id', CustomerService.getCustomer);

// POST customer
customerRouter.post('/', CustomerService.createCustomer);

// PUT customer/:id
customerRouter.put('/:id', CustomerService.updateCustomer);

// DELETE customer/:id
customerRouter.delete('/:id', CustomerService.deleteCustomer);

export default customerRouter;

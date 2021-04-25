import { Router } from 'express';

import { CustomerService } from './../services';
import validateDto from './../middleware/validate-dto';
import { CustomerSchemas } from './../schema';
import { hasCredentials, isAuthenticated } from '../lib/auth';
import { Roles } from '../config';

/** Route Definition */
const customerRouter: Router = Router();

/** Controller Definition */
// GET customer
customerRouter.get('/', isAuthenticated(), hasCredentials([Roles.Basic, Roles.Admin]), CustomerService.getCustomers);

// GET customer/:id
customerRouter.get('/:id', isAuthenticated(), hasCredentials([Roles.Basic, Roles.Admin]), CustomerService.getCustomer);

// POST customer
customerRouter.post(
    '/',
    isAuthenticated(),
    hasCredentials([Roles.Basic, Roles.Admin]),
    validateDto(CustomerSchemas.createCustomerSchema),
    CustomerService.createCustomer
);

// PUT customer/:id
customerRouter.put('/:id', isAuthenticated(), hasCredentials([Roles.Basic, Roles.Admin]), CustomerService.updateCustomer);

// DELETE customer/:id
customerRouter.delete('/:id', isAuthenticated(), hasCredentials([Roles.Basic, Roles.Admin]), CustomerService.deleteCustomer);

export default customerRouter;

import { Router } from 'express';
import { CustomerEntity } from './../entity/customer.entity';
import { IPayload } from './../models/payload.interface';

import CustomerService from './../services/customers';
import { CustomerDto } from './../models/dto';
import validateDto from './../middleware/validate-dto';
import { CustomerSchemas } from './../schema';
import { hasCredentials, isAuthenticated } from '../lib/auth';
import config, { Roles } from '../config';

import uploadImage, { ImageService } from '../lib/upload-image';
import Logger from '../lib/logger';

/** Route Definition */
const customerRouter: Router = Router();

/** Controller Definition */
// GET customer
customerRouter.get('/', isAuthenticated(), hasCredentials([Roles.Basic, Roles.Admin]), (req, res, next) => {
    CustomerService.find()
        .then(result => {
            result.map(r => {
                if (r.photoUrl) {
                    r.photoUrl = `${config.HOST}/public/customer/${r.photoUrl}`;
                } else {
                    r.photoUrl = '';
                }
            });
            return res.status(200).json(result);
        })
        .catch(e => res.status(500).json(e));
});

// GET customer/:id
customerRouter.get('/:id', isAuthenticated(), hasCredentials([Roles.Basic, Roles.Admin]), (req, res, next) => {
    let id = +req.params.id;

    if (isNaN(id)) {
        res.status(400).json({ message: 'Input data is not in the correct format.' });
        next();
        return;
    }

    CustomerService.findOne(id)
        .then(result => {
            if (result.photoUrl) {
                result.photoUrl = `${config.HOST}/public/customer/${result.photoUrl}`;
            } else {
                result.photoUrl = '';
            }
            return res.status(200).json(result);
        })
        .catch(e => res.status(500).json(e));
});

// POST customer
customerRouter.post(
    '/',
    isAuthenticated(),
    hasCredentials([Roles.Basic, Roles.Admin]),
    uploadImage('customerImage'),
    validateDto(CustomerSchemas.createCustomerSchema),
    (req, res, next) => {
        const payload = req.user as IPayload;
        const dto = req.body as CustomerDto.ICreateDto;
        const customer = new CustomerEntity();

        customer.name = dto.name;
        customer.surname = dto.surname;
        if (req.file) {
            customer.photoUrl = req.file.filename;
            // move file to a customer image folder.
            ImageService.moveFile(req.file, '/public/customer');
        }

        CustomerService.create(customer, payload)
            .then(newCustomer => {
                if (newCustomer) {
                    if (newCustomer.photoUrl !== null) {
                        newCustomer.photoUrl = `${config.HOST}/public/customer/${newCustomer.photoUrl}`;
                    }

                    res.status(200).json({
                        message: 'Customer Successfully Created',
                        createdCustomer: newCustomer
                    });
                } else {
                    res.status(404).json({ message: 'Customer not found' });
                }
            })
            .catch(e => {
                Logger.error(e);
                res.status(500).json({ message: 'Internal Error' });
            });
    }
);

// PUT customer/:id
customerRouter.put(
    '/:id',
    isAuthenticated(),
    hasCredentials([Roles.Basic, Roles.Admin]),
    uploadImage('customerImage'),
    (req, res, next) => {
        const payload = req.user as IPayload;
        const dto = req.body as CustomerDto.ICreateDto;

        const customer = new CustomerEntity();
        customer.id = +req.params.id;
        customer.name = dto.name;
        customer.surname = dto.surname;

        if (req.file) {
            customer.photoUrl = req.file.filename;
        }

        CustomerService.update(customer, payload)
            .then(updatedCustomer => {
                if (updatedCustomer) {
                    if (updatedCustomer.photoUrl !== null) {
                        updatedCustomer.photoUrl = `${config.HOST}/${updatedCustomer.photoUrl}`;
                    }

                    res.status(200).json({
                        message: 'Customer Successfully Updated',
                        createdCustomer: updatedCustomer
                    });
                } else {
                    res.status(404).json({ message: 'Customer not found' });
                }
            })
            .catch(e => {
                Logger.error(e);
                res.status(500).json({ message: 'Internal Error' });
            });
    }
);

// DELETE customer/:id
customerRouter.delete(
    '/:id',
    isAuthenticated(),
    hasCredentials([Roles.Basic, Roles.Admin]),

    (req, res, next) => {
        const id = +req.params.id;

        if (isNaN(id) && !Number.isInteger(id)) {
            return res.status(400).json({ message: 'Input is not correct' });
        }

        CustomerService.delete(id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(e => {
                Logger.error(e);
                res.status(500);
            });
    }
);

export default customerRouter;

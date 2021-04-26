import { UserEntity } from './../../entity/user.entity';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { CustomerEntity } from './../../entity';

export const getCustomers = async (req: Request, res: Response): Promise<Response> => {
    const customers = await getRepository(CustomerEntity).find();
    return res.status(200).json(customers);
};

export const getCustomer = async (req: Request, res: Response): Promise<Response> => {
    const customer = await getRepository(CustomerEntity).findOne(req.params.id);
    return res.status(200).json(customer);
};

export const createCustomer = async (req: Request, res: Response): Promise<Response> => {
    const newCustomer = getRepository(CustomerEntity).create(req.body as CustomerEntity);

    const user = await getRepository(UserEntity).findOne(req.body.id);
    newCustomer.createdBy = user;

    const results = await getRepository(CustomerEntity).save(newCustomer);
    return res.status(200).json(results);
};

export const updateCustomer = async (req: Request, res: Response): Promise<Response> => {
    const customer = await getRepository(CustomerEntity).findOne(req.params.id);
    if (customer) {
        getRepository(CustomerEntity).merge(customer, req.body);

        const user = await getRepository(UserEntity).findOne(req.body.id);
        customer.modifiedBy = user;

        const result = await getRepository(CustomerEntity).save(customer);
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Not Customer found' });
};

export const deleteCustomer = async (req: Request, res: Response): Promise<Response> => {
    const customer = await getRepository(CustomerEntity).findOne(req.params.id);
    if (customer) {
        const result = await getRepository(CustomerEntity).delete(customer);
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Not Customer found' });
};

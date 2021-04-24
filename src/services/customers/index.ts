import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Customer } from './../../entity';

export const getCustomers = async (req: Request, res: Response): Promise<Response> => {
    const customers = await getRepository(Customer).find();
    return res.json(customers);
};

export const getCustomer = async (req: Request, res: Response): Promise<Response> => {
    const customer = await getRepository(Customer).findOne(req.params.id);
    return res.json(customer);
};

export const createCustomer = async (req: Request, res: Response): Promise<Response> => {
    const newCustomer = getRepository(Customer).create(req.body);
    const results = await getRepository(Customer).save(newCustomer);
    return res.json(results);
};

export const updateCustomer = async (req: Request, res: Response): Promise<Response> => {
    const customer = await getRepository(Customer).findOne(req.params.id);
    if (customer) {
        getRepository(Customer).merge(customer, req.body);
        const result = await getRepository(Customer).save(customer);
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Not Customer found' });
};

export const deleteCustomer = async (req: Request, res: Response): Promise<Response> => {
    const customer = await getRepository(Customer).findOne(req.params.id);
    if (customer) {
        const result = await getRepository(Customer).delete(customer);
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Not Customer found' });
};

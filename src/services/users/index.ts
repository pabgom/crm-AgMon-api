import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from './../../entity';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    return res.json(user);
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const newUser = getRepository(User).create(req.body);
    const results = await getRepository(User).save(newUser);
    return res.json(results);
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if (user) {
        getRepository(User).merge(user, req.body);
        const result = await getRepository(User).save(user);
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Not User found' });
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if (user) {
        const result = await getRepository(User).delete(user);
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Not User found' });
};

export const getUserByEmail = async (email: string): Promise<User> => {
    return await getRepository(User).findOne({ where: { email: email } });
};

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from './../../entity';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).find();
    return res.json(users);
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(Users).findOne(req.params.id);
    return res.json(user);
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const newUser = getRepository(Users).create(req.body);
    const results = await getRepository(Users).save(newUser);
    return res.json(results);
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(Users).findOne(req.params.id);
    if (user) {
        getRepository(Users).merge(user, req.body);
        const result = await getRepository(Users).save(user);
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Not User found' });
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(Users).findOne(req.params.id);
    if (user) {
        const result = await getRepository(Users).delete(user);
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Not User found' });
};

export const getUserByEmail = async (email: string): Promise<Users> => {
    return await getRepository(Users).findOne({ where: { email: email } });
};

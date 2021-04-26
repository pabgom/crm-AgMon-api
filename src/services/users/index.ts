import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UserSchemas } from './../../schema';
import { RoleEntity, UserEntity } from './../../entity';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(UserEntity).find();
    return res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(UserEntity).findOne(req.params.id);
    return res.status(200).json(user);
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const newUser = getRepository(UserEntity).create(req.body as UserEntity);

    const role = await getRepository(RoleEntity).findOne(req.body.role);

    newUser.roles = [role];

    const results = await getRepository(UserEntity).save(newUser);
    return res.status(200).json(results);
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(UserEntity).findOne(req.params.id);
    if (user) {
        getRepository(UserEntity).merge(user, req.body);
        const result = await getRepository(UserEntity).save(user);
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Not User found' });
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(UserEntity).findOne(req.params.id);
    if (user) {
        const result = await getRepository(UserEntity).delete(user);
        return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Not User found' });
};

export const getUserByUserName = async (username: string): Promise<UserEntity> => {
    return await getRepository(UserEntity).findOne({ where: { name: username }, relations: ['roles'] });
};

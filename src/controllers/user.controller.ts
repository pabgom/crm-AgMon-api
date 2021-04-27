import UserService from './../services/users';
import validateDto from './../middleware/validate-dto';
import { UserSchemas } from './../schema';
import { hasCredentials, isAuthenticated } from '../lib/auth';
import { Roles } from '../config';
import { UserDto } from '../models/dto';
import { IPayload } from '../models/payload.interface';
import { UserEntity } from './../entity/user.entity';
import { Router } from 'express';
import Logger from '../lib/logger';

/** Route Definition */
const userRouter: Router = Router();

/** Controller Definition */
// GET user
userRouter.get('/', isAuthenticated(), hasCredentials([Roles.Admin]), (req, res, next) => {
    UserService.find()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(e => res.status(500).json(e));
});

// GET user/:id
userRouter.get('/:id', isAuthenticated(), hasCredentials([Roles.Admin]), (req, res, next) => {
    let id = +req.params.id;

    if (isNaN(id)) {
        console.log('test');
        res.status(400).json({ message: 'Input data is not in the correct format.' });
        next();
        return;
    }

    UserService.findOne(id)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(e => res.status(500).json(e));
});

// POST user
userRouter.post('/', validateDto(UserSchemas.createUserSchema), isAuthenticated(), hasCredentials([Roles.Admin]), (req, res, next) => {
    const dto = req.body as UserDto.ICreateDto;

    const user = new UserEntity();
    user.name = dto.name;
    user.password = dto.password;

    UserService.create(user, dto.roleId)
        .then(newUser => {
            if (newUser) {
                res.status(200).json({
                    message: 'User Successfully Created',
                    createdUser: newUser
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(e => {
            Logger.error(e);
            res.status(500).json(e);
        });
}); // UserService.createUser);

// PUT user/:id
userRouter.put('/:id', isAuthenticated(), hasCredentials([Roles.Admin]), (req, res, next) => {
    const dto = req.body as UserDto.IUpdateDto;

    const user = new UserEntity();
    user.id = +req.params.id;
    user.name = dto.name;

    UserService.update(user, dto.roleId)
        .then(modifiedUser => {
            if (modifiedUser) {
                res.status(200).json({
                    message: 'User Successfully Updated',
                    modifiedUser: modifiedUser
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(e => {
            Logger.error(e);
            res.status(500).json({ message: 'Internal Error' });
        });
});

// DELETE user/:id
userRouter.delete('/:id', isAuthenticated(), hasCredentials([Roles.Admin]), (req, res, next) => {
    const id = +req.params.id;

    if (isNaN(id) && !Number.isInteger(id)) {
        return res.status(400).json({ message: 'Input is not correct' });
    }

    UserService.delete(id)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(e => {
            console.log(e);
            res.status(500);
        });
});

export default userRouter;

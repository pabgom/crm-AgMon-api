import UserService from './../services/users';
import validateDto from './../middleware/validate-dto';
import { UserSchemas } from './../schema';
import { hasCredentials, isAuthenticated } from '../lib/auth';
import { Roles } from '../config';
import { UserDto } from '../models/dto';
import { UserEntity } from './../entity/user.entity';
import { Router } from 'express';
import Logger from '../lib/logger';
import { UserCreateResponseDto, UserResponseDto } from '../models/dto/users';

/** Route Definition */
const userRouter: Router = Router();

/** Controller Definition */
// GET user
userRouter.get('/', isAuthenticated(), hasCredentials([Roles.Admin]), (req, res, next) => {
    UserService.find()
        .then(result => {
            return res.status(200).json(result.map(r => new UserResponseDto(r)));
        })
        .catch(e => res.status(500).json(e));
});

// GET user/:id
userRouter.get('/:id', isAuthenticated(), hasCredentials([Roles.Admin]), (req, res, next) => {
    let id = +req.params.id;

    if (isNaN(id)) {
        res.status(400).json({ message: 'Input data is not in the correct format.' });
        next();
        return;
    }

    UserService.findOne(id)
        .then(result => {
            return res.status(200).json(new UserResponseDto(result));
        })
        .catch(e => res.status(500).json(e));
});

// POST user
userRouter.post('/', validateDto(UserSchemas.createUserSchema), isAuthenticated(), hasCredentials([Roles.Admin]), (req, res, next) => {
    const dto = req.body as UserDto.ICreateDto;

    const user = new UserEntity();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;

    UserService.create(user, dto.role)
        .then(response => {
            if (response instanceof UserEntity) {
                res.status(200).json({
                    message: 'User Successfully Created',
                    createdUser: new UserCreateResponseDto(response)
                });
            } else {
                res.status(404).json({ message: response });
            }
        })
        .catch(e => {
            Logger.error(e);
            res.status(500).json(e);
        });
});

// PUT user/:id
userRouter.put('/:id', isAuthenticated(), hasCredentials([Roles.Admin]), (req, res, next) => {
    const dto = req.body as UserDto.IUpdateDto;

    const user = new UserEntity();
    user.id = +req.params.id;
    user.name = dto.name;
    user.password = dto.password;
    user.email = dto.email;

    UserService.update(user, dto.roleId)
        .then(response => {
            if (response instanceof UserEntity) {
                res.status(200).json({
                    message: 'User Successfully Updated',
                    modifiedUser: new UserCreateResponseDto(response)
                });
            } else {
                res.status(404).json({ message: response });
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
            res.status(200).json(result);
        })
        .catch(e => {
            Logger.error(e);
            res.status(500);
        });
});

export default userRouter;

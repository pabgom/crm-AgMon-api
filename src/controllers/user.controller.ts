import { Router } from 'express';

import { UserService } from './../services';
import validateDto from './../middleware/validate-dto';
import { UserSchemas } from './../schema';
import { hasCredentials, isAuthenticated } from '../lib/auth';
import { Roles } from '../config';

/** Route Definition */
const userRouter: Router = Router();

/** Controller Definition */
// GET user
userRouter.get('/', isAuthenticated(), hasCredentials([Roles.Admin]), UserService.getUsers);

// GET user/:id
userRouter.get('/:id', isAuthenticated(), hasCredentials([Roles.Admin]), UserService.getUser);

// POST user
userRouter.post('/', validateDto(UserSchemas.createUserSchema), isAuthenticated(), hasCredentials([Roles.Admin]), UserService.createUser);

// PUT user/:id
userRouter.put('/:id', isAuthenticated(), hasCredentials([Roles.Admin]), UserService.updateUser);

// DELETE user/:id
userRouter.delete('/:id', isAuthenticated(), hasCredentials([Roles.Admin]), UserService.deleteUser);

export default userRouter;

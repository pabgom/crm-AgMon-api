import { Router } from 'express';

import { UserService } from './../services';

/** Route Definition */
const userRouter: Router = Router();

/** Controller Definition */
// GET user
userRouter.get('/', UserService.getUsers);

// GET user/:id
userRouter.get('/:id', UserService.getUser);

// POST user
userRouter.post('/', UserService.createUser);

// PUT user/:id
userRouter.put('/:id', UserService.updateUser);

// DELETE user/:id
userRouter.delete('/:id', UserService.deleteUser);

export default userRouter;

import { Router, Request, Response } from 'express';
export const healthRouter = Router();

healthRouter.get('/ping', async (req: Request, res: Response) => {
    res.status(200).send('pong');
});

export default healthRouter;

import { Router, Request, Response } from 'express';

export const router = Router();

router.all("/", (req: Request, res: Response) => {
    res.send("CUSTOM API");
})
import { Router, Request, Response } from 'express';
import mailAdapterConfig from '../config/mail.config';
export const router = Router();

router.all("/", (req: Request, res: Response) => {
    console.log(mailAdapterConfig.options.templatePath);
    res.send("API NE_NDERTIM");
})
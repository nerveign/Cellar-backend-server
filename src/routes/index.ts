import { Router } from "express";

import authRouter from "./user-route";

const mainRouter = Router();

mainRouter.use('/auth', authRouter);

export default mainRouter;
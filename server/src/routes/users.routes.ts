import express, { Request, Response } from "express";
import RegisterUserUseCase from "../usecases/users/register-user.usecase";
import UserRepository from "../repositories/users.repository";
import LoginUserUseCase from "../usecases/users/login-user.usecase";

export const userRouter = express.Router();

userRouter.post('/post/registerUser', async (req: Request, res: Response) => {
    const {
        name,
        email,
        password
    } = req.body;
    const registerUserUseCase = new RegisterUserUseCase(new UserRepository());
    try {
        await registerUserUseCase.execute(name, email, password);
        return res.sendStatus(201);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});

userRouter.post('/post/loginUser', async (req: Request, res: Response) => {
    const {
        email,
        password
    } = req.body;
    const loginUserUseCase = new LoginUserUseCase(new UserRepository());
    try {
        const { jwt } = await loginUserUseCase.execute(email, password);
        return res.cookie('jwt', jwt, { httpOnly: true, maxAge: 1000*60*60*24 }).sendStatus(201);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});
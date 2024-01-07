import express, { Request, Response } from "express";
import CreateGroupUseCase from "../usecases/groups/create-group.usecase";
import GroupRepository from "../repositories/groups.repository";
import UpdateGroupUseCase from "../usecases/groups/update-group.usecase";
import DeleteGroupUseCase from "../usecases/groups/delete-group.usecase";
import FindOneGroupUseCase from "../usecases/groups/find-one-group.usecase";
import FindGroupUseCase from "../usecases/groups/find-groups.usecase";
import TreeRepository from "../repositories/trees.repository";

export const groupRouter = express.Router();

groupRouter.post('/post/createGroup', async (req: Request, res: Response) => {
    const {
        name,
        description,
        trees_id
    } = req.body;
    const createGroupUseCase = new CreateGroupUseCase(new GroupRepository(), new TreeRepository());
    try {
        await createGroupUseCase.execute(name, description, trees_id);
        return res.sendStatus(201);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});

groupRouter.put('/put/updateGroup', async (req: Request, res: Response) => {
    const {
        id,
        name,
        description,
        trees_id
    } = req.body;
    const updateGroupUseCase = new UpdateGroupUseCase(new GroupRepository(), new TreeRepository());
    try {
        await updateGroupUseCase.execute(name, description, trees_id, id);
        return res.sendStatus(201);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});

groupRouter.delete('/delete/deleteGroup', async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    const deleteGroupUseCase = new DeleteGroupUseCase(new GroupRepository());
    try {
        await deleteGroupUseCase.execute(id);
        return res.sendStatus(200);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});

groupRouter.get('/get/getGroupById', async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    const findOneGroupUseCase = new FindOneGroupUseCase(new GroupRepository());
    try {
        const group = await findOneGroupUseCase.execute(id);
        return res.status(200).json(group);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});

groupRouter.get('/get/getGroups', async (req: Request, res: Response) => {
    const findGroupUseCase = new FindGroupUseCase(new GroupRepository);
    try {
        const group = await findGroupUseCase.execute();
        return res.status(200).json(group);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});
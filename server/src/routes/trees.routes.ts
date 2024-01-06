import express, { Request, Response } from "express";
import CreateTreeUseCase from "../usecases/trees/create-tree.usecase";
import TreeRepository from "../repositories/trees.repository";
import UpdateTreeUseCase from "../usecases/trees/update-tree.usecase";
import DeleteTreeUseCase from "../usecases/trees/delete-tree.usecase";
import FindOneTreeUseCase from "../usecases/trees/find-one-tree.usecase";
import FindTreeUseCase from "../usecases/trees/find-trees.usecase";
import SpeciesRepository from "../repositories/species.repository";

export const treeRouter = express.Router();

treeRouter.post('/post/createTree', async (req: Request, res: Response) => {
    const {
        description,
        age,
        species_id
    } = req.body;
    const createTreeUseCase = new CreateTreeUseCase(new TreeRepository(), new SpeciesRepository());
    try {
        await createTreeUseCase.execute(description, parseInt(age), species_id);
        return res.sendStatus(201);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});

treeRouter.put('/put/updateTree', async (req: Request, res: Response) => {
    const {
        id,
        description,
        age,
        species_id
    } = req.body;
    const updateTreeUseCase = new UpdateTreeUseCase(new TreeRepository(), new SpeciesRepository());
    try {
        await updateTreeUseCase.execute(description, parseInt(age), species_id, id);
        return res.sendStatus(201);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});

treeRouter.delete('/delete/deleteTree', async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    const deleteTreeUseCase = new DeleteTreeUseCase(new TreeRepository());
    try {
        await deleteTreeUseCase.execute(id);
        return res.sendStatus(200);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});

treeRouter.get('/get/getTreeById', async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    const findOneTreeUseCase = new FindOneTreeUseCase(new TreeRepository());
    try {
        const tree = await findOneTreeUseCase.execute(id);
        return res.status(200).json(tree);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});

treeRouter.get('/get/getTrees', async (req: Request, res: Response) => {
    const findTreeUseCase = new FindTreeUseCase(new TreeRepository);
    try {
        const tree = await findTreeUseCase.execute();
        return res.status(200).json(tree);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
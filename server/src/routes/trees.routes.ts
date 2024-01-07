import express, { Request, Response } from "express";
import CreateTreeUseCase from "../usecases/trees/create-tree.usecase";
import TreeRepository from "../repositories/trees.repository";
import UpdateTreeUseCase from "../usecases/trees/update-tree.usecase";
import DeleteTreeUseCase from "../usecases/trees/delete-tree.usecase";
import FindOneTreeUseCase from "../usecases/trees/find-one-tree.usecase";
import FindTreeUseCase from "../usecases/trees/find-trees.usecase";
import SpeciesRepository from "../repositories/species.repository";
import Tree from "../entities/tree";

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
        return res.status(200).json({
            id: tree?.id,
            description: tree?.description,
            age: tree?.age,
            species: {
                id: tree?.species.id,
                description: tree?.species.description
            }
        });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});

treeRouter.get('/get/getTrees', async (req: Request, res: Response) => {
    const findTreeUseCase = new FindTreeUseCase(new TreeRepository);
    try {
        const tree = await findTreeUseCase.execute();
        const results: { id: string, description: string, age: number, species: { id: string, description: string } }[] = [];
        tree?.forEach((tr) => {
            const tree = {
                id: tr.id,
                description: tr.description,
                age: tr.age,
                species: {
                    id: tr.species.id,
                    description: tr.species.description
                }
            }
            results.push(tree);
        })
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
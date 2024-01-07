import express, { Request, Response } from "express";
import CreateSpeciesUseCase from "../usecases/species/create-species.usecase";
import SpeciesRepository from "../repositories/species.repository";
import UpdateSpeciesUseCase from "../usecases/species/update-species.usecase";
import DeleteSpeciesUseCase from "../usecases/species/delete-species.usecase";
import FindOneSpeciesUseCase from "../usecases/species/find-one-species.usecase";
import FindSpeciesUseCase from "../usecases/species/find-species.usecase";

export const speciesRouter = express.Router();

speciesRouter.post('/post/createSpecies', async (req: Request, res: Response) => {
    const {
        description
    } = req.body;
    const createSpeciesUseCase = new CreateSpeciesUseCase(new SpeciesRepository());
    try {
        await createSpeciesUseCase.execute(description);
        return res.sendStatus(201);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});

speciesRouter.put('/put/updateSpecies', async (req: Request, res: Response) => {
    const {
        id,
        description
    } = req.body;
    const updateSpeciesUseCase = new UpdateSpeciesUseCase(new SpeciesRepository());
    try {
        await updateSpeciesUseCase.execute(description, id);
        return res.sendStatus(201);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});

speciesRouter.delete('/delete/deleteSpecies', async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    const deleteSpeciesUseCase = new DeleteSpeciesUseCase(new SpeciesRepository());
    try {
        await deleteSpeciesUseCase.execute(id);
        return res.sendStatus(200);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});

speciesRouter.get('/get/getSpeciesById', async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    const findOneSpeciesUseCase = new FindOneSpeciesUseCase(new SpeciesRepository());
    try {
        const species = await findOneSpeciesUseCase.execute(id);
        return res.status(200).json(species);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});

speciesRouter.get('/get/getSpecies', async (req: Request, res: Response) => {
    const findSpeciesUseCase = new FindSpeciesUseCase(new SpeciesRepository);
    try {
        const species = await findSpeciesUseCase.execute();
        return res.status(200).json(species);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send(err.message);
        }
        return res.status(400).send(err);
    }
});
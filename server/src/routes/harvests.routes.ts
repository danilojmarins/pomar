import express, { Request, Response } from "express";
import CreateHarvestUseCase from "../usecases/harvests/create-harvest.usecase";
import HarvestRepository from "../repositories/harvests.repository";
import UpdateHarvestUseCase from "../usecases/harvests/update-harvest.usecase";
import DeleteHarvestUseCase from "../usecases/harvests/delete-harvest.usecase";
import FindOneHarvestUseCase from "../usecases/harvests/find-one-harvest.usecase";
import FindHarvestUseCase from "../usecases/harvests/find-harvests.usecase";
import TreeRepository from "../repositories/trees.repository";

export const harvestRouter = express.Router();

harvestRouter.post('/post/createHarvest', async (req: Request, res: Response) => {
    const {
        information,
        date,
        weight,
        tree_id
    } = req.body;
    const createHarvestUseCase = new CreateHarvestUseCase(new HarvestRepository(), new TreeRepository());
    try {
        await createHarvestUseCase.execute(information, date, parseFloat(weight), tree_id);
        return res.sendStatus(201);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});

harvestRouter.put('/put/updateHarvest', async (req: Request, res: Response) => {
    const {
        id,
        information,
        date,
        weight,
        tree_id
    } = req.body;
    const updateHarvestUseCase = new UpdateHarvestUseCase(new HarvestRepository(), new TreeRepository());
    try {
        await updateHarvestUseCase.execute(information, date, parseFloat(weight), tree_id, id);
        return res.sendStatus(201);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});

harvestRouter.delete('/delete/deleteHarvest', async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    const deleteHarvestUseCase = new DeleteHarvestUseCase(new HarvestRepository());
    try {
        await deleteHarvestUseCase.execute(id);
        return res.sendStatus(200);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});

harvestRouter.get('/get/getHarvestById', async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    const findOneHarvestUseCase = new FindOneHarvestUseCase(new HarvestRepository());
    try {
        const harvest = await findOneHarvestUseCase.execute(id);
        return res.status(200).json(harvest);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});

harvestRouter.get('/get/getHarvests', async (req: Request, res: Response) => {
    const findHarvestUseCase = new FindHarvestUseCase(new HarvestRepository);
    try {
        const harvest = await findHarvestUseCase.execute();
        return res.status(200).json(harvest);
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
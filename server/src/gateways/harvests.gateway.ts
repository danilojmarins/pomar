import Harvest from "../entities/harvest";

export default interface HarvestGateway {
    create(harvest: Harvest): Promise<void>;
    findMany(): Promise<Harvest[] | undefined>;
    update(harvest: Harvest): Promise<void>;
    findById(id: string): Promise<Harvest | undefined>;
    delete(id: string): Promise<void>;
}
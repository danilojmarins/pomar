import Harvest from "../entities/harvest";

export interface filteredHarvests {
    id: string,
    information: string,
    date: string,
    weight: number,
    tree_description: string,
    tree_age: number,
    species_description: string,
    group_name: string
}

export default interface HarvestGateway {
    create(harvest: Harvest): Promise<void>;
    findMany(): Promise<Harvest[] | undefined>;
    update(harvest: Harvest): Promise<void>;
    findById(id: string): Promise<Harvest | undefined>;
    delete(id: string): Promise<void>;
    filter(tree_id?: string, group_id?: string, species_id?: string): Promise<filteredHarvests[] | undefined>;
}
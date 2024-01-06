import Species from "../entities/species";

export default interface SpeciesGateway {
    create(species: Species): Promise<void>;
    findMany(): Promise<Species[] | undefined>;
    update(species: Species): Promise<void>;
    findById(id: string): Promise<Species | undefined>;
    delete(id: string): Promise<void>;
}
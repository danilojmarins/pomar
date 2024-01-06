import Species from "../entities/species";

export default interface SpeciesGateway {
    create(species: Species): Promise<void>;
    findMany(): Promise<Species[]>;
    update(species: Species): Promise<void>;
    findById(id: string): Promise<Species>;
    delete(id: string): Promise<void>;
}
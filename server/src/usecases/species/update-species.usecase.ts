import Species from "../../entities/species";
import SpeciesGateway from "../../gateways/species.gateway";

export default class UpdateSpeciesUseCase {
    private _speciesGateway: SpeciesGateway;

    constructor(speciesGateway: SpeciesGateway) {
        this._speciesGateway = speciesGateway;
    }

    async execute(description: string, id: string): Promise<void> {
        const species = new Species(description, id);
        await this._speciesGateway.update(species);
    }
}
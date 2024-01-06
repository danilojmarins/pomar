import Species from "../../entities/species";
import SpeciesGateway from "../../gateways/species.gateway";

export default class CreateSpeciesUseCase {
    private _speciesGateway: SpeciesGateway;

    constructor(speciesGateway: SpeciesGateway) {
        this._speciesGateway = speciesGateway;
    }

    async execute(description: string): Promise<void> {
        const species = new Species(description);
        await this._speciesGateway.create(species);
    }
}
import Species from "../../entities/species";
import SpeciesGateway from "../../gateways/species.gateway";

export default class FindOneSpeciesUseCase {
    private _speciesGateway: SpeciesGateway;

    constructor(speciesGateway: SpeciesGateway) {
        this._speciesGateway = speciesGateway;
    }

    async execute(id: string): Promise<Species | undefined> {
        const result = await this._speciesGateway.findById(id);
        return result;
    }
}
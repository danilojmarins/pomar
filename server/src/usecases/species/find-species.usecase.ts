import Species from "../../entities/species";
import SpeciesGateway from "../../gateways/species.gateway";

export default class FindSpeciesUseCase {
    private _speciesGateway: SpeciesGateway;

    constructor(speciesGateway: SpeciesGateway) {
        this._speciesGateway = speciesGateway;
    }

    async execute(): Promise<Species[] | undefined> {
        const result = await this._speciesGateway.findMany();
        return result;
    }
}
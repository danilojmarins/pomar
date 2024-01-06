import SpeciesGateway from "../../gateways/species.gateway";

export default class DeleteSpeciesUseCase {
    private _speciesGateway: SpeciesGateway;

    constructor(speciesGateway: SpeciesGateway) {
        this._speciesGateway = speciesGateway;
    }

    async execute(id: string): Promise<void> {
        await this._speciesGateway.delete(id);
    }
}
import SpeciesGateway from "../../gateways/species.gateway";

interface FindOneSpeciesOutputDTO {
    id: string;
    description: string;
}

export default class FindOneSpeciesUseCase {
    private _speciesGateway: SpeciesGateway;

    constructor(speciesGateway: SpeciesGateway) {
        this._speciesGateway = speciesGateway;
    }

    async execute(id: string): Promise<FindOneSpeciesOutputDTO | undefined> {
        const result = await this._speciesGateway.findById(id);

        if (!result) {
            return undefined;
        }

        const specie: FindOneSpeciesOutputDTO = {
            id: result.id,
            description: result.description
        }

        return specie;
    }
}
import SpeciesGateway from "../../gateways/species.gateway";

interface FindSpeciesOutputDTO {
    id: string;
    description: string;
}

export default class FindSpeciesUseCase {
    private _speciesGateway: SpeciesGateway;

    constructor(speciesGateway: SpeciesGateway) {
        this._speciesGateway = speciesGateway;
    }

    async execute(): Promise<FindSpeciesOutputDTO[] | []> {
        const result = await this._speciesGateway.findMany();

        const species: FindSpeciesOutputDTO[] = [];

        result?.forEach(specie => {
            species.push({
                id: specie.id,
                description: specie.description
            });
        });

        return species;
    }
}
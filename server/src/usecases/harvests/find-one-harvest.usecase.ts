import HarvestGateway from "../../gateways/harvests.gateway";

interface FindOneHarvestOutputDTO {
    id: string;
    information: string;
    date: string;
    weight: number;
    tree: {
        id: string;
        description: string;
        age: number;
        species: {
            id: string;
            description: string;
        };
    };
};

export default class FindOneHarvestUseCase {
    private _harvestGateway: HarvestGateway;

    constructor(harvestGateway: HarvestGateway) {
        this._harvestGateway = harvestGateway;
    }

    async execute(id: string): Promise<FindOneHarvestOutputDTO | undefined> {
        const result = await this._harvestGateway.findById(id);

        if (!result) {
            return undefined;
        }

        const harvest: FindOneHarvestOutputDTO = {
            id: result.id,
            information: result.information,
            date: result.date,
            weight: result.weight,
            tree: {
                id: result.tree.id,
                description: result.tree.description,
                age: result.tree.age,
                species: {
                    id: result.tree.species.id,
                    description: result.tree.species.description
                }
            }
        }

        return harvest;
    }
}
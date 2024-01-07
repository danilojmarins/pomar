import HarvestGateway from "../../gateways/harvests.gateway";

interface FindHarvestsOutputDTO {
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

export default class FindHarvestsUseCase {
    private _harvestGateway: HarvestGateway;

    constructor(harvestGateway: HarvestGateway) {
        this._harvestGateway = harvestGateway;
    }

    async execute(): Promise<FindHarvestsOutputDTO[] | []> {
        const result = await this._harvestGateway.findMany();

        const harvests: FindHarvestsOutputDTO[] = [];

        result?.forEach(harvest => {
            harvests.push({
                id: harvest.id,
                information: harvest.information,
                date: harvest.date,
                weight: harvest.weight,
                tree: {
                    id: harvest.tree.id,
                    description: harvest.tree.description,
                    age: harvest.tree.age,
                    species: {
                        id: harvest.tree.species.id,
                        description: harvest.tree.species.description
                    }
                }
            });
        });

        return harvests;
    }
}
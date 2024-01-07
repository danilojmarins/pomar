import TreeGateway from "../../gateways/trees.gateway";

interface FindOneTreeOutputDTO {
    id: string;
    description: string;
    age: number;
    species: {
        id: string;
        description: string;
    }
}

export default class FindOneTreeUseCase {
    private _treeGateway: TreeGateway;

    constructor(treeGateway: TreeGateway) {
        this._treeGateway = treeGateway;
    }

    async execute(id: string): Promise<FindOneTreeOutputDTO | undefined> {
        const result = await this._treeGateway.findById(id);

        if (!result) {
            return undefined;
        }

        const tree: FindOneTreeOutputDTO = {
            id: result.id,
            description: result.description,
            age: result.age,
            species: {
                id: result.species.id,
                description: result.species.description
            }
        }

        return tree;
    }
}
import TreeGateway from "../../gateways/trees.gateway";

interface FindTreesOutputDTO {
    id: string;
    description: string;
    age: number;
    species: {
        id: string;
        description: string;
    }
}

export default class FindTreesUseCase {
    private _treeGateway: TreeGateway;

    constructor(treeGateway: TreeGateway) {
        this._treeGateway = treeGateway;
    }

    async execute(): Promise<FindTreesOutputDTO[] | []> {
        const result = await this._treeGateway.findMany();

        const trees: FindTreesOutputDTO[] = [];

        result?.forEach(tree => {
            trees.push({
                id: tree.id,
                description: tree.description,
                age: tree.age,
                species: {
                    id: tree.species.id,
                    description: tree.species.description
                }
            });
        });

        return trees;
    }
}
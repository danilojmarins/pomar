import GroupGateway from "../../gateways/groups.gateway";

interface FindOneGroupOutputDTO {
    id: string;
    name: string;
    description: string;
    trees: {
        id: string;
        description: string;
        age: number;
        species: {
            id: string;
            description: string;
        };
    }[];
};

export default class FindOneGroupUseCase {
    private _groupGateway: GroupGateway;

    constructor(groupGateway: GroupGateway) {
        this._groupGateway = groupGateway;
    }

    async execute(id: string): Promise<FindOneGroupOutputDTO | undefined> {
        const result = await this._groupGateway.findById(id);

        if (!result) {
            return undefined;
        }

        const trees: FindOneGroupOutputDTO['trees'] = [];
        result.trees.forEach(tree => {
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

        const group: FindOneGroupOutputDTO = {
            id: result.id,
            name: result.name,
            description: result.description,
            trees: trees
        };

        return group;
    }
}
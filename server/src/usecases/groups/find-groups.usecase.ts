import GroupGateway from "../../gateways/groups.gateway";

interface FindGroupsOutputDTO {
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

export default class FindGroupsUseCase {
    private _groupGateway: GroupGateway;

    constructor(groupGateway: GroupGateway) {
        this._groupGateway = groupGateway;
    }

    async execute(): Promise<FindGroupsOutputDTO[] | []> {
        const result = await this._groupGateway.findMany();

        const groups: FindGroupsOutputDTO[] = [];

        result?.forEach(group => {
            const trees: FindGroupsOutputDTO["trees"] = [];
            group.trees.forEach(tree => {
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
            groups.push({
                id: group.id,
                name: group.name,
                description: group.description,
                trees: trees
            });
        });

        return groups;
    }
}
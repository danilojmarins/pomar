import Group from "../../entities/group";
import TreeGateway from "../../gateways/trees.gateway";
import GroupGateway from "../../gateways/groups.gateway";
import Tree from "../../entities/tree";

export default class UpdateGroupUseCase {
    private _groupGateway: GroupGateway;
    private _treesGateway: TreeGateway;

    constructor(groupGateway: GroupGateway, treesGateway: TreeGateway) {
        this._groupGateway = groupGateway;
        this._treesGateway = treesGateway;
    }

    async execute(name:string, description: string, trees_id: string[], id: string): Promise<void> {
        const trees: Tree[] = [];
        trees_id.forEach(async (id) => {
            const tree = await this._treesGateway.findById(id);
            if (!tree) {
                throw new Error('tree does not exists');
            }
            trees.push(tree);
        });
        const group = new Group(name, description, id, trees);
        await this._groupGateway.update(group);
    }
}
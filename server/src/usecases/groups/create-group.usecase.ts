import Group from "../../entities/group";
import TreeGateway from "../../gateways/trees.gateway";
import GroupGateway from "../../gateways/groups.gateway";
import Tree from "../../entities/tree";

export default class CreateGroupUseCase {
    private _groupGateway: GroupGateway;
    private _treeGateway: TreeGateway;

    constructor(groupGateway: GroupGateway, treeGateway: TreeGateway) {
        this._groupGateway = groupGateway;
        this._treeGateway = treeGateway;
    }

    async execute(name:string, description: string, trees_id: string[]): Promise<void> {
        const trees: Tree[] = [];
        trees_id.forEach(async (id) => {
            const tree = await this._treeGateway.findById(id);
            if (!tree) {
                throw new Error('tree does not exists');
            }
            trees.push(tree);
        });
        const group = new Group(name, description, undefined, trees);
        await this._groupGateway.create(group);
    }
}
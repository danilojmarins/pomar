import Tree from "../../entities/tree";
import TreeGateway from "../../gateways/trees.gateway";

export default class FindOneTreeUseCase {
    private _treeGateway: TreeGateway;

    constructor(treeGateway: TreeGateway) {
        this._treeGateway = treeGateway;
    }

    async execute(id: string): Promise<Tree | undefined> {
        const result = await this._treeGateway.findById(id);
        return result;
    }
}
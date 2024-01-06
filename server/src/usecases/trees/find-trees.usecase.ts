import Tree from "../../entities/tree";
import TreeGateway from "../../gateways/trees.gateway";

export default class FindTreesUseCase {
    private _treeGateway: TreeGateway;

    constructor(treeGateway: TreeGateway) {
        this._treeGateway = treeGateway;
    }

    async execute(): Promise<Tree[] | undefined> {
        const result = await this._treeGateway.findMany();
        return result;
    }
}
import TreeGateway from "../../gateways/trees.gateway";

export default class DeleteTreeUseCase {
    private _treeGateway: TreeGateway;

    constructor(treeGateway: TreeGateway) {
        this._treeGateway = treeGateway;
    }

    async execute(id: string): Promise<void> {
        await this._treeGateway.delete(id);
    }
}
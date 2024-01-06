import Harvest from "../../entities/harvest";
import TreeGateway from "../../gateways/trees.gateway";
import HarvestGateway from "../../gateways/harvests.gateway";

export default class CreateHarvestUseCase {
    private _harvestGateway: HarvestGateway;
    private _treeGateway: TreeGateway;

    constructor(harvestGateway: HarvestGateway, treeGateway: TreeGateway) {
        this._harvestGateway = harvestGateway;
        this._treeGateway = treeGateway;
    }

    async execute(information: string, date: string, weight: number, tree_id: string): Promise<void> {
        const tree = await this._treeGateway.findById(tree_id);
        if (!tree) {
            throw new Error('tree does not exists');
        }
        const harvest = new Harvest(information, date, weight, tree);
        await this._harvestGateway.create(harvest);
    }
}
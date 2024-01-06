import Harvest from "../../entities/harvest";
import HarvestGateway from "../../gateways/harvests.gateway";

export default class FindOneHarvestUseCase {
    private _harvestGateway: HarvestGateway;

    constructor(harvestGateway: HarvestGateway) {
        this._harvestGateway = harvestGateway;
    }

    async execute(id: string): Promise<Harvest | undefined> {
        const result = await this._harvestGateway.findById(id);
        return result;
    }
}
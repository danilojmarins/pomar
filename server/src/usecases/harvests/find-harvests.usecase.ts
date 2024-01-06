import Harvest from "../../entities/harvest";
import HarvestGateway from "../../gateways/harvests.gateway";

export default class FindHarvestsUseCase {
    private _harvestGateway: HarvestGateway;

    constructor(harvestGateway: HarvestGateway) {
        this._harvestGateway = harvestGateway;
    }

    async execute(): Promise<Harvest[] | undefined> {
        const result = await this._harvestGateway.findMany();
        return result;
    }
}
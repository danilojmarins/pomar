import HarvestGateway from "../../gateways/harvests.gateway";

export default class DeleteHarvestUseCase {
    private _harvestGateway: HarvestGateway;

    constructor(harvestGateway: HarvestGateway) {
        this._harvestGateway = harvestGateway;
    }

    async execute(id: string): Promise<void> {
        await this._harvestGateway.delete(id);
    }
}
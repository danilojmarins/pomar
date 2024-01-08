import HarvestGateway, { filteredHarvests } from "../../gateways/harvests.gateway";

export default class FilterHarvestsUseCase {
    private _harvestGateway: HarvestGateway;

    constructor(harvestGateway: HarvestGateway) {
        this._harvestGateway = harvestGateway;
    }

    async execute(tree_id?: string, group_id?: string, species_id?: string): Promise<filteredHarvests[] | []> {
        const result = await this._harvestGateway.filter(tree_id, group_id, species_id);
        if (!result) {
            return [];
        }
        return result;
    }
}
import Tree from "../../entities/tree";
import SpeciesGateway from "../../gateways/species.gateway";
import TreeGateway from "../../gateways/trees.gateway";

export default class UpdateTreeUseCase {
    private _treeGateway: TreeGateway;
    private _speciesGateway: SpeciesGateway;

    constructor(treeGateway: TreeGateway, speciesGateway: SpeciesGateway) {
        this._treeGateway = treeGateway;
        this._speciesGateway = speciesGateway;
    }

    async execute(description: string, age: number, species_id: string, id: string): Promise<void> {
        const species = await this._speciesGateway.findById(species_id);
        if (!species) {
            throw new Error('species does not exists');
        }
        const tree = new Tree(description, age, species, id);
        await this._treeGateway.update(tree);
    }
}
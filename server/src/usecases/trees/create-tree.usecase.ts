import Tree from "../../entities/tree";
import SpeciesGateway from "../../gateways/species.gateway";
import TreeGateway from "../../gateways/trees.gateway";

export default class CreateTreeUseCase {
    private _treeGateway: TreeGateway;
    private _speciesGateway: SpeciesGateway;

    constructor(treeGateway: TreeGateway, speciesGateway: SpeciesGateway) {
        this._treeGateway = treeGateway;
        this._speciesGateway = speciesGateway;
    }

    async execute(description: string, age: number, species_id: string): Promise<void> {
        const species = await this._speciesGateway.findById(species_id);
        if (!species) {
            throw new Error('species does not exists');
        }
        const tree = new Tree(description, age, species);
        await this._treeGateway.create(tree);
    }
}
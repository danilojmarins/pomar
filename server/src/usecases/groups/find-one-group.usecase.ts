import Group from "../../entities/group";
import GroupGateway from "../../gateways/groups.gateway";

export default class FindOneGroupUseCase {
    private _groupGateway: GroupGateway;

    constructor(groupGateway: GroupGateway) {
        this._groupGateway = groupGateway;
    }

    async execute(id: string): Promise<Group | undefined> {
        const result = await this._groupGateway.findById(id);
        return result;
    }
}
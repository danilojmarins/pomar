import Group from "../../entities/group";
import GroupGateway from "../../gateways/groups.gateway";

export default class FindGroupsUseCase {
    private _groupGateway: GroupGateway;

    constructor(groupGateway: GroupGateway) {
        this._groupGateway = groupGateway;
    }

    async execute(): Promise<Group[] | undefined> {
        const result = await this._groupGateway.findMany();
        return result;
    }
}
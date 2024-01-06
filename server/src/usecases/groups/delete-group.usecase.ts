import GroupGateway from "../../gateways/groups.gateway";

export default class DeleteGroupUseCase {
    private _groupGateway: GroupGateway;

    constructor(groupGateway: GroupGateway) {
        this._groupGateway = groupGateway;
    }

    async execute(id: string): Promise<void> {
        await this._groupGateway.delete(id);
    }
}
import Group from "../entities/group";

export default interface GroupGateway {
    create(group: Group): Promise<void>;
    findMany(): Promise<Group[] | undefined>;
    update(group: Group): Promise<void>;
    findById(id: string): Promise<Group | undefined>;
    delete(id: string): Promise<void>;
}
import Group from "../entities/group";
import GroupGateway from "../gateways/groups.gateway";
import executeQuery from "../utilities/excute_query";

export default class GroupRepository implements GroupGateway {
    async create(group: Group): Promise<void> {
        const query = `
            INSERT INTO
                sys.groups
            VALUES
                (:id, :name, :description)
        `;
        const params = {
            id: group.id,
            name: group.name,
            description: group.description
        };
        await executeQuery<Group>(query, params);
    }

    async findMany(): Promise<Group[]> {
        const query = `
            SELECT
                id "id",
                name "name",
                description "description"
            FROM
                sys.groups
        `;
        const result = await executeQuery<Group>(query);
        return result.rows || [];
    }

    async update(group: Group): Promise<void> {
        const query = `
            UPDATE
                sys.groups
            SET
                description = :description,
                name = :name
            WHERE
                id = :id
        `;
        const params = {
            id: group.id,
            name: group.name,
            description: group.description
        };
        await executeQuery<Group>(query, params);
    }

    async findById(id: string): Promise<Group> {
        const query = `
            SELECT
                id "id",
                name "name",
                description "description"
            FROM
                sys.groups
            WHERE
                id = :id
        `;
        const params = { id: id };
        const result = await executeQuery<Group>(query, params);
        if (!result.rows || !result.rows[0]) {
            throw new Error('no rows were found');
        }
        return result.rows[0]
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM sys.groups WHERE id = :id`;
        const params = { id: id };
        await executeQuery<Group>(query, params);
    }
}
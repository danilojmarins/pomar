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

    async findMany(): Promise<Group[] | undefined> {
        const query = `
            SELECT
                id "id",
                name "name",
                description "description",
                CURSOR(
                    SELECT
                        id "id",
                        description "description",
                        age "age"
                    FROM
                        sys.trees t,
                        sys.trees_groups tg
                    WHERE
                        t.id = tg.tree_id AND
                        g.id = tg.group_id
                ) as "trees"
            FROM
                sys.groups g
        `;
        const result = await executeQuery<Group>(query);
        if (!result.rows) {
            return undefined;
        }
        return result.rows;
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

    async findById(id: string): Promise<Group | undefined> {
        const query = `
            SELECT
                id "id",
                name "name",
                description "description",
                CURSOR(
                    SELECT
                        id "id",
                        description "description",
                        age "age"
                    FROM
                        sys.trees t,
                        sys.trees_groups tg
                    WHERE
                        t.id = tg.tree_id AND
                        g.id = tg.group_id
                ) as "trees"
            FROM
                sys.groups g
            WHERE
                id = :id
        `;
        const params = { id: id };
        const result = await executeQuery<Group>(query, params);
        if (!result.rows || !result.rows[0]) {
            return undefined;
        }
        return result.rows[0];
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM sys.groups WHERE id = :id`;
        const params = { id: id };
        await executeQuery<Group>(query, params);
    }
}
import Group from "../entities/group";
import Species from "../entities/species";
import Tree from "../entities/tree";
import GroupGateway from "../gateways/groups.gateway";
import executeQuery from "../utilities/excute_query";

interface GroupQueryDTO {
    id: string;
    name: string;
    description: string;
    trees: {
        id: string;
        description: string;
        age: number;
        species: {
            id: string;
            description: string;
        }[];
    }[];
};

export default class GroupRepository implements GroupGateway {
    async create(group: Group): Promise<void> {
        let in_stmt = "";
        for (let i = 0; i < group.trees.length; i++) {
            in_stmt += (i > 0) ? ", :" + i : ":" + i;
        }
        const query = `
            BEGIN
                INSERT INTO
                    sys.groups
                VALUES
                    (:id, :name, :description);
                
                FOR tree_id IN (${in_stmt}) LOOP
                    INSERT INTO
                        sys.trees_groups
                    VALUES
                        (tree_id, :id);
                END LOOP;
            END;
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
                        age "age",
                        CURSOR(
                            SELECT
                                id "id",
                                description "description"
                            FROM sys.species s
                            WHERE t.species_id = s.id
                        ) as "species"
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
        const result = await executeQuery<GroupQueryDTO>(query);
        if (!result.rows) {
            return undefined;
        }
        const groups: Group[] = [];
        result.rows.forEach((row) => {
            const trees: Tree[] = [];
            row.trees.forEach((tr) => {
                const species = new Species(tr.species[0].description, tr.species[0].id);
                const tree = new Tree(tr.description, tr.age, species, tr.id);
                trees.push(tree);
            });
            const group = new Group(row.name, row.description, row.id, trees);
            groups.push(group);
        })
        return groups;
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
                        age "age",
                        CURSOR(
                            SELECT
                                id "id",
                                description "description"
                            FROM sys.species s
                            WHERE t.species_id = s.id
                        ) as "species"
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
        const result = await executeQuery<GroupQueryDTO>(query, params);
        if (!result.rows || !result.rows[0]) {
            return undefined;
        }
        const row = result.rows[0];
        const trees: Tree[] = [];
        row.trees.forEach((tr) => {
            const species = new Species(tr.species[0].description, tr.species[0].id);
            const tree = new Tree(tr.description, tr.age, species, tr.id);
            trees.push(tree);
        });
        const group = new Group(row.name, row.description, row.id, trees);
        return group;
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM sys.groups WHERE id = :id`;
        const params = { id: id };
        await executeQuery<Group>(query, params);
    }
}
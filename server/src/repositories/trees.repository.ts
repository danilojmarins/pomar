import Species from "../entities/species";
import Tree from "../entities/tree";
import TreeGateway from "../gateways/trees.gateway";
import executeQuery from "../utilities/excute_query";

interface TreeQueryDTO {
    id: string;
    description: string;
    age: number;
    species: {
        id: string;
        description: string;
    }[];
    groups: {
        id: string;
        name: string;
        description: string;
    }[] | undefined;
};

export default class TreeRepository implements TreeGateway {
    async create(tree: Tree): Promise<void> {
        const query = `
            INSERT INTO
                sys.trees
            VALUES
                (:id, :description, :age, :species_id)
        `;
        const params = {
            id: tree.id,
            description: tree.description,
            age: tree.age,
            species_id: tree.species.id
        };
        await executeQuery<Tree>(query, params);
    }

    async findMany(): Promise<Tree[] | undefined> {
        const query = `
            SELECT
                id "id",
                description "description",
                age "age",
                CURSOR(
                    SELECT
                        id "id",
                        description "description"
                    FROM
                        sys.species s
                    WHERE s.id = t.species_id
                ) as "species",
                CURSOR(
                    SELECT
                        id "id",
                        name "name",
                        description "description"
                    FROM
                        sys.groups g,
                        sys.trees_groups tg
                    WHERE
                        g.id = tg.group_id AND
                        t.id = tg.tree_id
                ) as "groups"
            FROM
                sys.trees t
        `;
        const result = await executeQuery<TreeQueryDTO>(query);
        if (!result.rows) {
            return undefined;
        }
        const trees: Tree[] = [];
        result.rows.forEach((row) => {
            const species = new Species(row.species[0].description, row.species[0].id);
            const tree = new Tree(
                row.description,
                row.age,
                species,
                row.id
            );
            trees.push(tree);
        });
        return trees;
    }

    async update(tree: Tree): Promise<void> {
        const query = `
            UPDATE
                sys.trees
            SET
                description = :description,
                age = :age,
                species_id = :species_id
            WHERE
                id = :id
        `;
        const params = {
            id: tree.id,
            description: tree.description,
            age: tree.age,
            species_id: tree.species.id
        };
        await executeQuery<Tree>(query, params);
    }

    async findById(id: string): Promise<Tree | undefined> {
        const query = `
            SELECT
                id "id",
                description "description",
                age "age",
                CURSOR(
                    SELECT
                        id "id",
                        description "description"
                    FROM
                        sys.species s
                    WHERE s.id = t.species_id
                ) as "species"
            FROM
                sys.trees t
            WHERE
                id = :id
        `;
        const params = { id: id };
        const result = await executeQuery<TreeQueryDTO>(query, params);
        if (!result.rows || !result.rows[0]) {
            return undefined;
        }
        const species = new Species(result.rows[0].species[0].description, result.rows[0].species[0].id);
        const tree = new Tree(
            result.rows[0].description,
            result.rows[0].age, species,
            result.rows[0].id
        );
        return tree;
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM sys.trees WHERE id = :id`;
        const params = { id: id };
        await executeQuery<Tree>(query, params);
    }
}
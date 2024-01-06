import Species from "../entities/species";
import Tree from "../entities/tree";
import TreeGateway from "../gateways/trees.gateway";
import executeQuery from "../utilities/excute_query";

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

    async findMany(): Promise<Tree[]> {
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
        `;
        const result = await executeQuery<Tree>(query);
        return result.rows || [];
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

    async findById(id: string): Promise<Tree> {
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
                ) as species
            FROM
                sys.trees t
            WHERE
                id = :id
        `;
        const params = { id: id };
        const result = await executeQuery<Tree>(query, params);
        if (!result.rows || !result.rows[0]) {
            throw new Error('no rows were found');
        }
        return result.rows[0]
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM sys.trees WHERE id = :id`;
        const params = { id: id };
        await executeQuery<Tree>(query, params);
    }
}
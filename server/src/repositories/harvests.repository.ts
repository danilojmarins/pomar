import Harvest from "../entities/harvest";
import Species from "../entities/species";
import Tree from "../entities/tree";
import HarvestGateway from "../gateways/harvests.gateway";
import executeQuery from "../utilities/excute_query";

interface HarvestQueryDTO {
    id: string;
    information: string;
    date: string;
    weight: number;
    tree: {
        id: string;
        description: string;
        age: number;
        species: {
            id: string;
            description: string;
        }[];
    }[];
};

export default class HarvestRepository implements HarvestGateway {
    async create(harvest: Harvest): Promise<void> {
        const query = `
            INSERT INTO
                sys.harvests
            VALUES
                (:id, :information, :date, :weight, :tree_id)
        `;
        const params = {
            id: harvest.id,
            information: harvest.information,
            date: harvest.date,
            weight: harvest.weight,
            tree_id: harvest.tree.id
        };
        await executeQuery<Harvest>(query, params);
    }

    async findMany(): Promise<Harvest[] | undefined> {
        const query = `
            SELECT
                id "id",
                information "information",
                harvest_date "date",
                weight "weight",
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
                        sys.trees t
                    WHERE
                        t.id = h.tree_id
                ) as "tree"
            FROM
                sys.harvests h
        `;
        const result = await executeQuery<HarvestQueryDTO>(query);
        if (!result.rows) {
            return undefined;
        }
        const harvests: Harvest[] = [];
        result.rows.forEach((row) => {
            const species = new Species(row.tree[0].species[0].description, row.tree[0].species[0].id);
            const tree = new Tree(row.tree[0].description, row.tree[0].age, species, row.tree[0].id);
            const harvest = new Harvest(row.information, row.date, row.weight, tree, row.id);
            harvests.push(harvest);
        })
        return harvests;
    }

    async update(harvest: Harvest): Promise<void> {
        const query = `
            UPDATE
                sys.harvests
            SET
                information = :information,
                harvest_date = :date,
                weight = :weight,
                tree_id = :tree_id
            WHERE
                id = :id
        `;
        const params = {
            id: harvest.id,
            information: harvest.information,
            date: harvest.date,
            weight: harvest.weight,
            tree_id: harvest.tree.id
        };
        await executeQuery<Harvest>(query, params);
    }

    async findById(id: string): Promise<Harvest | undefined> {
        const query = `
            SELECT
                id "id",
                information "information",
                harvest_date "date",
                weight "weight",
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
                        sys.trees t
                    WHERE
                        t.id = h.tree_id
                ) as "tree"
            FROM
                sys.harvests h
            WHERE
                id = :id
        `;
        const params = { id: id };
        const result = await executeQuery<HarvestQueryDTO>(query, params);
        if (!result.rows || !result.rows[0]) {
            return undefined;
        }
        const row = result.rows[0];
        const species = new Species(row.tree[0].species[0].description, row.tree[0].species[0].id);
        const tree = new Tree(row.tree[0].description, row.tree[0].age, species, row.tree[0].id);
        const harvest = new Harvest(row.information, row.date, row.weight, tree, row.id);
        return harvest;
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM sys.harvests WHERE id = :id`;
        const params = { id: id };
        await executeQuery<Harvest>(query, params);
    }
}
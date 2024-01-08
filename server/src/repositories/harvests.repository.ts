import Harvest from "../entities/harvest";
import Species from "../entities/species";
import Tree from "../entities/tree";
import HarvestGateway, { filteredHarvests } from "../gateways/harvests.gateway";
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
                (:id, :information, :harvest_date, :weight, :tree_id)
        `;

        const params = {
            id: harvest.id,
            information: harvest.information,
            harvest_date: harvest.date,
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

        // Cria os objetos das entidades com o resultado do banco
        const harvests: Harvest[] = [];
        result.rows.forEach((row) => {
            const species = new Species(row.tree[0].species[0].description, row.tree[0].species[0].id);
            const tree = new Tree(row.tree[0].description, row.tree[0].age, species, row.tree[0].id);
            const harvest = new Harvest(row.information, row.date, row.weight, tree, row.id);
            harvests.push(harvest);
        });

        return harvests;
    }

    async update(harvest: Harvest): Promise<void> {
        const query = `
            UPDATE
                sys.harvests
            SET
                information = :information,
                harvest_date = :harvest_date,
                weight = :weight,
                tree_id = :tree_id
            WHERE
                id = :id
        `;

        const params = {
            id: harvest.id,
            information: harvest.information,
            harvest_date: harvest.date,
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

        // Cria os objetos das entidades com o resultado do banco
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

    async filter(tree_id?: string, group_id?: string, species_id?: string): Promise<filteredHarvests[] | undefined> {
        const query = `
            SELECT
                h.id "id",
                h.information "information",
                h.harvest_date "date",
                h.weight "weight",
                t.description "tree_description",
                t.age "tree_age",
                s.description "species_description",
                g.name "group_name"
            FROM
                sys.harvests h,
                sys.trees t,
                sys.groups g,
                sys.trees_groups tg,
                sys.species s
            WHERE
                h.tree_id = t.id AND
                t.species_id = s.id AND
                t.id = tg.tree_id AND
                tg.group_id = g.id AND
                t.id = NVL(:tree_id, t.id) AND
                g.id = NVL(:group_id, g.id) AND
                s.id = NVL(:species_id, s.id)
        `;
        const params = { tree_id: tree_id ?? null, group_id: group_id ?? null, species_id: species_id ?? null,  };
        const result = await executeQuery<filteredHarvests>(query, params);
        if (!result.rows) {
            return undefined;
        }
        return result.rows;
    }
}
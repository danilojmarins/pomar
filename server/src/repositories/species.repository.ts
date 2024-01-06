import Species from "../entities/species";
import SpeciesGateway from "../gateways/species.gateway";
import executeQuery from "../utilities/excute_query";

export default class SpeciesRepository implements SpeciesGateway {
    async create(species: Species): Promise<void> {
        const query = `INSERT INTO sys.species VALUES (:id, :description)`;
        const params = {
            id: species.id,
            description: species.description
        };
        await executeQuery<Species>(query, params);
    }

    async findMany(): Promise<Species[] | undefined> {
        const query = `SELECT id "id", description "description" FROM sys.species`;
        const result = await executeQuery<Species>(query);
        if (!result.rows) {
            return undefined;
        }
        const speciess: Species[] = [];
        result.rows.forEach((row) => {
            const species = new Species(row.description, row.id);
            speciess.push(species);
        })
        return speciess;
    }

    async update(species: Species): Promise<void> {
        const query = `UPDATE sys.species SET description = :description WHERE id = :id`;
        const params = {
            id: species.id,
            description: species.description
        };
        await executeQuery<Species>(query, params);
    }

    async findById(id: string): Promise<Species | undefined> {
        const query = `SELECT id "id", description "description" FROM sys.species WHERE id = :id`;
        const params = { id: id };
        const result = await executeQuery<Species>(query, params);
        if (!result.rows || !result.rows[0]) {
            return undefined;
        }
        const species = new Species(result.rows[0].description, result.rows[0].id);
        return species;
    }

    async delete(id: string): Promise<void> {
        const query = `DELETE FROM sys.species WHERE id = :id`;
        const params = { id: id };
        await executeQuery<Species>(query, params);
    }
}
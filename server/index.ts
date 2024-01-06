import express from 'express';
import OracleDB from 'oracledb';
import SpeciesRepository from './src/repositories/species.repository';
import Species from './src/entities/species';
import Tree from './src/entities/tree';
import TreeRepository from './src/repositories/trees.repository';
import Group from './src/entities/group';

const app = express();

app.listen(5000, async () => {
    console.log('Rodando na porta 5000');
});

(async () => {
    try {
        await OracleDB.createPool({
            user: 'SYSTEM',
            password: 'password',
            connectionString: 'oracledb:1521'
        });

        const species = new Species('specie1');
        const group = new Group('grupo1', 'grupo1');
        const tree = new Tree('tree1', 18, species, undefined, [group]);
        await new SpeciesRepository().create(species);
        await new TreeRepository().create(tree);
        const result = await new TreeRepository().findMany();
        console.log(result![0].species)
    }
    catch (err) {
        console.error(err);
    }
})();
import express, { json } from 'express';
import cors from 'cors';
import OracleDB from 'oracledb';
import { speciesRouter } from './src/routes/species.routes';
import { treeRouter } from './src/routes/trees.routes';
import { groupRouter } from './src/routes/groups.routes';
import { harvestRouter } from './src/routes/harvests.routes';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
    credentials: true
}));

app.use(json());

app.use('/species', speciesRouter);
app.use('/trees', treeRouter);
app.use('/groups', groupRouter);
app.use('/harvests', harvestRouter);

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
    }
    catch (err) {
        console.error(err);
    }
})();
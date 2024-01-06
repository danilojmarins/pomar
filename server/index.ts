import express from 'express';
import OracleDB from 'oracledb';

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

        const connection = await OracleDB.getConnection();
        const result = await connection.execute('SELECT * FROM sys.users');

        console.log(result)
    }
    catch (err) {
        console.error(err);
    }
})();
import express from 'express';
import OracleDB from 'oracledb';

const app = express();

app.listen(3000, async () => {
    console.log('Rodando na porta 3000');
});

async function connect() {
    const connection = await OracleDB.getConnection({
        user: 'SYSTEM',
        password: 'password',
        connectionString: 'oracledb:1521'
    });
    
    const result = await connection.execute(`SELECT * FROM sys.users`);
    console.log(result);
}

connect();
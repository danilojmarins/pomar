import OracleDB from "oracledb";

export default async function executeQuery<T>(query: string): Promise<OracleDB.Result<T>> {
    try {
        const connection = await OracleDB.getConnection();
        const result = await connection.execute<T>(query);

        return result;
    }
    catch (err) {
        console.error(err);
        throw new Error('error executing the database query');
    }
}
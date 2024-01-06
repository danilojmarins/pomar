import OracleDB from "oracledb";

export default async function executeQuery<T>(
    query: string,
    bindParams: OracleDB.BindParameters = {}
): Promise<OracleDB.Result<T>> {
    let connection: OracleDB.Connection | undefined = undefined;
    try {
        connection = await OracleDB.getConnection();
        const result = await connection.execute<T>(query, bindParams, { outFormat: OracleDB.OUT_FORMAT_OBJECT });
        connection.commit();
        return result;
    }
    catch (err) {
        console.error(err);
        throw new Error('error executing the database query');
    }
    finally {
        if (connection) {
            await connection.close();
        }
    }
}
import User from "../entities/user";
import UserGateway from "../gateways/users.gateway";
import executeQuery from "../utilities/excute_query";
import hashPassword from "../utilities/hash_password";

export default class UserRepository implements UserGateway {
    async create(user: User): Promise<void> {
        const query = `
            INSERT INTO
                sys.users
            VALUES
                (:id, :name, :email, :password)
        `;

        const params = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: hashPassword(user.password)
        };
        await executeQuery<User>(query, params);
    }

    async find(email: string): Promise<User> {
        const query = `
            SELECT
                id "id",
                name "name",
                email "email",
                password "password"
            FROM
                sys.users
            WHERE
                email = :email
        `;
        const params = {
            email: email
        };
        const result = await executeQuery<User>(query, params);
        if (!result.rows || !result.rows[0]) {
            throw new Error('email informado não existe');
        }
        const user = new User(result.rows[0].name, result.rows[0].email, result.rows[0].password, result.rows[0].id);
        return user;
    }
}
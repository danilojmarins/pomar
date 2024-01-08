import User from "../entities/user";

export default interface UserGateway {
    create(user: User): Promise<void>;
    find(email: string): Promise<User>;
}
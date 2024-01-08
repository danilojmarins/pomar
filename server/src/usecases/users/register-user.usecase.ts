import User from "../../entities/user";
import UserGateway from "../../gateways/users.gateway";

export default class RegisterUserUseCase {
    private _userGateway: UserGateway;

    constructor(userGateway: UserGateway) {
        this._userGateway = userGateway;
    }

    async execute(name: string, email: string, password: string): Promise<void> {
        const user = new User(name, email, password);
        await this._userGateway.create(user);
    }
}
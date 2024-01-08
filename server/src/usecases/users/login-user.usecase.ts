import jwt from 'jsonwebtoken';
import User from "../../entities/user";
import UserGateway from "../../gateways/users.gateway";
import compareHashPassword from "../../utilities/compare_hash_password";

interface LoginUserUseCaseOutputDTO {
    jwt: string;
}

export default class LoginUserUseCase {
    private _userGateway: UserGateway;

    constructor(userGateway: UserGateway) {
        this._userGateway = userGateway;
    }

    async execute(email: string, password: string): Promise<LoginUserUseCaseOutputDTO> {
        const user = await this._userGateway.find(email);
        const validPassword = compareHashPassword(password, user.password);
        if (!validPassword) {
            throw new Error('senha incorreta');
        }
        const token = jwt.sign(
            { id: user.id },
            'd8557f30-698d-4c0f-b8e4-bc77d82cf77e',
            { expiresIn: '1d' }
        );
        return { jwt: token };
    }
}
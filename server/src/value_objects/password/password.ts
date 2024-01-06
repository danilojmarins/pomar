export default class Password {
    private readonly _password: string;

    constructor(password: string) {
        if (!password) {
            throw new Error('password must be provided');
        }
        if (password.trim().length < 8) {
            throw new Error('password must have at least 8 characters');
        }
        if (password.trim().length > 64) {
            throw new Error('password must have at most 64 characters');
        }

        this._password = password.trim();
    }

    get password(): string {
        return this._password;
    }
}
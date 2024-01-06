export default class Email {
    private readonly _email: string;

    constructor(email: string) {
        if (!email) {
            throw new Error('email must be provided');
        }
        if (!email.trim().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error('invalid email address');
        }
        if (email.trim().length > 64) {
            throw new Error('email must have at most 64 characters');
        }

        this._email = email.trim();
    }

    get email(): string {
        return this._email;
    }
}
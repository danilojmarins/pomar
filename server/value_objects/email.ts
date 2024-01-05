export default class Email {
    private readonly _email: string;

    constructor(email: string) {
        if (!email) {
            throw new Error('email must be provided');
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error('invalid email address');
        }

        this._email = email;
    }

    get email(): string {
        return this._email;
    }
}
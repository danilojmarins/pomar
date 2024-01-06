import generateId from "../utilities/id_generator";
import Email from "../value_objects/email/email";
import Id from "../value_objects/id/id";
import Name from "../value_objects/name/name";
import Password from "../value_objects/password/password"

export default class User {
    private _id: Id;
    private _name: Name;
    private _email: Email;
    private _password: Password;

    constructor(name: string, email: string, password: string, id = generateId()) {
        this._id = new Id(id);
        this._name = new Name(name);
        this._email = new Email(email);
        this._password = new Password(password);
    }

    get id(): string {
        return this._id.id;
    }

    get name(): string {
        return this._name.name;
    }

    get email(): string {
        return this._email.email;
    }

    get password(): string {
        return this._password.password;
    }
}
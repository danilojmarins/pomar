export default class Name {
    private readonly _name: string;

    constructor(name: string) {
        if (!name) {
            throw new Error('name must be provided');
        }
        if (name.trim().length < 3) {
            throw new Error('name must have at least 3 characters');
        }
        if (name.trim().length > 64) {
            throw new Error('name must have at most 64 characters');
        }

        this._name = name;
    }

    get name(): string {
        return this._name;
    }
}
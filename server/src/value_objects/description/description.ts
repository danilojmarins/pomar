export default class Description {
    private _description: string;

    constructor(description: string) {
        if (!description) {
            throw new Error('description must be provided');
        }
        if (description.trim().length < 3) {
            throw new Error('description must have at least 3 characters');
        }
        if (description.trim().length > 255) {
            throw new Error('description must have at most 255 characters');
        }

        this._description = description.trim();
    }

    get description(): string {
        return this._description;
    }
}
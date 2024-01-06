export default class Id {
    private readonly _id: string;

    constructor(id: string) {
        if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {
            throw new Error('invalid uuid');
        }

        this._id = id;
    }

    get id(): string {
        return this._id;
    }
}
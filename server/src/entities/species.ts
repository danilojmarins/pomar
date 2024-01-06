import generateId from "../utilities/id_generator";
import Description from "../value_objects/description/description";
import Id from "../value_objects/id/id";

export default class Species {
    private _id: Id;
    private _description: Description;

    constructor(description: string, id = generateId()) {
        this._id = new Id(id);
        this._description = new Description(description);
    }

    get id(): string {
        return this._id.id;
    }

    get description(): string {
        return this._description.description;
    }
}
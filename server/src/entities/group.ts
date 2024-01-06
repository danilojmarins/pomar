import generateId from "../utilities/id_generator";
import Description from "../value_objects/description/description";
import Id from "../value_objects/id/id";
import Name from "../value_objects/name/name";
import Tree from "./tree";

export default class Group {
    private _id: Id;
    private _name: Name;
    private _description: Description;
    private _trees?: Tree[];

    constructor(
        name: string,
        description: string,
        id = generateId(),
        trees: Tree[] | undefined = undefined
    ) {
        this._id = new Id(id);
        this._name = new Name(name);
        this._description = new Description(description);
        this._trees = trees;
    }

    get id(): string {
        return this._id.id;
    }

    get name(): string {
        return this._name.name;
    }

    get description(): string {
        return this._description.description;
    }

    get trees(): Tree[] | undefined {
        return this._trees;
    }
}
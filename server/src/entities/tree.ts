import generateId from "../utilities/id_generator";
import Age from "../value_objects/age/age";
import Description from "../value_objects/description/description";
import Id from "../value_objects/id/id";
import Group from "./group";
import Species from "./species";

export default class Tree {
    private _id: Id;
    private _description: Description;
    private _age: Age;
    private _species: Species;
    private _groups: Group[];

    constructor(
        description: string,
        age: number,
        species: Species,
        id = generateId(),
        groups: Group[]
    ) {
        this._id = new Id(id);
        this._description = new Description(description);
        this._species = species;
        this._age = new Age(age);
        this._groups = groups;
    }

    get id(): string {
        return this._id.id;
    }

    get description(): string {
        return this._description.description;
    }

    get age(): number {
        return this._age.age;
    }

    get species(): Species {
        return this._species;
    }

    get groups(): Group[] {
        return this._groups;
    }
}
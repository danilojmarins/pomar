import generateId from "../utilities/id_generator";
import ValidStringDate from "../value_objects/date/date";
import Description from "../value_objects/description/description";
import Id from "../value_objects/id/id";
import Weight from "../value_objects/weight/weight";
import Tree from "./tree";

export default class Harvest {
    private _id: Id;
    private _information: Description;
    private _date: ValidStringDate;
    private _weight: Weight;
    private _tree: Tree;

    constructor(information: string, date: string, weight: number, tree: Tree, id = generateId()) {
        this._id = new Id(id);
        this._information = new Description(information);
        this._date = new ValidStringDate(date);
        this._weight = new Weight(weight);
        this._tree = tree;
    }

    get id(): string {
        return this._id.id;
    }

    get information(): string {
        return this._information.description;
    }

    get date(): string {
        return this._date.date;
    }

    get weight(): number {
        return this._weight.weight;
    }

    get tree(): Tree {
        return this._tree;
    }
}
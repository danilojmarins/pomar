export default class Weight {
    private _weight: number;

    constructor(weight: number) {
        if (weight <= 0) {
            throw new Error('weight must be greater than 0');
        }

        this._weight = weight;
    }

    get weight(): number {
        return this._weight;
    }
}
export default class Age {
    private _age: number;

    constructor(age: number) {
        if (!Number.isInteger(age)) {
            throw new Error('age must be an integer');
        }
        if (age <= 0) {
            throw new Error('age must be greater than 0');
        }
        if (age > 1200) {
            throw new Error('age must be less than 1200');
        }

        this._age = age;
    }

    get age(): number {
        return this._age;
    }
}
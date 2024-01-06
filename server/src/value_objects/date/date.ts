export default class ValidStringDate {
    private _date: string;

    constructor(date: string) {
        if (!date.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)) {
            throw new Error('date string invalid format');
        }

        this._date = date;
    }

    get date(): string {
        return this._date;
    }
}
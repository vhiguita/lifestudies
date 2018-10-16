export interface ICountries {
    id?: number;
    countryCode?: string;
}

export class Countries implements ICountries {
    constructor(public id?: number, public countryCode?: string) {}
}

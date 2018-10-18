import { ILanguage } from 'app/shared/model//language.model';

export interface ICountryLocation {
    id?: number;
    countryCode?: string;
    content?: string;
    language?: ILanguage;
}

export class CountryLocation implements ICountryLocation {
    constructor(public id?: number, public countryCode?: string, public content?: string, public language?: ILanguage) {}
}

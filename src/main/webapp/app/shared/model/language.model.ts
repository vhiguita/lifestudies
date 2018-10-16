export interface ILanguage {
    id?: number;
    languageCode?: string;
    description?: string;
}

export class Language implements ILanguage {
    constructor(public id?: number, public languageCode?: string, public description?: string) {}
}

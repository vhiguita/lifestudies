import { IRol } from 'app/shared/model//rol.model';
import { ILanguage } from 'app/shared/model//language.model';

export interface IRolLocation {
    id?: number;
    content?: string;
    rol?: IRol;
    language?: ILanguage;
}

export class RolLocation implements IRolLocation {
    constructor(public id?: number, public content?: string, public rol?: IRol, public language?: ILanguage) {}
}

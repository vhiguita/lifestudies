import { IRol } from 'app/shared/model//rol.model';

export interface IUserRegistration {
    id?: number;
    userName?: string;
    countryCode?: string;
    city?: string;
    citizenshipCode?: string;
    secondCitizenshipCode?: string;
    secondCitizenship?: boolean;
    rol?: IRol;
}

export class UserRegistration implements IUserRegistration {
    constructor(
        public id?: number,
        public userName?: string,
        public countryCode?: string,
        public city?: string,
        public citizenshipCode?: string,
        public secondCitizenshipCode?: string,
        public secondCitizenship?: boolean,
        public rol?: IRol
    ) {
        this.secondCitizenship = this.secondCitizenship || false;
    }
}

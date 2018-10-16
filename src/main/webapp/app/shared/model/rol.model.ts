export interface IRol {
    id?: number;
    description?: string;
}

export class Rol implements IRol {
    constructor(public id?: number, public description?: string) {}
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestSharedModule } from 'app/shared';
import {
    CountryLocationComponent,
    CountryLocationDetailComponent,
    CountryLocationUpdateComponent,
    CountryLocationDeletePopupComponent,
    CountryLocationDeleteDialogComponent,
    countryLocationRoute,
    countryLocationPopupRoute
} from './';

const ENTITY_STATES = [...countryLocationRoute, ...countryLocationPopupRoute];

@NgModule({
    imports: [TestSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CountryLocationComponent,
        CountryLocationDetailComponent,
        CountryLocationUpdateComponent,
        CountryLocationDeleteDialogComponent,
        CountryLocationDeletePopupComponent
    ],
    entryComponents: [
        CountryLocationComponent,
        CountryLocationUpdateComponent,
        CountryLocationDeleteDialogComponent,
        CountryLocationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestCountryLocationModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestCountriesModule } from './countries/countries.module';
import { TestLanguageModule } from './language/language.module';
import { TestRolModule } from './rol/rol.module';
import { TestCountryLocationModule } from './country-location/country-location.module';
import { TestRolLocationModule } from './rol-location/rol-location.module';
import { TestUserRegistrationModule } from './user-registration/user-registration.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TestCountriesModule,
        TestLanguageModule,
        TestRolModule,
        TestCountryLocationModule,
        TestRolLocationModule,
        TestUserRegistrationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestEntityModule {}

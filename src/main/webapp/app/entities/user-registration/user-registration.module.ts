import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestSharedModule } from 'app/shared';
import {
    UserRegistrationComponent,
    UserRegistrationDetailComponent,
    UserRegistrationUpdateComponent,
    UserRegistrationDeletePopupComponent,
    UserRegistrationDeleteDialogComponent,
    userRegistrationRoute,
    userRegistrationPopupRoute
} from './';

const ENTITY_STATES = [...userRegistrationRoute, ...userRegistrationPopupRoute];

@NgModule({
    imports: [TestSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserRegistrationComponent,
        UserRegistrationDetailComponent,
        UserRegistrationUpdateComponent,
        UserRegistrationDeleteDialogComponent,
        UserRegistrationDeletePopupComponent
    ],
    entryComponents: [
        UserRegistrationComponent,
        UserRegistrationUpdateComponent,
        UserRegistrationDeleteDialogComponent,
        UserRegistrationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestUserRegistrationModule {}

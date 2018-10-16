import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestSharedModule } from 'app/shared';
import {
    RolLocationComponent,
    RolLocationDetailComponent,
    RolLocationUpdateComponent,
    RolLocationDeletePopupComponent,
    RolLocationDeleteDialogComponent,
    rolLocationRoute,
    rolLocationPopupRoute
} from './';

const ENTITY_STATES = [...rolLocationRoute, ...rolLocationPopupRoute];

@NgModule({
    imports: [TestSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RolLocationComponent,
        RolLocationDetailComponent,
        RolLocationUpdateComponent,
        RolLocationDeleteDialogComponent,
        RolLocationDeletePopupComponent
    ],
    entryComponents: [RolLocationComponent, RolLocationUpdateComponent, RolLocationDeleteDialogComponent, RolLocationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestRolLocationModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestSharedModule } from 'app/shared';
// import { HOME_ROUTE, IndexComponent } from './';
import { IndexComponent } from './index.component';
import { INDEX_ROUTE } from './index.route';

@NgModule({
    imports: [TestSharedModule, RouterModule.forChild([INDEX_ROUTE])],
    declarations: [IndexComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestIndexModule {}

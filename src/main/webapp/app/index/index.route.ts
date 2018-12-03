import { Route } from '@angular/router';

// import { HomeComponent } from './';
import { UserRouteAccessService } from 'app/core';
import { IndexComponent } from './index.component';

export const INDEX_ROUTE: Route = {
    path: 'index',
    component: IndexComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    },
    canActivate: [UserRouteAccessService]
};

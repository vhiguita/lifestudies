import { Route } from '@angular/router';

import { LoginaccountComponent } from './loginaccount.component';

export const loginaccountRoute: Route = {
    path: 'loginaccount',
    component: LoginaccountComponent,
    data: {
        authorities: [],
        pageTitle: 'login.title'
    }
};

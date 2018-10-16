import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRegistration } from 'app/shared/model/user-registration.model';
import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationDetailComponent } from './user-registration-detail.component';
import { UserRegistrationUpdateComponent } from './user-registration-update.component';
import { UserRegistrationDeletePopupComponent } from './user-registration-delete-dialog.component';
import { IUserRegistration } from 'app/shared/model/user-registration.model';

@Injectable({ providedIn: 'root' })
export class UserRegistrationResolve implements Resolve<IUserRegistration> {
    constructor(private service: UserRegistrationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((userRegistration: HttpResponse<UserRegistration>) => userRegistration.body));
        }
        return of(new UserRegistration());
    }
}

export const userRegistrationRoute: Routes = [
    {
        path: 'user-registration',
        component: UserRegistrationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.userRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-registration/:id/view',
        component: UserRegistrationDetailComponent,
        resolve: {
            userRegistration: UserRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.userRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-registration/new',
        component: UserRegistrationUpdateComponent,
        resolve: {
            userRegistration: UserRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.userRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-registration/:id/edit',
        component: UserRegistrationUpdateComponent,
        resolve: {
            userRegistration: UserRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.userRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userRegistrationPopupRoute: Routes = [
    {
        path: 'user-registration/:id/delete',
        component: UserRegistrationDeletePopupComponent,
        resolve: {
            userRegistration: UserRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.userRegistration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

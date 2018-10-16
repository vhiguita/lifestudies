import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RolLocation } from 'app/shared/model/rol-location.model';
import { RolLocationService } from './rol-location.service';
import { RolLocationComponent } from './rol-location.component';
import { RolLocationDetailComponent } from './rol-location-detail.component';
import { RolLocationUpdateComponent } from './rol-location-update.component';
import { RolLocationDeletePopupComponent } from './rol-location-delete-dialog.component';
import { IRolLocation } from 'app/shared/model/rol-location.model';

@Injectable({ providedIn: 'root' })
export class RolLocationResolve implements Resolve<IRolLocation> {
    constructor(private service: RolLocationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((rolLocation: HttpResponse<RolLocation>) => rolLocation.body));
        }
        return of(new RolLocation());
    }
}

export const rolLocationRoute: Routes = [
    {
        path: 'rol-location',
        component: RolLocationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.rolLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rol-location/:id/view',
        component: RolLocationDetailComponent,
        resolve: {
            rolLocation: RolLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.rolLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rol-location/new',
        component: RolLocationUpdateComponent,
        resolve: {
            rolLocation: RolLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.rolLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rol-location/:id/edit',
        component: RolLocationUpdateComponent,
        resolve: {
            rolLocation: RolLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.rolLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rolLocationPopupRoute: Routes = [
    {
        path: 'rol-location/:id/delete',
        component: RolLocationDeletePopupComponent,
        resolve: {
            rolLocation: RolLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.rolLocation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

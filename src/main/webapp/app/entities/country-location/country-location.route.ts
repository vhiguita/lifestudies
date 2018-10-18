import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryLocation } from 'app/shared/model/country-location.model';
import { CountryLocationService } from './country-location.service';
import { CountryLocationComponent } from './country-location.component';
import { CountryLocationDetailComponent } from './country-location-detail.component';
import { CountryLocationUpdateComponent } from './country-location-update.component';
import { CountryLocationDeletePopupComponent } from './country-location-delete-dialog.component';
import { ICountryLocation } from 'app/shared/model/country-location.model';

@Injectable({ providedIn: 'root' })
export class CountryLocationResolve implements Resolve<ICountryLocation> {
    constructor(private service: CountryLocationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((countryLocation: HttpResponse<CountryLocation>) => countryLocation.body));
        }
        return of(new CountryLocation());
    }
}

export const countryLocationRoute: Routes = [
    {
        path: 'country-location',
        component: CountryLocationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.countryLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country-location/:id/view',
        component: CountryLocationDetailComponent,
        resolve: {
            countryLocation: CountryLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.countryLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country-location/new',
        component: CountryLocationUpdateComponent,
        resolve: {
            countryLocation: CountryLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.countryLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country-location/:id/edit',
        component: CountryLocationUpdateComponent,
        resolve: {
            countryLocation: CountryLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.countryLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countryLocationPopupRoute: Routes = [
    {
        path: 'country-location/:id/delete',
        component: CountryLocationDeletePopupComponent,
        resolve: {
            countryLocation: CountryLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.countryLocation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

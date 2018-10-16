import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Countries } from 'app/shared/model/countries.model';
import { CountriesService } from './countries.service';
import { CountriesComponent } from './countries.component';
import { CountriesDetailComponent } from './countries-detail.component';
import { CountriesUpdateComponent } from './countries-update.component';
import { CountriesDeletePopupComponent } from './countries-delete-dialog.component';
import { ICountries } from 'app/shared/model/countries.model';

@Injectable({ providedIn: 'root' })
export class CountriesResolve implements Resolve<ICountries> {
    constructor(private service: CountriesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((countries: HttpResponse<Countries>) => countries.body));
        }
        return of(new Countries());
    }
}

export const countriesRoute: Routes = [
    {
        path: 'countries',
        component: CountriesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.countries.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'countries/:id/view',
        component: CountriesDetailComponent,
        resolve: {
            countries: CountriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.countries.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'countries/new',
        component: CountriesUpdateComponent,
        resolve: {
            countries: CountriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.countries.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'countries/:id/edit',
        component: CountriesUpdateComponent,
        resolve: {
            countries: CountriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.countries.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countriesPopupRoute: Routes = [
    {
        path: 'countries/:id/delete',
        component: CountriesDeletePopupComponent,
        resolve: {
            countries: CountriesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testApp.countries.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICountries } from 'app/shared/model/countries.model';
import { Principal } from 'app/core';
import { CountriesService } from './countries.service';

@Component({
    selector: 'jhi-countries',
    templateUrl: './countries.component.html'
})
export class CountriesComponent implements OnInit, OnDestroy {
    countries: ICountries[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private countriesService: CountriesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.countriesService.query().subscribe(
            (res: HttpResponse<ICountries[]>) => {
                this.countries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCountries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICountries) {
        return item.id;
    }

    registerChangeInCountries() {
        this.eventSubscriber = this.eventManager.subscribe('countriesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

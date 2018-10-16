import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICountryLocation } from 'app/shared/model/country-location.model';
import { Principal } from 'app/core';
import { CountryLocationService } from './country-location.service';

@Component({
    selector: 'jhi-country-location',
    templateUrl: './country-location.component.html'
})
export class CountryLocationComponent implements OnInit, OnDestroy {
    countryLocations: ICountryLocation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private countryLocationService: CountryLocationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.countryLocationService.query().subscribe(
            (res: HttpResponse<ICountryLocation[]>) => {
                this.countryLocations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCountryLocations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICountryLocation) {
        return item.id;
    }

    registerChangeInCountryLocations() {
        this.eventSubscriber = this.eventManager.subscribe('countryLocationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

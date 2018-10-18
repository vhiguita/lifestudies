import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRolLocation } from 'app/shared/model/rol-location.model';
import { Principal } from 'app/core';
import { RolLocationService } from './rol-location.service';

@Component({
    selector: 'jhi-rol-location',
    templateUrl: './rol-location.component.html'
})
export class RolLocationComponent implements OnInit, OnDestroy {
    rolLocations: IRolLocation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rolLocationService: RolLocationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.rolLocationService.query().subscribe(
            (res: HttpResponse<IRolLocation[]>) => {
                this.rolLocations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRolLocations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRolLocation) {
        return item.id;
    }

    registerChangeInRolLocations() {
        this.eventSubscriber = this.eventManager.subscribe('rolLocationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

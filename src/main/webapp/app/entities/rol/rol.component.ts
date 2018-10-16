import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRol } from 'app/shared/model/rol.model';
import { Principal } from 'app/core';
import { RolService } from './rol.service';

@Component({
    selector: 'jhi-rol',
    templateUrl: './rol.component.html'
})
export class RolComponent implements OnInit, OnDestroy {
    rols: IRol[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rolService: RolService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.rolService.query().subscribe(
            (res: HttpResponse<IRol[]>) => {
                this.rols = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRols();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRol) {
        return item.id;
    }

    registerChangeInRols() {
        this.eventSubscriber = this.eventManager.subscribe('rolListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

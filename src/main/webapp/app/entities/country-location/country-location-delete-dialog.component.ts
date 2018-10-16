import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountryLocation } from 'app/shared/model/country-location.model';
import { CountryLocationService } from './country-location.service';

@Component({
    selector: 'jhi-country-location-delete-dialog',
    templateUrl: './country-location-delete-dialog.component.html'
})
export class CountryLocationDeleteDialogComponent {
    countryLocation: ICountryLocation;

    constructor(
        private countryLocationService: CountryLocationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.countryLocationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'countryLocationListModification',
                content: 'Deleted an countryLocation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-country-location-delete-popup',
    template: ''
})
export class CountryLocationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ countryLocation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CountryLocationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.countryLocation = countryLocation;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}

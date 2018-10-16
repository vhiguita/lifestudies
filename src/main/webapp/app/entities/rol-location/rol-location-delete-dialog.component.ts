import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRolLocation } from 'app/shared/model/rol-location.model';
import { RolLocationService } from './rol-location.service';

@Component({
    selector: 'jhi-rol-location-delete-dialog',
    templateUrl: './rol-location-delete-dialog.component.html'
})
export class RolLocationDeleteDialogComponent {
    rolLocation: IRolLocation;

    constructor(
        private rolLocationService: RolLocationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rolLocationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rolLocationListModification',
                content: 'Deleted an rolLocation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rol-location-delete-popup',
    template: ''
})
export class RolLocationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rolLocation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RolLocationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.rolLocation = rolLocation;
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

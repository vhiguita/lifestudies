import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserRegistration } from 'app/shared/model/user-registration.model';
import { UserRegistrationService } from './user-registration.service';

@Component({
    selector: 'jhi-user-registration-delete-dialog',
    templateUrl: './user-registration-delete-dialog.component.html'
})
export class UserRegistrationDeleteDialogComponent {
    userRegistration: IUserRegistration;

    constructor(
        private userRegistrationService: UserRegistrationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userRegistrationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userRegistrationListModification',
                content: 'Deleted an userRegistration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-registration-delete-popup',
    template: ''
})
export class UserRegistrationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userRegistration }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserRegistrationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.userRegistration = userRegistration;
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

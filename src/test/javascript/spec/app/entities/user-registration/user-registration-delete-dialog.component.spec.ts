/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestTestModule } from '../../../test.module';
import { UserRegistrationDeleteDialogComponent } from 'app/entities/user-registration/user-registration-delete-dialog.component';
import { UserRegistrationService } from 'app/entities/user-registration/user-registration.service';

describe('Component Tests', () => {
    describe('UserRegistration Management Delete Component', () => {
        let comp: UserRegistrationDeleteDialogComponent;
        let fixture: ComponentFixture<UserRegistrationDeleteDialogComponent>;
        let service: UserRegistrationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [UserRegistrationDeleteDialogComponent]
            })
                .overrideTemplate(UserRegistrationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserRegistrationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserRegistrationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

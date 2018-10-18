/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestTestModule } from '../../../test.module';
import { RolLocationDeleteDialogComponent } from 'app/entities/rol-location/rol-location-delete-dialog.component';
import { RolLocationService } from 'app/entities/rol-location/rol-location.service';

describe('Component Tests', () => {
    describe('RolLocation Management Delete Component', () => {
        let comp: RolLocationDeleteDialogComponent;
        let fixture: ComponentFixture<RolLocationDeleteDialogComponent>;
        let service: RolLocationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [RolLocationDeleteDialogComponent]
            })
                .overrideTemplate(RolLocationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RolLocationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RolLocationService);
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

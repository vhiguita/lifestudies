/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestTestModule } from '../../../test.module';
import { CountryLocationDeleteDialogComponent } from 'app/entities/country-location/country-location-delete-dialog.component';
import { CountryLocationService } from 'app/entities/country-location/country-location.service';

describe('Component Tests', () => {
    describe('CountryLocation Management Delete Component', () => {
        let comp: CountryLocationDeleteDialogComponent;
        let fixture: ComponentFixture<CountryLocationDeleteDialogComponent>;
        let service: CountryLocationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [CountryLocationDeleteDialogComponent]
            })
                .overrideTemplate(CountryLocationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CountryLocationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryLocationService);
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

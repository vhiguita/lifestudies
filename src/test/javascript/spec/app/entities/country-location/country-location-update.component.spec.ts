/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { CountryLocationUpdateComponent } from 'app/entities/country-location/country-location-update.component';
import { CountryLocationService } from 'app/entities/country-location/country-location.service';
import { CountryLocation } from 'app/shared/model/country-location.model';

describe('Component Tests', () => {
    describe('CountryLocation Management Update Component', () => {
        let comp: CountryLocationUpdateComponent;
        let fixture: ComponentFixture<CountryLocationUpdateComponent>;
        let service: CountryLocationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [CountryLocationUpdateComponent]
            })
                .overrideTemplate(CountryLocationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CountryLocationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryLocationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CountryLocation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.countryLocation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CountryLocation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.countryLocation = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

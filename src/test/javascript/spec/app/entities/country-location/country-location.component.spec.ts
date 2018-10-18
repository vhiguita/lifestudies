/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestTestModule } from '../../../test.module';
import { CountryLocationComponent } from 'app/entities/country-location/country-location.component';
import { CountryLocationService } from 'app/entities/country-location/country-location.service';
import { CountryLocation } from 'app/shared/model/country-location.model';

describe('Component Tests', () => {
    describe('CountryLocation Management Component', () => {
        let comp: CountryLocationComponent;
        let fixture: ComponentFixture<CountryLocationComponent>;
        let service: CountryLocationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [CountryLocationComponent],
                providers: []
            })
                .overrideTemplate(CountryLocationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CountryLocationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryLocationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CountryLocation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.countryLocations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

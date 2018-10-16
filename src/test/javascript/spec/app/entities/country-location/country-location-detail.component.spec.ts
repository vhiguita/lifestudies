/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { CountryLocationDetailComponent } from 'app/entities/country-location/country-location-detail.component';
import { CountryLocation } from 'app/shared/model/country-location.model';

describe('Component Tests', () => {
    describe('CountryLocation Management Detail Component', () => {
        let comp: CountryLocationDetailComponent;
        let fixture: ComponentFixture<CountryLocationDetailComponent>;
        const route = ({ data: of({ countryLocation: new CountryLocation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [CountryLocationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CountryLocationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CountryLocationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.countryLocation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

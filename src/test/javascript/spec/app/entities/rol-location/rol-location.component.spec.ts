/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestTestModule } from '../../../test.module';
import { RolLocationComponent } from 'app/entities/rol-location/rol-location.component';
import { RolLocationService } from 'app/entities/rol-location/rol-location.service';
import { RolLocation } from 'app/shared/model/rol-location.model';

describe('Component Tests', () => {
    describe('RolLocation Management Component', () => {
        let comp: RolLocationComponent;
        let fixture: ComponentFixture<RolLocationComponent>;
        let service: RolLocationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [RolLocationComponent],
                providers: []
            })
                .overrideTemplate(RolLocationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RolLocationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RolLocationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RolLocation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.rolLocations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

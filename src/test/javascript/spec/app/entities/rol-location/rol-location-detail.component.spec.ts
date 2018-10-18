/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { RolLocationDetailComponent } from 'app/entities/rol-location/rol-location-detail.component';
import { RolLocation } from 'app/shared/model/rol-location.model';

describe('Component Tests', () => {
    describe('RolLocation Management Detail Component', () => {
        let comp: RolLocationDetailComponent;
        let fixture: ComponentFixture<RolLocationDetailComponent>;
        const route = ({ data: of({ rolLocation: new RolLocation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [RolLocationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RolLocationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RolLocationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.rolLocation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

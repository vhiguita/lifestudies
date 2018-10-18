/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { RolLocationUpdateComponent } from 'app/entities/rol-location/rol-location-update.component';
import { RolLocationService } from 'app/entities/rol-location/rol-location.service';
import { RolLocation } from 'app/shared/model/rol-location.model';

describe('Component Tests', () => {
    describe('RolLocation Management Update Component', () => {
        let comp: RolLocationUpdateComponent;
        let fixture: ComponentFixture<RolLocationUpdateComponent>;
        let service: RolLocationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [RolLocationUpdateComponent]
            })
                .overrideTemplate(RolLocationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RolLocationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RolLocationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RolLocation(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rolLocation = entity;
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
                    const entity = new RolLocation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rolLocation = entity;
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

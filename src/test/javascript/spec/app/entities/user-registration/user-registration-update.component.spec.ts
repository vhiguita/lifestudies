/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { UserRegistrationUpdateComponent } from 'app/entities/user-registration/user-registration-update.component';
import { UserRegistrationService } from 'app/entities/user-registration/user-registration.service';
import { UserRegistration } from 'app/shared/model/user-registration.model';

describe('Component Tests', () => {
    describe('UserRegistration Management Update Component', () => {
        let comp: UserRegistrationUpdateComponent;
        let fixture: ComponentFixture<UserRegistrationUpdateComponent>;
        let service: UserRegistrationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestTestModule],
                declarations: [UserRegistrationUpdateComponent]
            })
                .overrideTemplate(UserRegistrationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserRegistrationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserRegistrationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserRegistration(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userRegistration = entity;
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
                    const entity = new UserRegistration();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userRegistration = entity;
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

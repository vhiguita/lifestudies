import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserRegistration } from 'app/shared/model/user-registration.model';
import { UserRegistrationService } from './user-registration.service';
import { IRol } from 'app/shared/model/rol.model';
import { RolService } from 'app/entities/rol';
import { IRolLocation } from 'app/shared/model/rol-location.model';
import { RolLocationService } from 'app/entities/rol-location';
import { ICountryLocation } from 'app/shared/model/country-location.model';
import { CountryLocationService } from 'app/entities/country-location';
import { Principal } from 'app/core';

@Component({
    selector: 'jhi-user-registration-update',
    templateUrl: './user-registration-update.component.html'
})
export class UserRegistrationUpdateComponent implements OnInit {
    // private _userRegistration: IUserRegistration;
    isSaving: boolean;
    userName: any;
    userRegistration: any = {};

    rols: IRol[];
    rolLocations: IRolLocation[];
    countryLocations: ICountryLocation[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private userRegistrationService: UserRegistrationService,
        private rolService: RolService,
        private rolLocationService: RolLocationService,
        private countryLocationService: CountryLocationService,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.principal.identity().then(account => {
            this.userName = account.login;
            // console.log(account);
            console.log(this.userName);
        });
        this.activatedRoute.data.subscribe(({ userRegistration }) => {
            this.userRegistration = userRegistration;
        });
        this.rolService.query({ filter: 'userregistration-is-null' }).subscribe(
            (res: HttpResponse<IRol[]>) => {
                if (!this.userRegistration.rol || !this.userRegistration.rol.id) {
                    this.rols = res.body;
                } else {
                    this.rolService.find(this.userRegistration.rol.id).subscribe(
                        (subRes: HttpResponse<IRol>) => {
                            this.rols = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
                console.log(this.rols);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.rolLocationService.query().subscribe(
            (res: HttpResponse<IRolLocation[]>) => {
                this.rolLocations = res.body;
                console.log(this.rolLocations);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.countryLocationService.query().subscribe(
            (res: HttpResponse<ICountryLocation[]>) => {
                this.countryLocations = res.body;
                console.log(this.countryLocations);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.userRegistration.userName = this.userName;
        this.userRegistration.rol = this.userRegistration.rol.rol;
        console.log(this.userRegistration);

        if (this.userRegistration.id !== undefined) {
            this.subscribeToSaveResponse(this.userRegistrationService.update(this.userRegistration));
        } else {
            this.subscribeToSaveResponse(this.userRegistrationService.create(this.userRegistration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserRegistration>>) {
        result.subscribe((res: HttpResponse<IUserRegistration>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRolById(index: number, item: IRol) {
        return item.id;
    }
    /*get userRegistration() {
        return this._userRegistration;
    }

    set userRegistration(userRegistration: IUserRegistration) {
        this._userRegistration = userRegistration;
    }*/
}

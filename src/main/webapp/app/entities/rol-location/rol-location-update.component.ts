import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRolLocation } from 'app/shared/model/rol-location.model';
import { RolLocationService } from './rol-location.service';
import { IRol } from 'app/shared/model/rol.model';
import { RolService } from 'app/entities/rol';
import { ILanguage } from 'app/shared/model/language.model';
import { LanguageService } from 'app/entities/language';

@Component({
    selector: 'jhi-rol-location-update',
    templateUrl: './rol-location-update.component.html'
})
export class RolLocationUpdateComponent implements OnInit {
    private _rolLocation: IRolLocation;
    isSaving: boolean;

    rols: IRol[];

    languages: ILanguage[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private rolLocationService: RolLocationService,
        private rolService: RolService,
        private languageService: LanguageService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        console.log(this.activatedRoute.data);
        this.activatedRoute.data.subscribe(({ rolLocation }) => {
            this.rolLocation = rolLocation;
        });
        this.rolService.query().subscribe(
            (res: HttpResponse<IRol[]>) => {
                this.rols = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.languageService.query().subscribe(
            (res: HttpResponse<ILanguage[]>) => {
                this.languages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.rolLocation.id !== undefined) {
            this.subscribeToSaveResponse(this.rolLocationService.update(this.rolLocation));
        } else {
            this.subscribeToSaveResponse(this.rolLocationService.create(this.rolLocation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRolLocation>>) {
        result.subscribe((res: HttpResponse<IRolLocation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLanguageById(index: number, item: ILanguage) {
        return item.id;
    }
    get rolLocation() {
        return this._rolLocation;
    }

    set rolLocation(rolLocation: IRolLocation) {
        this._rolLocation = rolLocation;
    }
}

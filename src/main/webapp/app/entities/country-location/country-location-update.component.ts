import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICountryLocation } from 'app/shared/model/country-location.model';
import { CountryLocationService } from './country-location.service';
import { ILanguage } from 'app/shared/model/language.model';
import { LanguageService } from 'app/entities/language';

@Component({
    selector: 'jhi-country-location-update',
    templateUrl: './country-location-update.component.html'
})
export class CountryLocationUpdateComponent implements OnInit {
    private _countryLocation: ICountryLocation;
    isSaving: boolean;

    languages: ILanguage[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private countryLocationService: CountryLocationService,
        private languageService: LanguageService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ countryLocation }) => {
            this.countryLocation = countryLocation;
        });
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
        if (this.countryLocation.id !== undefined) {
            this.subscribeToSaveResponse(this.countryLocationService.update(this.countryLocation));
        } else {
            this.subscribeToSaveResponse(this.countryLocationService.create(this.countryLocation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICountryLocation>>) {
        result.subscribe((res: HttpResponse<ICountryLocation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLanguageById(index: number, item: ILanguage) {
        return item.id;
    }
    get countryLocation() {
        return this._countryLocation;
    }

    set countryLocation(countryLocation: ICountryLocation) {
        this._countryLocation = countryLocation;
    }
}

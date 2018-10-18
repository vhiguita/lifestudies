import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICountryLocation } from 'app/shared/model/country-location.model';

@Component({
    selector: 'jhi-country-location-detail',
    templateUrl: './country-location-detail.component.html'
})
export class CountryLocationDetailComponent implements OnInit {
    countryLocation: ICountryLocation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ countryLocation }) => {
            this.countryLocation = countryLocation;
        });
    }

    previousState() {
        window.history.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRolLocation } from 'app/shared/model/rol-location.model';

@Component({
    selector: 'jhi-rol-location-detail',
    templateUrl: './rol-location-detail.component.html'
})
export class RolLocationDetailComponent implements OnInit {
    rolLocation: IRolLocation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rolLocation }) => {
            this.rolLocation = rolLocation;
        });
    }

    previousState() {
        window.history.back();
    }
}

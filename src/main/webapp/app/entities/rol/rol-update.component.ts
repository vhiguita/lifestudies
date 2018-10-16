import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRol } from 'app/shared/model/rol.model';
import { RolService } from './rol.service';

@Component({
    selector: 'jhi-rol-update',
    templateUrl: './rol-update.component.html'
})
export class RolUpdateComponent implements OnInit {
    private _rol: IRol;
    isSaving: boolean;

    constructor(private rolService: RolService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rol }) => {
            this.rol = rol;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.rol.id !== undefined) {
            this.subscribeToSaveResponse(this.rolService.update(this.rol));
        } else {
            this.subscribeToSaveResponse(this.rolService.create(this.rol));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRol>>) {
        result.subscribe((res: HttpResponse<IRol>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get rol() {
        return this._rol;
    }

    set rol(rol: IRol) {
        this._rol = rol;
    }
}

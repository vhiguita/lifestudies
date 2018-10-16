import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRolLocation } from 'app/shared/model/rol-location.model';

type EntityResponseType = HttpResponse<IRolLocation>;
type EntityArrayResponseType = HttpResponse<IRolLocation[]>;

@Injectable({ providedIn: 'root' })
export class RolLocationService {
    private resourceUrl = SERVER_API_URL + 'api/rol-locations';

    constructor(private http: HttpClient) {}

    create(rolLocation: IRolLocation): Observable<EntityResponseType> {
        return this.http.post<IRolLocation>(this.resourceUrl, rolLocation, { observe: 'response' });
    }

    update(rolLocation: IRolLocation): Observable<EntityResponseType> {
        return this.http.put<IRolLocation>(this.resourceUrl, rolLocation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRolLocation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRolLocation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

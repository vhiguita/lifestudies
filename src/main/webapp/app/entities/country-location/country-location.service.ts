import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICountryLocation } from 'app/shared/model/country-location.model';

type EntityResponseType = HttpResponse<ICountryLocation>;
type EntityArrayResponseType = HttpResponse<ICountryLocation[]>;

@Injectable({ providedIn: 'root' })
export class CountryLocationService {
    private resourceUrl = SERVER_API_URL + 'api/country-locations';

    constructor(private http: HttpClient) {}

    create(countryLocation: ICountryLocation): Observable<EntityResponseType> {
        return this.http.post<ICountryLocation>(this.resourceUrl, countryLocation, { observe: 'response' });
    }

    update(countryLocation: ICountryLocation): Observable<EntityResponseType> {
        return this.http.put<ICountryLocation>(this.resourceUrl, countryLocation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICountryLocation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICountryLocation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

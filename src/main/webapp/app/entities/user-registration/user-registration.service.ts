import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserRegistration } from 'app/shared/model/user-registration.model';

type EntityResponseType = HttpResponse<IUserRegistration>;
type EntityArrayResponseType = HttpResponse<IUserRegistration[]>;

@Injectable({ providedIn: 'root' })
export class UserRegistrationService {
    private resourceUrl = SERVER_API_URL + 'api/user-registrations';

    constructor(private http: HttpClient) {}

    create(userRegistration: IUserRegistration): Observable<EntityResponseType> {
        return this.http.post<IUserRegistration>(this.resourceUrl, userRegistration, { observe: 'response' });
    }

    update(userRegistration: IUserRegistration): Observable<EntityResponseType> {
        return this.http.put<IUserRegistration>(this.resourceUrl, userRegistration, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserRegistration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserRegistration[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

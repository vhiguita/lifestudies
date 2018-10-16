import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userAccount = 'ksuhiyp';
  constructor(
    private http: HttpClient,
    private httpClient: HttpClient,
  ) { }
  getCities(countryCode): Promise<any> {
    console.log(countryCode);
    // const url = 'http://www.trackingarea.com:8081/Service.svc/getVehicleLocation/' + userAccount + '/' + userPass;
    const url = 'https://api.geonames.org/searchJSON?username=' + this.userAccount + '&country=' + countryCode + '&maxRows=1000&style=SHORT';
    // const url = 'https://geodata.solutions/restapi?country=' + countryCode;
    return this.http.get(url, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}})
      .toPromise()
      .then(obj => {
        return obj;
      });
  }
}

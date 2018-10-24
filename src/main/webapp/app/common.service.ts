import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userAccount = 'ksuhiyp';
  constructor(
    private http: HttpClient,
    private httpClient: HttpClient,
  ) { }
  /*getCities(countryCode): Promise<any> {
    console.log(countryCode);
    const url = 'https://api.geonames.org/searchJSON?username=' + this.userAccount + '&country=' + countryCode + '&maxRows=1000&style=SHORT';
    // const url = 'https://geodata.solutions/restapi?country=' + countryCode;
    return this.http.get(url, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8'}})
      .toPromise()
      .then(obj => {
        return obj;
      });
  }*/
  getResource(): any {
    let data;
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: 'https://server.bookandlearn.com/masterkey/integration/lifestudies/widget/olOICvdjKJAOaEIGtnEZRTsN/city?country=CA',
      async: false,
    }).done(function(resp) {
        data = resp;
    });
    return data;
  }
  getCities(): any {
    let data;
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: 'https://server.bookandlearn.com/masterkey/integration/lifestudies/widget/olOICvdjKJAOaEIGtnEZRTsN/city',
      async: false,
    }).done(function(resp) {
        data = resp;
    });
    return data;
  }
}

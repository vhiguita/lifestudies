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
  // userAccount = 'ksuhiyp';
  token1 = 'olOICvdjKJAOaEIGtnEZRTsN';
  token2 = 'o8f1ZipUW9i2wT2N8YOk0syV';
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
  // service to get all the cities
  getCities(): any {
    let data;
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: 'https://server.bookandlearn.com/masterkey/integration/lifestudies/widget/'+this.token1+'/city',
      async: false,
    }).done(function(resp) {
        data = resp;
    });
    return data;
  }
  // service to get all the course categories by course type
  getCourseCategoriesByCourseType(type): any {
    let data;
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/courseCategory?courseType='+type,
      async: false,
    }).done(function(resp) {
        data = resp;
    });
    return data;
  }
  // service to get all the available courses
  getCourses(o): any {
    // console.log(o);
    let data = {};
    let url_;
    if(o.startDate!== undefined) {
      url_ = 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course?courseType='+o.courseType+'&courseCategory='+
      o.courseCategory+'&countryCode='+o.countryCode+'&city='+o.cityId+'&startDate='+o.startDate;
    } else {
      url_ = 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course?courseType='+o.courseType+'&courseCategory='+
      o.courseCategory+'&countryCode='+o.countryCode+'&city='+o.cityId;
    }

    // url_ = 'https://server.bookandlearn.com/masterkey/courseWidget/o8f1ZipUW9i2wT2N8YOk0syV/course?courseType=Language&courseCategory=General&countryCode=CA&city=1';
    try {
      $.ajax({
        crossDomain: true,
        type: 'GET',
        dataType: 'json',
        url: url_,
        async: false,
      }).done(function(resp) {
          data = resp;
      });
    } catch (e) {

    }
    return data;
  }
  getCoursePrice_1(courseId,startDate,exchangeISO): any {
    let data;
    let price = 0;
    let currency='';
    // const exchangeISO='COP';
    let exchangePrice = 0;
    let url_;
    if(startDate === undefined) {
      url_ = 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course/'+courseId+'/price';
    } else {
      url_ = 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course/'+courseId+'/price?startDate='+startDate;
    }
    // console.log(url_);
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: url_,
      async: false,
    }).done(function(resp) {
        data = resp;
        price = data.lines[0].total;
        currency = data.lines[0].currency;
        // console.log(price+' '+currency);

    });
    const url1= 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/currencyRates/'+currency;
    // console.log(url1);
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: url1,
      async: false,
    }).done(function(resp) {
        const rateObj = resp.rates.filter(element => element.currency === exchangeISO);
        exchangePrice = Math.round(price * rateObj[0].rate);
        /*for(let i=0;i<resp.rates.length;i++) {
           if(resp.rates[i].currency === exchangeISO) {
              exchangePrice = Math.round(price * resp.rates[i].rate);
              break;
           }
        }*/
    });
    return exchangePrice;
  }
  getCourseRegularPrice_1(courseId,startDate,exchangeISO): any {
    let data;
    let price = 0;
    let currency='';
    // const exchangeISO='COP';
    let exchangePrice = 0;
    let url_;
    if(startDate === undefined) {
      url_ = 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course/'+courseId+'/price';
    } else {
      url_ = 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course/'+courseId+'/price?startDate='+startDate;
    }
    // console.log(url_);
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: url_,
      async: false,
    }).done(function(resp) {
        data = resp;
        price = data.lines[0].regularPrice;
        currency = data.lines[0].currency;
        // console.log(price+' '+currency);

    });
    const url1= 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/currencyRates/'+currency;
    // console.log(url1);
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: url1,
      async: false,
    }).done(function(resp) {
        const rateObj = resp.rates.filter(element => element.currency === exchangeISO);
        exchangePrice = Math.round(price * rateObj[0].rate);
        /*for(let i=0;i<resp.rates.length;i++) {
           if(resp.rates[i].currency === exchangeISO) {
              exchangePrice = Math.round(price * resp.rates[i].rate);
              break;
           }
        }*/
    });
    return exchangePrice;
  }
  getCoursePrice_2(courseId, qty, startDate, exchangeISO): any {
    let data;
    let price = 0;
    let currency='';
    // const exchangeISO='COP';
    let exchangePrice = 0;
    let url_;
    if(startDate === undefined) {
      url_ = 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course/'+courseId+'/price?qty='+qty;
    } else {
      url_ = 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course/'+courseId+'/price?qty='+qty+'&startDate='+startDate;
    }
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: url_,
      async: false,
    }).done(function(resp) {
        data = resp;
        price = data.lines[0].total;
        currency = data.lines[0].currency;
        // console.log(price+' '+currency);

    });
    const url1= 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/currencyRates/'+currency;
    // console.log(url1);
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: url1,
      async: false,
    }).done(function(resp) {
      const rateObj = resp.rates.filter(element => element.currency === exchangeISO);
      exchangePrice = Math.round(price * rateObj[0].rate);
        /*for(let i=0;i<resp.rates.length;i++) {
           if(resp.rates[i].currency === exchangeISO) {
              exchangePrice = Math.round(price * resp.rates[i].rate);
              // console.log(exchangePrice);
              break;
           }
        }*/
    });
    return exchangePrice;
  }
  getCourseRegularPrice_2(courseId, qty, startDate, exchangeISO): any {
    let data;
    let price = 0;
    let currency='';
    // const exchangeISO='COP';
    let exchangePrice = 0;
    let url_;
    if(startDate === undefined) {
      url_ = 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course/'+courseId+'/price?qty='+qty;
    } else {
      url_ = 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course/'+courseId+'/price?qty='+qty+'&startDate='+startDate;
    }
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: url_,
      async: false,
    }).done(function(resp) {
        data = resp;
        price = data.lines[0].regularPrice;
        currency = data.lines[0].currency;
        // console.log(price+' '+currency);

    });
    const url1= 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/currencyRates/'+currency;
    // console.log(url1);
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: url1,
      async: false,
    }).done(function(resp) {
      const rateObj = resp.rates.filter(element => element.currency === exchangeISO);
      exchangePrice = Math.round(price * rateObj[0].rate);
        /*for(let i=0;i<resp.rates.length;i++) {
           if(resp.rates[i].currency === exchangeISO) {
              exchangePrice = Math.round(price * resp.rates[i].rate);
              // console.log(exchangePrice);
              break;
           }
        }*/
    });
    return exchangePrice;
  }
  getInstituteInfo(instituteId): any {
    let data;
    $.ajax({
      crossDomain: true,
      type: 'GET',
      dataType: 'json',
      url: 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/institute/'+instituteId,
      async: false,
    }).done(function(resp) {
        data = resp;
    });
    return data;
  }
  getAcommodationListByCourse(courseId): any {
    let data;
    try {
      $.ajax({
        crossDomain: true,
        type: 'GET',
        dataType: 'json',
        url: 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course/'+courseId+'/accommodation',
        async: false,
      }).done(function(resp) {
          data = resp;
      });
    } catch(e) {
    }
    return data;
  }
  getTotalPriceWithAcommodation(courseId, variantId, accommodationId, qty, startDate, exchangeISO) {
    let d;
    try {
      const param = {
                    'courseLine': {
                      'qty': qty,
                      'product': variantId,
                      'startDate':  startDate
                    },
                    'accommodationLine': {
                      'qty': qty,
                      'product': accommodationId,
                      'startDate': startDate
                    }
                  };
        const p = JSON.stringify(param);
        console.log(p);
        $.ajax({
          crossDomain: true,
          type: 'POST',
          dataType: 'json',
          url: 'https://server.bookandlearn.com/masterkey/courseWidget/'+this.token2+'/course/'+courseId+'/draft',
          data: p,
          async: false,
        }).done(function(resp) {
            console.log(resp);
            d = resp;
        });
    } catch(e) {
    }
    return d;
  }
}

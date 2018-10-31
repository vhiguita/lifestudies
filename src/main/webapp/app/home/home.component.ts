import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {CommonService} from '../common.service';
import { JhiEventManager } from 'ng-jhipster';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import { LoginModalService, Principal, Account } from 'app/core';
declare var $: any;

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    weekNumber: any = [];
    coursesCategory: any = [];
    courses: any = [];
    singleSelect: any = [];
    c: any = [];
    title = 'app';
    tab = 1;
    hideSection: any = true;
    config = {
      displayKey: 'name', // if objects array passed which key to be displayed defaults to description
      search: true,
      limitTo: 3
    };
    cities: any = [];
    citiesAux: any = [];
    citiesBuffer: any = [];
    coursesType: any = [{id:'Language',description:'Idiomas'},
    {id:'SummerCamp',description:'SummerCamp'},
    {id:'WorkExperience',description:'Experiencia Laboral'},
    {id:'ShortTerm',description:'Corto Plazo'},
    {id:'Degree',description:'Grado'}];
    o: any= {};
    bufferSize = 50;
    loading = false;
    public model: any;
    public search: any;

    private value:any = {};
    private _disabledV = '0';
    private disabled = false;
    public items:Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];
    options = [
    {
      '_id': '5a66d6c31d5e4e36c7711b7a',
      'index': 0,
      'balance': '$2,806.37',
      'picture': 'http://placehold.it/32x32',
      'name': 'Burns Dalton'
    },
    {
      '_id': '5a66d6c3657e60c6073a2d22',
      'index': 1,
      'balance': '$2,984.98',
      'picture': 'http://placehold.it/32x32',
      'name': 'Mcintyre Lawson'
    },
    {
      '_id': '5a66d6c376be165a5a7fae33',
      'index': 2,
      'balance': '$2,794.16',
      'picture': 'http://placehold.it/32x32',
      'name': 'Amie Franklin'
    }
  ];

  constructor(
      public parserFormatter: NgbDateParserFormatter,
      private principal: Principal,
      private commonService: CommonService,
      private loginModalService: LoginModalService,
      private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        for(let i=1;i<=52;i++) {
          this.weekNumber.push({id:i,description:i});
        }
        this.cities = this.commonService.getCities().resourceList;
        this.cities.map( i => { i.description = i.name+', '+i.district+', '+i.countryCode; return i; });
        this.citiesBuffer = this.cities.slice(0, this.bufferSize);
        // console.log(this.cities);
        // console.log(this.cities.length);
        for(let i=0;i<this.cities.length;i++) {
          this.cities[i].description = this.cities[i].description.replace('null, ','');
          this.citiesAux[i] = this.cities[i].description;
        }
        // console.log(this.citiesAux);
        // this.coursesCategory = this.commonService.getCourseCategories().resourceList;
        this.search = (text$: Observable<string>) =>
        text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(term => term.length < 2 ? []
            : this.citiesAux.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        );
    }
    /*private get disabledV():string {
      return this._disabledV;
    }

    private set disabledV(value:string) {
      this._disabledV = value;
      this.disabled = this._disabledV === '1';
    }

    public selected(value:any):void {
      console.log('Selected value is: ', value);
    }

    public removed(value:any):void {
      console.log('Removed value is: ', value);
    }

    public typed(value:any):void {
      console.log('New search input: ', value);
    }

    public refreshValue(value:any):void {
      this.value = value;
    }
    changeValue($event: any) {
      console.log($event);
    }*/
    fetchMore() {
      const len = this.citiesBuffer.length;
      const more = this.cities.slice(len, this.bufferSize + len);
      this.loading = true;
      // using timeout here to simulate backend API delay
      setTimeout(() => {
          this.loading = false;
          this.citiesBuffer = this.citiesBuffer.concat(more);
      }, 200);
    }
    getCoursesCategories(e): void {
      this.coursesCategory = [];
      this.o.courseCategory = null;
      this.coursesCategory = this.commonService.getCourseCategoriesByCourseType(e).resourceList;
      // console.log(this.coursesCategory);
    }
    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    searchCourses() {
      // console.log(this.model);
      this.c = [];
      let cityId, results;
      let z=0;

      for(let i=0;i<this.cities.length;i++) {
         if(this.model === this.cities[i].description) {
            cityId = this.cities[i].id;
            break;
         }
      }
      // console.log(cityId);
      this.o.countryCode = this.model.slice(-2);
      this.o.cityId = cityId;
      try {
        this.o.startDate = this.o.courseStartDate._i;
      } catch(err) {
        this.o.startDate = undefined;
      }

      // console.log(this.o);
      results = this.commonService.getCourses(this.o);
      if(results !== {}) {
        this.courses =results.resourceList;
        // console.log(this.o.numberOfWeek);
        if(this.o.numberOfWeeks!== undefined) {
          for(let j=0;j<this.courses.length;j++) {
            if(this.o.numberOfWeeks>=this.courses[j].variant[0].duration.min&&
              this.o.numberOfWeeks<=this.courses[j].variant[0].duration.max) {
                // console.log(this.courses[j].variant[0].duration); // number of weeks of the course

                this.c[z] = this.courses[j];
                if(this.o.numberOfWeeks>1) {
                  this.c[z].price = this.commonService.getCoursePrice_2(this.c[z].id, this.o.numberOfWeeks, this.o.startDate);
                } else {
                  this.c[z].price = this.commonService.getCoursePrice_1(this.c[z].id, this.o.startDate);
                }

                const imgUrl =this.courses[j].institute.featuredImageUri;

                if(imgUrl.includes('https://bookandlearn.s3.amazonaws.com') === false) {
                  this.courses[j].institute.featuredImageUri = 'https://bookandlearn.s3.amazonaws.com' + '/' + imgUrl;
                }
                // console.log(this.courses[j].institute.featuredImageUri);
                z++;
            }
          }
          console.log(this.c);
          if(this.c.length === 0) {
            this.hideSection = false;
          } else {
            this.hideSection = true;
          }
        } else {
          this.c = this.courses;
          console.log(this.c);
          for(let j=0;j<this.c.length;j++) {
              this.c[z].price = this.commonService.getCoursePrice_1(this.c[z].id, this.o.startDate);
              const imgUrl =this.courses[j].institute.featuredImageUri;
              if(imgUrl.includes('https://bookandlearn.s3.amazonaws.com') === false) {
                this.courses[j].institute.featuredImageUri = 'https://bookandlearn.s3.amazonaws.com' + '/' + imgUrl;
              }
              // console.log(this.courses[j].institute.featuredImageUri);
              // console.log(this.commonService.getCoursePrice(this.c[j].id));
          }
          if(this.c.length === 0) {
            this.hideSection = false;
          } else {
            this.hideSection = true;
          }
        }
      }
    }
}

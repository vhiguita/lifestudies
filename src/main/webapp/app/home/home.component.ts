import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {CommonService} from '../common.service';
import { JhiEventManager } from 'ng-jhipster';

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
    cities: any = [];
    citiesBuffer: any = [];
    coursesType: any = [{id:'Language',description:'Idiomas'},
    {id:'SummerCamp',description:'SummerCamp'},
    {id:'WorkExperience',description:'Experiencia Laboral'},
    {id:'ShortTerm',description:'Corto Plazo'},
    {id:'Degree',description:'Grado'}];
    o: any= {};
    bufferSize = 50;
    loading = false;
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

  private value:any = {};
  private _disabledV = '0';
  private disabled = false;

  private get disabledV():string {
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
        console.log(this.cities);
        console.log(this.cities.length);
    }
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
}

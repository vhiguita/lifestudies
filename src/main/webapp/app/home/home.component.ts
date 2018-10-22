import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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
    courses: any = [];
    o: any= {};

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
        console.log(this.commonService.getResource());
        /* $.ajax({
          crossDomain: true,
          type: 'GET',
          dataType: 'json',
          url: 'https://server.bookandlearn.com/masterkey/integration/lifestudies/widget/olOICvdjKJAOaEIGtnEZRTsN/city?country=CA',
        }).done(function(data) {
            console.log(data);
        }); */
      /*  $.ajax({
          crossDomain: true,
          type: 'GET',
          dataType: 'json',
          url: 'https://server.bookandlearn.com/masterkey/integration/lifestudies/widget/olOICvdjKJAOaEIGtnEZRTsN/city?country=CA',
          success: function(responseData, textStatus, jqXHR) {
              // const data = JSON.parse(responseData);
              console.log(responseData);
          },
          error: function(responseData, textStatus, errorThrown) {
              alert('POST failed.');
          }
      });*/
        // console.log(this.weekNumber);
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

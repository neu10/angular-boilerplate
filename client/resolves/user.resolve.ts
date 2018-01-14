import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import * as _ from 'lodash';

// Import Assets service
import { LoginService }    from '../services/login.service';

@Injectable()

export class UserResolves implements Resolve<any> {


  // Variables
  configResolveData: any;
  constructor(
    private loginService  :  LoginService
    ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise(resolve => {
      this.loginService.getUser().subscribe( (assets: any) => {
        resolve(assets);
      });
    });
  }
}
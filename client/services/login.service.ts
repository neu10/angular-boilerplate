import { Injectable }  from '@angular/core';
import { Http, Jsonp, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { CommonHTTPService } from './common-http.service';

@Injectable()

export class LoginService {

  // Variables
  private user        :            Object;
  private observable  :            Observable<any>;
  private uri         :            string = location.origin;

  constructor(
    private commonHttp:  CommonHTTPService
  ){}

  login(payload) {
      let data = {
        'url' : '/auth/login',
        'data': payload
      };
      
    let observable = this.commonHttp.post(data).map((response: any) => {
      return response;
    });

    return observable;
  }

  get(payload) {
    let observable;
    if(this.user) {
      observable = new Observable(observer => {
        observer.next(this.user);
      });
    } else {
      let data = {
        'url' : '/login',
        'data': payload
      };
  
      observable = this.commonHttp.post(data).map((response: any) => {
        this.user = response;
        return response
      });

    }
    
    return observable;
  }
  
  checkIfUserHasCompletedProfile(){
    let data = {
      'url' : '/getUserProfile'
    };
    let observable = this.commonHttp.get(data).map((response: any) => {
      return response;
    });
  
    return observable;
  }

  getUser() {
    let data = {
      'url' : '/getUser'
    };
    let observable = this.commonHttp.get(data).map((response: any) => {
      return response;
    });

    return observable;
  }

  postMobile(mobile) {
    let payload = {
      'url' : '/postMobile',
      'data' : {
        mobileNumber:  mobile
      }
    };
    let observable = this.commonHttp.post(payload).map((response: any) => {
      return response;
    });
    return observable;
  }
}
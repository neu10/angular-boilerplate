import { Injectable }  from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {CommonHTTPService} from './common-http.service';


@Injectable()

export class HomePageService {

  // Variables
  private observable  :            Observable<any>;
  private uri         :            string = location.origin;

  constructor(
    private http:  CommonHTTPService
  ){}

  subscribeTo(payload) {
    let data = {
      'url' : '/common/subscribe',
      'data': payload
    };
    let observable;
    observable = this.http.post(data).map((response: any) => {
      return response
    });
    
    return observable;
  }

  contactUs(payload) {
    let data = {
      'url' : '/common/contact',
      'data': payload
    };
    let observable = this.http.post(data).map((response: any) => {
      return response;
    });
    return observable;
  }
}
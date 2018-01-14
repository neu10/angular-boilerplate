import { Injectable }  from '@angular/core';
import { Http, Jsonp, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { CommonHTTPService } from './common-http.service';


@Injectable()

export class AssetsService {

  // Variables
  private assets      :            Object;
  private observable  :            Observable<any>;
  private uri         :            string = location.origin;

  constructor(
    private http:  CommonHTTPService
  ){}

  get() {
    let data = {
      'url' : '/getImages',
    };
    let observable;
    if(this.assets) {
      observable = new Observable(observer => {
        observer.next(this.assets);
      });
    } else {
      observable = this.http.get(data).map((response: any) => {
        this.assets = response;
        return response
      });
    }
    
    return observable;
  }
}
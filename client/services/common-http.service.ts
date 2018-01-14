import { Injectable }  from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { NgSpinningPreloader } from 'ng2-spinning-preloader';

@Injectable()

export class CommonHTTPService {
    
    // Variables
    private observable  :            Observable<any>;
    private uri         :            string = location.origin;
    
    static counter: number = 0;
    constructor(
        private http:  HttpClient,
        private ngSpinningPreloader : NgSpinningPreloader
    ){}
    
    get(payload) {
        this.ngSpinningPreloader.start();
        CommonHTTPService.counter += 1;
        let observable;
        observable = this.http.get(this.uri + payload.url, payload.data).map((response: any) => {
            CommonHTTPService.counter -= 1;
            if(CommonHTTPService.counter === 0) {
                this.ngSpinningPreloader.stop();
            }
            return response
        });
        
        return observable;
    }
    
    post(payload) {
        this.ngSpinningPreloader.start();
        CommonHTTPService.counter += 1;
        let observable;
        observable = this.http.post(this.uri + payload.url, payload.data).map((response: any) => {
            CommonHTTPService.counter -= 1;
            if(CommonHTTPService.counter === 0) {
                this.ngSpinningPreloader.stop();
            }
            return response
        });
        return observable;
    }
}
import { Component } from "@angular/core";
import * as _ from "lodash";
import {NavigationEnd, Router} from '@angular/router';
import { NgSpinningPreloader } from 'ng2-spinning-preloader';

@Component({
    selector: "my-app",
    templateUrl: "./app.pug",
    styleUrls: [ "./app.scss" ]
})
export class AppComponent {
    
    constructor(private router: Router,
                private ngSpinningPreloader : NgSpinningPreloader) {
    }
    
    ngOnInit(){
        this.router.events.subscribe((event) => {
            if(!(event instanceof NavigationEnd)){
                return;
            }
            window.scrollTo(0,0);
            this.ngSpinningPreloader.stop();
        });
    }
}
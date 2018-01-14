import { NgModule }                      from "@angular/core";
import { FormsModule }                   from "@angular/forms";
import { CommonModule }                  from '@angular/common';
import { HttpModule }                    from "@angular/http";
import { SharedModule }                  from '../shared/shared.module';
import { HomeRoutingModule }             from './home.routing.module';

// Import all the components
import { HomeComponent }                 from '../../components/home/home.component';

// Imports all dependant services
import { AssetsService }                 from '../../services/assets.service';
import { MdDatepickerModule } from '@angular/material';
import { Md2DatepickerModule }  from 'md2-datepicker';


@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        SharedModule,
        HomeRoutingModule,
        MdDatepickerModule,
        Md2DatepickerModule.forRoot(),
    ],
    providers: [
    ],
    declarations: [
      HomeComponent,
    ],
    exports: [
      HomeComponent,
    ]
})
export class HomeModule {
  constructor() {
  }
}
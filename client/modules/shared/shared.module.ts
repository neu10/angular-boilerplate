import { NgModule } from "@angular/core";
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule }                     from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule }           from '@angular/router';
import { RecaptchaModule }    from 'ng-recaptcha';

// Resolves
import { UserResolves }       from '../../resolves/user.resolve';
// Services
import { LoginService }       from '../../services/login.service';

// Import all the components
import { HeaderComponent }    from '../layout/header/header.component';
import { FooterComponent }    from '../layout/footer/footer.component';
import { NavComponent }       from '../layout/nav/nav.component';
import { InfoComponent }      from '../layout/info/info.component';

import { HomePageService }               from '../../services/homepage.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,
        RecaptchaModule.forRoot()
    ],
    providers: [
        UserResolves,
        LoginService,
        HomePageService
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        NavComponent,
        InfoComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        NavComponent,
        InfoComponent,
    ]
})
export class SharedModule {}
import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import components to use
import { HomeComponent }        from '../../components/home/home.component';

// Import all resolves


const routes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: HomeComponent,
    resolve: {
    },
    data: {
      showNav: false
    }
  }]

}, {
  path: 'resetemail',
  children: [{
    path: '',
    component: HomeComponent,
    resolve: {
    },
    data: {
      showNav: false,
      showResetPassword: true
    }
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {

  constructor() {
  }
}
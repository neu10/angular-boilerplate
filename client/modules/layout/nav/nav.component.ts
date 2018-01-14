import { Component }          from '@angular/core';
import { Router }             from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.pug',
  styleUrls: ['./nav.scss']
})

export class NavComponent {
  navElements:    Object = {};

  constructor() {
    let blogUrl = "http://www.blog.ireliefservices.com";
    
    this.navElements = [{
      name: 'Home',
      routerLink: '/home'
    },{
      name: 'About',
      routerLink: '/about'
    },{
      name: 'Service',
      routerLink: '/service'
    },{
      name: 'Reviews',
      routerLink: '/reviews'
    },{
      name: 'Blog',
      link: blogUrl
    }, {
      name: 'Contact',
      routerLink: '/contact'
    }]
  }


}
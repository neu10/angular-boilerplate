import { Component }          from '@angular/core';
import { ActivatedRoute }     from '@angular/router';

@Component({
  selector: 'footer',
  templateUrl: './footer.pug',
  styleUrls: ['./footer.scss']
})

export class FooterComponent {
  
  private assets;
  private footerImages    :  string;
  private socialImages    :  Object = {};
  private quickLinks      :  Object = {};
  
  private footerTexts     :  Object = {};
  
  constructor(
      private route:    ActivatedRoute
  ){
    let blogUrl = "http://www.blog.ireliefservices.com";
    
    this.quickLinks = [{
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
    }];
    
    this.footerTexts = {
      quickLink  :  'Quick Links',
      terms:  'Terms and Conditions',
      privacy: 'Privacy Policy',
      cancellation:  'Cancellation',
      copyright: '© Copyright- 2016 by iRelief Services Private Limited, All Rights Reserved'
    }
  }
  
  navigateTo(url) {
    window.open(url,'_blank');
  }
}
import { asNativeElements, Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router }                                    from '@angular/router';

import * as _ from 'lodash';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'header',
  templateUrl: './header.pug',
  styleUrls: ['./header.scss']
})

export class HeaderComponent {

  private username;
  private user : any;
  private password;
  private isMobile : boolean = false;
  private countryCode;
  checkedTerms;
  invalidCreds : boolean;
  isSignedIn:      Boolean = false;
  navElements       :      Object = {};
  private mobile : any;
  private resetPassword:     boolean = false;
  
  @Output() userSet = new EventEmitter<any>();
  
  // Variables
  headerData        :      Object = {}
  type              :      string = '';
  subtype              :      string = '';
  showUserInfo      :      boolean = false;
  userInfo          :      Object = {};
  resetEmail        :      boolean = false;

  // Login modal variables
  loginObj          :      Object = {};

  constructor(
    private route:  ActivatedRoute,
    private loginService : LoginService,
    private router : Router
  ) {
      
      
      // Side nav elements
      this.navElements = [{
        name: 'Home',
        link: '/home'
      },{
        name: 'About',
        link: '/about'
      },{
        name: 'Service',
        link: '/service'
      },{
        name: 'Reviews',
        link: '/reviews'
      },{
        name: 'Blog',
        link: '/blog'
      }, {
        name: 'Contact',
        link: '/contact'
      }]
  }

  ngAfterViewInit() {
    $(".button-collapse").sideNav();


    if(this.type === 'getMobile') {
      (<any>$('#login')).modal();
      (<any>$('#login')).modal('open');
    } else if(this.type === 'newPassword') {
      (<any>$('#login')).modal();
      (<any>$('#login')).modal('open');
    }
  }

  navigateToOtp(event) {
    this.mobile = event.payload.value;
    this.type = 'otp';
    this.resetPassword = true;
  }

  navigateTo(event) {
    (<any>$('#login')).modal();
    (<any>$('#login')).modal('close');
    this.handleLogin(event);
  }

  askNewPassword(event) {
    this.type = 'newPassword';
  }
  
  otpVerified(event) {
    console.log('OTP verified in Header component');
    this.loginService.getUser().subscribe((response :any )=>{
      (<any>$('.login-modal')).modal('close');
      if(response && response.user
          && response.user.response
          && response.user.response.data
          && response.user.response.data.user
          && !response.user.response.data.user.is_completed){
        this.router.navigate(['/profile']);
      }else{
        location.reload();
      }
    });
  }

  formatUserName() {
    if (this.username && this.username.match(/^\d+$/)) {
        this.isMobile = true;
        this.countryCode = '+91';
    }else {
        this.isMobile = false;
    }
  }

  handleLogin(type, event?) {
    this.type = type;
    this.subtype = '';
    (<any>$('#login')).modal();
    (<any>$('#login')).modal('open');
    (<any>$('#termsmodal')).modal({
          dismissible: false, // Modal can be dismissed by clicking outside of the modal
          opacity: .5, // Opacity of modal background
          inDuration: 300, // Transition in duration
          outDuration: 200, // Transition out duration
          startingTop: '5%', // Starting top style attribute
        }
    );
  }
  
  checkTerms(response){
    this.checkedTerms = response;
  }

  handleOtp(event) {
    this.mobile = event;
    this.type = 'otp';
  }

  validateOtp(event) {
    $('#login.modal').modal('close');
  }
  
  closeModal(response) {
    $('#login.modal').modal('close');
    this.userSet.emit(response.user);
    this.getUserParams(response);
  }
  
  setModalHeadingForOTP(){
    this.subtype = 'registerOtp';
  }
  
  getUserParams(response) {
    this.isSignedIn = true;
    this.username = response.user.first_name;
}

  ngOnInit() {
    $(".button-collapse").sideNav('hide');
  }

  ngOnDestroy() {
    $(".button-collapse").sideNav('hide');
  }

  logout() {
    window.location.href = location.origin + '/logout';
  }
}
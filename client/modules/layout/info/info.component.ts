import { Component }          from '@angular/core';

@Component({
  selector: 'info',
  templateUrl: './info.pug',
  styleUrls: ['./info.scss']
})

export class InfoComponent {

  private infoObject:    Object = {};

  constructor() {

    this.infoObject = [{
      name: 'ABOUT',
      desc: 'iRelief Services Private Limited is an Aggregator for Healthcare Services. The company\'s Headquarters\' is located inBangalore, Karnataka. iRelief provides innovative technology solution based services in the domain of healthcare ranging from ambulance, blood bank, homecare and pharmacy services. This initiative has been taken with an ambition to save the maximum lives possible with the humble objective of providing timely economical and best quality services pertaining to emergency and planned healthcare facilities.'
    }, {
      name: 'VISION',
      desc: 'To Be A Leading Enabler In Emergency and Health Services Globally Through Innovative Technology.'
    }, {
      name: 'MISSION',
      desc: 'To integrate with the best service providers and facilitate the healthcare services, reach people globally throughInnovative Technology and Leadership within the Cost and Time affordability. Ensure dedication and responsibility by adhering to Corporate Values and become a Single Point of Contact in providing Accurate Information of all Services by continuously improving to provide user friendly experience.'
    }];

  }
}
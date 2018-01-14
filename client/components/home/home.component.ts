import { Component }                    from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'home',
  templateUrl: './home.pug',
  styleUrls: ['./home.scss']
})

export class HomeComponent {
  
  arr = [];
  private remaining: number = 0;
  details : any = {};
  private lenders = [];
  dueDate;
  timeNow;
  initialNumber = 40;
  maxV = 500;
  limit = 20;
  points : number = 1.2;
  private timeToStart: any;
  private timeSteps: any;
  constructor(
      private route: ActivatedRoute
  ) { }
  
  ngAfterViewInit() {
  
  }
  
  addLender(details){
    console.log(details);
    console.log('details.dueDate  >>>  '+details.dueDate);
    details.dob = moment(details.dueDate).unix();
    details.checked = false;
    this.lenders.push(details);
    this.details = {};
  }
  
  clearedDue(lend){
  }
  
  getStatusOfAbc(){
  
  }
  
  getTimeS(timeToAdd){
    let newTime = timeToAdd*this.timeSteps;
    return moment(this.timeToStart, "HH:mm").add(newTime, 'm').format('HH:mm');
  }
  
  
  calculateOutcomes(initialNumber,points,days,maxValue,time){
    this.timeToStart = time;
    this.arr = [{}];
    for(let i = 0;i<days && initialNumber <= maxValue;i++){
      let data = initialNumber*points;
      this.arr[i] = {
        value: data.toFixed(2),
        checked: false
      };
      initialNumber = data.toFixed(2);
    }
    this.remaining = this.arr.length;
  }
  
  onChanged(value){
    value ? this.remaining-- : this.remaining++;
  }
  
  ngOnDestroy(){
  }
}
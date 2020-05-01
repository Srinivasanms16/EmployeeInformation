import { Component,OnInit,OnChanges,OnDestroy,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,Input, ViewChild,DoCheck, ElementRef } 
from '@angular/core';
import employee from "../Services/employee"
import {employees} from '../Services/employee.service'
@Component({
    selector:'emp',
    templateUrl:'./employeecomponent.html'
})
export class employeecomponent implements OnInit,OnChanges,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,DoCheck{
    
  emps:employee[];


    count:number = 0;
    constructor( private service:employees){
      this.count++;
      console.log(`its Constructor !-${this.count}`);
    }
  
    ngOnInit(){
      this.count++;
      console.log(`its onInit-${this.count}`);
      this.emps = this.service.getEmployees();
    }

    ngDoCheck(){
      debugger;
      this.count++;
      console.log(`its ngDocheck !-${this.count}`);
    }
  
    ngOnChanges(){
      debugger;
      this.count++;
      console.log(`its onChnages-${this.count}`);
    }
  
    ngAfterContentInit(){
      this.count++;
      console.log(`its AfterContent Init-${this.count}`);
    }
  
  ngAfterContentChecked(){
    this.count++;
    console.log(`its AfterContent Check-${this.count}`);
  }
  
  ngAfterViewInit(){
    this.count++;
    console.log(`its AfterView Init-${this.count}`);
  }
  
  ngAfterViewChecked(){
    this.count++;
    console.log(`its AfterView Check-${this.count}`);
  }


}
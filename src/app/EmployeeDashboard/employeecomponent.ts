import { Component,OnInit,OnChanges,OnDestroy,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,
  Input, ViewChild,DoCheck, ElementRef } 
from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import employee from "../Services/employee"
import {employees} from '../Services/employee.service'
import { Store } from "@ngrx/store";
import { employeeAction } from "../state/employeeState"
import { NgxSpinnerService } from "ngx-spinner"
//import { LoadEmployee } from "../state/EmployeeAction";
import { Observable } from 'rxjs';
@Component({
    selector:'emp',
    templateUrl:'./employeecomponent.html'
})
export class employeecomponent implements OnInit,OnChanges,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,DoCheck{
    
  emps:any;

    count:number = 0;
    constructor( private service:employees , private router:Router,
      private store:Store<any>, private spinner:NgxSpinnerService){
    }
  
    ngOnInit(){
      this.store.subscribe(x=>{
        if(x.employeeReducer.isloading)
        {
          this.spinner.show();
        }
        else
        {
          setTimeout(()=>{
            this.spinner.hide();
          },7000)
          this.emps = x.employeeReducer.employees;
         
        }
      });
      this.store.dispatch({type:employeeAction.Load_Employee});
    }

    ngDoCheck(){
     // this.count++;
      //console.log(`its ngDocheck !-${this.count}`);
    }
  
    ngOnChanges(){
     // this.count++;
      //console.log(`its onChnages-${this.count}`);
    }
  
    ngAfterContentInit(){
     // this.count++;
      //console.log(`its AfterContent Init-${this.count}`);
    }
  
  ngAfterContentChecked(){
    //this.count++;
    //console.log(`its AfterContent Check-${this.count}`);
  }
  
  ngAfterViewInit(){
    //this.count++;
    //console.log(`its AfterView Init-${this.count}`);
  }
  
  ngAfterViewChecked(){
   // this.count++;
    //console.log(`its AfterView Check-${this.count}`);
  }

  viewemp = (id)=>{
    debugger;
  this.router.navigate(['viewemployee',id]);
  }

  Editemp = (id)=>{
    debugger;
    this.router.navigate(["/add", { 'srini': 'heroId'}],{ queryParams: { empid: id}});
  }
  
  Deleteemp = (id)=>{
    debugger;
    // this.service.deleteEmployee(id).subscribe(d=>{
    //   console.log("user is deleted");
    //   this.service.getEmployees().subscribe(data=>{
    //     this.emps = data;

    //   });
    // });
    this.store.dispatch({type:employeeAction.Delete_Employee,payload:id});
  }
}
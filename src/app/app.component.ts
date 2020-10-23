import { Component,OnInit,OnChanges,OnDestroy,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,Input, ViewChildren, QueryList } 
from '@angular/core';
import { employeecomponent } from './EmployeeDashboard/employeecomponent';
import {Store} from "@ngrx/store";
import {LoadEmployee} from "./state/employeeState"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit,OnInit  {
  title = 'employee';

  @ViewChildren(employeecomponent) 
  ecomponent:QueryList<employeecomponent>;
  constructor(private store:Store<any>)
  {
    
  }

  ngOnInit(){
    this.store.dispatch(new LoadEmployee());
  }

  ngAfterViewInit(){
    //alert(`Number of employee componet present ${this.ecomponent.toArray().length}`);
    //alert(this.ecomponent.toArray()[0].count);
    //this.ecomponent.toArray()[0].ngOnChanges();
   // this.ecomponent.toArray()[0].varname.nativeElement.innerText="nithin shivaa";
  }


} 
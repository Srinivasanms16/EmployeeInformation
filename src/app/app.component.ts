import { Component,OnInit,OnChanges,OnDestroy,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,Input, ViewChildren, QueryList } 
from '@angular/core';
import { employeecomponent } from './EmployeeDashboard/employeecomponent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit  {
  title = 'employee';

  @ViewChildren(employeecomponent) 
  ecomponent:QueryList<employeecomponent>;
  constructor()
  {
    
  }

  ngAfterViewInit(){
    //alert(`Number of employee componet present ${this.ecomponent.toArray().length}`);
    //alert(this.ecomponent.toArray()[0].count);
    //this.ecomponent.toArray()[0].ngOnChanges();
   // this.ecomponent.toArray()[0].varname.nativeElement.innerText="nithin shivaa";
  }


}
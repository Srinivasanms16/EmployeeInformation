import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import{employeecomponent}  from './EmployeeDashboard/employeecomponent';
import { AddEmployee } from './AddEmployee/AddEmployee.component';
import{ attributehighlight } from './EmployeeDashboard/highlight.attribute'; 

import {employees} from './Services/employee.service';

let routes:Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home",component:employeecomponent},
  {path:"addemployee",component:AddEmployee},
  {path:"add",redirectTo:"addemployee"}
]

@NgModule({
  declarations: [
    AppComponent,employeecomponent,attributehighlight,AddEmployee
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [employees],
  bootstrap: [AppComponent]
})
export class AppModule { }

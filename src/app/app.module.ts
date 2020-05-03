import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { ReactiveFormsModule , FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import{employeecomponent}  from './EmployeeDashboard/employeecomponent';
import {viewEmployee} from './ViewEmployee/ViewEmployee.Component';
import { AddEmployee } from './AddEmployee/AddEmployee.component';
import{ attributehighlight } from './EmployeeDashboard/highlight.attribute'; 

import {employees} from './Services/employee.service';

let routes:Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home",component:employeecomponent},
  {path:"addemployee",component:AddEmployee},
  {path:"add",redirectTo:"addemployee"},
  {path:'viewemployee/:id',component:viewEmployee}
]

@NgModule({
  declarations: [
    AppComponent,employeecomponent,attributehighlight,AddEmployee,viewEmployee
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [employees],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { ReactiveFormsModule , FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import{employeecomponent}  from './EmployeeDashboard/employeecomponent';
import {viewEmployee} from './ViewEmployee/ViewEmployee.Component';
import { AddEmployee } from './AddEmployee/AddEmployee.component';
import{ attributehighlight } from './EmployeeDashboard/highlight.attribute'; 

import {employees} from './Services/employee.service';
import {EmployeeNeedToAddedOrUpdated} from './Services/EmployeeNeedToAdded'
import {IsAuthenticatedUser} from './Services/Authenticateuser';
import { employeeReducer,employeeEffects } from "./state/employeeState";
import{ ToastrModule } from "ngx-toastr"


let routes:Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home",component:employeecomponent},
  {path:"addemployee",
  canActivate:[IsAuthenticatedUser],
  canDeactivate:[EmployeeNeedToAddedOrUpdated],
  component:AddEmployee},
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
    EffectsModule.forRoot([employeeEffects]),
    StoreModule.forRoot({employeeReducer}),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:2000,
      closeButton:true,
      tapToDismiss:true
    })
  ],
  providers: [employees,EmployeeNeedToAddedOrUpdated,IsAuthenticatedUser,employeeEffects],
  bootstrap: [AppComponent]
})
export class AppModule { }
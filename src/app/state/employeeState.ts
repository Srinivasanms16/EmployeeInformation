import  employeemodel  from "../Services/employee";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { employees } from "../Services/employee.service";
import { mergeMap, map, catchError, switchMap, switchMapTo} from "rxjs/operators";
import { Action } from "@ngrx/store"
import employee from '../Services/employee';
import { async } from '@angular/core/testing';


export interface employeeStore{
    employees:any[],
    isloading:boolean,
    error:String
}
//Default state.
let defaultState:employeeStore = {
    employees:[],
    isloading:true,
    error:"no error"
    
}
//Actions
export enum employeeAction{
    Load_Employee = "Load_Employee",
    Load_Employee_Sucess = "Load_Employee_Sucess",
    Load_Employee_Error = "Load_Employee_Error",

    Add_Employee = "Add_Employee",
    Add_Employee_Success = "Add_Employee_Success",
    Add_Employee_fail = "Add_Employee_fail",

    Edit_Employe = "Add_Employee_Fail",
    Edit_Employee_success= "Edit_Employee_success",
    Edit_Employee_Fail ="Edit_Employee_Fail",

    Delete_Employee = "Delete_Employee",
    Delete_Employee_success = "Delete_Employee_success",
    Delete_Employee_Fail = "Delete_Employee_Fail"
    
}

//strongly Type Action.
export class LoadEmployee implements Action{
readonly type = employeeAction.Load_Employee;
constructor(){
}
}
export class LoadEmployeeSuccess implements Action{
    readonly type = employeeAction.Load_Employee_Sucess;
    constructor(public payload:employee[]){
    }
    }
    export   class LoadEmployeeFail implements Action{
        readonly type = employeeAction.Load_Employee_Error;
        constructor(public payload:string){
        }
        }

        export class CreateEmployee implements Action{
        readonly type = employeeAction.Add_Employee;
        constructor(public payload:employee){}}
        
        export class AddEmployeeSuccess implements Action{
        readonly type = employeeAction.Add_Employee_Success;
        constructor(public payload:employee){
        }}
                
        export  class AddEmployeeFail implements Action{
            readonly type = employeeAction.Add_Employee_fail;
            constructor(public payload:string){
            }}
                    
            export class EditEmploye implements Action{
            readonly type = employeeAction.Edit_Employe;
            constructor(public payload:employee){
            }
            }
            export class EditEmployeSuccess implements Action{
        readonly type = employeeAction.Edit_Employee_success;
        constructor(public payload:employee){}}
                
        export class EditEmployeFail implements Action{
        readonly type = employeeAction.Edit_Employee_Fail;
        constructor(public payload:string){
        }}
        export class DeleteEmploye implements Action{
            readonly type = employeeAction.Delete_Employee;
            constructor(public payload:any){
            }
            }
            export  class DeleteEmployeSuccess implements Action{
        readonly type = employeeAction.Delete_Employee_success;
        constructor(public payload:any){}}
                
        export  class DeleteEmployeFail implements Action{
        readonly type = employeeAction.Delete_Employee_Fail;
        constructor(public payload:string){
        }}                   

        type Allaction =    LoadEmployee|
                            LoadEmployeeSuccess|
                            LoadEmployeeFail|
                            CreateEmployee|
                            AddEmployeeSuccess|
                            AddEmployeeFail|
                            EditEmploye|
                            EditEmployeSuccess|
                            EditEmployeFail|
                            DeleteEmploye|
                            DeleteEmployeSuccess|
                            DeleteEmployeFail



//Reducer.
export const employeeReducer=(state:employeeStore = defaultState,action:Allaction)=>{

    let currentState = {...state};
    currentState.isloading = true;

    switch(action.type){
         case employeeAction.Load_Employee_Sucess:
             {
               debugger;
               currentState.employees=action.payload;
               currentState.isloading=false;
               currentState.error="no error";
                break;            
             }
        case employeeAction.Load_Employee_Error:
            {
                 debugger;
                 currentState.error = action.payload;
                 currentState.isloading= false;
                 break;
            }
        case employeeAction.Add_Employee_Success:
            {
                debugger;
                   let emps = [...currentState.employees];
                    emps.push(action.payload);
                    currentState.employees = emps;
                    currentState.isloading=false;
                    currentState.error='no error';
                    break;
            }

        case employeeAction.Add_Employee_fail:
            {
                
                currentState.error=action.payload;
                break;
            }

        case employeeAction.Edit_Employee_success:
            {
                debugger;
                let oldArray = [...state.employees];
                let index = oldArray.findIndex(x=>x.id === action.payload.id);
                oldArray.splice(index,1,action.payload);
                
                currentState = {...state,
                employees:oldArray,
                isloading:false,
                error:'no error'
                };
                break;
            }
        
            case employeeAction.Edit_Employee_Fail:
            {
                debugger;
                currentState.error = action.payload;
                currentState.isloading = false;
                break;
            }

            case employeeAction.Delete_Employee_success:
                {
                    
                    let oldArray = [...currentState.employees];
                    let index = oldArray.findIndex(x=>x.id === action.payload);
                    oldArray.splice(index,1);

                    currentState = {...currentState,
                    employees:oldArray,
                    isloading:false,
                    error:'no error'
                    };
                    break;
                }
            
                case employeeAction.Delete_Employee_Fail:
                {
                    
                    currentState = {...currentState,
                    error:action.payload,
                    isloading:false};
                    break;
                }

             default:
                 break;
             }
             debugger;
             return currentState;
    }

  

//Effects.
@Injectable()
export class employeeEffects{
    constructor(private actions:Actions, private service:employees){}

 
    @Effect()
    loadEmployee:Observable<Action> = this.actions.pipe(
     ofType(employeeAction.Load_Employee),
     mergeMap(async action=>{
         const result = await this.service.getEmployees();
         if(result.payload)
         {
             return new LoadEmployeeSuccess(result.payload)
         }
         else
         {
             return new LoadEmployeeFail(result.error);
         }
     })
    );


    @Effect()
    AddEmployee:Observable<Action> = this.actions.pipe(
        ofType(employeeAction.Add_Employee),
        mergeMap(async action=>{
            const result = await this.service.addEmployee(action)
            if(result.error)
            {
                return new AddEmployeeFail(result.error)
            }
            return new AddEmployeeSuccess(result.employee)
        })
    );

    @Effect()
    editEmployee:Observable<Action> = this.actions.pipe(
        ofType(employeeAction.Edit_Employe),
        mergeMap(async action=>{
        const result = await this.service.editEmployee(action);
        if(result.error)
        {
            return new EditEmployeFail(result.error)
        }
        return new EditEmployeSuccess(result.employee);
        })
    )

  
   @Effect()
   deleteEmployee:Observable<Action> = this.actions.pipe(
       ofType(employeeAction.Delete_Employee),
       mergeMap(async action=>{
        const result = await this.service.deleteEmployee(action);
        if(result.error)
        {
            return new DeleteEmployeFail(result.error)
        }
        return new DeleteEmployeSuccess(result.employee);
       })
   )
                                        
}


//Strongly type Action 
// export class LoadEmployee implements Action {
//     readonly type = employeeAction.Load_Employee;
//   }
//   export class LoadEmployeeSuccess implements Action {
//     readonly type = employeeAction.Load_Employee_Sucess;
  
//     constructor(public payload:any) {}
//   }
//   export class LoadEmployeeFail implements Action {
//     readonly type = employeeAction.Load_Employee_Error;
  
//     constructor(public payload: string) {}
//   }

//   type actionType = LoadEmployee|LoadEmployeeSuccess|LoadEmployeeFail

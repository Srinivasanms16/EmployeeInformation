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

//Reducer.
export const employeeReducer=(state:employeeStore = defaultState,action:any)=>{

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
                 //return state;
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
                //return currentState;
            }

        case employeeAction.Add_Employee_fail:
            {
                
                currentState.error=action.payload;
                //return currentState;
                break;
            }

        case employeeAction.Edit_Employee_success:
            {
                debugger;
                let oldArray = [...state.employees];
                let index = oldArray.findIndex(x=>x.id === action.payload.id);
                let newArray = oldArray.splice(index,1,action.payload);
                
                 currentState = {...state,
                employees:newArray,
                isloading:false,
                error:'no error'
                };
                break;
                //return currentState;
            }
        
            case employeeAction.Edit_Employee_Fail:
            {
                debugger;
                currentState = {...state,
                error:action.payload};
                break;
                //return currentState;
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
                  //  return currentState;
                }
            
                case employeeAction.Delete_Employee_Fail:
                {
                    
                    currentState = {...currentState,
                    error:action.payload};
                    break;
                    //return currentState;
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
        mergeMap(action=>this.service.getEmployees().pipe(
            map(x=>x.status==200? {type:employeeAction.Load_Employee_Sucess,payload:x.body}:
                {type:employeeAction.Load_Employee_Error,payload:x.statusText}),
            catchError(error=>of({type:employeeAction.Load_Employee_Error,payload:error}))
                                                        )
                                                           )
                                                              );

    @Effect()
    addEmployee:Observable<Action> = this.actions.pipe(
        ofType(employeeAction.Add_Employee),
        mergeMap(action=>this.service.addEmployee(action).pipe(
                         map(x=>x.status == 201 ? {type:employeeAction.Add_Employee_Success,payload:x.body}
                            :{type:employeeAction.Add_Employee_fail,payload:x.statusText}),
                 catchError(error=>of({type:employeeAction.Add_Employee_fail,payload:error}))
        )
        )
    );

    @Effect()
    editEmployee:Observable<Action> = this.actions.pipe(
                                      ofType(employeeAction.Edit_Employe),
                                      mergeMap(action=>this.service.editEmployee(action).pipe(
                                      map(x=>x.status == 200 ? {type:employeeAction.Edit_Employee_success,payload:x.body}
                                                             : {type:employeeAction.Edit_Employee_Fail,payload:x.statusText}),
                                      catchError(err=>of({type:employeeAction.Edit_Employee_Fail,payload:err}))
                                      )
                                      )

    );

    // @Effect()
    // deleteEmployee:Observable<Action> = this.actions.pipe(
    //                                      ofType(employeeAction.Delete_Employee),
    //                                      mergeMap(action=>{
                                             
    //                                          return this.service.deleteEmployee(action).pipe(
    //                                              map(x=>x.status == 200 ? {type:employeeAction.Delete_Employee_success,payload:action}
    //                                                 :{type:employeeAction.Delete_Employee_Fail,payload:x.statusText}),
    //                                             catchError(error=>of({type:employeeAction.Delete_Employee_Fail,payload:error}))
    //                                          )})
    // );

    @Effect()
    deleteEmployee:Observable<Action> 
    
    = this.actions.pipe(
         ofType(employeeAction.Delete_Employee),
         mergeMap(async (action)=>{
             let result= await this.service.deleteEmployee1(action);
             debugger;
             return {type:employeeAction.Delete_Employee_success,payload:result.id};
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

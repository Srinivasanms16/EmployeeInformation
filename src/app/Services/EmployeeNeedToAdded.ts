import { Injectable } from '@angular/core';
import { CanDeactivate , ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {AddEmployee} from '../AddEmployee/AddEmployee.component';

@Injectable()
export class EmployeeNeedToAddedOrUpdated implements CanDeactivate<AddEmployee>{
   
     canDeactivate(emp:AddEmployee,route:ActivatedRouteSnapshot,router:RouterStateSnapshot){
        if((emp.empform.touched || emp.empform.dirty) && !emp.isSubmitted) 
        {
            if(confirm("Are you sure to leave?"))
            {
                return true;
            }
            else
            {
                return false;
            }
        } 
         return true;
     }     

}

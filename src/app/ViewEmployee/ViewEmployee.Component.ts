import {Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {employees} from '../Services/employee.service';
import employee from '../Services/employee';


@Component({
    selector:'viewemployee',
    templateUrl:'./ViewEmployee.Component.html'
})
export class viewEmployee{


    public selectedEmployee:any ;

    constructor(private activatedroute:ActivatedRoute,private service:employees){
        debugger;
        this.selectedEmployee = new employee();
        this.activatedroute.params.subscribe(parm=>{
            if(parm.id)
            {
                this.getEmployeedata(parm.id);  
            }
            }
            );
        
    }

    getEmployeedata(id:string)
    {
       this.service.getEmployee(id).subscribe(data=>{
            this.selectedEmployee = data;
        })
    }



}
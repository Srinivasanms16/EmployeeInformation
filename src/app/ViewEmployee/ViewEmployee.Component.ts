import {Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {employees} from '../Services/employee.service';
import employee from '../Services/employee';

@Component({
    selector:'viewemployee',
    templateUrl:'./ViewEmployee.Component.html'
})
export class viewEmployee{


    public selectedEmployee:employee ;

    constructor(private activatedroute:ActivatedRoute,private service:employees){
        debugger;
        this.selectedEmployee = new employee();
        this.activatedroute.params.subscribe(parm=>this.getEmployeedata(parm["id"]));
    }

    getEmployeedata(id:string)
    {
        let emp = this.service.emp.filter(x=>x.id == id);
        if(emp.length > 0)
        {
            this.selectedEmployee =  emp[0];
        }
    }



}
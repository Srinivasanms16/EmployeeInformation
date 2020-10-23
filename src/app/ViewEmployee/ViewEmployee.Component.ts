import {Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {employees} from '../Services/employee.service';
import employee from '../Services/employee';
import {Store} from "@ngrx/store";
import {NgxSpinnerService} from "ngx-spinner"


@Component({
    selector:'viewemployee',
    templateUrl:'./ViewEmployee.Component.html'
})
export class viewEmployee implements OnInit{


    public selectedEmployee:any ;
    empid:string;
    empManager:string;

    constructor(private activatedroute:ActivatedRoute,
         private store:Store<any>, private spinner:NgxSpinnerService){
    
    }

    ngOnInit(){
        this.activatedroute.paramMap.subscribe(x=>{
            this.empid =    x.get("id");
            debugger;
            this.store.select<employee[]>(x=>x.employeeReducer.employees).subscribe(emplist=>{
                this.selectedEmployee =  emplist.find(item=>item.id == this.empid);
                const manager = emplist.find(item=>item.id==this.selectedEmployee.manager);
                this.empManager =  manager ? `${manager.fname} ${manager.lname}`: "Admin";
            })

        })
       
    }

   
    





}
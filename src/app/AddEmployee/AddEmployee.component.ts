import { FormGroup,FormControl, Validators } from '@angular/forms'
import { Component } from '@angular/core';
import employee from "../Services/employee";
import {employees} from "../Services/employee.service"
@Component({
    selector:'addemployee',
    templateUrl:'./AddEmployee.component.html'
})
export class AddEmployee{
    
    empform:FormGroup;
    name:FormGroup;
    firstname:FormControl;
    gender:FormControl;
    lastname:FormControl;
    email:FormControl;
    dateofbirth:FormControl;
    role:FormControl;
    manager:FormControl;

    constructor(private employees:employees){
       this.controlInilization();
       this.formInilization();
    }
   
    controlInilization = ()=>
    {
        this.firstname = new FormControl('',[Validators.required]);
        this.lastname = new FormControl('',[Validators.required]);
        this.gender = new FormControl('male');
        this.email = new FormControl('',[Validators.required,Validators.email]);
        this.dateofbirth=new FormControl('',[Validators.required,Validators.pattern('[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}')]);
        this.role = new FormControl('',[Validators.required]);
        this.manager = new FormControl('',[Validators.required]);
        this.name = new FormGroup({
            firstname:this.firstname,
            lastname:this.lastname

        });
    }

    formInilization = ()=>{
        this.empform = new FormGroup({
            name:this.name,
            gender:this.gender,
            email:this.email,
            dateofbirth:this.dateofbirth,
            role:this.role,
            manager:this.manager
        });
    }

    empsubmit=()=>{
        if(this.empform.valid){
            debugger;
            let count = this.employees.emp.length;
            this.employees.emp.push(new employee(this.firstname.value,this.lastname.value,this.gender.value,this.email.value,
                this.dateofbirth.value,this.role.value,this.manager.value,`id${count++}`,true));
                alert("successfully added");
                this.empform.reset();
        }
        else{
            alert("invalid data");
            alert(this.manager.valid)
        }
    }
}
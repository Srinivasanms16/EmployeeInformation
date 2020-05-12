import { FormGroup,FormControl, Validators } from '@angular/forms'
import { Component } from '@angular/core';
import employee from "../Services/employee";
import {employees} from "../Services/employee.service";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'
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
    httpheaders:HttpHeaders;
    empid:string = null;
    emp:any
    submit:string;

    constructor(private employeesevice:employees,private httpclient:HttpClient, private route:ActivatedRoute){
        this.route.queryParams.subscribe(parm=>{
            if(parm.empid)
            {
                this.empid = parm.empid;
            }
        })
       this.controlInilization();
    }
   
    controlInilization = ()=>
    {
        if(this.empid == null)
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
        this.formInilization();
        this.httpheaders = new HttpHeaders();
        this.submit = "submit";
    }
    else
    {
        debugger;
        this.employeesevice.getEmployee(this.empid).subscribe(data=>{
            debugger;
        this.emp = data;
        this.firstname = new FormControl(this.emp.fname,[Validators.required]);
        this.lastname = new FormControl(this.emp.lname,[Validators.required]);
        this.gender = new FormControl(this.emp.gender);
        this.email = new FormControl(this.emp.email,[Validators.required,Validators.email]);
        this.dateofbirth=new FormControl(this.emp.dob,[Validators.required,Validators.pattern('[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}')]);
        this.role = new FormControl(this.emp.role,[Validators.required]);
        this.manager = new FormControl(this.emp.manager,[Validators.required]);
        this.name = new FormGroup({
            firstname:this.firstname,
            lastname:this.lastname

        });
        this.formInilization();
        this.httpheaders = new HttpHeaders();
        this.submit = "Update";
        });
        

    }
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

            if(this.emp == null)
            {

            this.employeesevice.addEmployee(new employee( undefined,this.firstname.value,this.lastname.value,this.gender.value,this.email.value,
                this.dateofbirth.value,this.role.value,this.manager.value,true)).subscribe(data=>{
                    debugger;
                    console.log(data);
                });
            }
            else
            {
                this.employeesevice.editEmployee(new employee(this.emp.id,this.firstname.value,this.lastname.value,this.gender.value,this.email.value,
                    this.dateofbirth.value,this.role.value,this.manager.value,true)).subscribe(data=>{
                        debugger;
                        console.log(data);
                    });
            }

            
           this.empform.reset();
        }
    }
}
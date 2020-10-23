import { FormGroup,FormControl, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import employee from "../Services/employee";
import {employees} from "../Services/employee.service";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { employeeAction } from "../state/employeeState";
import {ToastrService} from"ngx-toastr";
import {CreateEmployee,EditEmploye} from "../state/employeeState"
@Component({
    selector:'addemployee',
    templateUrl:'./AddEmployee.component.html'
})
export class AddEmployee implements OnInit{
    
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
    isSubmitted:boolean = false;
    roleList:string[]
    empList:employee[]

    constructor(private employeesevice:employees,private httpclient:HttpClient, 
        private store:Store<any>,private route:ActivatedRoute,
        private toast:ToastrService){
            this.roleList = ["Manager","Developer","Lead","Tester"];
       
    }

    ngOnInit(){
        this.route.queryParams.subscribe(parm=>{
            if(parm.empid)
            {
                this.empid = parm.empid;
            }
        })
        this.store.select<employee[]>(x=>x.employeeReducer.employees).subscribe(x=>{
            this.empList = x});
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
        // debugger;
        // this.employeesevice.getEmployee(this.empid).subscribe(data=>{
        //     debugger;
        // this.emp = data;
        // this.firstname = new FormControl(this.emp.fname,[Validators.required]);
        // this.lastname = new FormControl(this.emp.lname,[Validators.required]);
        // this.gender = new FormControl(this.emp.gender);
        // this.email = new FormControl(this.emp.email,[Validators.required,Validators.email]);
        // this.dateofbirth=new FormControl(this.emp.dob,[Validators.required,Validators.pattern('[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}')]);
        // this.role = new FormControl(this.emp.role,[Validators.required]);
        // this.manager = new FormControl(this.emp.manager,[Validators.required]);
        // this.name = new FormGroup({
        //     firstname:this.firstname,
        //     lastname:this.lastname

        // });
        // this.formInilization();
        // this.httpheaders = new HttpHeaders();
        // this.submit = "Update";
        // });

      
        this.emp = this.empList.find(x=>x.id == this.empid);
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
        debugger;
        if(this.empform.valid){

            if(this.emp == null)
            {
               let emp = new employee( undefined,this.firstname.value,this.lastname.value,this.gender.value,this.email.value,
                this.dateofbirth.value,this.role.value,this.manager.value,true);
                this.store.dispatch(new CreateEmployee(emp));
                this.toast.success("Added Successfully..!",`${this.firstname.value}`)
                this.isSubmitted = true; 
                this.empform.reset();
            }
            else
            {
                let emp = new employee(this.emp.id,this.firstname.value,this.lastname.value,this.gender.value,this.email.value,
                    this.dateofbirth.value,this.role.value,this.manager.value,true);
                    this.store.dispatch(new EditEmploye(emp));
                    this.toast.success("Edited Successfully..!",`${this.firstname.value}`)
                    this.isSubmitted = true; 
                    this.empform.reset();
            }
        }
    }
}
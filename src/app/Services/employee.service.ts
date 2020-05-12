import {Injectable} from '@angular/core'
import employee from './employee'
import {HttpClient,HttpHeaders} from '@angular/common/http'

@Injectable({
    providedIn:"root"
})
export class employees {

    emp:employee[] = new Array<employee>();
    httpheader:HttpHeaders = new HttpHeaders();

    constructor(private httpclient:HttpClient){
        debugger;
     this.httpheader.set('Content-Type', 'application/json');
     this.httpheader.set('access-control-allow-origin','*');   
    }

    getEmployees = ()=>{
        return this.httpclient.get("http://localhost:3006/employee",{headers:this.httpheader});
    }

    getEmployee = (id)=>{
        return this.httpclient.get(`http://localhost:3006/employee/${id}`,{headers:this.httpheader});
    }

    addEmployee = (emp:employee)=>{
        return this.httpclient.post("http://localhost:3006/employee",emp,{headers:this.httpheader});
    }

    editEmployee = (emp:employee)=>{
        debugger;
        return this.httpclient.put(`http://localhost:3006/employee/${emp.id}`,emp,{headers:this.httpheader});
    }

    deleteEmployee = (id)=>{
        debugger;
        return this.httpclient.delete(`http://localhost:3006/employee/${id}`,{headers:this.httpheader});
    }

}
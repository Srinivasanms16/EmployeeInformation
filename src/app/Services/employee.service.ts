import {Injectable} from '@angular/core'
import employee from './employee'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { of, Observable } from 'rxjs';
import { async } from '@angular/core/testing';

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

            return this.httpclient.get("http://localhost:3006/employee",{headers:this.httpheader,observe:'response'});       
    }

    getEmployee = (id)=>{
        return this.httpclient.get(`http://localhost:3006/employee/${id}`,{headers:this.httpheader});
    }

    addEmployee = (action)=>{
        debugger;
        return this.httpclient.post("http://localhost:3006/employee",action.payload,{headers:this.httpheader,observe:'response'});
    }

    editEmployee = (action)=>{
        debugger;
        return this.httpclient.put(`http://localhost:3006/employee/${action.payload.id}`,action.payload,{headers:this.httpheader,observe:'response'});
    }

    deleteEmployee  = (action)=>{
        debugger;
        return this.httpclient.delete(`http://localhost:3006/employee/${action.payload}`,{headers:this.httpheader,observe:'response'});
       
        (async()=>this.deleteEmployee1({}))()
    }

    deleteEmployee1 = async (action)=>{
        debugger;
        let response = await this.httpclient.delete(`http://localhost:3006/employee/${action.payload}`,{headers:this.httpheader,observe:'response'}).toPromise();
        if(response.status === 200)
        {
            return {id:action.payload};
        }
        else{
            return {id:-1};
        }
    }



}
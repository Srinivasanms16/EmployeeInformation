import {Injectable} from '@angular/core'
import employee from './employee'
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { of, Observable } from 'rxjs';
import { async } from '@angular/core/testing';
import {environment} from "../../environments/environment";

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

  

    getEmployees =async ()=>{

            const response =await this.httpclient.get<employee[]>(environment.EmpAPI,{headers:this.httpheader,observe:'response'}).toPromise();   
            if(response.ok)
            {
                if(response.body)
                {
                    return {error:undefined,payload:response.body}
                }
                return {error:"issue in getting emplyee",payload:undefined}
            }    
    }

    getEmployee = (id)=>{
        return this.httpclient.get(`${environment.EmpAPI}/${id}`,{headers:this.httpheader});
    }

    addEmployee =async (action)=>{
        
        const response = await this.httpclient.post<employee>(environment.EmpAPI,action.payload,{headers:this.httpheader,observe:'response'}).toPromise();
        if(response.ok)
        {
             return {error:undefined,employee:response.body}
        }
        return {error:"inssue in adding employee",employee:undefined};
    }

    editEmployee =async (action)=>{
        debugger;
        const response = await this.httpclient.patch<employee>(`${environment.EmpAPI}/${action.payload.id}`,action.payload,{headers:this.httpheader,observe:'response'}).toPromise();
        if(response.ok)
        {
             return {error:undefined,employee:response.body}
        }
        return {error:"inssue in editing employee",employee:undefined};
    }

    deleteEmployee  =async (action)=>{
        debugger;
        const response = await this.httpclient.delete<employee>(`${environment.EmpAPI}/${action.payload}`,{headers:this.httpheader,observe:'response'}).toPromise();
        if(response.ok)
        {
             return {error:undefined,employee:response.body}
        }
        return {error:"inssue in deleteting employee",employee:undefined};
    }


}
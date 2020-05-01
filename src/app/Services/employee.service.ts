import {Injectable} from '@angular/core'
import employee from './employee'

@Injectable({
    providedIn:"root"
})
export class employees {

    emp:employee[];

    constructor(){
        this.emp = [new employee("srini","amar","srini@gmail.com","16/07/1987","manager","aaa","id1",false),
        new employee("aaaa","bbbb","aaaa@gmail.com","16/01/1987","manager","bbb","id2",false),
        new employee("cccc","dddd","cccc@gmail.com","16/02/1987","manager","ggg","id3",true),
        new employee("eeee","ffff","eeee@gmail.com","16/03/1987","manager","ddd","id4",false),
        new employee("gggg","gggg","ffff@gmail.com","16/04/1987","manager","eee","id5",true)];
    }

    getEmployees = ()=>{
        return this.emp;
    }

}
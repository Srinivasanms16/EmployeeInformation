export default class  employee{
     fname:string;
     lname:string;
     gender:string;
     email:string;
      dob:string;
      role:string;
      manager:string;
      id:string;
      isActive:boolean
    
    constructor(fname?:string, lname?:string, gender?:string,  email?:string,
         dob?:string, role?:string, manager?:string, isActive?:boolean){
             this.fname = fname;
             this.lname = lname;
             this.gender = gender;
             this.email = email;
             this.isActive = isActive;
             this.manager = manager;
             this.dob = dob;
             this.role = role;
         }    
}

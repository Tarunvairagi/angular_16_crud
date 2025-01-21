export class EmployeeModel{
    empId!:number;
    empName!:string;
    emailId!:string;
    contactNo!:string; 
    city!:string;
    state!:string;
    address!:string;
    pinCode!:string;

    constructor(){
        this.empId= 0;
        this.empName= '';
        this.emailId= '';
        this.contactNo= '';
        this.city= '';
        this.state= '';
        this.address= '';
        this.pinCode= '';
    }
}
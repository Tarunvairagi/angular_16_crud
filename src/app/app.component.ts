import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeeForm!:FormGroup;
  employeeModel:EmployeeModel = new EmployeeModel();
  employeeList:EmployeeModel[] = [];

  constructor(){
    this.createForm();
    const oldDate = localStorage.getItem("EmpData");
    if(oldDate != null){
      const parseData = JSON.parse(oldDate);
      this.employeeList = parseData;
    }
  }

  createForm(){
    this.employeeForm = new FormGroup({
      empId:new FormControl(this.employeeModel.empId),
      empName:new FormControl(this.employeeModel.empName,[Validators.required]),
      emailId:new FormControl(this.employeeModel.emailId,[Validators.required, Validators.email]),
      contactNo:new FormControl(this.employeeModel.contactNo,[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[6-9][0-9]{9}$')]),
      city:new FormControl(this.employeeModel.city),
      state:new FormControl(this.employeeModel.state),
      pinCode:new FormControl(this.employeeModel.pinCode,[Validators.required,Validators.minLength(6)]),
      address:new FormControl(this.employeeModel.address),
    })
  }

  onSave(){
    // debugger;
    const oldDate = localStorage.getItem("EmpData");
    if(oldDate != null){
      const parseData = JSON.parse(oldDate);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    }else{
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    this.reset();
  }

  onEdit(employee:EmployeeModel){
    this.employeeModel = employee;
    this.createForm();
  }

  onUpdate(){
    const record = this.employeeList.find(m=>m.empId == this.employeeForm.controls['empId'].value);
    if(record != undefined){
      record.empName = this.employeeForm.controls['empName'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
      record.address = this.employeeForm.controls['address'].value;
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    this.employeeModel = new EmployeeModel();
    this.createForm();
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure want to delete!")
    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.empId == id);
      this.employeeList.splice(index,1);
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    }
  }

  reset(){
    this.employeeModel = new EmployeeModel();
    this.createForm();
  }
}

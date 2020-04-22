import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.models';
import { EmployeesService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm', { static: false }) public createEmployeeForm: NgForm;

  gender = 'male';

  previewPhoto: boolean;
  panelTitle: string;
  datepickerConfig: Partial<BsDatepickerConfig>;

  employee: Employee;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ]

  constructor(private _employeeService: EmployeesService, private _router: Router, private _route: ActivatedRoute) {
    this.datepickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }
  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: null,
        dateOfBirth: null,
        department: '-1',
        isActive: null,
        photoPath: null
      };

      this.panelTitle = 'Create Employee';

      if (this.createEmployeeForm) {
        this.createEmployeeForm.reset();
      }

    } else {
      this.panelTitle = 'Edit Employee';
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
    }
  }

  saveEmployee(): void {

    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (employee: Employee) => {
          console.log(employee);
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      )
    }
    else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }
  }
}


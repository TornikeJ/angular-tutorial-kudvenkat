import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from './employee.service';
import { Employee } from '../models/employee.models';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;
  private _id: number;

  constructor(private _employeeService: EmployeesService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this._id = +params.get('id');
      this._employeeService.getEmployee(this._id).subscribe(
        (employee) => this.employee = employee,
        (err) => console.log(err)
      );
  });
}

viewNextEmployee() {
  if (this._id < 3) {
    this._id = this._id + 1;
  }
  else {
    this._id = 1;
  }

  this._router.navigate(['/employees', this._id], {
    queryParamsHandling: 'preserve'
  })
}
}

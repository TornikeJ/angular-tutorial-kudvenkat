import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee'
import { EmployeeService } from './employee.service';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: IEmployee[];

  selectedEmployeeButtonValue: string = 'All';

  statusMessage: string = "Table loading";

  constructor(private _employeeService: EmployeeService) {

  }

  ngOnInit() {
    this._employeeService.getEmployees()
      .retryWhen((error) => {
        return error.scan((retryCount) => {
          retryCount += 1;
          console.log(retryCount);
          if (retryCount < 6) {
            this.statusMessage = 'Retrying...Attempt #' + retryCount;
            return retryCount;
          }
          else {
            throw (error);
          }
        }, 0).delay(1000);
      })
      .subscribe((employeeData) => this.employees = employeeData,
        (error) => {
          this.statusMessage = "Problem with the service.";
          console.error(error)
        });
  }

  getTotalEmployeesCount(): number {
    return this.employees.length;
  }

  getTotalMaleEmployeesCount(): number {
    return this.employees.filter(e => e.gender === "Male").length;
  }

  getTotalFemaleEmployeesCount(): number {
    return this.employees.filter(e => e.gender === "Female").length;
  }

  onEmployeeCountRadioButtonChange(selectedRadioButtonValue: string): string {
    return this.selectedEmployeeButtonValue = selectedRadioButtonValue;
  };

}

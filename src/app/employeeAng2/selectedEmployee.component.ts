import { Component, OnInit } from "@angular/core";
import { IEmployee } from './employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
    selector:'selected-employee',
    templateUrl:'selectedEmployee.component.html',
    styleUrls:['employee.component.scss']
})


export class SelectedEmployeeComponent implements OnInit {
    employee: IEmployee;
    statusMessage: string;


    constructor(private _employeeService: EmployeeService, private _activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {
        let empCode: string = this._activatedRoute.snapshot.params['code'];
        this._employeeService.getEmployeeByCode(empCode).subscribe(
            (employee) => this.employee = employee,
            (error) => {
                this.statusMessage = "Problem with the service. "
                console.error(error);
            });
    }
}


import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ListEmployeesComponent } from './list-employees.component';
import { Observable } from 'rxjs';
import { EmployeesService } from './employee.service';
import { IEmployee } from './IEmployee';
import { Injectable } from '@angular/core';

@Injectable()

export class EmployeeListResolver implements Resolve<IEmployee[]>{
    constructor(private _employeeService: EmployeesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee[]> {
        return this._employeeService.getEmployees();
    }
}
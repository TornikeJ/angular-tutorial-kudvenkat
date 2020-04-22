import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EmployeesService } from './employee.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class EmployeeDetailsGuardService implements CanActivate {

    constructor(private _employeeService: EmployeesService, private _router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._employeeService.getEmployee(+route.paramMap.get('id')).pipe(
            map((employee) => {
                const employeeExists = employee;

                if (employeeExists) {
                    return true;
                }
                else {
                    this._router.navigate(['notFound'])
                    return false;
                }
            }),
            catchError((err) => {
                console.log(err);
                return Observable.of(false);
            })
        );
    }
}
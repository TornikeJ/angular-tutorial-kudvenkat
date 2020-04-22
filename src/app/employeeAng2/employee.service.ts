import { Injectable } from '@angular/core';
import { IEmployee } from './employee';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap, catchError, retryWhen } from 'rxjs/operators';
import 'rxjs/add/operator/delay';

@Injectable()
export class EmployeeService {

    constructor(private _http: Http) {

    }

    getEmployees(): Observable<IEmployee[]> {
        return this._http.get("http://localhost:53559/api/employees")
            .pipe(
                map((response: Response) => <IEmployee[]>response.json()),
                catchError(this.handleError)
            );
    }

    getEmployeeByCode(empCode: string): Observable<IEmployee> {
        return this._http.get("http://localhost:53559/api/employees/" + empCode)
            .pipe(
                map((response: Response) => <IEmployee>response.json()),
                catchError(this.handleError)
            );
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
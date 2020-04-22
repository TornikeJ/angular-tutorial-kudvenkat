import { Injectable } from '@angular/core';
import { IEmployee } from './IEmployee';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable()

export class EmployeesService {
    constructor(private httpClient: HttpClient) {

    }

    baseUrl = 'http://localhost:3000/employees';

    getEmployees(): Observable<IEmployee[]> {
        return this.httpClient.get<IEmployee[]>(this.baseUrl)
            .catch(this.hanldeError).delay(2000);
    }

    private hanldeError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error:', errorResponse.error.message);
        } else {
            console.error('Server Side Error:', errorResponse)
        }

        return throwError('There is a problem with the service');
    }

    getEmployee(id: number): Observable<IEmployee> {
        return this.httpClient.get<IEmployee>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.hanldeError));
    }

    addEmployee(employee: IEmployee): Observable<IEmployee> {
        // const maxId = this.employeeList.reduce(function (e1, e2) {
        //     return (e1.id > e2.id) ? e1 : e2
        // }).id;

        // employee.id = maxId + 1;
        // this.employeeList.push(employee);
        return this.httpClient.post<IEmployee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.hanldeError));
    }

    updateEmployee(employee: IEmployee): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.hanldeError));
    }

    deleteEmployee(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.hanldeError));
    }
}


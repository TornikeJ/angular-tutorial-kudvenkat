import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.models';
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
    private employeeList: Employee[] = [
        {
            id: 1,
            name: 'Mark',
            gender: 'Male',
            contactPreference: 'Email',
            email: 'mark@pragimtech.com',
            dateOfBirth: new Date('10/25/1988'),
            department: '3',
            isActive: true,
            photoPath: 'assets/images/mark.png'
        },
        {
            id: 2,
            name: 'Mary',
            gender: 'Female',
            contactPreference: 'Phone',
            phoneNumber: 2345978640,
            dateOfBirth: new Date('11/20/1979'),
            department: '2',
            isActive: true,
            photoPath: 'assets/images/mary.png'
        },

        {
            id: 3,
            name: 'John',
            gender: 'Male',
            contactPreference: 'Phone',
            phoneNumber: 5432978640,
            dateOfBirth: new Date('3/25/1976'),
            department: '3',
            isActive: false,
            photoPath: 'assets/images/john.png'
        },
    ];

    baseUrl = 'http://localhost:3000/employees';

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.baseUrl)
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

    getEmployee(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.hanldeError));
    }

    addEmployee(employee: Employee): Observable<Employee> {
        // const maxId = this.employeeList.reduce(function (e1, e2) {
        //     return (e1.id > e2.id) ? e1 : e2
        // }).id;

        // employee.id = maxId + 1;
        // this.employeeList.push(employee);
        return this.httpClient.post<Employee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.hanldeError));
    }

    updateEmployee(employee: Employee): Observable<void> {
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


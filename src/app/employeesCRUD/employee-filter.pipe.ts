import { PipeTransform, Pipe } from '@angular/core';
import { Employee } from '../models/employee.models';


@Pipe({ 
    name: 'employeeFilter',
    pure: false
})

export class EmployeeFilterPipe implements PipeTransform {
    transform(employees: Employee[], searchTerm: string) {
        if (!employees || !searchTerm) {
            return employees;
        }

        return employees.filter((employee) => employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
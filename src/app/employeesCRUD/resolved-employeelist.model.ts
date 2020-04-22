import { Employee } from '../models/employee.models';

export class ResolvedEmployeeList {
    constructor(public employeeList: Employee[], public error: any = null){}
}
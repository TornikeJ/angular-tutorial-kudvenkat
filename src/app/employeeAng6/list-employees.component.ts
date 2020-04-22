import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employee.service';
import { IEmployee } from './IEmployee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {

  employees: IEmployee[];
  filteredEmployees: IEmployee[];

  private _searchTerm;

  get searchTerm() {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filtereEmployees(value);
  }

  filtereEmployees(searchTerm: string): IEmployee[] {
    return this.filteredEmployees = this.employees.filter((e) => e.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
  constructor(private _employeeService: EmployeesService, private _route: ActivatedRoute, private _router: Router) {
    this.employees = this._route.snapshot.data['employeeList'];


    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit() {

  }

  editButtonClick(employeeId: number) {
    this._router.navigate(['edit/', employeeId], {
      queryParams: { 'searchTerm': this.searchTerm }
    });

  }

}

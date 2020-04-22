import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.models';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit {

  @Input()
  employee: Employee;

  @Input() searchTerm;

  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();

  confirmDelete = false;

  private selectedEmployeeId: number;

  constructor(private _route: ActivatedRoute, private _router: Router, private _employeeService: EmployeesService) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  viewEmployee() {
    this._router.navigate(['employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }

  editEmployee() {
    this._router.navigate(['edit', this.employee.id], {
    });
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`Employee with id =${this.employee.id} deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.id)
  }

}

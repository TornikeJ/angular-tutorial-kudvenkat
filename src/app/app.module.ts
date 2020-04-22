import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { EmployeeComponent } from './employeeAng2/employee.component';
import { EmployeeComponent } from './employeeAng6/employee.component';
// import { EmployeeCountComponent } from './employeeAng2/employeeCount.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
// import { SelectedEmployeeComponent } from './employeeAng2/selectedEmployee.component';
// import { EmployeeService } from './employeeAng2/employee.service';
// import { ListEmployeesComponent } from './employeesCRUD/list-employees.component';
import { ListEmployeesComponent } from './employeeAng6/list-employees.component';
import { CreateEmployeeComponent } from './employeesCRUD/create-employee.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualvalidatorDirective } from './shared/confirm-equal-validator.directive';
import { EmployeesService } from './employeeAng6/employee.service';
import { DisplayEmployeeComponent } from './employeesCRUD/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './employeesCRUD/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employeesCRUD/employee-details.component';
import { EmployeeFilterPipe } from './employeesCRUD/employee-filter.pipe';
import { EmployeeListResolverService } from './employeesCRUD/employee-list-resolver.service';
import { EmployeeDetailsGuardService } from './employeesCRUD/employee-details-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListResolver } from './employeeAng6/employee-list.resolver';

// const appRoutes: Routes = [
//   { path: 'list', component: ListEmployeesComponent, resolve: { employeeList: EmployeeListResolverService } },
//   { path: 'edit/:id', component: CreateEmployeeComponent, canDeactivate: [CreateEmployeeCanDeactivateGuardService] },
//   { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeDetailsGuardService] },
//   { path: '', redirectTo: '/list', pathMatch: 'full' },
//   { path: 'notFound', component: PageNotFoundComponent },
// ];
const appRoutes: Routes = [
  { path: 'create', component: EmployeeComponent },
  { path: 'list', component: ListEmployeesComponent, resolve: { employeeList: EmployeeListResolver } },
  { path: 'edit/:id', component: EmployeeComponent},
  { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeDetailsGuardService] },
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path: 'notFound', component: PageNotFoundComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    // EmployeeCountComponent,
    HomeComponent,
    PageNotFoundComponent,
    // SelectedEmployeeComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualvalidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [EmployeesService, CreateEmployeeCanDeactivateGuardService, EmployeeListResolverService, EmployeeDetailsGuardService, EmployeeListResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, AbstractControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from './employee.service';
import { IEmployee } from './IEmployee';
import { ISkill } from './ISkill';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  employee: IEmployee;
  pageTitle: string;

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'phone': {
      'required': 'Phone number is required.',
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Input should have email type'
    },
    'contactPreference': {
      'required': 'Contact preference is required'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm email do not match'
    },
  };

  formErrors = {};

  constructor(private fb: FormBuilder, private _route: ActivatedRoute, private _employeeService: EmployeesService, private _router: Router) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      phone: [''],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: this.matchEmail }),
      contactPreference: ['email', [Validators.required]],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    this.employeeForm.valueChanges.subscribe(
      () => {
        this.logValidationErrors(this.employeeForm);
      }
    );

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    })

    this._route.paramMap.subscribe(
      (params) => {
        const empId = +params.get('id');
        if (empId) {
          this.pageTitle = 'Edit Employee'
          this.getEmployee(empId);
        } else {
          this.pageTitle = 'Create Employee'
          this.employee = {
            id: null,
            fullName: '',
            contactPreference: '',
            email: '',
            phone: null,
            skills: []
          };
        }
      }
    )
  }

  getEmployee(empId: number) {
    this._employeeService.getEmployee(empId).subscribe(
      (employee: IEmployee) => {
        this.editEmployee(employee),
          this.employee = employee;
      },
      (err: any) => console.log(err)
    )
  }

  onContactPreferenceChange(value: string) {
    const phoneControl = this.employeeForm.get('phone');

    if (value === 'phone') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }

    phoneControl.updateValueAndValidity();
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      phone: employee.phone,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email,
      },
    })

    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
  }

  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  setExistingSkills(skills: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skills.forEach(
      s => {
        formArray.push(this.fb.group({
          skillName: s.skillName,
          experienceInYears: s.experienceInYears,
          proficiency: s.proficiency
        }))
      })

    return formArray;
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', [Validators.required]],
      experienceInYears: ['', [Validators.required]],
      proficiency: ['', [Validators.required]],
    })
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach(
      (key: string) => {
        const abstractControl = group.get(key);
        this.formErrors[key] = '';

        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
          const messages = this.validationMessages[key];

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }

        if (abstractControl instanceof FormGroup) {
          this.logValidationErrors(abstractControl);
        }
      }
    );

    // console.log(Object.keys(group.controls));

    // Object.keys(group.controls).forEach(
    //   (key) => {
    //     console.log(key);
    //     const abstractControl = group.get(key);
    //     this.formErrors[key]='';
    //   }
    // )
  }

  onSubmit(): void {

    this.mapFormValueToEmployeeModel();

    if (this.employee.id) {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => this._router.navigate(['list']),
        (err) => console.log(err)
      );
    } else {
      this._employeeService.addEmployee(this.employee).subscribe(
        () => this._router.navigate(['list']),
        (err) => console.log(err)
      )
    }
  }

  mapFormValueToEmployeeModel() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.skills = this.employeeForm.value.skills;
  }

  onLoadData(): void {
    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);
  }

  removeSkill(skillGroupIndex: number): void {
    const skillFormArray = (<FormArray>this.employeeForm.get('skills'));
    skillFormArray.removeAt(skillGroupIndex);
    skillFormArray.markAsDirty();
    skillFormArray.markAsTouched();
  }

  matchEmail(group: AbstractControl): { [key: string]: any } | null {
    const emailControl = group.get('email');
    const confirmEmailControl = group.get('confirmEmail');

    if (emailControl.value === confirmEmailControl.value || (confirmEmailControl.pristine && confirmEmailControl.value === '')) {
      return null;
    }
    else {
      return { 'emailMismatch': true };
    }
  }
}

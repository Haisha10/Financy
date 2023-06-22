import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { EmploymentsService } from 'src/app/services/employments.service';
import { AuthService } from 'src/app/services/auth.service';
import { numberLengthValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-employment-add-edit',
  templateUrl: './employment-add-edit.component.html',
  styleUrls: ['./employment-add-edit.component.scss']
})
export class EmploymentAddEditComponent {
  employmentForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _employmentsService: EmploymentsService,
    private _dialogRef: MatDialogRef<EmploymentAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: SnackBarService,
    private _authService: AuthService
  ) {
    this.employmentForm = this._fb.group({
      ruc: ['', [Validators.required, numberLengthValidator(11, 11)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      creationDate: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      phone: ['', [Validators.required, numberLengthValidator(9, 9)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  currentUser: any;
  ngOnInit(): void {
    this.currentUser = this._authService.getLoggedUser();
    this.employmentForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.employmentForm.valid) {
      if (this.data) {
        this.data.ruc = this.employmentForm.value.ruc;
        this.data.name = this.employmentForm.value.name;
        this.data.address = this.employmentForm.value.address;
        this.data.description = this.employmentForm.value.description;
        this.data.requirements = this.employmentForm.value.requirements;
        this.data.creationDate = this.employmentForm.value.creationDate;
        this.data.salary = this.employmentForm.value.salary;
        this.data.phone = this.employmentForm.value.phone;
        this.data.email = this.employmentForm.value.email;
        this._employmentsService
          .updateEmployment(this.data.id, this.data, this.currentUser.id)
          .subscribe({
            next: (val: any) => {
              this._dialogRef.close(true);
              this._snackBar.openSnackBar(`Oferta actualizada`);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.employmentForm.value.isAvailable = true;
        this._employmentsService.addEmployment(this.employmentForm.value, this.currentUser.id).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
            this._snackBar.openSnackBar(`Oferta añadida`);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    } else {
      this._snackBar.openSnackBar(`Campos inválidos, por favor verifique los datos ingresados.`);
    }
  }
}

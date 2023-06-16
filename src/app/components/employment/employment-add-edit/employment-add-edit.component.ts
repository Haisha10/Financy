import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { EmploymentsService } from 'src/app/services/employments.service';

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
  ) {
    this.employmentForm = this._fb.group({
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      creationDate: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.employmentForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.employmentForm.valid) {
      if (this.data) {
        this._employmentsService
          .updateEmployment(this.data.id, this.employmentForm.value)
          .subscribe({
            next: (val: any) => {
              this._dialogRef.close(true);
              this._snackBar.openSnackBar(`${this.data.isIncome ? 'Ingreso' : 'Salida'} actualizado`);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._employmentsService.addEmployment(this.employmentForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
            this._snackBar.openSnackBar(`${this.data.isIncome  ? 'Ingreso' : 'Salida'} añadido`);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

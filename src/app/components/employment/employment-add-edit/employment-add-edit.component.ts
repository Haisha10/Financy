import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { FinancesService } from 'src/app/services/finances.service';

@Component({
  selector: 'app-employment-add-edit',
  templateUrl: './employment-add-edit.component.html',
  styleUrls: ['./employment-add-edit.component.scss']
})
export class EmploymentAddEditComponent {
  financesForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _financesService: FinancesService,
    private _dialogRef: MatDialogRef<EmploymentAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: SnackBarService
  ) {
    this.financesForm = this._fb.group({
      isIncome: [true],
      date: ['', Validators.required],
      name: ['', Validators.required],
      exchange: ['', Validators.required],
      comment: ['', Validators.maxLength(100)]
    });
  }

  ngOnInit(): void {
    this.financesForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.financesForm.valid) {
      if (this.data) {
        this._financesService
          .updateFinance(this.data.id, this.financesForm.value)
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
        this._financesService.addFinance(this.financesForm.value).subscribe({
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

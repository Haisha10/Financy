import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { FinancesService } from 'src/app/services/finances.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-finances-add-edit',
  templateUrl: './finances-add-edit.component.html',
  styleUrls: ['./finances-add-edit.component.scss']
})
export class FinancesAddEditComponent implements OnInit {
  financesForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _financesService: FinancesService,
    private _dialogRef: MatDialogRef<FinancesAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: SnackBarService,
    private _authService: AuthService
  ) {
    this.financesForm = this._fb.group({
      isIncome: [true],
      date: ['', Validators.required],
      name: ['', Validators.required],
      exchange: ['', Validators.required],
      comment: ['', Validators.maxLength(100)]
    });
  }
  currentUser: any;

  ngOnInit(): void {
    this.currentUser = this._authService.getLoggedUser();
    this.financesForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.financesForm.valid) {
      if (this.data) {
        this._financesService
          .updateFinance(this.data.id, this.financesForm.value, this.currentUser.id)
          .subscribe({
            next: (val: any) => {
              this._dialogRef.close(true);
              this._snackBar.openSnackBar(`${this.financesForm.value.isIncome ? 'Ingreso' : 'Salida'} actualizado`);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._financesService.addFinance(this.financesForm.value, this.currentUser.id).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
            this._snackBar.openSnackBar(`${this.financesForm.value.isIncome  ? 'Ingreso' : 'Salida'} añadido`);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

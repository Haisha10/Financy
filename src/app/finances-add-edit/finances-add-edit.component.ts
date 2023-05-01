import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancesCoreService } from '../services/finances-core.service';
import { FinancesService } from '../services/finances.service';

@Component({
  selector: 'app-finances-add-edit',
  templateUrl: './finances-add-edit.component.html',
  styleUrls: ['./finances-add-edit.component.scss']
})
export class FinancesAddEditComponent implements OnInit {
  financesForm: FormGroup;

  type_values: string[] = [
    'Ingreso',
    'Salida'
  ];

  constructor(
    private _fb: FormBuilder,
    private _financesService: FinancesService,
    private _dialogRef: MatDialogRef<FinancesAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: FinancesCoreService
  ) {
    this.financesForm = this._fb.group({
      type: '',
      date: '',
      name: '',
      exchange: '',
      comment: ''
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
              this._coreService.openSnackBar(`${this.data.type} actualizado`);
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._financesService.addFinance(this.financesForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar(`${this.data.type} añadido`);
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

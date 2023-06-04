import { Injectable } from '@angular/core';
import { MatSnackBarDismiss, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(
    private _snackBar: MatSnackBar,
  ) {}

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 2500,
      verticalPosition: 'bottom',
    });
  }

  showDeleteConfirmation(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const snackBarRef = this._snackBar.open('¿Estás seguro de que deseas eliminar este elemento?', 'Confirmar', {
        duration: 3000,
        panelClass: ['snackbar-overlay']
      });

      snackBarRef.onAction().subscribe(() => {
        resolve(true);
      });

      snackBarRef.afterDismissed().subscribe((dismissedReason: MatSnackBarDismiss) => {
        if (dismissedReason.dismissedByAction) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}

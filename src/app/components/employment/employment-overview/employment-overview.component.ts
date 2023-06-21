import { Component, OnInit } from '@angular/core';
import { EmploymentsService } from '../../../services/employments.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { EmploymentViewComponent } from '../employment-view/employment-view.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employment-overview',
  templateUrl: './employment-overview.component.html',
  styleUrls: ['./employment-overview.component.scss']
})
export class EmploymentOverviewComponent implements OnInit {
  constructor(
    private _employmentsService: EmploymentsService,
    private _snackBar: SnackBarService,
    private _dialog: MatDialog,
    private _authService: AuthService
  ) {
    this.jobOffers = [];
  }
  currentUser: any;
  jobOffers: any[];
  ngOnInit(): void {
    this.getEmployment();
    this.currentUser = this._authService.getLoggedUser();
  }
  getEmployment() {
    this._employmentsService.getEmploymentList().subscribe({
      next: (res) => {
        this.jobOffers = res;
        console.log(this.jobOffers);
      },
      error: (err) => {
        this._snackBar.openSnackBar(err.error.message);
      },
    });
  }

  openJobOfferView(jobOffer: any): void {
    this._dialog.open(EmploymentViewComponent, {
      data: jobOffer
    });
  }

  applyToJobOffer(jobOffer: any): void {
    var newJobOffer = jobOffer;
    newJobOffer.postulants.push(this.currentUser.id);
    this._employmentsService.updateEmployment(jobOffer.id, newJobOffer, 0).subscribe({
      next: (res) => {
        this._snackBar.openSnackBar('Postulación exitosa');
        this.getEmployment();
      },
      error: (err) => {
        this._snackBar.openSnackBar(err.error.message);
      }
    });
  }
}

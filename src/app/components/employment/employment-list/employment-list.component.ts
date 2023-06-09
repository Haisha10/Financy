import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmploymentAddEditComponent } from '../employment-add-edit/employment-add-edit.component';
import { EmploymentsService } from '../../../services/employments.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Employment } from 'src/app/models/employment.model';
import { EmploymentViewComponent } from '../employment-view/employment-view.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employment-list',
  templateUrl: './employment-list.component.html',
  styleUrls: ['./employment-list.component.scss']
})
export class EmploymentListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'isAvailable',
    'ruc',
    'name',
    'description',
    'creationDate',
    'salary',
    'postulants',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  defaultSort: Sort = { active: 'id', direction: 'asc' };

  constructor(
    private _dialog: MatDialog,
    private _employmentsService: EmploymentsService,
    private _snackBar: SnackBarService,
    private _authService: AuthService
  ) { }

  currentUser: any;
  ngOnInit(): void {
    this.currentUser = this._authService.getLoggedUser();
    this.getEmployment();
  }

  ngAfterViewInit() {
    this.sort.sort(<MatSortable>{
      id: this.defaultSort.active,
      start: this.defaultSort.direction,
    });
  }

  openJobOfferView(jobOffer: Employment): void {
    this._dialog.open(EmploymentViewComponent, {
      data: jobOffer
    });
  }

  openAddEditEamploymentForm() {
    const dialogRef = this._dialog.open(EmploymentAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployment();
        }
      },
    });
  }

  getEmployment() {
    this._employmentsService.getEmploymentListByUserId(this.currentUser.id).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async deleteEmployment(id: number) {
    const confirmed = await this._snackBar.showDeleteConfirmation(id);

    if (confirmed) {
      this._employmentsService.deleteEmployment(id).subscribe({
        next: (res) => {
          this._snackBar.openSnackBar('Eliminado satisfactoriamente.');
          this.getEmployment();
        },
        error: console.log,
      });
    } else {
      this._snackBar.openSnackBar('Eliminación cancelada.');
    }
  }

  openAddEditForm(data: Employment) {
    const dialogRef = this._dialog.open(EmploymentAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployment();
        }
      },
    });
  }

  toogleAvailability(employment: Employment) {
    var newEmployment: Employment = employment;
    newEmployment.isAvailable = !employment.isAvailable;
    this._employmentsService
      .updateEmployment(employment.id, newEmployment, this.currentUser.id).subscribe({
        next: (res) => {
          this.getEmployment();
          this._snackBar.openSnackBar('Actualizado satisfactoriamente.');
        },
        error: console.log,
      });
  }

}

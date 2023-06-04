import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmploymentAddEditComponent } from '../employment-add-edit/employment-add-edit.component';
import { EmploymentsService } from '../../../services/employments.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Employment } from 'src/app/models/employment.model';

@Component({
  selector: 'app-employment-list',
  templateUrl: './employment-list.component.html',
  styleUrls: ['./employment-list.component.scss']
})
export class EmploymentListComponent {
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

  constructor(
    private _dialog: MatDialog,
    private _employmentsService: EmploymentsService,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getEmployment();
  }

  openAddEditFinancesForm() {
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
    this._employmentsService.getEmploymentList().subscribe({
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

  async deleteFinance(id: number) {
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

  openEditForm(data: Employment) {
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
}

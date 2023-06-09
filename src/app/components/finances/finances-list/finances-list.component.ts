import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinancesAddEditComponent } from '../finances-add-edit/finances-add-edit.component';
import { FinancesService } from '../../../services/finances.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Finance } from 'src/app/models/finance.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-finances-list',
  templateUrl: './finances-list.component.html',
  styleUrls: ['./finances-list.component.scss']
})
export class FinancesListComponent implements OnInit {
  balance: number = 0;
  displayedColumns: string[] = [
    'id',
    'isIncome',
    'date',
    'name',
    'exchange',
    'comment',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  defaultSort: Sort = { active: 'id', direction: 'asc' };

  constructor(
    private _dialog: MatDialog,
    private _financesService: FinancesService,
    private _snackBar: SnackBarService,
    private _authService: AuthService
  ) { }

  currentUser: any;
  ngOnInit(): void {
    this.currentUser = this._authService.getLoggedUser();
    this.getFinanceList();
  }

  ngAfterViewInit() {
    this.sort.sort(<MatSortable>{
      id: this.defaultSort.active,
      start: this.defaultSort.direction,
    });
  }

  openAddEditFinancesForm() {
    const dialogRef = this._dialog.open(FinancesAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFinanceList();
        }
      },
    });
  }

  getFinanceList() {
    this._financesService.getFinanceList(this.currentUser.id).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.balance = 0
        res.forEach((element: Finance) => {
          if(element.isIncome){
            this.balance += element.exchange;
          }
          else {
            this.balance -= element.exchange;
          }
        });
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

  deleteFinance(id: number) {
    this._financesService.deleteFinance(id).subscribe({
      next: (res) => {
        this._snackBar.openSnackBar('Eliminado.');
        this.getFinanceList();
      },
      error: console.log,
    });
  }

  openEditForm(data: Finance) {
    const dialogRef = this._dialog.open(FinancesAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFinanceList();
        }
      },
    });
  }
}

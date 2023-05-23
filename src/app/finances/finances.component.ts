import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinancesAddEditComponent } from '../finances-add-edit/finances-add-edit.component';
import { FinancesService } from '../services/finances.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FinancesCoreService } from '../services/finances-core.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'type',
    'date',
    'name',
    'exchange',
    'balance',
    'comment',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _financesService: FinancesService,
    private _coreService: FinancesCoreService,
    private location: Location
  ) {}

  currentUrl:any = this.location.path();
  id:Number = parseInt(this.currentUrl.split('/').pop());
  ngOnInit(): void {
    this.getFinanceList();
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
    this._financesService.getFinanceList().subscribe({
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

  deleteFinance(id: number) {
    this._financesService.deleteFinance(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Eliminado.', 'done');
        this.getFinanceList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
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

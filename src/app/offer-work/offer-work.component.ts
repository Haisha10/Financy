import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CreateWorkComponent } from '../create-work/create-work.component';

@Component({
  selector: 'app-root',
  templateUrl: './offer-work.component.html',
  styleUrls: ['./offer-work.component.scss']
})
export class OfferWorkComponent implements OnInit{
  title = 'rvPractica';

  displayedColumns: string[] = ['Id', 'Nombre', 'Puesto', 'Salario', 'Requisitos'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog : MatDialog, private api : ApiService){

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(CreateWorkComponent, {
      width: '50%'
    });
  }

  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        if (Array.isArray(res)) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          alert("Error: El servidor no devolvió un array de datos.");
        }
      },
      error:(err)=>{
        alert("Error al obtener registro!!")
      }
    })
  }

  editProduct(row : any ){
    this.dialog.open(CreateWorkComponent, {
      width: '50%',
      data:row
    } )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './create-work.component.html',
  styleUrls: ['./create-work.component.scss']
})
export class CreateWorkComponent implements OnInit {

productForm !: FormGroup;

constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<CreateWorkComponent>){ }
ngOnInit(): void {
  this.productForm = this.formBuilder.group({
    Id : ['', Validators.required],
    Nombre : ['', Validators.required],
    Puesto : ['', Validators.required],
    Salario : ['', Validators.required],
    Requisitos : ['', Validators.required],
  })
}

addProduct(){
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:(res)=>{
        alert("Aplicacion agregada con exito");
        this.productForm.reset();
        this.dialogRef.close('save');
      },
      error:()=>{
        alert("Error al agregar aplicacion")
      }
    })
  }
}

}

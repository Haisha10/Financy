import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { MatCheckboxChange } from '@angular/material/checkbox';

import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isEmpress: boolean = false;
  isTermsChecked: boolean;
  isPasswordHide: boolean;
  isPasswordConfirmHide: boolean;
  constructor(
    private _builder: FormBuilder,
    private _authService: AuthService,
    private _snackBar: SnackBarService
  ) {
    this.isTermsChecked = false;
    this.isPasswordHide = true;
    this.isPasswordConfirmHide = true;
  }
  signupForm = this._builder.group({
    name: this._builder.control('', Validators.required),
    lastname: this._builder.control('', Validators.required),
    email: this._builder.control('', Validators.required),
    password: this._builder.control('', Validators.required),
    passwordconfirm: this._builder.control('', Validators.required)
  });
  checkTerm(event: MatCheckboxChange) {
    this.isTermsChecked = !this.isTermsChecked;
  }
  onToggleChange(event:MatSlideToggleChange) {
      this.isEmpress=true;
  }
  signup() {
    if (!this.signupForm.valid) {
      this._snackBar.openSnackBar("Rellene todos los campos correctamente.");
      return
    }
    if (!this.isTermsChecked) {
      this._snackBar.openSnackBar("Debe leer y aceptar los terminos y condiciones.");
      return;
    }
    if (this.signupForm.value.password != this.signupForm.value.passwordconfirm) {
      this._snackBar.openSnackBar("Las contraseñas no coinciden. Vuelva a intentarlo.");
      return;
    }
    let user:any;
    if(this.isEmpress==true){
      user = {
      name: this.signupForm.value.name,
      lastname: this.signupForm.value.lastname,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      empress: true
    };
    }
    else{
      user = {
        name: this.signupForm.value.name,
        lastname: this.signupForm.value.lastname,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        empress: false
      };
    }
    this._authService.signup(user);
  }
}

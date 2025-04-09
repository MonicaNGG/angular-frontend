import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor( private fb: FormBuilder, private _toastServ: ToastService, private _authServ: AuthService, private _router: Router ) {}

  loginForm = this.fb.group({
    email: ['', Validators.required ],
    password: ['', Validators.required ]
  });

  submitForm(){
    if( this.loginForm.invalid ) {
      this._toastServ.showWarning('Por favor rellene los campos', 'Inicio de sesión');
    };

    if( this.loginForm.value.email ) this.validarExistencia()
      else this._toastServ.showError('Error al empezar a buscar', 'Error');
    }


  validarExistencia(){
    this._authServ.validarExiste( this.loginForm.value.email! ).subscribe( (res: any) => {
      if( res.status === 400 ){
        this._toastServ.showError('Usuario no encontrado', 'Error');
      } else {
        res.enabled ? this.login() : this._toastServ.showWarning('Por favor verifique su cuenta desde el correo electronico', 'No verificado')
      }
    }, (error: any) => {
      this._toastServ.showError('Error al buscar usuario', 'Error');
    })
  }


  login(){
    this._authServ.login( { email : this.loginForm.value.email!, password: this.loginForm.value.password! } ).subscribe( (res: any) => {

      this._toastServ.showSuccess('Inicio de sesión exitoso', `Bienvenido ${res.name}`);

      sessionStorage.setItem('user', JSON.stringify(res));  
      this._router.navigate(['/main']);
    }, (error: any) => {
      
      let errorMessage = "";
      (error.error.error !== undefined && error.error.error !== null ) ? errorMessage = error.error.error : errorMessage = "Intentelo de nuevo";
      this._toastServ.showError( errorMessage, 'Error');
    })
  }
}

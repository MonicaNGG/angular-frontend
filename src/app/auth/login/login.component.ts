import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor( private fb: FormBuilder, private _toastServ: ToastService ) {}

  loginForm = this.fb.group({
    email: ['', Validators.required ],
    password: ['', Validators.required ]
  });

  submitForm(){
    if( this.loginForm.invalid ) {
      this._toastServ.showWarning('Por favor rellene los campos', 'Inicio de sesión');
    };
  }
}

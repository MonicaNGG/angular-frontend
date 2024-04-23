import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, provideRouter } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { UserRegister } from '../interfaces/UserRegister';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @Inject(FormBuilder) fb: FormBuilder = new FormBuilder();

  constructor( private _toastServ: ToastService, private authServ: AuthService, private router: Router ){}

  ngOnInit(): void {
    this._toastServ.showSuccess('Bienvenido', 'Registro');
  }

  registroForm: FormGroup = this.fb.group({
    name            : ['', [Validators.required, Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/), Validators.minLength(3), Validators.maxLength(30)]],
    lastName        : ['', [Validators.required, Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/), Validators.minLength(3), Validators.maxLength(30)]],
    documentType    : ['',  Validators.required],
    documentNumber  : ['',  Validators.required ],
    phone           : ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email           : ['', [Validators.required, Validators.email]],
    password        : ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_=+{}|;:',.<>?/\\[\]~`]{8,30}$/)]]
  })

  validateRequireds(): boolean {
    const form        = this.registroForm.controls;
    const validation  = form['name'].invalid || form['lastName'].invalid || form['documentType'].invalid || form['documentNumber'].invalid || form['phone'].invalid || form['email'].invalid || form['password'].invalid 

    if( validation ) {
      this._toastServ.showWarning('Por favor rellene los campos con datos validos', 'Registro');
      return true
    }
    return false
  }


  validateIdentityNumbers(): boolean {
    const identControl = this.registroForm.get('documentNumber');
    const identType = this.registroForm.get('documentType')?.value;
    let errorValidacion = '';
    
    identControl?.clearValidators();

    switch (identType) {
      case "Cedula Ciudadania": 
      identControl?.setValidators(Validators.pattern(/^[0-9]{6,12}$/));
      errorValidacion = "La cédula debe ser válida (entre 6 y 12 caracteres numericos)";
        break;

      case "Cedula Extranjeria": 
      identControl?.setValidators(Validators.pattern(/^[0-9]{6,12}$/));
      errorValidacion = "La cédula de extranjería debe ser válida (entre 6 y 12 caracteres numericos)";
        break;

      case "Tarjeta Identidad": 
      identControl?.setValidators(Validators.pattern(/^[0-9]{10,12}$/));
      errorValidacion = "La tarjeta de identidad debe ser válida (entre 10 y 12 caracteres numericos)";
        break;

      case "Pasaporte": 
        identControl?.setValidators(Validators.pattern(/^[a-zA-Z]{2}\d{6,9}$/));
        errorValidacion = "El numero de pasaporte debe ser válido (2 Letras (la segunda mayuscula) seguidas de 6 a 9 caracteres numericos)";
        break;
    }
  
    identControl?.updateValueAndValidity(); 
  
    if ( identControl?.invalid) {
      this._toastServ.showWarning(`${errorValidacion}`, 'Error en el numero de documento');
      return true;
    }
  
    return false;
  }
  

  validateValidations(){
    if( this.registroForm.invalid ){
      
      Object.keys( this.registroForm.controls ).forEach( key => {
        
        const control = this.registroForm.get( key );
        
        if( control && control.invalid ){        
          
          Object.keys( control.errors || {} ).forEach( keyError => {

            if( keyError !== 'required' && key !== 'documentNumber') this.showWarningTitlesValidations( key, keyError )
          })
        }
      })
    }
  }

  showWarningTitlesValidations( key: string, keyError: string ){

    if( key === 'name' ) key = "Nombre"
    else if( key === 'lastName' ) key = "Apellidos"
    else if( key === 'email') key = "Correo"
    
    if( key !== 'phone' && key !== 'password') this._toastServ.showWarning(`${this.getErrorMessage(key, keyError)}`, `Error en el campo: ${key}`);

    if( key === 'password'){
      key = "Contraseña"
      this._toastServ.showWarning(`La contraseña debe tener entre 8-30 caracteres \n - Minimo una Mayuscula \n - Minimo un numero`, `Error en el campo: ${key}`);
    }

    if( key == 'phone') {
      key = "Teléfono"
      this._toastServ.showWarning(`Ingrese un número valido en colombia (10 caracteres numericos)`, `Error en el campo: ${key}`);
    }
  }

  getErrorMessage(controlName: string, validationErrorKey: string): string {
    const errors: { [key: string]: string } = {
      'pattern': 'Ingrese el valor en un formato válido.',
      'maxlength': 'Se excede la longitud máxima. ( Nombres y apellidos 30 caracteres, Teléfono 10 caracteres )',
      'minlength': 'Por favor ingrese al menos 3 caracteres.',
      'email': 'Ingrese un correo electrónico válido.'
    };

    return errors[validationErrorKey];
  }


  submitForm(){

    this.validateValidations()
    if( this.validateIdentityNumbers() ) return 
    if ( this.validateRequireds() ) return 
    if( this.registroForm.invalid ) return 

    console.log(this.registroForm.value)

    const usuario: UserRegister = {
      name: this.registroForm.get('name')?.value,
      lastName: this.registroForm.get('lastName')?.value,
      documentType: this.registroForm.get('documentType')?.value,
      documentNumber: this.registroForm.get('documentNumber')?.value,
      phone: "+57" + this.registroForm.get('phone')?.value,
      email: this.registroForm.get('email')?.value,
      password: this.registroForm.get('password')?.value,
    }


    this.registerUser( usuario )
  } 

  registerUser( user: UserRegister ){
    this._toastServ.waiting('Por favor espere mientras validamos la informacion (Esto puede tomar algun tiempo, espere la notificacion)', 'Registrando Usuario')
    try {
        this.authServ.register( user )?.subscribe({

          next: (resp: any) => {

            this._toastServ.showSuccess('Por favor valide su cuenta en el correo ingresado', 'Registro exitoso')
            this.router.navigate(['/login'])
          },
          error: (err: any) =>{

            let fistKey = Object.keys(err.error)[0]
            this._toastServ.showError( ( err.error[fistKey] ) ? err.error[fistKey] : "Revise sus datos" , 'Error al registrar el usuario')
            throw new Error(err)
          }
        })
    } catch (error: any) {

      let fistKey = Object.keys(error.error)[0]
      this._toastServ.showError('Error al registrar el usuario ' + ( error.error[fistKey] ) ? error.error[fistKey] : "Revise sus datos" , 'Error interno') 
    }
  }
}

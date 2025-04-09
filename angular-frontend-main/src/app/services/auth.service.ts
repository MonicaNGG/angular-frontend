import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../auth/interfaces/UserRegister';
import { ToastService } from './toast.service';
import { UserLogin } from '../auth/interfaces/UserLogin';
import { enviroment } from '../enviroment/enviroments';
import { BehaviorSubject } from 'rxjs';
import { User } from '../auth/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioIngresado = new BehaviorSubject<User>(null!);

  constructor( private http: HttpClient, private toastServ: ToastService ) { }


  login( user: UserLogin ): any{
    try {
      return this.http.post( enviroment.BASE_URL + "user/loginUser", user );
    } catch (error: any) {
      this.toastServ.showError(error.error, 'Error');
      return error;
    }
  }

  validarVerificado( token: string ): any{
    try {
      return this.http.get(  enviroment.BASE_URL + `user/verifyUser/${token}`);
    } catch (error) {
      this.toastServ.showError('Error interno al validar verificacion', 'Error');
      return error;
    }
  }

  validarExiste( email: string ): any{

    try {
      return this.http.get( enviroment.BASE_URL + `user/getUser/${email}`);
    } catch (error) {
        this.toastServ.showError('Error interno al validar usuario', 'Error');
        return error;
    }
  }

  register( user: UserRegister ): any{
    try{
      return this.http.post<UserRegister>( enviroment.BASE_URL + 'user/createUser', user);
    } catch (error) {
      this.toastServ.showError('Error interno al registrar usuario', 'Error');
      return error;
    }
  }

  obtenerDatosCompartidos() {
    return this.usuarioIngresado.asObservable();
  }
}

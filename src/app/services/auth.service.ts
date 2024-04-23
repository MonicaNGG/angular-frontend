import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../auth/interfaces/UserRegister';
import { ToastService } from './toast.service';
import { UserLogin } from '../auth/interfaces/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private toastServ: ToastService ) { }


  login( user: UserLogin ): any{
    try {
      return this.http.post("https://backendmikaza.onrender.com/api/user/loginUser", user );
    } catch (error: any) {
      this.toastServ.showError(error.error, 'Error');
      return error;
    }
  }

  validarVerificado( token: string ): any{
    try {
      return this.http.get(`https://backendmikaza.onrender.com/api/user/verifyUser/${token}`);
    } catch (error) {
      this.toastServ.showError('Error interno al validar verificacion', 'Error');
      return error;
    }
  }

  validarExiste( email: string ): any{

    try {
      return this.http.get(`https://backendmikaza.onrender.com/api/user/getUser/${email}`);
    } catch (error) {
        this.toastServ.showError('Error interno al validar usuario', 'Error');
        return error;
    }
  }

  register( user: UserRegister ): any{
    try{
      return this.http.post<UserRegister>('https://backendmikaza.onrender.com/api/user/createUser', user);
    } catch (error) {
      this.toastServ.showError('Error interno al registrar usuario', 'Error');
      return error;
    }
  }
  
}

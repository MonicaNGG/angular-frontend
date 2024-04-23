import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../auth/interfaces/UserRegister';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private toastServ: ToastService ) { }


  register( user: UserRegister ): any{
    try{
      return this.http.post<UserRegister>('http://localhost:8080/api/user/createUser', user);
    } catch (error) {
      this.toastServ.showError('Error interno al registrar usuario', 'Error');
      return error;
    }
  }
  
}

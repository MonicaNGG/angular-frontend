import { Injectable } from '@angular/core';
import { Inmueble } from '../interfaces/Inmueble';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroment/enviroments';

@Injectable({
  providedIn: 'root'
})
export class FinderService {

  private datosCompartidos = new BehaviorSubject<Inmueble[]>([]);


  constructor( private toast: ToastService, private http: HttpClient ) { }



  findPropertyByData( inmuebleParams: string ): any{

    try {
      console.log( inmuebleParams )
      return this.http.get(`${ enviroment.BASE_URL}property/getAllProperties${inmuebleParams}`);
    } catch (error) {
      this.toast.showError('Error al buscar inmuebles.', 'Error');
      return error;
    }
  }



  obtenerDatosCompartidos() {
    return this.datosCompartidos.asObservable();
  }

  actualizarDatos(inmuebles: Inmueble[]) {
    //console.log( inmuebles )
    this.datosCompartidos.next(inmuebles);
  }

  
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inmueble } from '../interfaces/Inmueble';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private property = new BehaviorSubject<Inmueble>(null!);


  constructor() { }


  obtenerDatosModalCompartidos() {
    return this.property.asObservable();
  }

  actualizarModalDatos(inmuebles: Inmueble) {
    
    this.property.next(inmuebles);
  }
}

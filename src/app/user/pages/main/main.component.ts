import { Component } from '@angular/core';
import { Usuario } from '../../../interfaces/Usuario'
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinderService } from '../../../services/finder.service';
import { Inmueble } from '../../../interfaces/Inmueble';
import { ToastService } from '../../../services/toast.service';
import { FindedPropertiesComponent } from '../../components/finded-properties/finded-properties.component';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule,  ReactiveFormsModule, FindedPropertiesComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor( private router: Router, private fb: FormBuilder, private finderServ: FinderService, private toast: ToastService) { }

  usuario : Usuario = {
    name: '',
    lastName: '',
    documentType: '',
    documentNumber: '',
    phone: '',
    email: ''
  };


  buscador = this.fb.group({
    zone              : [null],
    additionalServices: [null ],
    entryDate         : [null],
    exitDate          : [null],
    city              : ['Bogotá'],
    price             : [null],
    accommodationType : [null],
    numberPeople      : [null]
  })
  

  ngOnInit(): void {
    this.obtenerSession()
  }

  buscar(){
    const inmuebleParams = this.createParamsObject();

    this.finderServ.findPropertyByData( this.createParamsString( inmuebleParams) ).subscribe( (res: any) => {

      this.finderServ.actualizarDatos( res );
      this.buscador.reset();
    }, (error: any) => {
      
      console.error( error );
      this.toast.showError('Error al buscar inmuebles.', 'Error');
    })
  }

  createParamsString( inmuebleParams: any ): string{
    let inmuebleParamsString = '?';

    for( let key in inmuebleParams ){
      inmuebleParamsString += `${key}=${inmuebleParams[key]}&`;
    }

    return inmuebleParamsString;
  }


  createParamsObject(){

    let inmuebleParams: any = {}

    if( this.buscador.value.additionalServices !== null ){
      inmuebleParams['additionalServices'] = this.buscador.value.additionalServices;
    }

    if( this.buscador.value.entryDate !== null ){
      inmuebleParams['entryDate'] = this.buscador.value.entryDate;
      inmuebleParams['entryDate'] = inmuebleParams['entryDate'].replace(/-/g, '/')
    }

    if( this.buscador.value.zone !== null ){
      inmuebleParams['zone'] = this.buscador.value.zone;
    }

    if( this.buscador.value.city !== null ){
      inmuebleParams['city'] = this.buscador.value.city;
    }

    if( this.buscador.value.price !== null ){
      inmuebleParams['price'] = this.buscador.value.price;
    }

    if( this.buscador.value.accommodationType !== null ){
      inmuebleParams['accommodationType'] = this.buscador.value.accommodationType;
    }

    if( this.buscador.value.exitDate !== null ){
      inmuebleParams['exitDate'] = this.buscador.value.exitDate;
      inmuebleParams['exitDate'] = inmuebleParams['exitDate'].replace(/-/g, '/')
    }

    if( this.buscador.value.numberPeople !== null ){
      inmuebleParams['numberPeople'] = this.buscador.value.numberPeople;
    }

    return inmuebleParams;
  }


  obtenerSession(){
    let usuarioSesion = JSON.parse( sessionStorage.getItem('user')! );
    this.usuario.name = usuarioSesion?.name;
    this.usuario.lastName = usuarioSesion?.lastName;
    this.usuario.documentType = usuarioSesion?.documentType;
    this.usuario.documentNumber = usuarioSesion?.documentNumber;
    this.usuario.phone = usuarioSesion?.phone;
    this.usuario.email = usuarioSesion?.email;
  }

  cerrar(){
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

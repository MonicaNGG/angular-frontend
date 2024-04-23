import { Component } from '@angular/core';
import { Usuario } from '../../../interfaces/Usuario'
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor( private router: Router ) { }

  usuario : Usuario = {
    name: '',
    lastName: '',
    documentType: '',
    documentNumber: '',
    phone: '',
    email: ''
  };

  ngOnInit(): void {
    
    this.obtenerSession()
  }

  obtenerSession(){
    let usuarioSesion = JSON.parse( sessionStorage.getItem('user')! );
    console.log( usuarioSesion)
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

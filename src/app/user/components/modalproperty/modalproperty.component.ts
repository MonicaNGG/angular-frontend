import { Component, Input } from '@angular/core';
import { Inmueble } from '../../../interfaces/Inmueble';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { ToastService } from '../../../services/toast.service';
import { User } from '../../../auth/interfaces/User';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modalproperty',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './modalproperty.component.html',
  styleUrl: './modalproperty.component.css'
})
export class ModalpropertyComponent {

  numeroPersonas: string = "";
  numeroPersonasInt: number | null = null;
  showReserva: boolean = false;

  diasDiferencia: number | null = null;

  llegada: Date = new Date();
  salida: Date = new Date();

  item?: Inmueble;  
  user?: User;

  constructor( private modalServ: ModalService, private toastSert: ToastService, private authServ: AuthService ){}

  ngOnInit(): void {

    this.modalServ.obtenerDatosModalCompartidos().subscribe( (res: Inmueble) => {
      this.item = res;
      this.obtenerUsuario()
    })
  }

  numPersonChange(){      
    if ( this.numeroPersonas !== "" ){
      this.numeroPersonasInt = parseInt(this.numeroPersonas);
    }
  }

  obtenerUsuario(){
    this.authServ.obtenerDatosCompartidos().subscribe( (res: User) => {
      this.user = res;
    })
  }

  obtenerTotal(){
    return this.diasDiferencia! * parseInt( this.item?.price! ) * this.numeroPersonasInt!;
  }

  reserva(){

    if( !this.validarNumeroPersonas() || !this.validarFechas() ){
      return;
    }

    this.toastSert.showSuccess('Se ha reservado con exito: ' 
                                + this.item?.accommodationType 
                                + " en zona " 
                                + this.item?.zone 
                                + " de " 
                                + this.item?.city, 'Reserva');
    
   this.showReserva = true;
  }

  validarFechas(): boolean{
    const dateLlegada = new Date( this.item?.entryDate! );
    const dateSalida = new Date( this.item?.exitDate! );


    const llegada = new Date( this.llegada );
    const salida = new Date( this.salida );
   
    this.diasDiferencia = Math.floor( (salida.getTime() - llegada.getTime()) / (1000 * 3600 * 24 ) );
   
    if( llegada < dateLlegada || llegada  >= salida || salida > dateSalida || this.diasDiferencia > 30 ){

      this.toastSert.showError('Las fechas no son validas (tampoco puede hospedarse mas de 30 dias)', 'Error');
      return false;
    }

    return true
  }

  validarNumeroPersonas(): boolean{

    if( this.numeroPersonasInt === null || this.numeroPersonasInt < 1 || this.numeroPersonasInt > parseInt( this.item?.numberPeople! ) ){
      this.toastSert.showError('El numero de personas no es valido', 'Error');
      return false;
    }
    return true
  }

  volver(){
    this.showReserva = false;
  }

  cerrarModal(){
    this.showReserva = false;
    this.item = null!;
    this.modalServ.actualizarModalDatos(null!);
  }
}

import { Component, Input } from '@angular/core';
import { Inmueble } from '../../../interfaces/Inmueble';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-modalproperty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modalproperty.component.html',
  styleUrl: './modalproperty.component.css'
})
export class ModalpropertyComponent {


  item?: Inmueble;  

  constructor( private modalServ: ModalService, private toastSert: ToastService ){}

  ngOnInit(): void {

    this.modalServ.obtenerDatosModalCompartidos().subscribe( (res: Inmueble) => {
      this.item = res;
    })
  }

  reserva(){
    this.toastSert.showSuccess('Se ha reservado con exito: ' 
                                + this.item?.accommodationType 
                                + " en zona " 
                                + this.item?.zone 
                                + " de " 
                                + this.item?.city, 'Reserva');
    this.cerrarModal();
  }

  cerrarModal(){
    this.item = null!;
    this.modalServ.actualizarModalDatos(null!);
  }
}

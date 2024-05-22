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


  cerrarModal(){
    this.item = null!;
    this.modalServ.actualizarModalDatos(null!);
  }
}

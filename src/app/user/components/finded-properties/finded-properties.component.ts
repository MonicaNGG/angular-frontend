import { Component } from '@angular/core';
import { Inmueble } from '../../../interfaces/Inmueble';
import { FinderService } from '../../../services/finder.service';
import { ToastService } from '../../../services/toast.service';
import { CommonModule } from '@angular/common';
import { ModalpropertyComponent } from '../modalproperty/modalproperty.component';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-finded-properties',
  standalone: true,
  imports: [ CommonModule, ModalpropertyComponent ],
  templateUrl: './finded-properties.component.html',
  styleUrl: './finded-properties.component.css'
})
export class FindedPropertiesComponent {


  public properties: Inmueble[] = [];
  
  constructor( private finderServ: FinderService, private toastServ: ToastService, private modalServ: ModalService ){}

  ngOnInit(): void {
    
    this.finderServ.obtenerDatosCompartidos().subscribe( (res: Inmueble[]) => {
      this.properties = res;
    }, (error: any)=>{
      this.toastServ.showError('Error al mostrar los inmuebles.', 'Error');
    });
  }  



  mostrarModal( index: number ){
    this.modalServ.actualizarModalDatos(this.properties[index]);
  }
}

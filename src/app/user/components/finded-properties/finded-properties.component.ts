import { Component } from '@angular/core';
import { Inmueble } from '../../../interfaces/Inmueble';
import { FinderService } from '../../../services/finder.service';
import { ToastService } from '../../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finded-properties',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './finded-properties.component.html',
  styleUrl: './finded-properties.component.css'
})
export class FindedPropertiesComponent {


  public properties: Inmueble[] = [];

  constructor( private finderServ: FinderService, private toastServ: ToastService ){}

  ngOnInit(): void {
    
    this.finderServ.obtenerDatosCompartidos().subscribe( (res: Inmueble[]) => {

      console.log( res )
      this.properties = res;
      console.log( this.properties)

    }, (error: any)=>{
      this.toastServ.showError('Error al mostrar los inmuebles.', 'Error');
    });
  }  
}

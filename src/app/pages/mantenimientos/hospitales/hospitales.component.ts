import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor( private hospitalService: HospitalService,
               public modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService) { }

  ngOnInit(): void {

  this.cargarHospitales();
  this.imgSubs = this.modalImagenService.nuevaImagen
  .pipe(
    delay(180))
    .subscribe(
      img => this.cargarHospitales()
    );

  }

  buscarColeccion(termino: string){

    if (termino.length === 0){
      return this.cargarHospitales();
    }

    this.busquedasService.buscarColeccion('hospitales', termino)
          .subscribe(resp => {
            this.hospitales = resp;
          });
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  cargarHospitales(){
    this.cargando = true;

    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
      });
  }

  guardarCambios(hostial: Hospital){
    this.hospitalService.actualizarHospital(hostial._id, hostial.nombre)
      .subscribe(resp => {
        Swal.fire({
          title: 'Actualizado',
          text: `Se realizo la modificacion del registro ${hostial.nombre}`,
          icon: 'success',
        });
      });
  }

  elimarHospital(hospital: Hospital){

    Swal.fire({
      title: 'Eliminacion',
      text: 'Esta seguro de realizar la eliminación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar todo'
    }).then((result) => {
          if (result.isConfirmed) {
            this.hospitalService.borrarHospital(hospital._id)
              .subscribe(resp => {
                Swal.fire(`Se realizo la eliminacion del registro ${hospital.nombre}`, '', 'success');
                this.cargarHospitales();
              });
          }
        });
  }

  async abrirSAModal(){
    const { value = ''} = await Swal.fire<string>({
      title: 'Nuevo registro',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true
    });

    if (value.trim().length > 0){
      this.hospitalService.crearHospital(value)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.hospital);
        });
    }
  }

  abrirModal(hospital: Hospital){
    console.log(hospital);

    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

  }

}

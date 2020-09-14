import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { MedicoService } from '../../../services/medico/medico.service';
import { ModalImagenService } from '../../../services/modal/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
              public modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(200))
      .subscribe(
        img => this.cargarMedicos()
      );
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
      });

  }

  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img)
  }

  buscarMedico(termino: string){

    if (termino.length === 0){
          return this.cargarMedicos();
        }
    this.busquedasService.buscarColeccion('medicos', termino)
              .subscribe(resp => {
                this.medicos = resp;
              });
  }

  borrarMedico(medico: Medico){
    Swal.fire({
      title: 'Eliminacion',
      text: 'Esta seguro de realizar la eliminación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
          if (result.isConfirmed) {
            this.medicoService.borrarMedico(medico._id)
              .subscribe(resp => {
                Swal.fire(`Se realizo la eliminacion del registro ${medico.nombre}`, '', 'success');
                this.cargarMedicos();
              });
          }
        });
  }
}

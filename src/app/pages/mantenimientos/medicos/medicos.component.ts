import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico/medico.service';
import { Medico } from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  
  public medicos: Medico[] = [];
  public cargando: boolean = true;

  constructor(private medicosService: MedicoService, public modalImagenServive: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicosService.cargarMedicos()
      .subscribe(medicos =>{
        this.cargando = false;
        this.medicos = medicos;
        console.log(medicos);
      });

  }

  abrirModal(medico: Medico){
    this.modalImagenServive.abrirModal('medicos', medico._id, medico.img)
  }

}

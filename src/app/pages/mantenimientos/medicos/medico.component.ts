import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital/hospital.service';
import { MedicoService } from '../../../services/medico/medico.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

public medicoForm: FormGroup;
public hospitales: Hospital[] = [];

public hospitalSeleccionado: Hospital;
public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activateRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(({id}) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
        .subscribe(hospitalId =>{
          this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
        });


  }

  cargarMedico(id: string){
    this.medicoService.cargarMedicoById(id)
        .subscribe(medico => {
          console.log(medico);
          const {nombre, hospital: {_id}} = medico;
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({nombre, hospital: _id});
        });
  }

  guardarMedico(){
    const {nombre} = (this.medicoForm.value);
    this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe( (resp: any) => {
          Swal.fire({
            icon: 'success',
            title: `Registro de ${nombre} creado correctamente...`,
            showConfirmButton: true,
            timer: 3000
          });
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

}

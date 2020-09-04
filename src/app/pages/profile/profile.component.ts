import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { UsuarioService } from '../../services/usuario/usuario.service';
import { SubirArchivosService } from '../../services/subir-archivo/subir-archivos.service';

import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imagenTemp: any;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: SubirArchivosService) {
      this.usuario = usuarioService.usuario;

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email] ],
    });
  }

  guardarPerfil(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google){
      this.usuario.email = usuario.email;
    }
  }

  cambiarImagen( file: File) {

    this.imagenSubir = file;

    if (!file) { return; }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };



  }

  subirImagen(){
    this.fileUploadService
        .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
        .then(img => {
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
          this.usuario.img = img;
        }).catch(err => {

          Swal.fire('Error', 'No su puedo subir la imagen', 'success');
          console.log(err);
        });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}

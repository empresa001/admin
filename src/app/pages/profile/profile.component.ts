import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { UsuarioService } from '../../services/usuario/usuario.service';
import { SubirArchivosService } from '../../services/subir-archivo/subir-archivos.service';

import { Usuario } from '../../models/usuario.model';


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

  // imagenTemp: any;

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

/*     this._usuarioServices.actualizarUsuario(this.usuario)
      .subscribe(resp => {
        console.log(resp);
      }); */
  }

  seleccionImagen( archivo: File ){

    if ( !archivo ) {
      this.imagenSubir = null;
    }

    if ( archivo.type.indexOf('image') < 0){
      // swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      // this.imagenTemp = reader.result;
    };


  }

  cambiarImagen( file: File) {

    console.log(file);
    this.imagenSubir = file;

  }

  subirImagen(){
    this.fileUploadService
        .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
        .then(img => console.log(img));
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
      });
  }

}

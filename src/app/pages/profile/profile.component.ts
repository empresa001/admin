import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

usuario: Usuario;
imagenSubir: File;
imagenTemp: any;

  constructor( public _usuarioServices: UsuarioService) {

    this.usuario = this._usuarioServices.usuario;

  }

  ngOnInit(): void {
  }

  guardarPerfil(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google){
      this.usuario.email = usuario.email;
    }

    this._usuarioServices.actualizarUsuario(this.usuario)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  seleccionImagen( archivo: File ){

    if ( !archivo ) {
      this.imagenSubir = null;
    }

    if ( archivo.type.indexOf('image') < 0){
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };


  }

  cambiarImagen() {

    this._usuarioServices.cambiarImagen( this.imagenSubir, this.usuario._id);

  }

}

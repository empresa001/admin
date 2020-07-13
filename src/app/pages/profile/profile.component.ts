import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

usuario: Usuario;

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

}

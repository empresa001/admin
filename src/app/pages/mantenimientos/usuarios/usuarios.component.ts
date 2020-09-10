import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { UsuarioService } from '../../../services/usuario/usuario.service';
import { BusquedasService } from '../../../services/busquedas/busquedas.service';
import { ModalImagenService } from '../../../services/modal/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService, private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService ) { }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(180))
      .subscribe(
        img => this.cargarUsuarios()
      );
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({totalRegistros, usuarios}) => {
      this.totalUsuarios = totalRegistros;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    });
  }

  cambiarPagina(ndesde: number){
    this.desde += ndesde;
    if (this.desde < 0){
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios){
      this.desde -= ndesde;
    }

    this.cargarUsuarios();

  }

  buscarColeccion(termino: string){

  if (termino.length === 0){
    return this.usuarios = this.usuariosTemp;
  }

  this.busquedasService.buscarColeccion('usuarios', termino)
        .subscribe((resp: Usuario[]) => {
          this.usuarios = resp;
        });
  }

  elimnarUsuario(usuario: Usuario){

    if (usuario.uid === this.usuarioService.uid){
      return Swal.fire({
        icon: 'error',
        title: 'Error en eliminacion',
        text: 'No puede realizar la eliminacion de su propia cuenta',
        footer: '<a href>Comuníquese con el administrador</a>'
      });
    }

    Swal.fire({
          title: 'Esta seguro de borrar?',
          text: `Esta apunto de borrar los datos de ${usuario.nombre}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si, borrar todo'
        }).then((result) => {
          if (result.isConfirmed) {
            this.usuarioService.elimarUsuarios(usuario)
              .subscribe( resp => {
                Swal.fire(
                  'Archivo Borrado!',
                  `${usuario.nombre} fue eliminado correctamente...`,
                  'success'
                );
                this.cargarUsuarios();
              });
          }
        });
  }

  cambiarRole(usuario: Usuario){
    this.usuarioService.cambiarRolUsuario(usuario)
      .subscribe(resp => {

      });
  }

  abrirModal(usuario: Usuario){
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}

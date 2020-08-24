import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
// import swal from 'sweetalert/typings/core';
import _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Router } from '@angular/router';
import { SubirArchivosService } from '../subir-archivo/subir-archivos.service';
import { RegisterForm } from '../../interfaces/register-form.interface';
import { LoginForm } from '../../interfaces/login-form.interface';
import { environment } from '../../../environments/environment';

const swal: SweetAlert = _swal as any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

usuario: Usuario;
token: string;

  constructor(private http: HttpClient/* public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivosService */ ) {
    console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  estaLogueado() {
    return( this.token.length >  5 ) ? true : false;
  }

cargarStorage(){
  if(localStorage.getItem('token')){
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  } else{
    this.token = '';
    this.usuario = null;
  }
}

  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  crearUsuario(formData: RegisterForm){

      return this.http.post(`${ base_url }/usuarios`, formData);
  }

  actualizarUsuario(usuario: Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put( url, usuario)
    .pipe(
      map( (resp: any) => {

        let usuarioDB: Usuario = resp.usuario;
        this.guardarStorage( usuarioDB._id, this.token, usuarioDB);
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
        })
      );
    }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token })
    .pipe(
    map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, );
      return true;
      })
    );
  }

  login(formData: LoginForm) {

/*         if ( recordar ){
          localStorage.setItem('email', usuario.email);
        }else{
          localStorage.removeItem('email');
        }
    
        let url = URL_SERVICIOS + '/login';
    // tslint:disable-next-line: align
    return this.http.post(url, usuario)
    .pipe(
      map((resp: any) => {
    
        this.guardarStorage(resp.id, resp.token, resp.usuario, );
    /*     localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario)); 
        return true;
      })
    ); */

    return this.http.post(`${ base_url }/login`, formData);
  }

  cambiarImagen( archivo: File, id: string ){
this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
.then( (resp: any) => {
// console.log(resp);
this.usuario.img = resp.usuario.img;
swal('Imagen actualizada', this.usuario.nombre, 'success');
this.guardarStorage(id, this.token, this.usuario);
})
.catch( resp => {
console.log(resp);
});
  }
}

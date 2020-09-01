import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

// import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivosService } from '../subir-archivo/subir-archivos.service';
import { RegisterForm } from '../../interfaces/register-form.interface';
import { LoginForm } from '../../interfaces/login-form.interface';
import { resolve } from 'dns';
import { Usuario } from 'src/app/models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: any;
  // token: string;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    // this.cargarStorage();
     this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }
  get uid(): string{
    return this.usuario.uid || '';
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, google, img, role, img, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  estaLogueado() {
    return( this.token.length >  5 ) ? true : false;
  }

/* cargarStorage(){
  if (localStorage.getItem('token')){
    this.token = localStorage.getItem('token');
    // this.usuario = JSON.parse(localStorage.getItem('usuario'));
  } else{
    this.token = '';
    // this.usuario = null;
  }
} */

/*   guardarStorage(id: string, token: string){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);

    // this.usuario = usuario;
    this.token = token;
  }
 */
  crearUsuario(formData: RegisterForm){

      return this.http.post(`${ base_url }/usuarios`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  actualizarPerfil( data: {email: string, nombre: string, role: string}){
    data = {
      ...data,
      role: this.usuario.role
    }
    
    return this.http.put(`${ base_url }/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${ base_url }/login`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle( token ) {
    return this.http.post(`${ base_url }/login/google`, { token })
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  googleInit() {

    return new Promise( resolve => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '340051960081-l8knvltqm4rp1lu0kj98qjf98h2smph6.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();

      });
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

}


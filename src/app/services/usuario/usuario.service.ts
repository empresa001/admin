import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { Router } from '@angular/router';

import { CargarUsuario } from '../../interfaces/cargar-usuarios-interface';
import { RegisterForm } from '../../interfaces/register-form.interface';
import { LoginForm } from '../../interfaces/login-form.interface';

import { Usuario } from 'src/app/models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
     this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role;
  }
  get uid(): string{
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
      'x-token': this.token
    }
  };
  }

  guardarLocalStorage(token: string, menu: any){
      localStorage.setItem('token', token);
      localStorage.setItem('menu', JSON.stringify(menu));
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { nombre, email, role, google, img = '', uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){

      return this.http.post(`${ base_url }/usuarios`, formData)
      .pipe(
        tap( (resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );

  }

  actualizarPerfil( data: {email: string, nombre: string , role: string }){
     data = {
      ...data,
      role: this.usuario.role
    } 
    return this.http.put(`${ base_url }/usuarios/${this.uid}`, data, this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${ base_url }/login`, formData)
      .pipe(
        tap( (resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  }

  loginGoogle( token ) {
    return this.http.post(`${ base_url }/login/google`, { token })
      .pipe(
        tap( (resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
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
    localStorage.removeItem('menu');

    // TODO: borrar menu

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  cargarUsuarios(desde: number= 0){
     // localhost:3000/api/usuarios?desde=0
    const url = `${ base_url }/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map( resp =>{
          const usuarios = resp.usuarios
            .map(
                  user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
                );
          return {
            totalRegistros:  resp.totalRegistros,
            usuarios
          };
        }
      ));
  }

  elimarUsuarios(usuario: Usuario){
    // localhost:3000/api/usuarios/5f33ff53a60bff2910722d3d
    const url = `${ base_url }/usuarios/${usuario.uid}`;

    return this.http.delete(url, this.headers);
  }


  cambiarRolUsuario( usuario: Usuario ){
       return this.http.put(`${ base_url }/usuarios/${usuario.uid}`, usuario, this.headers);
     }
}


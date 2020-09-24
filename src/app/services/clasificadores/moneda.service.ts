import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLinkActive } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Moneda } from '../../models/clasificadores/moneda';


const base_url_ep = environment.base_url_ep;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  public auth2: any;
  public usuario: any;

  constructor(private http: HttpClient, private route: Router) {

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

  cargarMonedas(){
    const url = `${base_url_ep}/moneda`;
    return this.http.get(url, this.headers)
      .pipe(
        map(( resp: { ok: boolean, monedas: Moneda[] }) => resp.monedas)
      );
  }
}

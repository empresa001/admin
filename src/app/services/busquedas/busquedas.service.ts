import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

import { map } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }
  get headers(){
      return {
        headers: {
        'x-token': this.token
      }
    };
  }

private transformarUsuarios(resultados: any[]): Usuario[]{
  return resultados.map(
    user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
  );
}

  buscarColeccion(tipo: 'usuarios' | 'medicos' | 'hospitales', terminoBusqueda: string){
    const url = `${ base_url }/todo/coleccion/${ tipo }/${terminoBusqueda}`;

    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map( (resp: any) => {
          switch ( tipo ){
            case 'usuarios':
                return this.transformarUsuarios(resp.resultados);
            case 'hospitales':
              return this.transformarUsuarios(resp.resultados);
            case 'medicos':
              return this.transformarUsuarios(resp.resultados);
            default:
              return[];
          }
        })
      );
  }

}

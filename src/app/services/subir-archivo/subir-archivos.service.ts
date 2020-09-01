import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {

  constructor() { }



  /* subirArchivo */async actualizarFoto( archivo: File, tipo: 'usuarios'|'medicos'|'hospitales', id: string) {
    try{

      const url = `${ base_url }/upload/${ tipo }/${ id }`;

      const formData = new FormData();
      formData.append('img', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token')
        },
        body: formData
      });

     const data = await resp.json();

     console.log(data);

      return 'nombre de la imagen';

    } catch (error){
      console.log(error);
      return false;
    }

/*     return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append( 'imagen', archivo, archivo.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 ){
          if (xhr.status === 200) {
            console.log("Imagen subida");
            resolve( JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }
      };

    let url = URL_SERVICIOS + '/upload/' + tipo +'/' + id;

    xhr.open('PUT', url, true);

    xhr.send(formData);

    }); */

  }
}

import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal/modal-imagen.service';
import { SubirArchivosService } from '../../services/subir-archivo/subir-archivos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imagenTemp: any;

  constructor( public modalImagenService: ModalImagenService, public fileUploadService: SubirArchivosService  ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen( file: File) {

    this.imagenSubir = file;

    if (!file) { return; }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
        .actualizarFoto(this.imagenSubir, tipo, id)
        .then(img => {
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
          this.modalImagenService.nuevaImagen.emit(img);
          this.cerrarModal();
        }).catch(err => {

          Swal.fire('Error', 'No su puedo subir la imagen', 'success');
          console.log(err);
        });
  }

}

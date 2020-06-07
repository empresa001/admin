import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {

  this.contarTres().then(
      (mensaje) => console.log('Termino!', mensaje),
    ).catch(error => console.error('Error en la promesa', error));
 }

  ngOnInit(): void {
  }

contarTres(): Promise<boolean> {

  return new Promise( (resolve, rejects) => {

    let contador: number = 0;
       // tslint:disable-next-line: align
       let intervalo = setInterval(() => {

        contador += 1;
        console.log(contador);

        if ( contador === 3 ){
          resolve();
          //rejects('Simplemente un error!');
          clearInterval(intervalo);
        }
       }, 1000);
    });

}

}

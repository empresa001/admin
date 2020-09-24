import { Component, OnInit } from '@angular/core';
import { Moneda } from '../../../models/clasificadores/moneda';

import { MonedaService } from '../../../services/clasificadores/moneda.service';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styles: [
  ]
})
export class MonedasComponent implements OnInit {

  public monedas: Moneda[] = [];
  public cargando: boolean = true;

  constructor(private monedaService: MonedaService) { }

  ngOnInit(): void {
  }

  cargarMonedas(){
    this.cargando = true;
    this.monedaService.cargarMonedas()
      .subscribe(monedas => {
        console.log(monedas);
        this.cargando = false;
        this.monedas = monedas;
      });
  }

}

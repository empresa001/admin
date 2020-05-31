import { Injectable,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document) {
    this.cargaAjustes();
   }

guardarAjustes() {
  console.log('Guarda ajustes');
  localStorage.setItem('ajustes', JSON.stringify( this.ajustes));
}

cargaAjustes() {
  if (localStorage.getItem('ajustes')===''){
    this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    console.log('Cargando ajustes ls');
    this.aplicarTema(this.ajustes.theme);
  } else {
    console.log('Usando valores por defecto');
    this.aplicarTema(this.ajustes.theme);
  }
}

aplicarTema(theme: string) {
  let urlTheme = `assets/css/colors/${theme}.css`;
  this._document.getElementById('theme').setAttribute('href', urlTheme);
  this.ajustes.theme = theme;
  this.ajustes.themeUrl = urlTheme;

  this.guardarAjustes();
}

}

interface Ajustes {

  themeUrl: string;
  theme: string;

}
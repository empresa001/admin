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
  localStorage.setItem('ajustes', JSON.stringify( this.ajustes));
}

cargaAjustes() {
  if (localStorage.getItem('ajustes')===''){
    this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    this.aplicarTema(this.ajustes.theme);
  } else {
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
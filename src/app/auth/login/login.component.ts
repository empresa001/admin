import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
/* import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model'; */
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';

// declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  email: string;

  // Google
  // auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remenber: [false]
  });

  constructor( private fb: FormBuilder, public router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
 // init_plugins();
 this.renderButton();
/*     this.googleInint();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1 ){
      this.recuerdame = true; 
    }*/
  }

/*   googleInint(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '131214566624-qvqesnctjbtlapna76i6ovem4ge55mpb.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle'));
    });
  } */

/*   attachSignin( element ){
    this.auth2.attachClickHandler( element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
        // .subscribe( () => this.router.navigate(['/dashboard']));
        .subscribe( () => window.location.href = '#/dashboard');

      console.log(token);
    });
  } */

  login() {

    this.usuarioService.login(this.loginForm.value)
      .subscribe( resp => {
        if (this.loginForm.get('remenber').value){
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else{
          localStorage.removeItem('email');
        }
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

 onSuccess(googleUser) {
    // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }

  onFailure(error) {
    console.log(error);
  }
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }
}

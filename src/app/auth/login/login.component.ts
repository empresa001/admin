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

  public formSubmit = false;
  public auth2: any;
  email: string;
  
  // Google

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remenber: [false]
  });

  constructor( private fb: FormBuilder, public router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
 // init_plugins();
 this.renderButton();
  }

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

  

      renderButton() {
        gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
        });
        this.startApp();
      }

      startApp() {
        gapi.load('auth2', () => {
          // Retrieve the singleton for the GoogleAuth library and set up the client.
          this.auth2 = gapi.auth2.init({
            client_id: '131214566624-qvqesnctjbtlapna76i6ovem4ge55mpb.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
          });
          this.attachSignin(document.getElementById('my-signin2'));
        });
      }

      attachSignin(element) {
        this.auth2.attachClickHandler(element, {},
            (googleUser) => {
               const id_token = googleUser.getAuthResponse().id_token;
               console.log(id_token);
               this.usuarioService.loginGoogle(id_token)
                 .subscribe();
            }, (error) => {
              alert(JSON.stringify(error, undefined, 2));
            });
      }

}

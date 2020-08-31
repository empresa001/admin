import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';

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

  constructor( private fb: FormBuilder, public router: Router, private usuarioService: UsuarioService, private ngZone: NgZone) { }

  ngOnInit() {
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
        // navegar al dashboard
        this.router.navigateByUrl('/');
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

      async startApp() {

        await this.usuarioService.googleInit();
        this.auth2 = this.usuarioService.auth2;

        this.attachSignin(document.getElementById('my-signin2'));

      }

      attachSignin(element) {
        this.auth2.attachClickHandler(element, {},
            (googleUser) => {
               const id_token = googleUser.getAuthResponse().id_token;
               console.log(id_token);
               this.usuarioService.loginGoogle(id_token)
                 .subscribe( resp => {
                   // navegar al dashboard
                   this.ngZone.run(() => {
                    this.router.navigateByUrl('/');
                  });
                 });

            }, (error) => {
              alert(JSON.stringify(error, undefined, 2));
            });
      }

}

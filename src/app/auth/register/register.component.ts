import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';


// import { UsuarioService } from '../../services/services.index';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';

// declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;
  constructor(private fb: FormBuilder, private usuarioServices: UsuarioService, private router: Router) { }

  public registerForm = this.fb.group({
    nombre: ['Gabriel', Validators.required],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: ['true', Validators.required],
  }, {
    validators: this.passwordIguales('password', 'password2')
  });

  ngOnInit(): void {
    // init_plugins();
  }

  crearUsuario(){

    this.formSubmitted = true;

    console.log(this.registerForm);
    console.log(this.registerForm.value);

    if (this.registerForm.invalid){
     return;
    }

    // Realizando la creacion
    this.usuarioServices.crearUsuario(this.registerForm.value)
        .subscribe(resp => {
            // Navegar al Dashboard
            this.router.navigateByUrl('/');
        }, (err) => {
          // Manejo de errores
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  campoNoValido(campo: string): boolean{
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password');
    const pass2 = this.registerForm.get('password2');
    if (( pass1 !== pass2) && (this.formSubmitted) ) {
        return true;
      } else {
        return false;
      }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordIguales(pass1Name: string, pass2Name: string){

    return(formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value)
      {
        pass2Control.setErrors(null);
      } else{
        pass2Control.setErrors({noEsIgual: true});
      }

    };

  }

}

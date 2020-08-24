import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

const swal: SweetAlert = _swal as any;

// declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;
  constructor(private fb: FormBuilder,  /* public _usuarioService: UsuarioService, public router: Router */) { }

  // forma: FormGroup;
public registerForm = this.fb.group({
  nombre: ['Gabriel', [Validators.required]],
  email: ['test100@gmail.com', [Validators.required, Validators.email]],
  password: ['', Validators.required],
  password2:['', Validators.required],
  terminos: ['false', Validators.required],
});

/*   sonIguales(campo1: string, campo2: string){

    return(group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

        // tslint:disable-next-line: align
        if ( pass1 === pass2 ) {
          return null;
        }

      return{
        sonIguales: true
      };
    };
  } */

  ngOnInit(): void {
    // init_plugins();

/*     this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),

    }, {validators: this.sonIguales('password', 'password2')});

    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    }); */
  }

  crearUsuario(){

    this.formSubmitted = true;

    if(this.registerForm.valid){
      console.log('posteando formulario');
    } else{
      console.log('Formulario no es correcto');
    }
/* 
    if ( this.forma.invalid ) {
      return;
    }
    if ( !this.forma.value.condiciones ) {
      //console.log('Debe de aceptar las condiciones de uso');
     swal("Importante", "Debe de aceptar las condiciones de uso", "warning");

      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );

    this._usuarioService.crearUsuario(usuario)
    .subscribe(resp => {
      this.router.navigate(['/login']);
      console.log(resp);
    }); */

  }

  campoNoValido(campo: string): boolean{
    if(this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

}

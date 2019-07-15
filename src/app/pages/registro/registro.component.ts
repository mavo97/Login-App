import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    //this.usuario.email = 'mavo6939@gmail.com';

    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;

  }
}

  onSubmit( form: NgForm ) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();


    this.auth.nuevoUsuario(this.usuario)
    .subscribe( resp => {
      Swal.close();
      this.router.navigateByUrl('/home');
      console.log(resp);
    }, (err) => {
      Swal.fire({
        allowOutsideClick: false,
        type: 'error',
        title: 'Error al registrar',
        text: err.error.error.message
      });
      console.log(err.error.error.message);
    } );
  }


}

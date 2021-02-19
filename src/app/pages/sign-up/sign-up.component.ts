import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('formulario ', this.signUpForm);

    if (this.signUpForm.valid) {
      this.clientsService.signUp(this.signUpForm.value)
        .subscribe(
          (client) => {
            console.log('client ', client)
          },
          (error) => {
            swal('Error', 'No se pudo completar el registro.', 'error');
            console.error('Error creating client: ', error);
          }
        );
    } else {
      swal('Error', 'Debes completar todos los campos', 'error');
    }

    document.getElementById('sign-up-form').classList.add('was-validated');
  }

}

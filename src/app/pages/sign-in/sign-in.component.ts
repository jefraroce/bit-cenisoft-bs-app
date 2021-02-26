import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenService } from 'src/app/services/token.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.authenticationService.signInWithEmailAndPassword(email, password)
        .subscribe(
          (token: any) => {
            console.log('token ', token);
            this.tokenService.saveToken(token.jwt);
            this.router.navigate(['/home']);
          },
          (response) => {
            swal('Error', 'Correo Electrónico o Contraseña invalidos.', 'error');
            console.error('Error authenticating client: ', response);
          }
        );
    } else {
      console.log('form ', this.signInForm);
      swal('Error', 'Verifica la información del formulario', 'error');
    }
  }
}

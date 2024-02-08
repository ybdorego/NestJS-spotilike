import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../_services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  toastr = inject(ToastrService)
  authService = inject(AuthService)

  public usernameFormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);

  public passwordFormControl = new FormControl(null, [Validators.minLength(6)]);

  public userForm: FormGroup = new FormGroup({
    email: this.usernameFormControl,
    password: this.passwordFormControl
  });


  // submit() {
  //   if (this.userForm.valid) {
  //     // Simulez une requête de connexion à l'API
  //     this.authService.login(this.userForm.value).subscribe(
  //       response => {
  //         // Si la connexion est réussie, affichez un message de succès
  //         this.toastr.success('Login successful');
  //       },
  //       error => {
  //         // Si la connexion échoue, affichez un message d'erreur
  //         this.toastr.error('Login failed');
  //       }
  //     );
  //   } else {
  //     // Si le formulaire n'est pas valide, affichez un message d'erreur
  //     this.toastr.error('Please fill in all required fields');
  //   }
  // }

  submit() {
    this.toastr.success('Login successful');
    console.log(this.userForm.value);
  }

  showToast() {
    if (!this.userForm.valid) {
      // Show toast message here
      this.toastr.error("formulaire imcomplet");
    }

}

}

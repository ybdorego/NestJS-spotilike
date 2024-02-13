import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../_services/auth.service';
import { ICredentials } from '../../_interfaces/credential';
import { TokenService } from '../../_services/token.service';


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
  TokenService = inject(TokenService)

  public MailFormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);

  public passwordFormControl = new FormControl(null, [Validators.minLength(6)]);

  public userForm: FormGroup = new FormGroup({
    email: this.MailFormControl,
    password: this.passwordFormControl
  });

  submit() {
    if (this.userForm.valid) {
      const credentials: ICredentials = this.userForm.value;
      // Simulate an API login request
      this.authService.login(credentials).subscribe(
        data => {
          // If login is successful, display a success message
          this.toastr.success('Login successful');
          console.log(data); // Log the response data from the API

          // Assuming the token is in the 'token' property of the response
          const token = data.token;
          // console.log(token); // Log the token
          // You can now store the token wherever you want (e.g., in localStorage)
          this.TokenService.SaveToken(token);
          // localStorage.setItem('Token', token);
        },
        error => {
          // If login fails, display an error message
          this.toastr.error('Login failed');
          // console.error(error); // Log the error data from the API
        }
      );
    } else {
      // If the form is not valid, display an error message
      this.toastr.error('Please fill in all required fields');
    }
  }

  showToast() {
    if (!this.userForm.valid) {
      // Show toast message here
      this.toastr.error("Incomplete form");
    }
  }
}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  toastr = inject(ToastrService)

  public usernameFormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);

  public passwordFormControl = new FormControl(null, [Validators.minLength(6)]);

  public userForm: FormGroup = new FormGroup({
    email: this.usernameFormControl,
    password: this.passwordFormControl
  });



  submit() {
    this.toastr.success('Login successful');
    console.log(this.userForm.value);
  }


}

import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RegistrationService } from './registration.service';?
import { IUser } from '../shared/models/user.interface';
import { UserManagementService } from '../shared/services/user-management.service';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.pattern('27[0-9]{9}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    preferred_name: new FormControl('', [Validators.required]),
    promocode: new FormControl(''),
    is_blocked: new FormControl(false),
    authorities: new FormControl('user', [Validators.required,]),
    verified: new FormControl(false),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    // make confirm password required and check if it matches password
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private userManagementService: UserManagementService) { }

  onSubmit() {
    console.log('Form submitted:', this.form.valid);

    if (this.form.value.password !== this.form.value.confirm_password) {
      alert('Passwords do not match');
    }
    else {
      this.userManagementService.registerUser(this.form.value as IUser)
        .then(response => {
          alert('Registration successful');
          // )
        })
        .catch(error => {
          alert('Error registering user:' + error);
          console.error(error);
          console.log(this.form.value);
        });
    }

  }
}

import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterLink } from "@angular/router";
import { UserManagementService } from "../shared/services/user-management.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  form = new FormGroup({
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
    phone: new FormControl("", [Validators.required, Validators.minLength(10)]),
  });

  error: string = "";

  constructor(
    private userManagementService: UserManagementService,
    private router: Router,
  ) {}

  onSubmit() {
    const data: any = this.userManagementService.loginUser(
      this.form.value as { phone: string; password: string },
    );

    data.then((response: any) => {
      if (response.success) {
        alert("Success");
        this.router.navigate(["/home"]);
      }

      this.error =
        "Something went wrong! Maybe wrong credentials, please try again.";
    });
  }
}

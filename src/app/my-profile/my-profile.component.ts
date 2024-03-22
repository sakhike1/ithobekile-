import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { IUser } from '../shared/models/user.interface';
import { MatButtonModule } from '@angular/material/button';
import { UserManagementService } from '../shared/services/user-management.service';
import { IUser } from '../shared/models/user.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  user: IUser | undefined; 
  constructor(private userManagementService: UserManagementService, private router: Router) {
    userManagementService.getCurrentlyLoggedInUserId().then((phone) => {
      if (!phone) {
        router.navigate(['/login']);
      }
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.userManagementService.getCurrentlyLoggedInUser()
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  toSubscription() {
    this.router.navigate(['/subscription']);
  }

  logout() {
    this.userManagementService.logoutUser();
    this.router.navigate(['/login']);
  }
}

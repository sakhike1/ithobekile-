import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import axios from 'axios';
import { UserManagementService } from '../shared/services/user-management.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ActiveConversationComponent } from '../shared/components/active-conversation/active-conversation.component';
import { MatSelectModule } from '@angular/material/select';
import { HomeService, Grade } from './home.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule, MatButtonModule, RouterModule, ActiveConversationComponent, MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  url = `${environment.apiUrl}/api/subjects`;
  grades: Grade[] = [];
  items: any = [];
  user: any = null;

  constructor(private userManagementService: UserManagementService, private homeService: HomeService, private router: Router) {
    // const phone = 
    // if (!phone) {
    //   window.location.href = '/login';
    // }

    // console.log(phone);

    this.grades = this.homeService.grades;

    userManagementService.getCurrentlyLoggedInUserId().then((phone) => {
      if (!phone) {
        // window.location.href = '/login';
        router.navigate(['/login']);
      }
      // this.getSubjects(phone);
      axios.get(this.url, {
        headers: {
          // 'Authorization': `Bearer ${phone}`
        }
      }).then((res) => {
        this.items = res.data;
      });
    });
  }

  selectedGrade: string = '12';
  updateGrades() {
    console.log(this.selectedGrade);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.userManagementService.getCurrentlyLoggedInUser().then(response => {
      this.user = response.data;
      console.log(this.user);
    });
  }
}

import { Component } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-active-conversation',
  standalone: true,
  imports: [],
  templateUrl: './active-conversation.component.html',
  styleUrl: './active-conversation.component.css'
})
export class ActiveConversationComponent {
  constructor(private userManagementService: UserManagementService) { }
  activeConversation: { message?: string, success: boolean} = { success: false };

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.userManagementService.getActiveConversation().then((res) => {
      console.log(res);
      this.activeConversation = res.data as { message?: string, success: boolean };
    });
  }
}

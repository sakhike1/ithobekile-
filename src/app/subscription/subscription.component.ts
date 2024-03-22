import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './subscription';
import { UserManagementService } from '../shared/services/user-management.service';
import { CardDetails } from './card-details';
@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {

  options: CardDetails[] = [];

  constructor(private subscription: SubscriptionService, private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.userManagementService.getCurrentlyLoggedInUserId().then((phone) => {
      this.subscription.getSubscriptionOptions(phone ?? '12').then((options) => {
        this.options = options.options;
        console.log(options);
        console.log(this.options);
      });
  
    });
  }

  sendSubscriptionChoice({ choice, amount, description }: CardDetails) {
    this.userManagementService.getCurrentlyLoggedInUserId().then((phone) => {
      const subscription: Subscription = {
        phone: phone ?? '',
        option: choice, // 'promo' or 'website' or 'website+chat' or 'tutorial'
        grade: '12',
        promocode: '', // TODO: ALWAYS EMPTY
        amount: amount, // 0 for promo, 100 for website, 400 for website+chat, 200 for tutorial
        description: description, // all subscription except for tutorial
        reference: phone ?? '',
        payment_status: 'successful'
      };

      console.log(subscription);

      this.subscription.createSubscription(subscription); 
    });
  }
}

import { Injectable } from '@angular/core';
import axios from 'axios';
import { Subscription } from './subscription';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor() { }
  async createSubscription(subscription: Subscription) {
    const response = await axios.put(`${environment.apiUrl}/api/account/update`, subscription);
    return response.data;
  }

  async getSubscriptionOptions(phone: string) {
    // https://maritotest.ngrok.dev/product/suggestions/27717973740
    const response = await axios.get(`${environment.apiUrl}/product/suggestions/${phone}`);
    return response.data;
  }
}

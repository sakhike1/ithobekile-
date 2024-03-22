import { Injectable } from '@angular/core';
import axios from 'axios';
import { IUser } from '../models/user.interface';
import { environment } from '../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor() { }
  
  async registerUser(userData: IUser) {
    const response = await axios.put(`${environment.apiUrl}/api/user/create`, userData);
    return response;
  }

  async updateUser(userData: IUser) {
    // const response = await axios.post('${environment.apiUrl}/api/user/profile', userData);
    // return ;
    // TODO: In the future, implement the update user method
    throw new Error('Method not implemented.');
  }

  async getUser(id: string) {
    // the id is the user's phone number because reasons
    const response = await axios.get(`${environment.apiUrl}/api/user/profile/${id}`);
    return response;
  }

  async getCurrentlyLoggedInUser() {
    const phone = localStorage.getItem('token');
    if (phone) {
      return this.getUser(phone);
    }
    throw new Error('No user logged in');
  }

  async logoutUser() {
    localStorage.removeItem('token');
  }

  async loginUser(userData: { phone: string, password: string}) {
    // if phone starts with 0 replace with 27
    if (userData.phone.startsWith('0')) {
      userData.phone = '27' + userData.phone.slice(1);
    }
    const response = await axios.post(`${environment.apiUrl}/api/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'userphone': userData.phone,
        'password': userData.password
      }
    });

    console.log(response);


    if (response.data.success) {
      localStorage.setItem('token', userData.phone);
    }

    return response.data;
  }

  async getCurrentlyLoggedInUserId() {
    const phone = localStorage.getItem('token');
    // console
    return phone;
    // throw new Error('No user logged in');
  }

  // returns the messages of the active conversation
  async getActiveConversation() {
    const phone = localStorage.getItem('token');
    if (phone) {
      // https://maritotest.ngrok.dev/api/chat/cursor/27717973740
      const response = await axios.get(`${environment.apiUrl}/api/chat/cursor/${phone}`);
      return response;
    }
    throw new Error('No user logged in');
  }
}

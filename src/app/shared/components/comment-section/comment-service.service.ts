import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserManagementService } from '../../services/user-management.service';
import { Comment } from './comment.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private userManagementService: UserManagementService) {

  }

  async createComment(comment: Comment): Promise<any> {
    const response = await axios.put(`${environment.apiUrl}/api/user/comment`, comment);
    return response.data;
  }

  async getComments(question_id: string): Promise<Comment[]> {
    const response = await axios.get(`${environment.apiUrl}/api/question/comments/${question_id}`)
    return response.data as Comment[];
  }
}

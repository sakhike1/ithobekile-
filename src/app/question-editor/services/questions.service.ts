import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { IQuestion } from '../IQuestion';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  Questions: BehaviorSubject<IQuestion[]> = new BehaviorSubject<IQuestion[]>([]);
  
  get questions() {
    return this.Questions.asObservable();
  }

  constructor() { }

  async duplicateQuestion(question: IQuestion) {
    question.label += ' (copy)';

    const response = await axios.put(`${environment.apiUrl}/api/question/duplicate`, question);
    const newQuestionResponse = await axios.get(`${environment.apiUrl}/api/question/${response.data}`);
    const newQuestion : IQuestion = newQuestionResponse.data;
    const questions = this.Questions.value;
    // add new question to questions in order of id
    questions.splice(questions.findIndex((q) => q.id === question.id) + 1, 0, newQuestion);

    return new Promise((resolve, reject) => {
      if (response.status === 200) {
        resolve(newQuestion);
      } else {
        reject(response);
      }
    });
  }

  async deleteQuestion(question: IQuestion) {
    const response = await axios.delete(`${environment.apiUrl}/api/question/delete/${question.id}`);


    const questions = this.Questions.value;
    // remove question from questions
    questions.splice(questions.findIndex((q) => q.id === question.id), 1);

    return new Promise((resolve, reject) => {
      if (response.status === 200) {
        resolve(question);
      } else {
        reject(response);
      }
    });
  }

  async updateQuestion(question: IQuestion) {
    // find the question in questions using the id
    const questions = this.Questions.value;
    console.log();    

    const response = await axios.put(`${environment.apiUrl}/api/question/update`, question);
    const q = questions[questions.findIndex((q) => q.id === question.id)];

    return new Promise((resolve, reject) => {
      if (response.status === 200) {
        resolve(q);
      } else {
        reject(response);
      }
    });
  }

  async fetchQuestions(id: string) {
    const response = await axios.get(`${environment.apiUrl}/api/questions/${id}`);
    let questions: IQuestion[] = [];
    (response.data || []).forEach((question : IQuestion) => {
      questions.push(question);
    })

    this.Questions.next(questions);
  }

}

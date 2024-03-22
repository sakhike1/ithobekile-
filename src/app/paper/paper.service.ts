import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Question } from "../shared/models/Question";
import axios from "axios";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PaperService {
  baseUrl = `${environment.apiUrl}/api/questions/`;
  private questions = new BehaviorSubject<Question[]>([]);

  get getQuestions() {
    return this.questions.asObservable();
  }

  constructor() {}

  async fetchQuestions(id: string) {
    const response = await axios.get(`${this.baseUrl}${id}`);
    let questions: Question[] = [];
    (response.data ?? []).forEach((element: any) => {
      questions.push({
        id: element.id,
        content: this.renderQuestion(element),
        answer: element.answer !== "" ? element.answer : null,
        class: "mainClass",
        showAnswer: false,
      });

      if (element.subquestions && element.subquestions.length > 0) {
        element.subquestions.forEach((s: any) => {
          questions.push({
            id: element.id,
            content: this.renderQuestion(s),
            answer: s.answer !== "" ? s.answer : null,
            class: "subClass",
            showAnswer: false,
          });
        });
      }
    });

    this.questions.next(questions);
  }

  renderQuestion(element: any) {
    let toRender = "";
    if (element.label) {
      toRender += `${element.label}\t\t`;
    }
    if (element.content) {
      toRender += `${element.content} \n\n`;
    }
    if (element.image) {
      toRender += `\\includegraphics(${element.image}){width=50%}`;
    }
    return toRender;
  }
}

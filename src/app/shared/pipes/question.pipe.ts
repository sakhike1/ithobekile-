import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../models/Question';

@Pipe({
  name: 'questionNumber',
  standalone: true
})
export class QuestionPipe implements PipeTransform {

  transform(question: Question): string {
    return question.content.split("\t")[0];
  }

}

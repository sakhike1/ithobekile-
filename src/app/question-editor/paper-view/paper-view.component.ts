import { Component, Input, IterableDiffers, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ComponentsModule } from '../../shared/components/components.module';import { IQuestion } from '../IQuestion';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-paper-view',
  standalone: true,
  imports: [MatCardModule, ComponentsModule, MatButtonModule],
  templateUrl: './paper-view.component.html',
  styleUrl: './paper-view.component.css'
})
export class PaperViewComponent {
  @Input() questions: any[] = [];
  @Input({ required: true }) updateQuestionEvent!: Observable<IQuestion>;
  updateQuestionEventSubscription?: Subscription;

  constructor() {
  }

  test() {
    this.questions[1] = this.questions[1];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.updateQuestionEventSubscription = this.updateQuestionEvent.subscribe((question) => {
      console.log('updating question');
      // this.questions.find((q) => q.id === question.id);
      const index = this.questions.findIndex((q) => q.id === question.id);
      console.log(index, question.id, this.questions);
      if (index !== -1) {

        this.questions[index] = {
          ...this.questions[index],
          ...question
        };

        setTimeout(() => {

          this.questions[index] = question;
        }, 100);
      }
    });
  }

  refreshQuestions(question: any) {
    console.log('refreshing questions');
    const temp = this.questions;
    this.questions = [];
    
    setTimeout(() => {
      this.questions = temp;
    }, 100);
  }
}

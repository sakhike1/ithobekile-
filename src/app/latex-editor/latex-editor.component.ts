import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LatexPreviewComponent } from './latex-preview/latex-preview.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ComponentsModule } from '../shared/components/components.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { IQuestion } from '../question-editor/IQuestion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-latex-editor',
  standalone: true,
  imports: [MatProgressBarModule, ExpansionPanelComponent, MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatIconModule, LatexPreviewComponent, ComponentsModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './latex-editor.component.html',
  styleUrl: './latex-editor.component.css'
})
export class LatexEditorComponent {
  questionTypeOptions = [
    { value: 'mainquestion', viewValue: 'Main question' },
    { value: 'subquestion', viewValue: 'Sub question' },
    { value: 'question', viewValue: 'Standard Question'}
  ];

  @Input() loading: boolean = false;
  message: string = '';
  @Input({required: true}) question: IQuestion = {} as IQuestion; 
  selected?: number;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.question.loading = false;
  }

  // Event Emitters
  @Output() duplicateQuestionEvent = new EventEmitter<any>();
  @Output() deleteQuestionEvent = new EventEmitter<any>();
  @Output() saveQuestionEvent = new EventEmitter<any>();
  
  sendDuplicateQuestionEvent() {
    this.toggleLoading(true, "Duplicating question...");
    this.duplicateQuestionEvent.emit(this.getQuestionData());
    setTimeout(() => this.toggleLoading(false), 1000);
  }

  sendDeleteQuestionEvent() {
    this.toggleLoading(true, "Deleting question...");
    this.deleteQuestionEvent.emit(this.getQuestionData());
  }

  sendSaveQuestionEvent() {
    this.toggleLoading(true, "Saving question...");
    this.saveQuestionEvent.emit(this.getQuestionData());
  }

  setSelected(selected: number) {
    this.selected = selected;
  }

  form = this.formBuilder.group({
    question_type: [this.question.question_type],
    marks: [this.question.marks],
    question_no: [this.question.question_no],
    label: [this.question.label],
  });

  test() {
    console.log('Focused');
  }

  getQuestionData() {
    if (this.question.question_type === 'mainquestion') {
      this.form.controls['marks'].setValue(0);
      this.question.answer = '';
    }

    return {...this.form.value, paper_id: this.question.paper_id, ai_generated: this.question.ai_generated, label: this.question.label, id: this.question.id, content: this.question.content, answer: this.question.answer};
  }

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

  onSubmit() {}
  
  onAnswerChange(event: any) {
    this.question.answer = event;
  }

  onContentChange(event: any) {
    this.question.content = event;
  }

  toggleLoading(loading: boolean, message: string = '') {
    this.question.loading = loading;
    this.message = message;
  }

  handleSavingHotKey(event: any) {

    if(!this.loading && (event.ctrlKey || event.metaKey) && (event.key as string).toLowerCase() === 's') {
      // console.log('Hotkey Matched');
      event.preventDefault();
      this.sendSaveQuestionEvent();
    }
    else {
      // console.log('Hotkey not matched');
    }
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toggleLoading(true, 'Deleting question');
        this.sendDeleteQuestionEvent();
      }
    });
  }
}

import { Component } from '@angular/core';
import { LatexEditorComponent } from '../latex-editor/latex-editor.component';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PdfviewerModule } from './pdfviewer/pdfviewer.module';
import OnlinePDFDocument from './OnlinePDFDocument';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QuestionsService } from './services/questions.service';
import { Subject, Subscription } from 'rxjs';
import  { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuestionPdfsService } from './services/question-pdfs.service';
import { RouterModule } from '@angular/router';
import { IQuestion } from './IQuestion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageNavigationService } from '../shared/services/page-navigation.service';
import { PaperViewComponent } from './paper-view/paper-view.component';
import { Router } from '@angular/router';
import { UserManagementService } from '../shared/services/user-management.service';

@Component({
  selector: 'app-question-editor',
  standalone: true,
  imports: [PaperViewComponent, RouterModule, MatToolbarModule, MatIconModule, LatexEditorComponent, MatButtonModule, CommonModule, MatGridListModule, MatProgressSpinnerModule, PdfviewerModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './question-editor.component.html',
  styleUrl: './question-editor.component.css',
  // providers: [PDFViewerComponent]
})
export class QuestionEditorComponent {
  questionsSub!: Subscription;
  questionsPDFSub!: Subscription;
  questions: any[] = [];
  pdfDocuments: OnlinePDFDocument[] = [];
  selectedPDFDocument?: OnlinePDFDocument = this.pdfDocuments[0];
  pdfViewHidden: boolean = true;
  paperViewHidden: boolean = true;
  editorViewHidden: boolean = true;
  updateQuestionEvent: Subject<IQuestion> = new Subject<IQuestion>();
  selectedView = [];

  emitUpdateQuestionEvent(question: IQuestion) {
    console.log('emitting update question event')
    this.updateQuestionEvent.next(question);
  }

  constructor(private snackBar: MatSnackBar,
    private pageNavigationService: PageNavigationService,
    private route: ActivatedRoute,
    private questionsService: QuestionsService, 
    private questionsPDFService: QuestionPdfsService,
    router: Router,
    userManagementService: UserManagementService
    ) {
      userManagementService.getCurrentlyLoggedInUserId().then((phone) => {
        if (!phone) {
          // window.location.href = '/login';
          router.navigate(['/login']);
        }
        // this.getSubjects(phone);

        // SECURITY CHECK
        userManagementService.getUser(phone ?? "").then((user) => {
          if (user.data.authorities !== 'admin') {
            router.navigate(['/']);
          }
        });
      });

    
  }

  changeVisibility(view: string[]) {
    this.pdfViewHidden = !view.includes('PDF');
    this.paperViewHidden = !view.includes('Paper');
    this.editorViewHidden = !view.includes('Editor'); 

    localStorage.setItem('viewOptions', JSON.stringify(view));
  }

  ngOnInit(): void {
    this.questionsSub = this.questionsService.questions.subscribe(
      (questions) => {
        this.questions = questions;
      }
    );

    this.questionsPDFSub = this.questionsPDFService.pdfDocuments.subscribe(
      (pdfDocuments) => {
        this.pdfDocuments = pdfDocuments;
      }
    );

    const id = this.route.snapshot.paramMap.get("id") ?? "0";
    this.questionsService.fetchQuestions(id);
    this.questionsPDFService.fetchPDFDocuments(id);

    const viewOptions = localStorage.getItem('viewOptions');
    this.selectedView = JSON.parse(viewOptions ?? '["Editor", "PDF"]');
    this.changeVisibility(this.selectedView);
  }

  ngOnDestroy() {
    if(this.questionsSub) this.questionsSub.unsubscribe();
    if(this.questionsPDFSub) this.questionsPDFSub.unsubscribe();
  }

  refreshQuestions() {
    const id = this.route.snapshot.paramMap.get("id") ?? "0";
    this.questionsService.fetchQuestions(id);
  }

  refreshPDFDocuments() {
    const id = this.route.snapshot.paramMap.get("id") ?? "0";
    this.questionsPDFService.fetchPDFDocuments(id);
  }

  receiveDuplicateQuestionEvent($event: any) {
    this.questionsService.duplicateQuestion($event).then((question : any) => {
      // this.pageNavigationService.scrollToElement(question.id);
      this.snackBar.open(`Q${question.question_no + ' - ' + question.label} duplicated`, 'OK', {
        duration: 5000
      }).afterDismissed().subscribe(() => {
        this.pageNavigationService.scrollToElement(question.id);
      });
    });
  }

  receiveDeleteQuestionEvent($event: any) {
    this.questionsService.deleteQuestion($event).then((question : any) => {
      this.snackBar.open(`Q${question.question_no + ' - ' + question.label} deleted`, 'OK', {
        duration: 2000
      });
    });
  }

  receiveSaveQuestionEvent($event: any) {
    this.questionsService.updateQuestion($event).then((question : any) => {
      question.loading = false;
      this.snackBar.open(`Q${question.question_no + ' - ' + question.label} saved`, 'OK', {
        duration: 2000
      });

      this.emitUpdateQuestionEvent(this.questions.find((q) => q.id === question.id) as IQuestion);
    })
    .catch((error) => {
      alert('Something went wrong');
    });
  }

  test(question : IQuestion) {
    question.label = 'Changed';
    question.answer = 'Changed';
    question.content = 'Changed';
    console.log(question);
  }

  scrollToElement(elementId: string): void {
    this.pageNavigationService.scrollToElement(elementId);
    this.pageNavigationService.scrollToElement(elementId + '-pv');
  }

  downloadPdf() {
    window.open(this.selectedPDFDocument?.source_url ?? '');   
  }
}

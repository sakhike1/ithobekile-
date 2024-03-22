import { Component, OnInit } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ComponentsModule } from "../shared/components/components.module";
import { PaperService } from "./paper.service";
import { Question } from "../shared/models/Question";
import { Subscription } from "rxjs";
import { ViewPaperComponent } from "../shared/components/view-paper/view-paper.component";
import { UserManagementService } from "../shared/services/user-management.service";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { PageNavigationService } from "../shared/services/page-navigation.service";
import { QuestionPipe } from "../shared/pipes/question.pipe";
import { SubjectsService } from "../shared/services/subjects.service";
import { PaperDetails } from "../shared/models/PaperDetails";
@Component({
  selector: "app-paper",
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    RouterModule,
    FlexLayoutModule,
    ComponentsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    QuestionPipe
  ],
  templateUrl: "./paper.component.html",
  styleUrl: "./paper.component.css",
})
export class PaperComponent implements OnInit {
  questions: Question[] = [];
  questionsSub!: Subscription;
  options = {
    htmlTags: true,
    width: 1200,
  };
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private paperService: PaperService,
    private router: Router,
    private userManagementService: UserManagementService,
    private pageNavigationService: PageNavigationService,
    private subjectsService: SubjectsService
  ) {
    userManagementService.getCurrentlyLoggedInUserId().then((phone) => {
      if (!phone) {
        router.navigate(["/login"]);
      }
    });
  }

  paper!: PaperDetails;
  id: string = "0";

  async ngOnInit() {

    this.questionsSub = this.paperService.getQuestions.subscribe(
      (questions) => {
        this.questions = questions;
      }
    );

    this.id = this.route.snapshot.paramMap.get("id") ?? "0";
    const question_no = this.route.snapshot.paramMap.get("question_no") ?? "";
    this.paperService.fetchQuestions(this.id + '/' + question_no);

    this.subjectsService.getQuestionDetailsByPaperId(this.id).then((res) => {
      console.log(res);
      this.paper = res;
      // console.log(this.paper);
    });
    

    console.log()
  }

  openQuestion(question: Question) {
    this.dialog.open(ViewPaperComponent, {
      data: { question },
    });
  }

  scrollToElement(elementId: string): void {
    console.log(this.questions);
    this.pageNavigationService.scrollToElement(elementId + '-pv');
  }
}

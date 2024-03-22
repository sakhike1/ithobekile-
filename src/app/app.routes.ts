import { Routes } from "@angular/router";
import { BookTutorComponent } from "./book-tutor/book-tutor.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LoginComponent } from "./login/login.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { PaperComponent } from "./paper/paper.component";
import { PDFViewerComponent } from "./question-editor/pdfviewer/pdfviewer.component";
import { QuestionEditorComponent } from "./question-editor/question-editor.component";
import { RegistrationComponent } from "./registration/registration.component";
import { CommentSectionComponent } from "./shared/components/comment-section/comment-section.component";
import { authGuard } from "./shared/guards/auth.guard";
import { SubscriptionComponent } from "./subscription/subscription.component";
import { ViewPapersComponent } from "./view-papers/view-papers.component";

export const routes: Routes = [
  { path: "", component: LandingPageComponent, canActivate: [authGuard] },
  { path: "home", component: HomeComponent },
  { path: "paper/:id", component: PaperComponent },
  { path: "paper/:id/:question_no", component: PaperComponent },
  { path: "dashboard/:grade/:subject_id", component: DashboardComponent },
  // { path: "editor", component: LatexEditorComponent },
  { path: "editor/:id", component: QuestionEditorComponent },
  { path: "subject/:subjectId/:grade", component: ViewPapersComponent },
  { path: "pdfviewer", component: PDFViewerComponent },
  { path: "register", component: RegistrationComponent },
  { path: "profile", component: MyProfileComponent },
  { path: "subscription", component: SubscriptionComponent },
  { path: "login", component: LoginComponent },
  { path: "comment", component: CommentSectionComponent },
  { path: "book-tutor", component: BookTutorComponent },
];

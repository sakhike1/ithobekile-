import {
  Component,
  Input,
  ViewChildren,
  AfterViewInit,
} from "@angular/core";
import { Question } from "../../models/Question";
import axios from "axios";
import { UserManagementService } from "../../services/user-management.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-view-question",
  templateUrl: "./view-question.component.html",
  styleUrl: "./view-question.component.css",
})
export class ViewQuestionComponent implements AfterViewInit {
  @ViewChildren("questionDiv") questionDiv!: any;
  @ViewChildren("answerDiv") answerDiv!: any;
  @Input() question!: Question;
  @Input() isModal: boolean = false;

  showAnswer: boolean = false;
  loading = true;
  url = `${environment.apiUrl}/api`;

  showVideo: boolean = false;

  async ngAfterViewInit(): Promise<void> {
    const options = {
      htmlTags: true,
      width: 1200,
    };
    

    this.questionDiv.first.nativeElement.innerHTML = (
      window as any
    ).markdownToHTML(this.question.content, options);

    this.questionDiv.first.nativeElement.classList.add(this.question.class);

   

    if(this.question.answer && this.isModal) {
      const res = await axios.get(`${this.url}/answer/${this.question.id}`);
      this.question.answer = res.data.content;
      this.loading = false;
    } else {
      this.loading = false;
    }

    if (this.question.answer) {
      this.answerDiv.first.nativeElement.innerHTML = (
        window as any
      ).markdownToHTML(this.question.answer, options);

      this.answerDiv.first.nativeElement.classList.add('answer');
      this.answerDiv.first.nativeElement.style.display = 'none';
    }
  }

  hideShowAnswer = () => {
    this.answerDiv.first.nativeElement.style.display = this.showAnswer ? 'none' : 'block';
    this.showAnswer = !this.showAnswer;
    this.showVideo = false;
  }

  hideShowVideo = () => {
    this.showVideo = !this.showVideo;
    this.showAnswer = false;
  }

  constructor(private userManagementService: UserManagementService) {}

  async sendWhatApp() {
    
    this.userManagementService.getCurrentlyLoggedInUserId().then((phone: string | null) => {
      if(phone) {
        const resp = axios.put(`${this.url}/chat/create/${phone}`, {query: [this.question.id]});
        window.open(`whatsapp://send?phone=27699653891&text=Hi`, "_blank");
      }
    });

  }
}

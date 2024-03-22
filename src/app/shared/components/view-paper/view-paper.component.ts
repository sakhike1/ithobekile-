import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Question } from "../../models/Question";
import { ComponentsModule } from "../components.module";
import axios from "axios";

import { ExpansionPanelComponent } from "../../../latex-editor/expansion-panel/expansion-panel.component"; 
import { VideoPlayerComponent } from "../video-player/video-player.component";
import { environment } from "../../../../environments/environment";
export interface DialogData {
  question: Question;
  number: string;
}

@Component({
  selector: "app-view-paper",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ComponentsModule,
    ExpansionPanelComponent,
    VideoPlayerComponent,
    MatIconModule
  ],
  templateUrl: "./view-paper.component.html",
  styleUrl: "./view-paper.component.css",
})
export class ViewPaperComponent {

  baseUrl = `${environment.apiUrl}/api`;
  
  constructor(
    public dialogRef: MatDialogRef<ViewPaperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

  }

  async sendWhatApp() {
    const resp = await axios.put(`${this.baseUrl}/chat/create/${this.data.number}`, {query: [this.data.question.id]})
    window.open(`whatsapp://send?phone=27699653891&text=Hi`, "_blank");
  }
}

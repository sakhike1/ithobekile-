import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ViewQuestionComponent } from "./view-question/view-question.component";
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatGridListModule } from "@angular/material/grid-list";
import { VideoPlayerComponent } from "./video-player/video-player.component";
import { CommentSectionComponent } from "./comment-section/comment-section.component";
@NgModule({
  declarations: [ViewQuestionComponent],
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule, VideoPlayerComponent, CommentSectionComponent],
  exports: [ViewQuestionComponent],
})
export class ComponentsModule {}

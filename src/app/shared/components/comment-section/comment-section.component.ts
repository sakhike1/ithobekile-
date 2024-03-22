import { Component, Input, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserManagementService } from '../../services/user-management.service';
import { CommentServiceService } from './comment-service.service';
import { Comment } from './comment.interface';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  @Input() question_id: string = '10896454193-0530-447a-abbb-fc09306541b7';
  comments: Comment[] = [];

  constructor(private userManagementService: UserManagementService, private commentService: CommentServiceService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.refresh();
  }

  onSubmit(event: any, comment: string) {
    event.preventDefault();
    this.userManagementService.getCurrentlyLoggedInUserId().then((phone: string | null) => {
      if(phone) {
        this.commentService.createComment({
          comment: comment,
          comment_by: phone,
          phone: phone,
          question_id: this.question_id
        } as Comment);
      }
      this.refresh();
    });
  }

  refresh() {
    this.commentService.getComments(this.question_id).then((comments: Comment[]) => {
      this.comments = comments;
      this.comments.forEach((comment: Comment) => {
        console.log(randomColorGenerator(comment.user_id ?? 0));
        comment.color = randomColorGenerator(comment.user_id ?? 0);
      });
      this.comments.reverse();
    })
  }

  
}

function randomColorGenerator(seed: number): string {
  // Linear Congruential Generator parameters
  const a = 1664525;
  const c = 1013904223;
  let currentSeed = seed;

  // PRNG function
  const random = () => {
      currentSeed = (a * currentSeed + c) & 0xFFFFFFFF;
      return currentSeed >>> 16;
  };

  // Use the PRNG to generate random RGB values based on the seed
  const red = random() % 256;
  const green = random() % 256;
  const blue = random() % 256;

  // Convert RGB to hex
  const hexColor = `#${(red << 16 | green << 8 | blue).toString(16).padStart(6, '0')}`;

  // Check if the color is dark enough for black text
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  const textColor = luminance > 0.5 ? '#000000' : '#FFFFFF';

  // Output the result
  console.log(`Background Color: ${hexColor}`);
  console.log(`Text Color: ${textColor}`);

  return hexColor;
}
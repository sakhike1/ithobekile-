import { Component, ElementRef, Input, ViewChild } from '@angular/core';
// import videojs

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {
  @Input({ required: true }) videoSrc: string = "https://wcedonline.s3.af-south-1.amazonaws.com/Video-storage/output.mp4";
}

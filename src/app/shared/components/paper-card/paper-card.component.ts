import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PaperDetails } from '../../models/PaperDetails';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-paper-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, RouterModule, MatIconModule],
  templateUrl: './paper-card.component.html',
  styleUrl: './paper-card.component.css'
})
export class PaperCardComponent {
  // longText: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.";
  @Input() paper: PaperDetails = {"id":"XII-MMXIV-XI-MTHMTCS-I-NSC","document_id":"5737c01bf4c9c76411ccf31a6eaec99b48a035a4e3b56e2f5cebafc707ab4185","title":"Grade 12 Mathematics Paper 1 November 2014 National Senior Certificate Department of Education","subject_id":"Mathematics","grade":"Grade 12","paper_no":"Paper 1","language":["English"],"language_class":"","published_month":"November","published_year":"2014","source":"wcedonline","created_at":"2023-12-29T18:15:54.447433","updated_at":"2023-12-29T18:15:54.447433"};
  @Input() handleEditClick: Function = () => { console.log('Not implemented the edit click'); };
  @Input() handleViewClick: Function = () => { console.log('Not implemented the view click'); };
  @Output() favoriteClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() displayEditButton: boolean = false;
  @Input() isFavorite: boolean = false;

  onFavoriteClick() {
    this.paper.is_favorite = !this.paper.is_favorite;
    this.favoriteClick.emit({id: this.paper.id, isFavorite: this.paper.is_favorite});
  }


}

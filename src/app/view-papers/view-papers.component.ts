import { Component } from '@angular/core';
import { PaperCardComponent } from '../shared/components/paper-card/paper-card.component';
import { PaperDetails } from '../shared/models/PaperDetails';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { UserManagementService } from '../shared/services/user-management.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-view-papers',
  standalone: true,
  imports: [PaperCardComponent, MatInputModule, MatFormFieldModule],
  templateUrl: './view-papers.component.html',
  styleUrl: './view-papers.component.css'
})
export class ViewPapersComponent {
  url = `${environment.apiUrl}/api`;
  papers: PaperDetails[] = [];
  filterPapers: PaperDetails[] = [];
  favoritePapers: PaperDetails[] = [];
  localStorageName: string = '';
  displayEditButton: boolean = false;

  constructor(private route: ActivatedRoute, private userManagementService: UserManagementService, private router: Router) {
    userManagementService.getCurrentlyLoggedInUserId().then((phone) => {
      if (!phone) {
        router.navigate(['/login']);
      }

      userManagementService.getUser(phone ?? "").then((user) => {
        // console.log(user.data);
        this.displayEditButton = user.data.authorities === 'admin';
      });
    });

    const id = this.route.snapshot.paramMap.get("subjectId") ?? "";
    const grade = this.route.snapshot.paramMap.get("grade") ?? '';
    console.log(`${this.url}/papers/${id}/${grade}`)
    axios.get(`${this.url}/papers/${id}/${grade}`).then((res) => {
    
    this.localStorageName = `${id}-${grade}-favoritePapers`;
    
    console.log(res.data);

    res.data.forEach((paper: PaperDetails) => {
        paper.is_favorite = false;
        this.papers.push(paper);
        this.filterPapers.push(paper);
        this.loadLocalFavoritePapers();
      });
    })
    
  }

  onQuerySubmit(event: any) {
    event.preventDefault();
    // document.preve
  }

  search(searchQuery: string) {
    // const terms = searchQuery.split(' ');
    this.filterPapers = this.papers.filter((paper) => {
      return paper.title.toLowerCase().includes(searchQuery.toLowerCase())
      || paper.paper_no.toLowerCase().includes(searchQuery.toLowerCase())
      || paper.grade.toLowerCase().includes(searchQuery.toLowerCase())
      || paper.subject_id.toLowerCase().includes(searchQuery.toLowerCase())
      || paper.published_month.toLowerCase().includes(searchQuery.toLowerCase())
      || paper.published_year.toLowerCase().includes(searchQuery.toLowerCase())
      || paper.language_class.toLowerCase().includes(searchQuery.toLowerCase())
      || paper.language.join(', ').toLowerCase().includes(searchQuery.toLowerCase())
      || paper.source.toLowerCase().includes(searchQuery.toLowerCase())
      || paper.created_at.toLowerCase().includes(searchQuery.toLowerCase())
      || paper.updated_at.toLowerCase().includes(searchQuery.toLowerCase())
      || paper.document_id.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  updateLocalFavoritePapers() {
    if (localStorage.getItem(this.localStorageName)) {
      localStorage.setItem(this.localStorageName, JSON.stringify(this.favoritePapers.map((paper) => paper.id)));
    }
    else {
      localStorage.setItem(this.localStorageName, JSON.stringify([]));
    }
  }

  loadLocalFavoritePapers() {

    if (localStorage.getItem(this.localStorageName)) {
      console.log('Loading favorite papers from local storage');
      const favoritePapersIds = JSON.parse(localStorage.getItem(this.localStorageName)!);
      this.favoritePapers = this.papers.filter((paper) => favoritePapersIds.includes(paper.id));
      this.favoritePapers.forEach((paper) => paper.is_favorite = true);
    }
    else {
      localStorage.setItem(this.localStorageName, JSON.stringify([]));
    }
  }

  toggleFavoritePaper(data: any) {
    if (data.isFavorite) {
      this.favoritePapers.push(this.papers.find((paper) => paper.id === data.id)!);
    } else {
      this.favoritePapers = this.favoritePapers.filter((paper) => paper.id !== data.id);
    }

    this.updateLocalFavoritePapers();
  }
}

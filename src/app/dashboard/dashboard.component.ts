import { Component, ViewChild, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { filter, map } from 'rxjs/operators';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { map } from 'rxjs/operators'; 
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SubjectsService } from '../shared/services/subjects.service';
import { ATP } from '../shared/models/atp.interface';
import { ViewQuestionComponent } from '../shared/components/view-question/view-question.component';
import { ComponentsModule } from '../shared/components/components.module';
import { PaperDetails } from '../shared/models/PaperDetails';
import { MatInputModule } from '@angular/material/input';
import { QuestionDetail } from '../shared/models/question-details.interface';
import { UserManagementService } from '../shared/services/user-management.service';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { ActiveConversationComponent } from '../shared/components/active-conversation/active-conversation.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


interface PastPaper {
  subject: string;
  grade?: string;
  term?: string;
  year?: string;
  week?: number;
  title?: string;
  score?: number | null;
  description?: string;
  id: string;
};

const PAST_PAPER_DATA: PastPaper[] = [];

for (let i = 0; i < 50; i++) {
  PAST_PAPER_DATA.push({subject: "Mathematics", grade: "12", title: "Mathematics 2022 November Paper 2", year: "2022", score: 100, description: "Annual Teaching Plans", id: i.toString()});
}

class ATPAdapter {
  terms: any = {}
  
  constructor(private aptData: ATP[]) {
    this.aptData = aptData;

    this.aptData.forEach((apt: ATP) => {
      if (!this.terms[apt.term]) {
        this.terms[apt.term] = [];
      }
      this.terms[apt.term].push(apt);
    });
  }

  convertToSchoolWeekData() {
    const schoolWeekData: any = [];

    for (const term in this.terms) {
      const weeks: any = [];
      this.terms[term].forEach((apt: ATP) => {
        
        // { label: 3, description: "", topics: ['Number patterns, sequences and series'], SBA: ['Investigation or project & test (content Term 1)'] },
        
        weeks.push(
          {
            label: apt.week,
            description: 'N/A',
            topics: [apt.content],
            SBA: [apt.summary]
          }
        );
      });

      schoolWeekData.push({
        term: term,
        weeks: weeks,
        title: `ANNUAL TEACHING PLANS: MATHEMATICS: GRADE 12 (${term})`,
        subject: "Mathematics",
        grade: "12"
      });
    }

    return schoolWeekData;
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    NgFor,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule,
    ComponentsModule,
    MatInputModule,
    ActiveConversationComponent
  ]
})
export class DashboardComponent {
  // private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = [
    { title: 'Card 1', cols: 2},
    { title: 'Card 4', cols: 1},
    { title: 'Card 2', cols: 1},
    { title: 'Card 3', cols: 1},
  ];

  // Current page details
  subjectData: any = {
    subject: "Mathematics",
    grade: "12",
    term: "Term 1",
    year: "2023",
    week: 1,
    description: "Annual Teaching Plans"
  };



  // school week data for each term
  schoolWeekData : any = [];

  selectedWeek: any = undefined; // This is for the selceted week used for displaying content

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private route : ActivatedRoute, private subjectsService: SubjectsService, private router: Router, private userManagementService: UserManagementService) {
  }


  dataSource!: MatTableDataSource<QuestionDetail>;
  tableColumns = [
    'Paper',
    'QuestionNo',
    // 'Topic',
    'Marks',
    // 'Duration',
  ];
  
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.paginator) {
      // this.dataSource.paginator = this.paginator;
    }

    const grade = this.route.snapshot.paramMap.get("grade") ?? '';
    const subject_id = this.route.snapshot.paramMap.get("subject_id") ?? '';


    this.subjectsService.getATP(grade, subject_id).then((res) => {
      console.log(res);
      const aptAdapter = new ATPAdapter(res);
      this.schoolWeekData = aptAdapter.convertToSchoolWeekData();
      console.log(this.schoolWeekData);
    });

    this.subjectData = {
      subject: grade,
      grade: subject_id
    };
  }

  applyFilter(event: Event) {
    // this.applyFilter

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.trim().toLowerCase());
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  check(row: any) {
    this.router.navigate([`/paper/${row.paper_id}/${row.question_no}`]);
  }

  selectWeek(label: string) {
    this.selectedWeek = label;
    // this.selectedTerm = this.schoolWeekData.find((x : any) => x.term === this.subjectData.term);
    console.log(this.selectedWeek);
    this.subjectsService.getQuestionDetails(this.subjectData.grade, this.subjectData.subject, this.selectedWeek.topics[0]).then((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      // this.dataSource.paginator = this.paginator;
    });
  }

  getWeekData(week: number) {
    const weekObject = this.schoolWeekData.find((x : any) => x.week === week);


    return weekObject;
  }

  selectedTerm: any = undefined;
}

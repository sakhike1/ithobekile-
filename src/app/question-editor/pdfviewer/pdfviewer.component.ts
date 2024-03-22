import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Input } from '@angular/core';

@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrl: './pdfviewer.component.css'
})
export class PDFViewerComponent {
  @Input() title: string = '';
  @Input() pdfSource: string = '';
}

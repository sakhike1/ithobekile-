import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PDFViewerComponent } from './pdfviewer.component';

@NgModule({
  declarations: [PDFViewerComponent],
  imports: [
    CommonModule,
    PdfViewerModule
  ],
  exports: [PDFViewerComponent],
})
export class PdfviewerModule { }

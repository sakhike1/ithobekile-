import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import OnlinePDFDocument from '../OnlinePDFDocument';
import axios from 'axios';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuestionPdfsService {

  constructor() { }

  PDFDocuments: BehaviorSubject<OnlinePDFDocument[]> = new BehaviorSubject<OnlinePDFDocument[]>([]);

  get pdfDocuments() {
    return this.PDFDocuments.asObservable();
  }

  async fetchPDFDocuments(id: string) {
    const response = await axios.get(`${environment.apiUrl}/api/document/${id}`);
    let pdfDocuments: OnlinePDFDocument[] = [];
    (response.data || []).forEach((pdfDocument : OnlinePDFDocument) => {
      pdfDocuments.push(pdfDocument);
    })

    this.PDFDocuments.next(pdfDocuments);
  }
}

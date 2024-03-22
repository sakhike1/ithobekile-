import { Injectable } from '@angular/core';
import axios from 'axios';
import { ATP } from '../models/atp.interface';
import { PaperDetails } from '../models/PaperDetails';
import { QuestionDetail } from '../models/question-details.interface';
import { environment } from '../../../environments/environment';

const url = environment.apiUrl + '/api';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor() {}

  async getATP(grade: string, subjectId: string): Promise<ATP[]> {
    const response = await axios.get(`${url}/atp/${grade}/${subjectId}`);
    return response.data as ATP[];
  }

  async getPastPapers(grade: string, subjectId: string): Promise<PaperDetails[]> {
    const response = await axios.get(`${url}/papers/${subjectId}/${grade}`);
    return response.data as PaperDetails[];
  }

  async getQuestionDetails(grade: string, subject_id: string, topic: string): Promise<QuestionDetail[]> {
    const response = await axios.put(`${url}/filter/questions`, {
      grade: grade,
      subject_id: subject_id,
      topic: topic
    });

    return response.data as QuestionDetail[];
  }

  async getQuestionDetailsByPaperId(paperId: string): Promise<PaperDetails> {
    // https://maritotest.ngrok.dev/api/paper/meta/XII-MMXIX-XI-MTHMTCS-I-NSC
    const response = await axios.get(`${url}/paper/meta/${paperId}`);
    return response.data as PaperDetails;
  }
}

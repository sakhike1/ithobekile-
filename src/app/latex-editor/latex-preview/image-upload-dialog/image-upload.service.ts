import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor() { }

  async uploadImage(file: any) : Promise<string> {
    const formdata : FormData = new FormData();
    formdata.append('file', file);

    const res = await axios.put(`${environment.apiUrl}/api/image/upload`, formdata);
    return res.data.url;
  }
}

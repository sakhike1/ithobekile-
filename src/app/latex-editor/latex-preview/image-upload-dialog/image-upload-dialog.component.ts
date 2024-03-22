import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogClose, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image-upload-dialog',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogClose, MatDialogContent, MatDialogActions ],
  templateUrl: './image-upload-dialog.component.html',
  styleUrl: './image-upload-dialog.component.css'
})
export class ImageUploadDialogComponent {
  img_url?: string;
  uploading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ImageUploadDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    console.log('Closing');
    this.dialogRef.close();
  }

  uploadImage(file: any) {
    this.uploading = true;
    const formdata : FormData = new FormData();
    formdata.append('file', file);

    axios.put(`${environment.apiUrl}/api/image/upload`, formdata).then((res) => {
      console.log(res);
      this.img_url = res.data.url;
      this.uploading = false;
    });
  }

  getFileFromComputer(event: any) {
    const file = event.target.files[0];
    this.uploadImage(file);
  }

  onPaste(event: any) {
    console.log('Pasted');
    const items = event.clipboardData.items;
    console.log(items);
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();

        // Check if it's a file
        if (blob instanceof File) {
          // upload file to api
          this.uploadImage(blob);
        } else {
          // Check if it's a URL
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          if (urlRegex.test(blob)) {
            this.img_url = blob;
          }
        }
      }
    }
  }
}

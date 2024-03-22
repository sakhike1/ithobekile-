import { Component, ElementRef, EventEmitter, Input, NgModule, Output, ViewChild, NgZone } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadDialogComponent } from './image-upload-dialog/image-upload-dialog.component';
import { take } from 'rxjs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ImageUploadService } from './image-upload-dialog/image-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-latex-preview',
  standalone: true,
  imports: [ MatFormFieldModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './latex-preview.component.html',
  styleUrl: './latex-preview.component.css'
})
export class LatexPreviewComponent {
  @Input() content: string = "";
  @Input() title: string = "";
  @Output() sendContentEvent : EventEmitter<string> = new EventEmitter<string>();
  @Input() uploadImageCallback: any = () => { console.log('Upload image callback not set') };
  @Input() extraContent?: string;
  @Input() extraContentTitle: string = "Question";

  form = this.formBuilder.group({
    content: [this.content]
  });

  constructor(private imageUploadService : ImageUploadService, private formBuilder: FormBuilder, public dialog: MatDialog, private _ngZone: NgZone, private snackBar: MatSnackBar) { }
  
  @ViewChild('latex_preview_div', { static: true, read: ElementRef })
  div! : ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.onLatexChange(this.content);
  }

  @ViewChild('textarea_content', { static: true, read: ElementRef })
  textarea!: ElementRef<HTMLTextAreaElement>;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  handleUserInput() {
    this.sendContent();
    // this.onLatexChange();
  }

  onLatexChange(event: any) {
    let output: string = (this.title !== '' ? `<b>${this.title}</b>: <br>` : '') + this.content;
    
    if (this.extraContent) {
      output += `<hr><b>${this.extraContentTitle}</b>: <br>` + this.extraContent;
    }

    this.div.nativeElement.innerHTML = (window as any).markdownToHTML( output, {htmlTags: true, width: 1200});
  }

  sendContent() {
    // console.log('Sending content');
    this.sendContentEvent.emit(this.content);
  }

  onSubmit() {
    // console.log('Logging latex preview form');
    console.log(this.form.value);
  }

  onPaste(event: any) {
    // console.log('Pasted');s
    const items = event.clipboardData.items;
    console.log(items);
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();

        // Check if it's a file
        if (blob instanceof File) {
          // upload file to api
          // alert user that it's uploading
          this.snackBar.open('Uploading image...', '', {
            duration: 2000,
          });
          
          this.imageUploadService.uploadImage(blob).then((url) => {
            // console.log(url);

            this.uploadImage(url, this.textarea.nativeElement.selectionStart, this.textarea.nativeElement.selectionEnd);
          });
        }
      }
    }
  }

  uploadImage(url: string, selectionStart: number, selectionEnd: number) {
    
    // this.content. += `\\includegraphics[width=0.5\\textwidth]{${url}}`;
    const image_latex = `\\includegraphics[width=0.5\\textwidth]{${url}}`; 
    
    // replace the selected text with the image latex
    const before = this.content.substring(0, selectionStart);
    const after = this.content.substring(selectionEnd, this.content.length);
    this.content = before + image_latex + after;

    this.onLatexChange(this.content);
    this.sendContent();
  }

  openDialog(): void {
    // Get the textarea selection before it reset
    const selectionStart = this.textarea.nativeElement.selectionStart;
    const selectionEnd = this.textarea.nativeElement.selectionEnd;

    const dialogRef = this.dialog.open(ImageUploadDialogComponent, {
      data: {
        selectionStart,
        selectionEnd
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.uploadImage(result, selectionStart, selectionEnd);
      }
    });
  }
}



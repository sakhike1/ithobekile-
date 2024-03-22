import { Injectable } from '@angular/core';

// TODO: we'll move this to a separate file
export interface Grade {
  value: string;
  viewValue: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  get grades() : Grade[] {
    return [
      {value: '8', viewValue: 'Grade 8'},
      {value: '9', viewValue: 'Grade 9'},
      {value: '10', viewValue: 'Grade 10'},
      {value: '11', viewValue: 'Grade 11'},
      {value: '12', viewValue: 'Grade 12'},
    ];
  }


}

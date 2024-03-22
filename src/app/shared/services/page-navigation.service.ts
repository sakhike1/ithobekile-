import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageNavigationService {

  constructor() { }

  scrollToElement(elementId: string): void {
    // this.viewportScroller.scrollToAnchor(elementId);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
  }
}

import { DatePipe, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-site-footer",
  standalone: true,
  templateUrl: "./site-footer.component.html",
  imports: [DatePipe, NgOptimizedImage, RouterLink],
})
export class SiteFooterComponent {
  currentYear = new Date();
}
